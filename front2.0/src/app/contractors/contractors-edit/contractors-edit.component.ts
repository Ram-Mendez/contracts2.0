import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractorsService} from "../service/contractors.service";

@Component({
  selector: 'app-contractors-edit',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './contractors-edit.component.html',
  styleUrl: './contractors-edit.component.css'
})
export class ContractorsEditComponent implements OnInit {
  contractorId: number = 0;

  constructor(private fb: FormBuilder,
              private contractorService: ContractorsService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractorId = params['id'];
    });
    this.getContractorById();
  }

  status = [
    {label: 'ACTIVE', value: 'ACTIVE'},
    {label: 'INACTIVE', value: 'INACTIVE'}
  ];

  editContractor = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    company: ['', Validators.required],
    status: ['', Validators.required],
  });

  getContractorById() {
    this.contractorService.getContractorById(this.contractorId).subscribe(
      contractor => {
        this.editContractor.patchValue(contractor);
      },
      err => {
        console.log(err);
      });
  }


  updateContractor() {
    this.contractorService.updateContractor(this.contractorId, this.editContractor.value).subscribe(
      response => {
        this.messageService.add({severity: 'success', detail: 'Contractor updated successfully'});
        this.router.navigate(['/management/contractors']);
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error updating contractor'});
        console.error(error)
      }
    );
  }
}
