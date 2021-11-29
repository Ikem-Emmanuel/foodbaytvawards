import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { AuthenticationService, User, NotificationService, UserManagementPasswordService } from '@core';
import { NominationService } from 'src/app/core/services/nomination/nomination.service';

@Component({
  selector: 'app-confirm-nomination',
  templateUrl: './confirm-nomination.component.html',
  styles: [],
})
export class ConfirmNominationComponent implements OnInit {
  token: any;
  response: any;
  confirmMsg = '';
  constructor(
    private nominationService: NominationService,
    fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    private notify: NotificationService,
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  // getToken(token: any) {
  //   if (!token) this.notify.info('', 'Invalid URL')!;
  //   this.nominationService
  //     .findToken(token)
  //     .then((res) => {
  //       if (res.error) {
  //         this.loading = false;
  //         this.notify.info('', res.error);
  //         return;
  //       }
  //       this.tokenSubmit();
  //       this.loading = false;
  //       this.response = res;
  //       this.notify.info('', res.message);
  //     })
  //     .catch((err) => !this.loading);
  // }

  view: boolean = false;

  loading: boolean = false;
  error = '';
  type = 0;

  count = 0;

  tokenSubmit(data: any) {
    this.nominationService
      .confirm(data)
      .then((res) => {
        if (res.error) {
          this.error = res.error;
          this.loading = false;
          return;
        }
        if (res.email) {
          this.router.navigateByUrl('/');
        }
        this.notify.success('', 'You nomination has been confirmed successfully');
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  confirmation(): void {
    this.loading = true;
    this.error = '';
    let url = this.token;
    this.tokenSubmit(url);
  }

  // #endregion

  ngOnInit(): void {
    this.confirmation();
  }
}
