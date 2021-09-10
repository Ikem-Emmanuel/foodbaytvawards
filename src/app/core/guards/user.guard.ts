import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { TokenService } from "@delon/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const accType = this.tokenService.get();
    const allow = accType.type == "USER";
    if (!allow) {
      this.router.navigate(["/auth/login"]);
      return allow;
    }
    return allow;
  }
}
