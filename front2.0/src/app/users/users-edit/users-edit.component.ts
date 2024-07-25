import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../service/users.service";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {RolesService} from "../../roles/service/roles.service";
import {Roles} from "../service/roles";
import {User} from "../service/user";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {
  userId: any;
  roles: { id: number, name: string, description: string }[] = [];


  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UsersService,
              private fb: FormBuilder,
              private rolesService: RolesService,
              private messageService: MessageService) {
  }

  userEditForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    roles: [[], Validators.required]
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserById();
    });
    this.getRoles();
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe(
      (user: any) => {
        console.log(user);
        this.userEditForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          roles: user.roles?.name
        });
      },
      err => {
        console.log(err);
      });
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userEditForm.value as User).subscribe(
      res => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          detail: 'User updated',
          icon: 'pi pi-check'
        });
        setTimeout(() => {
          this.router.navigate(['/management/users']);
        }, 1500);
      },
      err => {
        console.log(err);
      });
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      roles => {
        console.log(roles)
        this.roles = roles;
      },
      err => {
        console.log(err);
      });
  }
}
