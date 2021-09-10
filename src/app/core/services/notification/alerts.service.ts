import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private http: _HttpClient) { }

  nextList(body: any){
    return this.http.get(body).toPromise();
  }
  
  list(){
    return this.http.get(environment.SERVER_URL+RestApiRoutes.notification.alert.list).toPromise();
  }

}
