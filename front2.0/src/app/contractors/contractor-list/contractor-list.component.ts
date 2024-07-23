import {Component, OnInit} from '@angular/core';
import {ContractorsService} from "../service/contractors.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contractor-list',
  standalone: true,
  imports: [],
  templateUrl: './contractor-list.component.html',
  styleUrl: './contractor-list.component.css'
})
export class ContractorListComponent implements OnInit {
  contractors: any;

  constructor(private contractorsService: ContractorsService, private router: Router) {
  }

  ngOnInit() {
    this.getContractors();
  }

  getContractors() {
    this.contractorsService.getContractors().subscribe(
      res => {
        this.contractors = res;
      },
      err => {
        console.log(err);
      }
    );

  }

  editContractor() {
  }

  deleteContractor() {
  }

  onRowSelect(event: any) {
  }

  onRowUnselect(event: any) {
  }

}
