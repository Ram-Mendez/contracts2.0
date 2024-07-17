import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {User} from "../user";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService,
              private router: Router,) {
  }

  ngOnInit() {
  }

  userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }
  )

  createUser(): void {
    this.userService.createUser(this.userForm.value as User).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/']);
      },
      (error) => console.error('Error creating user', error)
    );
  }
}
