import { VotingListModule } from './voting/voting-list/voting-list.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersModule } from './user/users.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) },
      { path: 'operations', loadChildren: () => import('./nomination/list/list.module').then((m) => m.ListModule) },
      { path: 'operations', loadChildren: () => import('./shortlisting/list/list.module').then((m) => m.ListModule) },
      { path: 'operations', loadChildren: () => import('./awards/award-list/award-list.module').then((m) => m.AwardListModule) },
      { path: 'operations', loadChildren: () => import('./voting/voting-list/voting-list.module').then((m) => m.VotingListModule) },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./user/users.module').then((m) => m.UsersModule),
      },
    ],
  },
  // passport
  {
    path: 'auth',
    loadChildren: () => import('./passport/passport.module').then((m) => m.PassportModule),
  },
  // confirmation

  { path: '**', redirectTo: 'dashboard/home' },

  // NOMINATION CONFIRMATION,
  {
    path: 'confirm-nomination',
    loadChildren: () => import('./nomination/confirm-nomination/confirm-nomination.module').then((m) => m.ConfirmNominationModule),
  },

  // VOTING,
  {
    path: 'voting',
    loadChildren: () => import('./voting/vote-page/vote-page.module').then((m) => m.VotePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class RouteRoutingModule {}
