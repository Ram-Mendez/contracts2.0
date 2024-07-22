import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {AuthoritiesService} from "../../service/authorities.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-list-authority',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './list-authority.component.html',
  styleUrl: './list-authority.component.css'
})
export class ListAuthorityComponent implements OnInit {
  authorities: any;
  @Output() emitAuthorityId = new EventEmitter<number>;

  constructor(private authoritiesService: AuthoritiesService) {
  }

  ngOnInit(): void {
    this.getAuthorities();
  }

  getAuthorities() {
    this.authoritiesService.getAuthorities().subscribe(data => {
      console.log(data);
      this.authorities = data;
    });
  }

  isAuthoritySelected(authority: any) {

  }

  disableRoleSelected() {

  }

  loadAuthorityEditComponent(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.emitAuthorityId.emit(id);
  }

  deleteAuthority(authorityId: number) {

  }
}
