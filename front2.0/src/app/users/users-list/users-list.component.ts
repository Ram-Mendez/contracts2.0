import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";
import {RolesService} from "../../roles/service/roles.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  users: any;
  userSelected = 0;
  isUserSelected: boolean = false;

  constructor(private userService: UsersService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        console.log(users)
      },
      err => {
        console.log(err);
      });

  }

  addUser() {
    this.router.navigate(['/management/users-add']);
  }

  editUser() {
    this.router.navigate(['/management/users-edit/' + this.userSelected]);
  }

  deleteUser() {
    this.userService.deleteUser(this.userSelected).subscribe(
      res => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User deleted'});
        this.getUsers();
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'User not deleted'});
        console.log(err);
      });
  }

  onRowSelect($event: any) {
    this.isUserSelected = true;
    this.userSelected = $event.data.id;
  }

  onRowUnselect($event: any) {
    this.isUserSelected = true;
    this.userSelected = $event.data.id;
  }
}
