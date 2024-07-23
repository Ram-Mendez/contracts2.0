import {Component, OnInit} from '@angular/core';
import {AuthoritiesService} from "../../authorities/authorities.service";
import {ContractorsService} from "../../contractors/service/contractors.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ContratosService} from "../service/contratos.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";

@Component({
  selector: 'app-contratos-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    ChipsModule
  ],
  templateUrl: './contratos-edit.component.html',
  styleUrl: './contratos-edit.component.css'
})
export class ContratosEditComponent implements OnInit {
  contratoId: number = 0;
  authorities: any[] = [];
  contractors: any[] = [];


  constructor(private contratoService: ContratosService,
              private router: Router,
              private messageService: MessageService,
              private contractorService: ContractorsService,
              private authorityService: AuthoritiesService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  editContractForm = this.fb.group({
    name: ['', [Validators.required]],
    endDate: [Date, [Validators.required]],
    authorityId: ['', [Validators.required]],
    contractorId: ['', [Validators.required]],
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contratoId = params['id'];
    });
    this.getAuthorities();
    this.getContractors();
    this.contratoService.getContratobyId(this.contratoId).subscribe(
      capturedContract => {
        this.editContractForm.patchValue(capturedContract);
      }
    );
  }


  updateContract() {
    if (this.editContractForm.valid) {
      this.contratoService.updateContrato(this.contratoId, this.editContractForm.value).subscribe(
        res => {
          this.messageService.add({
            severity: 'success', detail: 'Updating Contract',
            icon: 'pi pi-check'
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error => {
          this.messageService.add({
            severity: 'error', summary: 'Error Updating Contract', detail: error,
          });
        }
      );
    }
  }

  getAuthorities() {
    this.authorityService.getAuthorities().subscribe(
      res => {
        this.authorities = res;
      }
    );
  }

  getContractors() {
    this.contractorService.getContractors().subscribe(
      res => {
        this.contractors = res;
      });
  }
}
