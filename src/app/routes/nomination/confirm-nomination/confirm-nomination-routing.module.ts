import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmNominationComponent } from './confirm-nomination.component';

const routes: Routes = [
  {
    path: ':token',
    component: ConfirmNominationComponent,
    data: { title: 'Confirm Nomination', titleI18n: 'menu.home' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmNominationRoutingModule {}
