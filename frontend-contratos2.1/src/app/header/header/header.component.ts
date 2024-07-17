import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../login/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  email = '';

  constructor(private userService: UserService,
              private router: Router,) {
  }

  ngOnInit() {
    this.email = this.userService.getEmail();

  }

}
