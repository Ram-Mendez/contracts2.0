import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthoritiesService} from "../authorities.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorities-add',
  standalone: true,
  imports: [
    Button,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './authorities-add.component.html',
  styleUrl: './authorities-add.component.css'
})
export class AuthoritiesAddComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private authoritiesService: AuthoritiesService,) {
  }

  ngOnInit() {
  }

  authorityForm = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
  });

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

  createAuthority() {
    if (this.authorityForm.valid) {
      this.authoritiesService.createAuthority(this.authorityForm.value).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Authority created successfully.',
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
