import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {ContratosService} from "../../contratos/service/contratos.service";
import {filter, Subscription} from "rxjs";
import {ContratosInventoryService} from "../../contratos/service/contratos-inventory.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userEmail = '';
  contractName = '';
  navigationSubscription!: Subscription;
  inventoryItemName = '';


  constructor(private router: Router,
              public contratosInventoryService: ContratosInventoryService,
              private contratosService: ContratosService,) {
    // Suscribirse a eventos de navegación
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkCurrentRoute();
    });
  }

  getUserEmail() {
    // Intenta obtener el email desde sessionStorage si userEmail está vacío
    this.userEmail = this.userEmail || sessionStorage.getItem('userEmail') || '';
    return this.userEmail;
  }

  ngOnInit() {
    this.getUserEmail()
    this.getContractName();
    this.resetContractNameOnUpdate();
    this.setContractNameFromStorage();
  }

  getInventoryName() {
    return this.contratosInventoryService.inventoryItemName;
  }

  getContractName() {
    this.contratosService.contractName.subscribe(
      contractName => {
        this.contractName = contractName;
      }
    );
    sessionStorage.getItem('contractName');
    sessionStorage.getItem('inventoryItemName')

  }

  public resetContractNameOnUpdate() {
    this.contratosService.resetHeader.subscribe(
      () => {
        this.contractName = '';
      }
    );
  }

  setContractNameFromStorage() {
    const storedContractName = sessionStorage.getItem('contractName');
    if (storedContractName) {
      this.contractName = storedContractName;
    }
  }

  checkCurrentRoute() {
    // Verificar la ruta actual y resetear el nombre del contrato si no es la página de edición de contratos
    const currentUrl = this.router.url;
    if (!currentUrl.includes('/home/contracts-edit')) {
      this.contractName = '';
      sessionStorage.removeItem('contractName');
    }
  }


  logout() {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('userEmail');
  }
}
