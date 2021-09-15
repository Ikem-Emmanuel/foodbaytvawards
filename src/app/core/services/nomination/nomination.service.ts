import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class NominationService {
  constructor(private http: _HttpClient) {}

  nextLogs(api: any, params: object) {
    let data = api.replace('http', 'https');
    return this.http.get(data, params).toPromise();
  }
  nominate(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.nomination.applicaiton, body).toPromise();
  }
  list() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.nomination.list).toPromise();
  }
  info(id: any) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.nomination.list + id).toPromise();
  }
  shortList(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.nomination.shortlist, body).toPromise();
  }
}
