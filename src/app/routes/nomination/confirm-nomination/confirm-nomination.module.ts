import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmNominationRoutingModule } from './confirm-nomination-routing.module';
import { ConfirmNominationComponent } from './confirm-nomination.component';

@NgModule({
  declarations: [ConfirmNominationComponent],
  imports: [CommonModule, ConfirmNominationRoutingModule],
})
export class ConfirmNominationModule {}
