////GET THE ACCOUNT TYPE AND DEFLECT TO THE DEFAULT FOR ACCOUNT TYPE

import { Injector } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from "@angular/router";
//import token, get the account type and make sure its {account type} then return true if its admin

import * as ɵngcc0 from "@angular/core";
export declare class AdminGuard
  implements CanActivate, CanActivateChild, CanLoad {
  private srv;
  private injector;
  private url?;
  private get cog();
  constructor(injector: Injector);
  private process;

  canLoad(route: Route, _segments: UrlSegment[]): boolean;
  canActivateChild(
    _childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean;
  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean;
  static ɵfac: ɵngcc0.ɵɵFactoryDef<AdminGuard, never>;
}
