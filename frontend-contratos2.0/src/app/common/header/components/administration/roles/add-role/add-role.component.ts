import {Component, OnInit, Output} from '@angular/core';
import {RolesService} from "../../service/roles.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {
  @Output() roleCreated = new Subject<void>();

  constructor(private rolesService: RolesService,
              private fb: FormBuilder) {
  }

  rolesForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });


  ngOnInit() {
  }

  createRole() {
    if (this.rolesForm.valid) {
      this.rolesService.createRole(this.rolesForm.value).subscribe((result) => {
        console.log(result, "resultado de la creacion del rol ");
        this.roleCreated.next();
      });
    }
  }

}
