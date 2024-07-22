import {Component, OnInit} from '@angular/core';
import {AddRoleComponent} from "./add-role/add-role.component";
import {NgIf} from "@angular/common";
import {ListRoleComponent} from "./list-role/list-role.component";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    AddRoleComponent,
    NgIf,
    ListRoleComponent
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  showAddRole: boolean = false;
  showListRoles: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  showAddRoleComponent() {
    this.showAddRole = true;
    this.showListRoles = false;
  }

  showListRolesComponent() {
    this.showAddRole = false;
    this.showListRoles = true;
  }

  onRoleCreateD() {
    this.showListRolesComponent();
  }
}
