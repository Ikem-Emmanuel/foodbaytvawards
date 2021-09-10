import { Injectable } from "@angular/core";
import { RestApiRoutes } from "src/app/core/config/routes.config";
import { environment } from "@env/environment";
import { _HttpClient } from "@delon/theme";

@Injectable({
  providedIn: "root",
})
export class UserManagementPasswordService {
  constructor(private http: _HttpClient) {}

  resetPassword(body: any) {
    return this.http
      .post(environment.SERVER_URL + RestApiRoutes.password.initiateReset, body)
      .toPromise();
  }

  activateAccountPassword(body: any) {
    return this.http
      .post(environment.SERVER_URL + RestApiRoutes.password.confirmReset, body)
      .toPromise();
  }

  findToken(id: string) {
    return this.http
      .get(
        environment.SERVER_URL +
          RestApiRoutes.password.findToken +
          id +
          "?_allow_anonymous=true"
      )
      .toPromise();
  }
}
