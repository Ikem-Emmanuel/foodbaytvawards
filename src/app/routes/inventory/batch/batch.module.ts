import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { BatchRoutingModule } from './batch-routing.module';
import { BatchComponent } from './batch.component';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [BatchComponent],
  imports: [CommonModule, BatchRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class BatchModule {}
