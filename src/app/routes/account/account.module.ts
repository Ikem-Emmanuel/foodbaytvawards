import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@shared';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule, NzLayoutModule],
})
export class AccountModule {}
