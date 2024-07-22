import {Component, OnInit} from '@angular/core';
import {InventoryAddComponent} from "../contratos-inventory/inventory-add/inventory-add.component";
import {InventoryEditComponent} from "../contratos-inventory/inventory-edit/inventory-edit.component";
import {InventoryListComponent} from "../contratos-inventory/inventory-list/inventory-list.component";
import {NgIf} from "@angular/common";
import {FileAddComponent} from "./file-add/file-add.component";
import {FileListComponent} from "./file-list/file-list.component";

@Component({
  selector: 'app-contratos-file-manager',
  standalone: true,
  imports: [
    InventoryAddComponent,
    InventoryEditComponent,
    InventoryListComponent,
    NgIf,
    FileAddComponent,
    FileListComponent
  ],
  templateUrl: './contratos-file-manager.component.html',
  styleUrl: './contratos-file-manager.component.css'
})
export class ContratosFileManagerComponent implements OnInit {
  showAddFileComponent = false;
  showFileListComponent = false;

  constructor() {
  }

  ngOnInit() {
  }

  addFile() {
    this.showFileListComponent = false;
    this.showAddFileComponent = true;
  }

  showFiles() {
    this.showFileListComponent = true;
    this.showAddFileComponent = false;
  }
}
