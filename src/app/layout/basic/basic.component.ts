import { Component } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-basic',
  template: `
    <layout-default [options]="options">
      <layout-default-header-item direction="right">
        <header-user></header-user>
      </layout-default-header-item>
      <!-- side-bar -->
      <ng-template #asideUserTpl>
        <div nz-dropdown nzTrigger="click" [nzDropdownMenu]="userMenu" class="alain-default__aside-user">
          <nz-avatar class="alain-default__aside-user-avatar" [nzSrc]="user.avatar"></nz-avatar>
          <div class="alain-default__aside-user-info">
            <strong>{{ user.name }}</strong>
            <p class="mb0">{{ user.email }}</p>
          </div>
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/account">{{ 'menu.account.profile' | translate }}</li>
          </ul>
        </nz-dropdown-menu>
      </ng-template>
      <router-outlet></router-outlet>
    </layout-default>
  `,
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo.png`,
    logoCollapsed: `./assets/logo.png`,
  };
  searchToggleStatus = true;
  showSettingDrawer = !environment.production;
  get user(): User {
    return this.settings.user;
  }

  constructor(private settings: SettingsService) {}
}
