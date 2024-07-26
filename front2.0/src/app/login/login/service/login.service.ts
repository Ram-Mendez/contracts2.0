import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../register/service/user";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = 'http://localhost:8080/login';
  getUserUrl = 'http://localhost:8080/users';
  userEmail = '';


  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.http.post(this.loginUrl, user).pipe(
      tap(response => {
        if (response) {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  setEmailForUserLogged(email: string) {
    sessionStorage.setItem('email', email);
    this.userEmail = email;
  }

  getEmailForUserLogged() {
    return sessionStorage.getItem('email') || this.userEmail;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
}
