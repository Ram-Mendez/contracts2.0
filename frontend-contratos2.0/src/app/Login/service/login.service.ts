import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlLogin = 'http://localhost:8080/login';
  urlRegister = 'http://localhost:8080/users';

  userEmail: string = '';

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlRegister, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.urlLogin, user).pipe(
      tap(user => {
        this.setEmail(user.email);
        console.log(`User ${user.email} logged in`)
      })
    );
  }

  setEmail(email: string): void {
    this.userEmail = email;
  }
}
