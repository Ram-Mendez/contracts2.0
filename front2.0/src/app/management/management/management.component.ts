import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../common/footer/footer.component";
import {HeaderComponent} from "../../common/header/header.component";
import {RouterOutlet} from "@angular/router";
import {TreeModule} from "primeng/tree";
import {TreeNode} from "primeng/api";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    TreeModule,
    SidebarComponent
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }


}
