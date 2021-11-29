import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: _HttpClient) {}

  nextLogs(api: any, params: object) {
    let data = api.replace('http', 'https');
    return this.http.get(data, params).toPromise();
  }

  list()
  {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.locations.list).toPromise();
  }
}
