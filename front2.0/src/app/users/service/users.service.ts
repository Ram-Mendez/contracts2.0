import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);

  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.usersUrl + '/' + id, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.usersUrl + '/' + id);
  }
}
