import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-contractor',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-contractor.component.html',
  styleUrl: './add-contractor.component.css'
})
export class AddContractorComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  contractorForm = this.fb.group({});

  ngOnInit() {
  }

  createContractor() {

  }
}
