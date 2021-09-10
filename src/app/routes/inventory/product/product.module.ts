import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ProductRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class ProductModule {}
