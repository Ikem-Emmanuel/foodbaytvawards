import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotificationService, ProfileService, UserManagementPasswordService } from '@core';
import { SettingsService, User } from '@delon/theme';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
})
export class AccountComponent implements OnInit {
  active = 1;
  profileForm: FormGroup;
  loading: boolean = true;
  pwd = {
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  };
  // Email
  primary_email = this.settings.user.email;

  user: any = this.profileService.getLocalStorageUser(); 
  constructor(
    private profileService: ProfileService,
    private passwordService: UserManagementPasswordService,
    private notify: NotificationService,
    fb: FormBuilder,
    public msg: NzMessageService,
    private settings: SettingsService,
  ) {
    this.profileForm = fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(`^[-_a-zA-Z0-9]{4,20}$`)])],
      email: '',
      bio: [null, Validators.maxLength(160)],
      url: '',
      company: '',
      location: '',
    });
  }

  get name(): AbstractControl {
    return this.profileForm.get('name')!;
  }

  profileSave(value: any): void {
    console.log('profile value', value);
  }

  pwdSave(): void {
    if (!this.pwd.old_password) {
      this.msg.error('invalid old password');
      return;
    }
    if (!this.pwd.new_password) {
      this.msg.error('invalid new password');
      return;
    }
    if (!this.pwd.confirm_new_password) {
      this.msg.error('invalid confirm new password');
      return;
    }
    console.log('pwd value', this.pwd);
  }

  getCurrentUser() {
    this.profileService
      .getUser()
      .then((res) => {
        this.loading = false;
        this.user = res.data;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }

  forgot() {
    this.loading = true;
    let body = { email: this.user.email };
    this.passwordService
      .resetPassword(body)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.message);
          this.loading = false;
          return;
        }
        this.notify.success('', res.message);
        this.loading = false;
      })
      .catch((res) => {
        console.warn(res);
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
    });
  }
}
