import {Component, OnInit} from '@angular/core';
import {AuthoritiesService} from "../authorities.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorities-list',
  standalone: true,
  imports: [],
  templateUrl: './authorities-list.component.html',
  styleUrl: './authorities-list.component.css'
})
export class AuthoritiesListComponent implements OnInit {
  authorities: any;

  constructor(private authoritiesService: AuthoritiesService, private router: Router) {
  }

  ngOnInit() {
    this.getAuthorities();
  }

  getAuthorities() {
    this.authoritiesService.getAuthorities().subscribe(
      res => {
        this.authorities = res;
      },
      err => {
        console.log(err);
      }
    );

  }

  editAuthority() {
  }

  deleteAuthority() {
  }

  onRowSelect(event: any) {
  }

  onRowUnselect(event: any) {
  }
}
