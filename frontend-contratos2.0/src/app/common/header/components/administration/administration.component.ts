import { Component } from '@angular/core';
import {SidebarTwoComponent} from "../../../sidebar-two/sidebar-two.component";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    SidebarTwoComponent
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {

}
