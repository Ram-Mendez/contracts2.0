import {Component, Input, OnInit} from '@angular/core';
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
  inventoryId: number = 0;

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
        this.inventoryId = params['id'];
      }
    );
  }


  editItem() {

  }
}
