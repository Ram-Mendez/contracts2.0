import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../Login/service/login.service";
import {Router, RouterLink} from "@angular/router";
import {ContratosService} from "../../contratos/service/contratos.service";

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

  constructor(private router: Router, private contratosService: ContratosService) {
  }

  getUserEmail() {
    // Intenta obtener el email desde sessionStorage si userEmail está vacío
    this.userEmail = this.userEmail || sessionStorage.getItem('userEmail') || '';
    return this.userEmail;
  }

  ngOnInit() {
    this.getUserEmail()
    this.getContractName();
  }

  getContractName() {
    this.contratosService.contractName.subscribe(
      contractName => {
        this.contractName = contractName;
      }
    )
  }


  logout() {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('userEmail')
  }
}
