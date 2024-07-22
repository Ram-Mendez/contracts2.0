import {Component, OnInit} from '@angular/core';
import {RolesService} from "../../service/roles.service";
import {FormBuilder, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-role',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.css'
})
export class ListRoleComponent implements OnInit {

  roles: any;

  constructor(private rolesService: RolesService,
              private fb: FormBuilder) {
  }


  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe((result) => {
      this.roles = result;
    });
  }


  protected readonly IDBCursor = IDBCursor;

  isRoleSelected(role: any) {

  }

  disableRoleSelected() {

  }
}
