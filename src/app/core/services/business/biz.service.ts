import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class BizService {
  constructor(private http: _HttpClient) {}

  // nextLogs(api: any, params: object) {
  //   let data = api.replace('http', 'https');
  //   return this.http.get(data, params).toPromise();
  // }
  nextLogs(body: any) {
    return this.http.get(body).toPromise();
  }
  upload(body: {}) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.business.upload, body).toPromise();
  }
  shortlist(body: {}) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.business.shortlist, body).toPromise();
  }
  awardlist(id: number) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.business.awards + id).toPromise();
  }
  shortlisted() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.business.shortlisted).toPromise();
  }

  allshortlistedBiz() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.business.shortlistedList).toPromise();
  }
  approveBizForVoting(body: {}) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.business.approve, body).toPromise();
  }
  approvedBusinesslist() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.business.votelist).toPromise();
  }
  voteBiz(body: {}) {
    return this.http.put(environment.SERVER_URL + RestApiRoutes.business.vote, body).toPromise();
  }
}
