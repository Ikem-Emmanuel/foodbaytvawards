import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent,
    data: { title: 'Login', titleI18n: 'FoodBay Awards - Login' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
