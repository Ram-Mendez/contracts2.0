import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../service/login.service";
import {User} from "../service/user";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router,
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
      this.loginService.createUser(this.registerForm.value as User).subscribe(() => {
      });
      this.router.navigate(['/login']);
    } else {
    }

  }

}
