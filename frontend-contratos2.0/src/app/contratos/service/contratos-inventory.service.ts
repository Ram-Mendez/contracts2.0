import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContratosInventoryService {
  contratosInventoryUrl = 'http://localhost:8080/contracts';
  inventoryUrl = 'http://localhost:8080/inventory';
  inventoryItemName = '';
  inventoryId: number = 0;
  inventoryDeleted: EventEmitter<string> = new EventEmitter();


  constructor(private http: HttpClient) {
  }

  //CRUD
  getInventory(contratoId: number) {
    return this.http.get(this.contratosInventoryUrl + '/' + contratoId + '/inventory')
  }

  //CRUD
  createInventory(contratoId: number, inventory: any) {
    return this.http.post(this.contratosInventoryUrl + '/' + contratoId + '/inventory', inventory)
  }

  //CRUD
  updateInventoryItem(contratoId: number, inventoryId: any, inventory: any) {
    return this.http.put(this.contratosInventoryUrl + '/' + contratoId + '/inventory/' + inventoryId, inventory)
  }

  //CRUD
  getInventoryItemById(inventoryId: number,): Observable<any> {
    return this.http.get(this.inventoryUrl + '/' + inventoryId)
  }

  //CRUD
  deleteInventoryItem(contratoId: number, inventoryId: number) {
    return this.http.delete(this.contratosInventoryUrl + '/' + contratoId + '/inventory/' + inventoryId);
  }


  setInventoryItemName(name: string) {
    this.inventoryItemName = name;
  }

  setInventoryId(id: number) {
    this.inventoryId = id;
  }

  emitInventoryItemDeleted() {
    this.inventoryDeleted.emit(this.inventoryItemName = '');
  }


}
