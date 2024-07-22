import {Component, OnInit} from '@angular/core';
import {AuthoritiesService} from "../../common/header/components/administration/service/authorities.service";
import {Router} from "@angular/router";
import {ContratosService} from "../service/contratos.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContractorsService} from "../../common/header/components/administration/service/contractors.service";
import {Contractor} from "../../common/header/components/administration/service/contractor";
import {Authority} from "../../common/header/components/administration/service/authority";
import {NgForOf} from "@angular/common";
import {Contratos} from "../service/contratos";


@Component({
  selector: 'app-contratos-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './contratos-add.component.html',
  styleUrl: './contratos-add.component.css'
})
export class ContratosAddComponent implements OnInit {
  contractors: Contractor[] = [];
  authorities: Authority[] = [];

  constructor(private router: Router,
              private contratoService: ContratosService,
              private fb: FormBuilder,
              private authorityService: AuthoritiesService,
              private contractorService: ContractorsService) {
  }

  contractForm = this.fb.group({
    name: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    authorityId: ['', [Validators.required]],
    contractorId: ['', [Validators.required]],

  });

  ngOnInit() {
    this.getContractors();
    this.getAuthorities();
  }

  createContract() {
    this.contratoService.createContract(this.contractForm.value as unknown as Contratos).subscribe(
      (newContract: Contratos) => {
        this.contractForm.reset();
        this.router.navigate(['/home']);
      }
    )
  }

  getContractors() {
    this.contractorService.getContractors().subscribe((contractors: Contractor[]) => {
      this.contractors = contractors;
    });
  }

  getAuthorities() {
    this.authorityService.getAuthorities().subscribe((authorities: Authority[]) => {
      this.authorities = authorities;
    });
  }


}
