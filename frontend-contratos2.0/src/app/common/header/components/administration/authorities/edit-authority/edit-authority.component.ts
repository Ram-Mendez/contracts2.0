import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AuthoritiesService} from "../../service/authorities.service";

@Component({
  selector: 'app-edit-authority',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-authority.component.html',
  styleUrl: './edit-authority.component.css'
})
export class EditAuthorityComponent implements OnInit {
  @Input() authorityId: number = 0;

  constructor(private fb: FormBuilder, private authorityService: AuthoritiesService) {
  }

  editAuthorityForm = this.fb.group({
    id: [''],
    name: [''],
    description: ['']
  });

  ngOnInit() {
  }

  updateAuthority() {

  }
}
