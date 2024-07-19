import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactUs} from "./contact-us";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  contactUrl = "http://localhost:8080/contact-us";


  constructor(private http: HttpClient) {
  }

  sendEmail(contactForm: ContactUs): Observable<ContactUs> {
    return this.http.post<ContactUs>(this.contactUrl, contactForm);
  }
}
