import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContratosInventoryService} from "../../service/contratos-inventory.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.css'
})
export class InventoryAddComponent implements OnInit {
  contratoId!: number;
  @Output() itemCreated = new EventEmitter<void>(); // Añade esto


  constructor(private route: ActivatedRoute,
              private contratosInventoryService: ContratosInventoryService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.parent?.params.subscribe(
      params => {
        this.contratoId = params['id'];
      }
    );
    this.inventoryForm.get('totalValue')?.disable();

  }

  inventoryForm = this.fb.group({
    itemName: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    unitPrice: ['', [Validators.required]],
    totalValue: ['', [Validators.required]],
  });

  createInventory() {
    this.contratosInventoryService.createInventory(this.contratoId, this.inventoryForm.value)
      .subscribe(() => {
        // this is a replacement for not using routes
        this.itemCreated.emit(); // Emite el evento aquí
        // this.router.navigate(['/home/contracts-edit', this.contratoId]);
      });
  }
}
