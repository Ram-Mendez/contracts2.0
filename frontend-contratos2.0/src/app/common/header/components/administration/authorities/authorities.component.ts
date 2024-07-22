import {Component, OnInit} from '@angular/core';
import {AddAuthorityComponent} from "./add-authority/add-authority.component";
import {ListAuthorityComponent} from "./list-authority/list-authority.component";
import {NgIf} from "@angular/common";
import {EditAuthorityComponent} from "./edit-authority/edit-authority.component";

@Component({
  selector: 'app-authorities',
  standalone: true,
  imports: [
    AddAuthorityComponent,
    ListAuthorityComponent,
    NgIf,
    EditAuthorityComponent
  ],
  templateUrl: './authorities.component.html',
  styleUrl: './authorities.component.css'
})
export class AuthoritiesComponent implements OnInit {
  showAddAuthority = false;
  showListAuthority = false;
  showEditAuthority = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  showAddAuthorityComponent() {
    this.showAddAuthority = true;
    this.showListAuthority = false;
    this.showEditAuthority = false;
  }

  showListAuthorityComponent() {
    this.showAddAuthority = false;
    this.showListAuthority = true;
    this.showEditAuthority = false;
  }

  showEditAuthorityComponent() {
    this.showAddAuthority = false;
    this.showListAuthority = false;
    this.showEditAuthority = true;
  }

  handleEditAuthority($event: number) {
    this.showEditAuthorityComponent();

  }
}
