import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../service/login.service";
import {User} from "../service/user";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
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
          this.router.navigate(['/home']);
        } else {
        }
      });
    }
  }
}
