import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {InventoryAddComponent} from "./inventory-add/inventory-add.component";
import {InventoryListComponent} from "./inventory-list/inventory-list.component";
import {InventoryEditComponent} from "./inventory-edit/inventory-edit.component";
import {ContratosInventoryService} from "../service/contratos-inventory.service";

@Component({
  selector: 'app-contratos-inventory',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    InventoryAddComponent,
    InventoryListComponent,
    InventoryEditComponent
  ],
  templateUrl: './contratos-inventory.component.html',
  styleUrls: ['./contratos-inventory.component.css']
})
export class ContratosInventoryComponent implements OnInit {
  contratoId: any;
  showAddInventoryComponent = false;
  showInventoryListComponent = false;
  showInventoryEditComponent = false;

  constructor(
    private route: ActivatedRoute,
    private contratosInventoryService: ContratosInventoryService
  ) {
  }

  ngOnInit() {
    this.route.parent?.params.subscribe(
      params => {
        this.contratoId = params['id'];
      }
    );
  }

  addNewItem() {
    this.showInventoryListComponent = false;
    this.showAddInventoryComponent = true;
    this.showInventoryEditComponent = false;
    this.contratosInventoryService.setInventoryItemName('');
  }

  showList() {
    this.showInventoryListComponent = true;
    this.showAddInventoryComponent = false;
    this.showInventoryEditComponent = false;
  }

  ontItemCreated() {
    this.showList();
  }

  loadEditInventory() {
    this.showAddInventoryComponent = false;
    this.showInventoryListComponent = false;
    this.showInventoryEditComponent = true;
  }

}
