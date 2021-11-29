import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService, StartupService, User, UserManagementPasswordService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    private notify: NotificationService,
    private passwordService: UserManagementPasswordService,
    private loginService: AuthenticationService,
    fb: FormBuilder,
    private router: Router,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      mail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      remember: [true],
    });
  }

  view: boolean = false;
  // #region fields

  loading: boolean = false;

  // #region fields

  get userName(): AbstractControl {
    return this.form.controls.userName;
  }
  get email(): AbstractControl {
    return this.form.controls.mail;
  }
  get password(): AbstractControl {
    return this.form.controls.password;
  }
  get mobile(): AbstractControl {
    return this.form.controls.mobile;
  }
  get mail(): AbstractControl {
    return this.form.controls.mail;
  }
  form: FormGroup;
  error = '';
  type = 0;

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }

  forgotPassword(): void {
    this.error = '';
    this.view = !this.view;
  }

  forgot() {
    this.loading = true;
    this.error = '';
    this.mail.markAsDirty();
    this.mail.updateValueAndValidity();
    if (this.mail.invalid) {
      this.loading = false;
      return;
    }
    let body = { email: this.mail.value };
    this.passwordService
      .resetPassword(body)
      .then((res) => {
        if (res.error) {
          this.error = res.error;
          this.loading = false;
          return;
        }
        this.notify.success('', res.message);
        this.loading = false;
        this.form.patchValue({
          email: ' ',
        });
        setTimeout(() => {
          this.view = false;
        }, 2000);
      })
      .catch((res) => {
        console.log(res);
        this.loading = false;
      });
  }

  // #endregion

  login(): void {
    this.loading = true;
    this.error = '';
    this.error = '';
    if (this.type === 0) {
      this.mail.markAsDirty();
      this.mail.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.mail.invalid || this.password.invalid) {
        return;
      }
    }
    let body = {
      email: this.mail.value,
      password: this.password.value,
    };
    this.loginService
      .login(body)
      .then((res) => {
        if (res.status === 'Failed') {
          this.notify.error('', res.message);
          this.loading = false;
          return;
        }
        let user: User;
        user = res.data;
        user.token = res.data.token;
        this.tokenService.set(user);
        this.startupSrv.load().then((): any => {
          let url = this.tokenService.referrer!.url || '/';
          this.startupSrv.load().then(() => {
            let url = this.tokenService.referrer!.url || '/dashboard';
            if (url.includes('/auth')) {
              url = '/dashboard';
            }
            this.router.navigateByUrl(url);
          });
        });
      })
      .catch((err) => {
        console.warn(err);
        //if (err?.error) this.notify.info("", err?.error?.error);
        this.loading = false;
      });
  }
  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
