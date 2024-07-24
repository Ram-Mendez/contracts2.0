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

  getUserByid(id: number): Observable<any> {
    return this.http.get(this.getUserUrl + '/' + id);
  }

  setEmailForUserLogged(email: string) {
    sessionStorage.setItem('email', email);
  }

  getEmailForUserLogged() {
    return sessionStorage.getItem('email');
  }

  isLoggedIn()
    :
    boolean {
    return sessionStorage.getItem('user') !== null;
  }
}
