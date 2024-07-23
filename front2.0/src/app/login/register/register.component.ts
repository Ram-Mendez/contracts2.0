import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {Router, RouterLink} from "@angular/router";
import {RegisterService} from "./service/register.service";
import {User} from "./service/user";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    Button,
    CardModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  providers: [],
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private registerService: RegisterService,
              private router: Router,
              private messageService: MessageService) {
  }

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
  }

  createAccount() {
    if (this.registerForm.valid) {
      this.registerService.createUser(this.registerForm.value as User).subscribe(
        res => {
          console.log(res);
          this.messageService.add({
            severity: 'success',
            detail: 'User created',
            icon: 'pi pi-check'
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500)
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
