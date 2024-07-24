import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {RolesService} from "../service/roles.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  roles: any;
  roleSelected = 0;
  isRoleSelected: boolean = false;

  constructor(private router: Router,
              private messageService: MessageService,
              private rolesService: RolesService) {
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      },
      err => {
        console.log(err);
      }
    );
  }

  addRole() {
    this.router.navigate(['/management/roles-add']);
  }

  deleteRole() {
    this.rolesService.deleteRoleById(this.roleSelected).subscribe(
      res => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Role deleted successfully'});
        this.getRoles();
      },
      err => {
        console.log(err);
      }
    );
  }

  onRowSelect(event: any) {
    this.isRoleSelected = true;
    this.roleSelected = event.data.id;
  }

  onRowUnselect(event: any) {
    this.isRoleSelected = false;
    this.roleSelected = event.data.id;

  }
}
