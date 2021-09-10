import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { PasswordResetComponent } from './password-reset.component';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';


@NgModule({
  declarations: [
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    ...SHARED_ZORRO_MODULES, SharedModule
  ]
})
export class PasswordResetModule { }
