import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../common/footer/footer.component";
import {HeaderComponent} from "../../common/header/header.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TreeNode} from "primeng/api";
import {TreeModule} from "primeng/tree";
import {ScrollPanelModule} from "primeng/scrollpanel";

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    TreeModule,
    ScrollPanelModule,
    RouterLink
  ],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  data: TreeNode[] = [
    {
      label: 'Authorities',
      selectable: false,
      expanded: false,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [

        {
          label: 'List Authorities',
          icon: 'pi pi-list',
          data: {path: '/management/authorities'},
          expanded: true
        },
      ]
    },
    {
      label: 'Administrators',
      selectable: false,
      expanded: false,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [

        {
          label: 'List Administrators',
          icon: 'pi pi-list',
          data: {path: '/management/administrators'},
          expanded: true
        },
      ]
    },
    {
      label: 'Contractors',
      selectable: false,
      expanded: false,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [

        {
          label: 'List Contractors',
          icon: 'pi pi-list',
          data: {path: '/management/contractors'},
          expanded: true
        },
      ]
    },
    {
      label: 'Roles',
      selectable: false,
      expanded: false,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [

        {
          label: 'List Roles',
          icon: 'pi pi-list',
          data: {path: '/management/roles'},
          expanded: true
        },
      ]
    },
    {
      label: 'Users',
      selectable: false,
      expanded: false,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [

        {
          label: 'List Users',
          icon: 'pi pi-list',
          data: {path: '/management/users'},
          expanded: true
        },
      ]
    }
  ];
}
