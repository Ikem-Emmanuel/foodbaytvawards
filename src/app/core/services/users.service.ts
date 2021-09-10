import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: _HttpClient) {}

  next(body: any) {
    let data = body.replace('http', 'https');
    return this.http.get(data).toPromise();
  }

  getList() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.users.list).toPromise();
  }

  show(id: string) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.users.show + id).toPromise();
  }

  update(body: any, id: string) {
    return this.http.put(environment.SERVER_URL + RestApiRoutes.users.update + id, body).toPromise();
  }

  create(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.users.create, body).toPromise();
  }

  delete(id: string) {
    return this.http.delete(environment.SERVER_URL + RestApiRoutes.users.delete + id).toPromise();
  }

  roles() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.role.list).toPromise();
  }
}
