import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ListRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class ListModule {}
