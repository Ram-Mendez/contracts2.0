import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../register/service/user";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = 'http://localhost:8080/login';


  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.loginUrl, user).pipe(
      tap(response => {
        if (response) {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
}
