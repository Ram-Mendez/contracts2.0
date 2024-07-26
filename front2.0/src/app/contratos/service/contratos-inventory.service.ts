import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContratosInventoryService {
  inventoryUrl = 'http://localhost:8080/contracts-inventory';
  singleItemUrl = 'http://localhost:8080/inventory/';

  constructor(private http: HttpClient) {
  }

  getItems(id: number): Observable<any> {
    return this.http.get(this.inventoryUrl + '/' + id);
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get(this.singleItemUrl + itemId);
  }

  createItem(contratoId: number, item: any): Observable<any> {
    return this.http.post(this.inventoryUrl + '/' + contratoId, item);
  }

  updateItem(contratoId: number,itemId: number, item: any): Observable<any> {
    return this.http.put(this.inventoryUrl + '/' + contratoId + '/inventory' + itemId, item)
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(this.singleItemUrl + itemId);
  }

}
