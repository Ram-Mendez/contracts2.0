import {Component, OnInit} from '@angular/core';
import {FloatLabelModule} from "primeng/floatlabel";
import {Button, ButtonDirective} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {LoginService} from "../service/login.service";
import {User} from "../service/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FloatLabelModule,
    Button,
    ButtonDirective,
    ChipsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    email: ['test@user.com', [Validators.required, Validators.email]],
    password: ['1111', [Validators.required, Validators.minLength(4)]]
  });

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as User).subscribe(data => {
        if (data) {
          this.messageService.add({
            severity: 'info',
            summary: 'Login successful',
            icon: 'pi pi-check',
          });
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Check email or password',
            icon: 'pi pi-exclamation-triangle',
          });
        }
      });
    }
  }
}
