import { Injectable } from '@angular/core';
import { RestApiRoutes } from 'src/app/core/config/routes.config';
import { environment } from '@env/environment';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: _HttpClient) {}

  nextLogs(api: any, params: object) {
    let data = api.replace('http', 'https');
    return this.http.get(data, params).toPromise();
  }

  nextClientLogs(url: string, params?: object) {
    let data = url.replace('http', 'https');
    return this.http.get(data, params).toPromise();
  }
  getLot(body: any) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.lotCollection.lots + body).toPromise();
  }
  getlotItem(id: any) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.lotCollection.items + id).toPromise();
  }
  createLot(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.lotCollection.lots, body).toPromise();
  }

  exportLot(body: any) {
    return this.http
      .get(environment.SERVER_URL + RestApiRoutes.lotCollection.export + body, null, {
        responseType: 'blob',
      })
      .toPromise();
  }

  printedLot(body: any) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.lotCollection.printed + body).toPromise();
  }
  deleteLot(id: string) {
    return this.http.delete(environment.SERVER_URL + RestApiRoutes.lotCollection.delete + id).toPromise();
  }
  getBatch() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.batchColloection.batch).toPromise();
  }
  createBatch(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.batchColloection.batch, body).toPromise();
  }
  batchPromo(body: any, id: string) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.batchColloection.addPromo + id, body).toPromise();
  }

  showBatch(id: string) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.batchColloection.deleteEdit + id).toPromise();
  }
  deleteBatch(id: string) {
    return this.http.delete(environment.SERVER_URL + RestApiRoutes.batchColloection.deleteEdit + id).toPromise();
  }

  getProduct() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.productCollection.product).toPromise();
  }
  createProduct(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.productCollection.product, body).toPromise();
  }
  showProduct(id: string) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.productCollection.updateEdit + id).toPromise();
  }
  updateProduct(body: any, id: string) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.productCollection.updateEdit + id, body).toPromise();
  }
  deleteProduct(id: string) {
    return this.http.delete(environment.SERVER_URL + RestApiRoutes.productCollection.updateEdit + id).toPromise();
  }
  getPromo() {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.promoCollection.promoCreate).toPromise();
  }
  createPromo(body: any) {
    return this.http.post(environment.SERVER_URL + RestApiRoutes.promoCollection.promoCreate, body).toPromise();
  }
  showPromo(id: string) {
    return this.http.get(environment.SERVER_URL + RestApiRoutes.promoCollection.promoShow + id).toPromise();
  }
  updatePromo(body: any, id: string) {
    return this.http.put(environment.SERVER_URL + RestApiRoutes.promoCollection.promoShow + id, body).toPromise();
  }

  deletePromo(id: string) {
    return this.http.delete(environment.SERVER_URL + RestApiRoutes.promoCollection.promoShow + id).toPromise();
  }
}
