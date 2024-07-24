import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ContractorsService} from "../service/contractors.service";

@Component({
  selector: 'app-contractors-add',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './contractors-add.component.html',
  styleUrl: './contractors-add.component.css'
})
export class ContractorsAddComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private contractorsService: ContractorsService,) {
  }

  ngOnInit() {
  }

  contractorForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    company: ['', Validators.required],
    status: ['INACTIVE', Validators.required] // Set a default value
  });

  status = [
    {label: 'ACTIVE', value: 'ACTIVE'},
    {label: 'INACTIVE', value: 'INACTIVE'}
  ];

  createContractor() {

    this.contractorsService.createContractor(this.contractorForm.value).subscribe(
      response => {
        this.messageService.add({severity: 'success', detail: 'Contractor created successfully'});
        this.router.navigate(['/management/contractors']);
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error creating contractor'});
        console.error(error)
      }
    );
  }
}
