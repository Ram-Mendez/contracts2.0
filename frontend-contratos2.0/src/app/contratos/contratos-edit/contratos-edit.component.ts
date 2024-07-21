import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ContratosService} from '../service/contratos.service';
import {SidebarComponent} from "../../common/sidebar/sidebar.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Contratos} from "../service/contratos";
import {Authority} from "../service/authority";
import {Contractor} from "../service/contractor";
import {AuthoritiesService} from "../service/authorities.service";
import {ContractorsService} from "../service/contractors.service";
import {NgForOf, NgIf} from "@angular/common";
import {ContratosInventoryComponent} from "../contratos-inventory/contratos-inventory.component";
import {Subject} from "rxjs";

@Component({
  selector: 'app-contratos-edit',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    ReactiveFormsModule,
    NgForOf,
    ContratosInventoryComponent,
    NgIf
  ],
  templateUrl: './contratos-edit.component.html',
  styleUrl: './contratos-edit.component.css'
})
export class ContratosEditComponent implements OnInit {
  contract!: Contratos | undefined;
  contractId: number = 0;
  authorities: Authority[] = [];
  contractors: Contractor[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contratoService: ContratosService,
              private fb: FormBuilder,
              private authorityService: AuthoritiesService,
              private contractorService: ContractorsService) {
  }

  contractForm = this.fb.group({
    name: ['', [Validators.required]],
    authorityId: [0, [Validators.required]],
    contractorId: [0, [Validators.required]],

  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractId = params['id'];
    });
    this.contratoService.contractId.next(this.contractId);
    this.getContract();
    this.getAuthorities();
    this.getContractors()
  }

  getContract() {
    this.contratoService.getContractById(this.contractId).subscribe(contract => {
      this.contract = contract;
      this.contractForm.patchValue({
        name: this.contract.name,
        // Asumiendo que authority y contractor son objetos y tienen una propiedad id
        authorityId: this.contract.authority.id,
        contractorId: this.contract.contractor.id
      });
    });
  }

  getAuthorities() {
    this.authorityService.getAuthorities().subscribe(
      authorities => {
        this.authorities = authorities;
      }
    );
  }

  getContractors() {
    this.contractorService.getContractors().subscribe(
      contractors => {
        this.contractors = contractors
      })
  }

  updateContract() {
    const formValue = this.contractForm.value;
    if (this.contractForm.valid) {
      console.log(formValue);
      this.contratoService.updateContract(this.contractId, formValue).subscribe(
        (response) => {
          console.log(response);
          this.contratoService.resetHeader.next(); // Resetea el header después de la actualización

          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Failed to update contract.');
        });
    }
  }

  isInventoryTabSelected(): boolean {
    return this.router.url.includes('/inventory');
  }

}
