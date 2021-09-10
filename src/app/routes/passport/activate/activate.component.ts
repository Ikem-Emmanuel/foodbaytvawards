import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { AuthenticationService, User, NotificationService, UserManagementPasswordService } from '@core';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.less'],
})
export class ActivateComponent implements OnInit {
  token: any;
  response: any;
  constructor(
    private passwordService: UserManagementPasswordService,
    private loginService: AuthenticationService,
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
    this.getToken(this.token);
    this.form = fb.group({
      password: [null, [Validators.required]], //, Validators.pattern(/^(ng\-alain\.com)$/)]],
      confirm: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {}

  getToken(token: any) {
    if (!token) this.notify.info('', 'Invalid URL')!;
    this.passwordService
      .findToken(token)
      .then((res) => {
        if (res.error) {
          this.loading = false;
          this.notify.info('', res.error);
          return;
        }
        this.loading = false;
        this.response = res;
        //this.notify.info('', res.message);
      })
      .catch((err) => !this.loading);
  }

  view: boolean = false;

  loading: boolean = false;

  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }
  get password(): AbstractControl {
    return this.form.controls.password;
  }
  form: FormGroup;
  error = '';
  type = 0;

  count = 0;
  interval$: any;

  activate(): void {
    this.loading = true;
    this.error = '';
    this.form.controls.confirm.markAsDirty();
    this.form.controls.confirm.updateValueAndValidity();
    this.form.controls.password.markAsDirty();
    this.form.controls.password.updateValueAndValidity();
    if (this.form.controls.confirm.invalid || this.form.controls.password.invalid) {
      this.loading = false;
      return;
    }
    if (this.form.controls.confirm.invalid !== this.form.controls.password.invalid) {
      this.loading = false;
      this.error = "Passwords Don't Match, Try again !";
      return;
    }
    let body = {
      email: this.response.email,
      token: this.token,
      password: this.password.value,
      password_confirmation: this.confirm.value,
    };
    this.passwordService
      .activateAccountPassword(body)
      .then((res) => {
        if (res.error) {
          this.error = res.error;
          this.loading = false;
          return;
        }
        if (res.email) {
          this.notify.success('', 'Your Password has been changed successfully !');
          this.router.navigateByUrl('/login');
        }
        this.router.navigateByUrl('/login');
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
