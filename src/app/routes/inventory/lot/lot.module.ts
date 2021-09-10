import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotRoutingModule } from './lot-routing.module';
import { LotComponent } from '../lot/lot.component';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [LotComponent],
  imports: [CommonModule, LotRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class LotModule {}
