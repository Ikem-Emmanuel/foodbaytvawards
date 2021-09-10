import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPassportComponent } from '../../layout/passport/passport.component';

const routes: Routes = [
  // passport
  {
    path: '',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'activate',
        loadChildren: () => import('./activate/activate.module').then((m) => m.ActivateModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportRoutingModule {}
