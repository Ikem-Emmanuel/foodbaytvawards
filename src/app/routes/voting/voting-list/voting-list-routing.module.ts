import { VotingListComponent } from './voting-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'votelist',
    component: VotingListComponent,
    data: { title: 'Voting List', titleI18n: 'voting' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotingListRoutingModule {}
