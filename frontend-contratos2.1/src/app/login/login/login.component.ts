import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {User} from "../user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  loginForm = this.fb.group({
    email: ['user@test.com', [Validators.required, Validators.email]],
    password: ['1111', [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit(): void {
  }

  logIn() {
    this.userService.createUser(this.loginForm.value as User).subscribe(
      (response) => {
        Swal.fire({
          title: 'Welcome Back!!',
          icon: 'success',
          confirmButtonText: 'Continue'
        });
        console.log('Email captured:', this.userService.getEmail);
        this.router.navigate(['/home']);
      },
      (error) => console.error('Error creating user', error)
    );
  }

}
