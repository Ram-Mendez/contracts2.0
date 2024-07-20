import {Component, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Message, MessageService} from "primeng/api";
import {LoginService} from "../service/login.service";
import {User} from "../service/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
  }

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  onRegister() {
    if (this.registerForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'User created',
        icon: 'pi pi-check'
      });
      this.loginService.createUser(this.registerForm.value as User).subscribe(() => {
      });
      this.router.navigate(['/login']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid input',
        icon: 'pi-exclamation-triangle'
      });
    }

  }

}
