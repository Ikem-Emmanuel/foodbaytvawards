import { UserComponent } from '../user/user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

import { UsersRoutingModule } from './users-routing.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [UserComponent, PasswordResetComponent],
  imports: [CommonModule, UsersRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class UsersModule {}
