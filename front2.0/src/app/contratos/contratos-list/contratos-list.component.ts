import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {TableModule, TableRowSelectEvent, TableRowUnSelectEvent} from "primeng/table";
import {ContratosService} from "../service/contratos.service";
import {DatePipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-contratos-list',
  standalone: true,
  imports: [
    Button,
    TableModule,
    DatePipe,
    NgForOf
  ],
  templateUrl: './contratos-list.component.html',
  styleUrl: './contratos-list.component.css'
})
export class ContratosListComponent implements OnInit {
  contratos: any;
  selectedContrato: any;
  isContratoSelected: boolean = true;


  constructor(private contratosService: ContratosService,
              private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getContratos();
  }

  getContratos() {
    this.contratosService.getContratos().subscribe(
      contratos => {
        this.contratos = contratos;
      },
      err => {
        console.log(err);
      }
    );
  }

  addContrato() {
    this.router.navigate(['/home/add-contract']);
  }

  editContrato() {
    this.router.navigate(['/home/edit-contract', this.selectedContrato]);
  }

  deleteContrato() {
    this.contratosService.deleteContrato(this.selectedContrato).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Contract deleted successfully.',
          icon: 'pi pi-check'
        });
        this.getContratos();
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was a problem deleting the contract.'
        });
      }
    );
  }

  onRowSelect(event: any) {
    this.selectedContrato = event.data.id;
    this.isContratoSelected = false;
  }

  onRowUnselect(event: any) {
    this.selectedContrato = null;
    this.isContratoSelected = true;
  }
}
