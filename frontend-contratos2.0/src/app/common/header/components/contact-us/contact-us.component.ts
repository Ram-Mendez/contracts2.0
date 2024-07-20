import {Component, OnInit} from '@angular/core';
import {ContactUsService} from "./service/contact-us.service";
import {HeaderComponent} from "../../header.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactUs} from "./service/contact-us";
import {FooterComponent} from "../../../footer/footer.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    NgIf
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {

  constructor(private contactUsService: ContactUsService, private fb: FormBuilder) {
  }

  contactUsForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  ngOnInit() {
  }


  sendMessage() {
    this.contactUsService.sendEmail(this.contactUsForm.value as ContactUs).subscribe(
      (response) => {
        console.log(response);
      });
    this.contactUsForm.reset();
  }
}
