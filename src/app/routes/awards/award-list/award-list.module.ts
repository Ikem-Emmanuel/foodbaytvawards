import { AwardListComponent } from './award-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwardListRoutingModule } from './award-list-routing.module';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [AwardListComponent],
  imports: [CommonModule, AwardListRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class AwardListModule {}
