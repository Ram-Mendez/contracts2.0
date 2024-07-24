import {Component, OnInit} from '@angular/core';
import {AuthoritiesService} from "../authorities.service";
import {Router} from "@angular/router";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {DatePipe, NgIf} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-authorities-list',
  standalone: true,
  imports: [
    Button,
    TableModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './authorities-list.component.html',
  styleUrl: './authorities-list.component.css'
})
export class AuthoritiesListComponent implements OnInit {
  authorities: any;
  authoritySelected = 0;
  isAuthoritySelected = false;

  constructor(private authoritiesService: AuthoritiesService, private router: Router
    , private messageService: MessageService) {
  }

  ngOnInit() {
    this.getAuthorities();
  }

  getAuthorities() {
    this.authoritiesService.getAuthorities().subscribe(
      authorities => {
        this.authorities = authorities;
        console.log(this.authorities);
      },
      err => {
        console.log(err);
      }
    );
  }

  addAuthority() {
    this.router.navigate(['/management/add-authority']);
  }

  editAuthority() {
    this.router.navigate(['/management/edit-authority/', this.authoritySelected]);
  }

  deleteAuthority() {
    this.authoritiesService.deleteAuthority(this.authoritySelected).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Authority deleted successfully.',
        });
        this.getAuthorities();
      },
      err => {
        console.log(err);
      }
    );

  }

  onRowSelect(event: any) {
    this.isAuthoritySelected = true;
    this.authoritySelected = event.data.id;

  }

  onRowUnselect(event: any) {
    this.isAuthoritySelected = false;
    this.authoritySelected = event.data.id;
  }
}
