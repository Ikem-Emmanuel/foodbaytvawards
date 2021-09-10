import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotComponent } from '../lot/lot.component';

const routes: Routes = [
  {
    path: '',
    component: LotComponent,
    data: { title: 'Lot', titleI18n: 'menu.lot' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotRoutingModule {}
