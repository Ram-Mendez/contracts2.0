import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://localhost:8080/users';
  loginUrl = 'http://localhost:8080/login';
  public email: string = '';


  constructor(private http: HttpClient, private router: Router) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user).pipe(
      tap((createdUser: User) => {
        this.setEmail(createdUser.email);
      })
    );
  }

  getEmail(): string {
    return localStorage.getItem('email') || this.email;
  }

  setEmail(email: string): void {
    this.email = email;
    localStorage.setItem('email', email);
  }

  login(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.loginUrl, user);
  }


}
