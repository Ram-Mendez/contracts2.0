import {Component, OnInit} from '@angular/core';
import {ContratosService} from "../service/contratos.service";
import {Contratos} from "../service/contratos";
import {DatePipe, NgForOf} from "@angular/common";
import {SidebarComponent} from "../../common/sidebar/sidebar.component";
import {Router, RouterOutlet} from "@angular/router";
import {Subject} from "rxjs";
import {HeaderComponent} from "../../common/header/header.component";

@Component({
  selector: 'app-contratos-list',
  standalone: true,
  imports: [
    DatePipe,
    SidebarComponent,
    RouterOutlet,
    NgForOf
  ],
  templateUrl: './contratos-list.component.html',
  styleUrl: './contratos-list.component.css'
})
export class ContratosListComponent implements OnInit {
  contratos!: Contratos[];
  id: number = 0;
  contractSelected = false;


  constructor(private contratoService: ContratosService, private router: Router) {
  }

  ngOnInit() {
    this.getContratos();
  }

  getContratos() {
    this.contratoService.getContratos().subscribe(
      contratos => {
        this.contratos = contratos;
      }
    )
  }

  setContractName(name: string) {
    this.contratoService.contractName.next(name);
    sessionStorage.setItem('contractName', name);

  }


  editContract() {
    this.router.navigate(['/home/contracts-edit', this.id]); // Corregido para usar un arreglo

  }

  isContractSelected(contract: Contratos) {
    this.contractSelected = true;
    this.id = contract.id; // Asegúrate de que el contrato tenga un campo id
    this.setContractName(contract.name);
  }

  disableContractSelected() {
    this.contractSelected = false;
    this.setContractName('');
  }

  createContract() {
    this.router.navigate(['/home/contracts-add']); // Redirige a /home/contracts-add
  }

  deleteContract() {
    this.contratoService.deteleContract(this.id).subscribe(() => {
      this.getContratos();
    });
  }


}
