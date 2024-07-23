import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {PasswordModule} from "primeng/password";
import {ChipsModule} from "primeng/chips";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    PasswordModule,
    ChipsModule,
    ReactiveFormsModule,
    ButtonDirective,
    FloatLabelModule,
    RouterLink,
    Button
  ],
  templateUrl: './login.component.html',
  providers: [],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService,
              private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['test@user.com', [Validators.required, Validators.email]],
      password: ['1111', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        res => {
          console.log(res);
          this.messageService.add({
            severity: 'success',
            detail: 'User logged in',
            icon: 'pi pi-check'
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500)
        },
        err => {
          console.log(err);
        }
      );


    }

  }
}
