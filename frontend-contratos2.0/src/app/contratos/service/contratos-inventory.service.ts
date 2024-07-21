import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContratosInventoryService {
  contratosInventoryUrl = 'http://localhost:8080/contracts';
  inventoryItemName = '';

  constructor(private http: HttpClient) {
  }

  createInventory(contratoId: number, inventory: any) {
    return this.http.post(this.contratosInventoryUrl + '/' + contratoId + '/inventory', inventory)
  }

  getInventory(contratoId: number) {
    return this.http.get(this.contratosInventoryUrl + '/' + contratoId + '/inventory')
  }


  setInventoryItemName(name: string) {
    this.inventoryItemName = name;
  }


}
