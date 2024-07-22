import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContratosInventoryService} from "../../service/contratos-inventory.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.css'
})
export class InventoryEditComponent implements OnInit {
  contratoId: number = 0;
  inventoryItemId: number = 0;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private contratosInventoryService: ContratosInventoryService,
              private fb: FormBuilder) {
  }

  editInventoryItem = this.fb.group({
    itemName: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    unitPrice: ['', [Validators.required]],
  });


  ngOnInit() {
    this.route.parent?.params.subscribe(
      params => {
        this.contratoId = params['id'];
        console.log(this.contratoId, " esto parece el contrato id")
      }
    );
    this.getInventoryItem();
  }

  getInventoryItem() {
    this.inventoryItemId = this.contratosInventoryService.inventoryId;
    this.contratosInventoryService.getInventoryItemById(this.inventoryItemId).subscribe(
      inventoryItem => {
        this.editInventoryItem.setValue({
          itemName: inventoryItem.itemName,
          quantity: inventoryItem.quantity,
          unitPrice: inventoryItem.unitPrice
        })
      }
    )
  }

  editItem() {
    this.contratosInventoryService.updateInventoryItem(this.contratoId, this.inventoryItemId, this.editInventoryItem.value)
      .subscribe(() => {
        // Correct the path and complete the navigate method call
        this.router.navigate(['/home/contracts-edit', this.contratoId]);
      });
  }
}
