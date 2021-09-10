import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';
import { ProfileService } from '../services/profile/profile.service';

@Injectable()
export class StartupService {
  userInfo: any = {};

  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    private getCurrentUser: ProfileService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  // getbalance()

  load(): Promise<void> {
    let role: any = this.tokenService.get();

    let sidebar =
      role?.role?.permission_type == 'superadmin'
        ? 'app-data'
        : role?.role?.permission_type == 'admin'
        ? 'app-data-admin'
        : role?.role?.permission_type == 'user'
        ? 'app-data-user'
        : 'app-data';
    return new Promise((resolve) => {
      zip(this.httpClient.get(`assets/tmp/i18n/en-US.json`), this.httpClient.get('assets/tmp/' + sidebar + '.json'))
        .pipe(
          catchError((res) => {
            console.warn(`StartupService.load: Network request failed`, res);
            resolve();
            return [];
          }),
        )
        .subscribe(
          ([langData, appData]) => {
            // setting language data
            this.translate.setTranslation(this.i18n.defaultLang, langData);
            this.translate.setDefaultLang(this.i18n.defaultLang);

            // application data
            const res = appData as NzSafeAny;

            this.settingService.setApp(res.app);
            // Set User
            // console.log(this.tokenService);
            if (this.tokenService.get()) {
              let user: any = this.tokenService.get();
              let nUser = {
                name: user.name,
                email: user.email,
                avatar: './assets/zorro.svg',
              };

              this.settingService.setUser(nUser);
            }
            // ACL：Set permission to full
            this.aclService.setFull(true);
            // Menu Initialization
            this.menuService.add(res.menu);
            // Set suffice of the page title
            this.titleService.default = '';
            this.titleService.suffix = res.app.name;
          },
          () => {},
          () => {
            resolve();
          },
        );
    });
  }
  file(file: any) {
    throw new Error('Method not implemented.');
  }
}
