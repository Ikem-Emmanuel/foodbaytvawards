import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotePageComponent } from './vote-page.component';

const routes: Routes = [
  {
    path: '',
    component: VotePageComponent,
    data: { title: 'Voting', titleI18n: 'menu.Voting' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotePageRoutingModule {}
