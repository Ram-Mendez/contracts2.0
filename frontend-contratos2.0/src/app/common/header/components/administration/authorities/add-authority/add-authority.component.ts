import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthoritiesService} from "../../service/authorities.service";

@Component({
  selector: 'app-add-authority',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-authority.component.html',
  styleUrl: './add-authority.component.css'
})
export class AddAuthorityComponent implements OnInit {
  @Output() onCreateAuthorityRedirectBack = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
              private authoritiesService: AuthoritiesService) {
  }

  ngOnInit() {
  }

  authorityForm = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required]

  });

  createAuthority() {
    if (this.authorityForm.valid) {
      this.authoritiesService.createAuthority(this.authorityForm.value as any)
        .subscribe((result) => {
          console.log(result, "resultado de la creacion de la autoridad ");
          this.onCreateAuthorityRedirectBack.emit();
        });
    }
  }
}
