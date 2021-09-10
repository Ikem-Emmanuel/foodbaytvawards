import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPassportComponent } from 'src/app/layout/passport/passport.component';

const routes: Routes = [
  {
    path: 'lot',
    loadChildren: () => import('./lot/lot.module').then((m) => m.LotModule),
  },
  {
    path: 'batch',
    loadChildren: () => import('./batch/batch.module').then((m) => m.BatchModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'promo',
    loadChildren: () => import('./promo/promo.module').then((m) => m.PromoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
