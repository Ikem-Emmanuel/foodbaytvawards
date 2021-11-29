import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotePageRoutingModule } from './vote-page-routing.module';
import { VotePageComponent } from './vote-page.component';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [VotePageComponent],
  imports: [CommonModule, VotePageRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class VotePageModule {}
