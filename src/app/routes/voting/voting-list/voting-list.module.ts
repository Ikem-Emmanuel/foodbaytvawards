import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotingListRoutingModule } from './voting-list-routing.module';
import { VotingListComponent } from './voting-list.component';
import { SharedModule } from '@shared';
import { SHARED_ZORRO_MODULES } from 'src/app/shared/shared-zorro.module';

@NgModule({
  declarations: [VotingListComponent],
  imports: [CommonModule, VotingListRoutingModule, ...SHARED_ZORRO_MODULES, SharedModule],
})
export class VotingListModule {}
