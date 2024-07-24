import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RolesService} from "../../roles/service/roles.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UsersService} from "../service/users.service";
import {LoginService} from "../../login/login/service/login.service";
import {MultiSelectModule} from "primeng/multiselect";
import {User} from "../service/user";

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.css'
})
export class UsersAddComponent implements OnInit {
  roles: any;
  emailForUserLogged: string | null = '';

  constructor(private userService: UsersService,
              private router: Router,
              private messageService: MessageService,
              private rolesService: RolesService,
              private fb: FormBuilder,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.getRoles();
    this.getEmailForUserLogged();
    this.userForm.get('email')?.patchValue(this.emailForUserLogged)
    this.userForm.get('email')?.disable();
  }

  getEmailForUserLogged() {
    this.emailForUserLogged = this.loginService.getEmailForUserLogged();
  }

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    roles: [[], Validators.required]
  });

  getRoles() {
    this.rolesService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      },
      err => {
        console.log(err);
      });
  }

  createUser() {
    this.userService.createUser(this.userForm.value as User).subscribe(
      res => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User created'});
        this.router.navigate(['/management/users']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
