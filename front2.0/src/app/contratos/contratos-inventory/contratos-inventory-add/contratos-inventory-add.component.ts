import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeTemplate, TreeNode} from "primeng/api";
import {TreeModule} from "primeng/tree";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ContratosInventoryService} from "../../service/contratos-inventory.service";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-contratos-inventory-add',
  standalone: true,
  imports: [
    PrimeTemplate,
    TreeModule,
    RouterLink,
    Button,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './contratos-inventory-add.component.html',
  styleUrl: './contratos-inventory-add.component.css'
})
export class ContratosInventoryAddComponent implements OnInit {
  contratoId: number = 0;
  data: TreeNode[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private contratosInventoryService: ContratosInventoryService,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  inventoryForm = this.fb.group({
    itemName: ['', Validators.required],
    quantity: ['', Validators.required],
    unitPrice: ['', Validators.required],
  });


  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.contratoId = params['id'];
        this.initializeTreeNode();
      }
    )
  }

  initializeTreeNode() {
    this.data = [
      {
        label: 'Inventory',
        selectable: true,
        expanded: false,
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        data: {path: `/home/contracts-inventory/${this.contratoId}`},
      },
      {
        label: 'Files',
        selectable: true,
        expanded: false,
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        data: {path: `/home/contracts-files/${this.contratoId}`},

      },
    ];
  }

  createItem() {
    this.contratosInventoryService.createItem(this.contratoId, this.inventoryForm.value).subscribe(
      response => {
        this.messageService.add({severity: 'success', detail: 'Item created successfully'});
        this.router.navigate([`/home/edit-contract/${this.contratoId}/inventory`]);
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error creating item'});
      }
    )
  }
}
