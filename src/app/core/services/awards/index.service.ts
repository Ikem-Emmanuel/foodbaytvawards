import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  constructor(private http: _HttpClient) {}

  nextLogs(api: any, params: object) {
    let data = api.replace('http', 'https');
    return this.http.get(data, params).toPromise();
  }
  next(body: any) {
    let data = body.replace('http', 'https');
    return this.http.get(data).toPromise();
  }
  create(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.awards.create, body).toPromise();
  }
  awardData() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.awards.data).toPromise();
  }
  list() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.awards.awardlist).toPromise();
  }
}
