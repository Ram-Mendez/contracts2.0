import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ContratosInventoryService} from "../../service/contratos-inventory.service";
import {ContratosService} from "../../service/contratos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Contratos} from "../../service/contratos";

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit {
  contratoId: any;
  allInventory: any;
  itemSelected = false;
  inventoryId!: number;
  @Output() inventorySelected = new EventEmitter<number>();
  @Output() editInventory = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private contratoService: ContratosService,
    private contratosInventoryService: ContratosInventoryService,) {
  }

  ngOnInit() {
    this.route.parent?.params.subscribe(
      params => {
        this.contratoId = params['id'];
      }
    );
    this.getAllInventory();
  }


  getAllInventory() {
    this.contratosInventoryService.getInventory(this.contratoId)
      .subscribe(inventory => {
        this.allInventory = inventory;
      });
  }

  isItemSelected(inventory: any) {
    this.itemSelected = true;
    this.inventoryId = inventory.id;
    this.inventorySelected.emit(inventory.id);
    this.contratosInventoryService.setInventoryItemName(inventory.itemName);
    this.contratosInventoryService.setInventoryId(inventory.id); // Establecer el id en el servicio
  }

  disableInventorySelected() {
    this.itemSelected = false;
  }

  loadInventoryEdit(inventory: any) {
    const inventoryItem = this.allInventory.find((item: any) => item.id === inventory.id)
    if (inventoryItem) {
      this.contratosInventoryService.setInventoryItemName(inventoryItem.itemName)
    }
    this.editInventory.emit(inventory.id);  // Emitir el ID del inventario para la edición
  }

  deleteInventoryItem(inventoryId: number) {
    this.contratosInventoryService.deleteInventoryItem(this.contratoId, this.inventoryId)
      .subscribe(() => {
        this.getAllInventory();
        this.disableInventorySelected();
        this.contratosInventoryService.emitInventoryItemDeleted();
      });
  }


  // below is an interesting code to be analyzed
  // onInventoryChange(event
  //                         :
  //                     any
  // ) {
  //   const selectedId = event.target.value;
  //   const selectedInventory = this.allInventory.find((inventory: any) => inventory.id == selectedId);
  //   const exchangeRateToEuro = 1.2; // Suponiendo 1.2 como la tasa de cambio de la moneda original a euros. Este valor debe ser actualizado con la tasa de cambio real.
  //
  //   if (selectedInventory) {
  //     const totalValueInEuros = (selectedInventory.quantity * selectedInventory.unitPrice) * exchangeRateToEuro;
  //     this.inventoryForm.patchValue({
  //       quantity: selectedInventory.quantity,
  //       unitPrice: selectedInventory.unitPrice,
  //       totalValue: totalValueInEuros.toString() // Valor convertido a euros
  //     });
  //
  //   }
  // }
}
