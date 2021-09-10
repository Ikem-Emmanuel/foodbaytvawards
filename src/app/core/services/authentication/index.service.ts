import { Injectable } from "@angular/core";
import { RestApiRoutes } from "src/app/core/config/routes.config";
import { environment } from "@env/environment";
import { _HttpClient } from "@delon/theme";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: _HttpClient) {}

  login(body: any) {
    return this.http
      .post(environment.SERVER_URL + RestApiRoutes.login, body)
      .toPromise();
  }

  register(body: any) {
    return this.http
      .post(environment.SERVER_URL + RestApiRoutes.register, body)
      .toPromise();
  }

  verificationCode(body: any) {
    return this.http
      .post(environment.SERVER_URL + RestApiRoutes.verify, body)
      .toPromise();
  }
  reverificationCode(body: any) {
    return this.http
      .post(environment.SERVER_URL + RestApiRoutes.reverify, body)
      .toPromise();
  }

  forgotPassword(body: any) {
    return this.http
      .post(environment.SERVER_URL + RestApiRoutes.forgotPassword, body)
      .toPromise();
  }

  logout() {
    return this.http
      .delete(environment.SERVER_URL + RestApiRoutes.logout)
      .toPromise();
  }
}
