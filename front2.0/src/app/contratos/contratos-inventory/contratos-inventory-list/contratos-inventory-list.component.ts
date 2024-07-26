import {Component, OnInit} from '@angular/core';
import {TreeModule} from "primeng/tree";
import {MessageService, TreeNode} from "primeng/api";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ContratosService} from "../../service/contratos.service";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {ContratosInventoryService} from "../../service/contratos-inventory.service";

@Component({
  selector: 'app-contract-inventory',
  standalone: true,
  imports: [
    TreeModule,
    RouterLink,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    Button,
    TableModule
  ],
  templateUrl: './contratos-inventory-list.component.html',
  styleUrl: './contratos-inventory-list.component.css'
})

export class ContratosInventoryListComponent implements OnInit {
  contratoId: number = 0;
  data: TreeNode[] = [];
  isItemSelected: boolean = false;
  itemSelected: any
  items: any;

  constructor(private route: ActivatedRoute,
              private contratoInventoryService: ContratosInventoryService,
              private contratosService: ContratosService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.contratoId = params['id'];
        this.initializeTreeNode();
        this.getItems();
      }
    )
  }

  getItems() {
    this.contratoInventoryService.getItems(this.contratoId).subscribe(
      items => {
        this.items = items
      });
  }

  initializeTreeNode() {
    this.data = [
      {
        label: 'Inventory',
        selectable: true,
        expanded: false,
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        data: {path: `/home/edit-contract/${this.contratoId}/inventory`},
      },
      {
        label: 'Files',
        selectable: true,
        expanded: false,
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        data: {path: `/home/edit-contract//${this.contratoId}/files`},

      },
    ];
  }

  addItem() {
    this.router.navigate([`/home/edit-contract/${this.contratoId}/inventory/add-item`]);
  }

  editItem() {
    this.router.navigate([`/home/edit-contract/${this.contratoId}/inventory/${this.itemSelected}/edit-item`]);


  }

  deleteItem() {
    this.contratoInventoryService.deleteItem(this.itemSelected).subscribe(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            detail: 'Item deleted successfully'
          });
        this.getItems();
      }
    )
  }

  onRowSelect($event: any) {
    this.isItemSelected = true;
    this.itemSelected = $event.data.id;
  }

  onRowUnselect($event: any) {
    this.isItemSelected = false;
    this.itemSelected = null;
  }
}
