import { Component } from '@angular/core';
import {SidebarTwoComponent} from "../../../sidebar-two/sidebar-two.component";
import {RouterOutlet} from "@angular/router";
import {SidebarThreeComponent} from "../../../sidebar-three/sidebar-three.component";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    SidebarTwoComponent,
    RouterOutlet,
    SidebarThreeComponent
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {

}
