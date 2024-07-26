import {Component, OnInit} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {LoginService} from "../../login/login/service/login.service";
import {Button} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userEmail = '';

  constructor(private loginService: LoginService, private router: Router) {
  }

  items: MenuItem[] | undefined;

  getUserEmail() {
    return this.userEmail = this.loginService.getEmailForUserLogged();

  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        label: 'Management',
        icon: 'pi pi-cog',
        routerLink: '/management',
      },
    ];
    this.getUserEmail();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
