import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeTemplate, TreeNode} from "primeng/api";
import {TreeModule} from "primeng/tree";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ContratosInventoryService} from "../../service/contratos-inventory.service";
import {ContratosService} from "../../service/contratos.service";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-contratos-inventory-edit',
  standalone: true,
  imports: [
    PrimeTemplate,
    TreeModule,
    RouterLink,
    Button,
    TableModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './contratos-inventory-edit.component.html',
  styleUrl: './contratos-inventory-edit.component.css'
})
export class ContratosInventoryEditComponent implements OnInit {
  contratoId: number = 0;
  itemId: number = 0;
  data: TreeNode[] = [];

  constructor(private route: ActivatedRoute,
              private contratosInventoryService: ContratosInventoryService,
              private messageService: MessageService,
              private router: Router,
              private fb: FormBuilder) {
  }

  editInventoryForm = this.fb.group({
    itemName: ['', Validators.required],
    quantity: ['', Validators.required],
    unitPrice: ['', Validators.required],
  });


  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.itemId = params['id'];
        this.contratoId = params['contractId'];
        console.log(this.contratoId, "id del contrato")
        console.log(this.itemId, "id del item")


        this.initializeTreeNode();
        this.getItemById();
      }
    )
  }


  getItemById() {
    this.contratosInventoryService.getItemById(this.itemId).subscribe(
      item => {
        this.editInventoryForm.setValue({
          itemName: item.itemName,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })
      }
    )
  }

  updateItem() {
    if (this.editInventoryForm.valid) {
      this.contratosInventoryService.updateItem(this.contratoId, this.itemId, this.editInventoryForm.value).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Item updated successfully'
          });
          this.router.navigate([`/home/edit-contract/${this.contratoId}/inventory`])
        }
      )

    }
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
}
