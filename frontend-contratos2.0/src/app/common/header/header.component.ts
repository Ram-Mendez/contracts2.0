import {Component, OnInit} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

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
}
