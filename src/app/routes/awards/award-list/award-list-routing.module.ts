import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwardListComponent } from './award-list.component';

const routes: Routes = [
  {
    path: 'award-list',
    component: AwardListComponent,
    data: { title: 'Award List', titleI18n: 'menu.award' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AwardListRoutingModule {}
