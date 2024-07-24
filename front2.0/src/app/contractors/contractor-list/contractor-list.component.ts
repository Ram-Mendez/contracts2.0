import {Component, OnInit} from '@angular/core';
import {ContractorsService} from "../service/contractors.service";
import {Router} from "@angular/router";
import {Button} from "primeng/button";
import {DatePipe} from "@angular/common";
import {MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-contractor-list',
  standalone: true,
  imports: [
    Button,
    DatePipe,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './contractor-list.component.html',
  styleUrl: './contractor-list.component.css'
})
export class ContractorListComponent implements OnInit {
  contractors: any;
  contractorSelected = 0;
  isContractorSelected: boolean = false;

  constructor(private contractorsService: ContractorsService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getContractors();
  }

  getContractors() {
    this.contractorsService.getContractors().subscribe(
      contractors => {
        this.contractors = contractors;
        console.log(this.contractors)
      },
      err => {
        console.log(err);
      }
    );

  }

  addContractor() {
    this.router.navigate(['/management/add-contractor']);
  }

  editContractor() {
    this.router.navigate(['/management/edit-contractor', this.contractorSelected]);
  }

  deleteContractor() {
    this.contractorsService.deleteContractor(this.contractorSelected).subscribe(
      res => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Contractor deleted successfully'});
        this.getContractors();
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error deleting contractor'});
      }
    );

  }

  onRowSelect(event: any) {
    this.isContractorSelected = true;
    this.contractorSelected = event.data.id;
  }

  onRowUnselect(event: any) {
    this.isContractorSelected = false;
    this.contractorSelected = event.data.id;
  }
}
