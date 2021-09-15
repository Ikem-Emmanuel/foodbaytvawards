import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, take, tap } from 'rxjs/operators';

const CODEMESSAGE: { [key: number]: string } = {
  200: 'Request Successful',
  201: 'New or Modified data was successful',
  202: 'The request has been added to the queue。',
  204: 'The request was deleted',
  400: 'There was an error in the request sent',
  401: 'You don"t have permission to access resource。',
  403: 'Forbidden access to resource。',
  404: 'The request is not available',
  406: 'Incorrect request format',
  410: 'The resource is permantely deleted',
  422: 'Validation error creating request object',
  500: 'Internal Server Error',
  502: 'Gateway Error',
  503: 'The resource is unavaibale',
  504: 'The resource is timed out',
};

/**
 * `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private refreshTokenType: 're-request' | 'auth-refresh' = 'auth-refresh';
  private refreshToking = false;
  private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private injector: Injector) {
    if (this.refreshTokenType === 'auth-refresh') {
      this.buildAuthRefresh();
    }
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private get tokenSrv(): ITokenService {
    return this.injector.get(DA_SERVICE_TOKEN);
  }

  private get http(): _HttpClient {
    return this.injector.get(_HttpClient);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: any): void {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    const errortext =
      (ev.error?.message ? ev.error?.message : null) ||
      CODEMESSAGE[ev.status] ||
      (ev.statusText == 'Unknown Error' ? 'Failed to establish connection to Server !' : ev.statusText);
    this.notification.error(`Request Error:`, errortext);
  }

  /**
   *  Token
   */
  private refreshTokenRequest(): Observable<any> {
    const model = this.tokenSrv.get();
    return this.http.post(`/api/auth/refresh`, null, null, { headers: { refresh_token: model?.refresh_token || '' } });
  }

  // #region Refresh Token一： 401  Token

  private tryRefreshToken(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // 1、Token
    if ([`/api/auth/refresh`].some((url) => req.url.includes(url))) {
      this.toLogin();
      return throwError(ev);
    }
    // 2 `refreshToking`  `true`  Token
    if (this.refreshToking) {
      return this.refreshToken$.pipe(
        filter((v) => !!v),
        take(1),
        switchMap(() => next.handle(this.reAttachToken(req))),
      );
    }
    // 3、 Token
    this.refreshToking = true;
    this.refreshToken$.next(null);

    return this.refreshTokenRequest().pipe(
      switchMap((res) => {
        //
        this.refreshToking = false;
        this.refreshToken$.next(res);
        //  token
        this.tokenSrv.set(res);
        //
        return next.handle(this.reAttachToken(req));
      }),
      catchError((err) => {
        this.refreshToking = false;
        this.toLogin();
        return throwError(err);
      }),
    );
  }

  /**
   * ReAttach Token Information
   *
   * > `@delon/auth`  Token
   */
  private reAttachToken(req: HttpRequest<any>): HttpRequest<any> {
    // Example of Rekod Default `SimpleInterceptor`
    const token = this.tokenSrv.get()?.token;
    return req.clone({
      setHeaders: {
        token: `Bearer ${token}`,
      },
    });
  }

  // #endregion

  // #region Token refresh method two: use `@delon/auth` of `refresh` interface

  private buildAuthRefresh(): void {
    this.tokenSrv.refresh
      .pipe(
        filter(() => !this.refreshToking),
        switchMap(() => {
          this.refreshToking = true;
          return this.refreshTokenRequest();
        }),
      )
      .subscribe(
        (res) => {
          // : Mock expired value
          res.expired = +new Date() + 1000 * 60 * 5;
          this.refreshToking = false;
          this.tokenSrv.set(res);
        },
        () => this.toLogin(),
      );
  }

  // #endregion

  private toLogin(): void {
    // this.notification.error(`Please login to access this resource。`, ``);
    this.goTo('/auth/login');
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (ev.status > 0) {
      this.http.end();
    }
    this.checkStatus(ev);
    switch (ev.status) {
      case 200:
        break;
      case 401:
        if (this.refreshTokenType === 're-request') {
          return this.tryRefreshToken(ev, req, next);
        }
        this.toLogin();
        break;
      case 403:
        break;
      case 404:
      case 500:
        //this.goTo(`/err/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          // console.warn(
          //   'Internal Server Error',
          //   ev
          // );
        }
        break;
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        // headers: req.headers.set("Content-Type", "application/json"),
      });
    }
    if (!req.headers.has('Authorization')) {
      const token = this.tokenSrv.get()?.token;
      if (token) {
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }
    }
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.LOCAL_URL + url;
    }

    const newReq = req.clone({ url });
    return next.handle(newReq).pipe(
      mergeMap((ev) => {
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, newReq, next);
        }
        return of(ev);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next)),
    );
  }
}
