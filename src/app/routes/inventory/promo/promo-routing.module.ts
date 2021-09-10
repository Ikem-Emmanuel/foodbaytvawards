import { PromoComponent } from './promo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PromoComponent,
    data: { title: 'Promotion', titleI18n: 'menu.promo' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoRoutingModule {}
