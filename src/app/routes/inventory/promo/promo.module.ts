import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';
import { PromoRoutingModule } from './promo-routing.module';
import { PromoComponent } from './promo.component';

@NgModule({
  declarations: [PromoComponent],
  imports: [CommonModule, PromoRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class PromoModule {}
