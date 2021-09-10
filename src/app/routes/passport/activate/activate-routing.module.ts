import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './activate.component';

const routes: Routes = [
  {
    path: ':token',
    component: ActivateComponent,
    data: { title: 'Set Password', titleI18n: 'app.login.token' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivateRoutingModule {}
