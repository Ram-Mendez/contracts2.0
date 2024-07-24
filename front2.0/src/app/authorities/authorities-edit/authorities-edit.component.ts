import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Form, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthoritiesService} from "../authorities.service";

@Component({
  selector: 'app-authorities-edit',
  standalone: true,
  imports: [
    Button,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './authorities-edit.component.html',
  styleUrl: './authorities-edit.component.css'
})
export class AuthoritiesEditComponent implements OnInit {
  authorityId: number = 0;

  constructor(private fb: FormBuilder,
              private authoritiesService: AuthoritiesService,
              private router: Router,
              private messageService: MessageService,
              private route: ActivatedRoute) {
  }

  editAuthorityForm = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required]
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorityId = params['id'];
    });
    this.getAuthority();
  }

  status = [{
    label: 'Active',
    value: '1'
  },
    {
      label: 'Inactive',
      value: '2'
    }];


  priority = [{
    label: 'Low',
    value: '1',
  },
    {
      label: 'Medium',
      value: '2',
    },
    {
      label: 'High',
      value: '3',
    }
  ];

  getAuthority() {
    this.authoritiesService.getAuthorityById(this.authorityId).subscribe(
      authority => {
        this.editAuthorityForm.patchValue(authority);
        console.log(authority)
      },
      err => {
        console.log(err);
      }
    );
  }

  updateAuthority() {
    if (this.editAuthorityForm.valid) {
      this.authoritiesService.updateAuthority(this.authorityId, this.editAuthorityForm.value).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Authority updated successfully.',
            icon: 'pi pi-check'
          });
          this.router.navigate(['/management']);
        },
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
          });
        });
    }
  }
}
