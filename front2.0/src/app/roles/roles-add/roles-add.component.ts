import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RolesService} from "../service/roles.service";

@Component({
  selector: 'app-roles-add',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './roles-add.component.html',
  styleUrl: './roles-add.component.css'
})
export class RolesAddComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private rolesService: RolesService) {
  }

  ngOnInit() {
  }

  roleForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  createRole() {
    this.rolesService.createRole(this.roleForm.value).subscribe(
      res => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Role created successfully'});
        this.router.navigate(['/management/roles']);
      },
      err => {
        console.log(err);
      });
  }
}
