import {Component, OnInit} from '@angular/core';
import {ContactUsService} from "./service/contact-us.service";
import {HeaderComponent} from "../../header.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Button, ButtonDirective} from "primeng/button";
import {ContactUs} from "./service/contact-us";
import {FooterComponent} from "../../../footer/footer.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ChipsModule,
    InputTextareaModule,
    ButtonDirective,
    ReactiveFormsModule,
    Button,
    FooterComponent
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
