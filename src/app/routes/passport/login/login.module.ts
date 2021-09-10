import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { UserLoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule, TranslateModule, ...SHARED_ZORRO_MODULES],
})
export class LoginModule {}
