import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class NominationService {
  constructor(private http: _HttpClient) {}

  nominate(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.login, body).toPromise();
  }

  nextLogs(api: any, params: object) {
    let data = api.replace('http', 'https');
    return this.http.get(data, params).toPromise();
  }
  list(body: any) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.lotCollection.lots + body).toPromise();
  }
  info(id: any) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.lotCollection.items + id).toPromise();
  }
  shortList(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.lotCollection.lots, body).toPromise();
  }

  printedLot(body: any) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.lotCollection.printed + body).toPromise();
  }
  deleteNomination(id: string) {
    return this.http.delete(environment.SERVER_URL + RestApiRoutes.lotCollection.delete + id).toPromise();
  }
}
