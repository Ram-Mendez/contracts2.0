import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {ContratosService} from "../service/contratos.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ContractorsService} from "../../contractors/service/contractors.service";
import {AuthoritiesService} from "../../authorities/authorities.service";

@Component({
  selector: 'app-contratos-add',
  standalone: true,
  imports: [
    FormsModule,
    ChipsModule,
    CalendarModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './contratos-add.component.html',
  styleUrl: './contratos-add.component.css'
})
export class ContratosAddComponent implements OnInit {
  authorities: any[] = [];
  contractors: any[] = [];

  constructor(private fb: FormBuilder,
              private contratoService: ContratosService,
              private router: Router,
              private messageService: MessageService,
              private contractorService: ContractorsService,
              private authorityService: AuthoritiesService) {
  }

  createContratoForm = this.fb.group({
    name: ['', [Validators.required]],
    startDate: [Date, [Validators.required]],
    endDate: [Date, [Validators.required]],
    authorityId: ['', [Validators.required]],
    contractorId: ['', [Validators.required]],
  });

  ngOnInit() {
    this.getAuthorities();
    this.getContractors();
  }

  createContrato() {
    if (this.createContratoForm.valid) {
      this.contratoService.createContrato(this.createContratoForm.value).subscribe(
        contrato => {
          this.messageService.add({
            severity: 'success', detail: 'Creating Contract',
            icon: 'pi pi-check'
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        err => {
          this.messageService.add({
            severity: 'error',  detail: 'There was a problem creating the contract.'
          });
        });
    }
  }

  getAuthorities() {
    this.authorityService.getAuthorities().subscribe(
      data => {
        this.authorities = data;
      }
    );
  }

  getContractors() {
    this.contractorService.getContractors().subscribe(
      data => {
        console.log(data);
        this.contractors = data;
      }
    );
  }
}
