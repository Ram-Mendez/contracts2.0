import {Component, OnInit} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {LoginService} from "../../Login/service/login.service";
import {ButtonDirective} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  userEmail = '';

  constructor(private loginService: LoginService, private router: Router) {
  }

  getUserEmail() {
    // Intenta obtener el email desde sessionStorage si userEmail está vacío
    this.userEmail = this.userEmail || sessionStorage.getItem('userEmail') || '';
    return this.userEmail;
  }

  ngOnInit() {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Administration',
        icon: 'pi pi-cog'
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact-us'
      }
    ];

  }


  logout() {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('userEmail')
  }
}
