import { Injectable } from "@angular/core";
import { _HttpClient } from "@delon/theme";
import { RestApiRoutes } from "../../config/routes.config";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  userInfo: any = {
    units: 0,
    amounts: 0,
    initial_amount: 0,
    paymentPlan: "Debit/Credit Card",
    billing: "Recharge",
    plan: "Result Checker",
    member_date: new Date().toString(),
  };
  constructor(private http: _HttpClient) {}

  getLocalStorageUser() {
    let result: any = localStorage.getItem("_token");
    return result ? JSON.parse(result) : {};
  }
  getUser() {
    return this.http
      .get(environment.SERVER_URL + RestApiRoutes.getCurrentUser)
      .toPromise();
  }
}
