import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Authority} from "./authority";

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesService {
  authoritiesUrl = 'http://localhost:8080/authorities';

  constructor(private http: HttpClient) {
  }

  getAuthorities(): Observable<Authority[]> {
    return this.http.get<Authority[]>(this.authoritiesUrl);
  }

  getAuthorityById(id: number): Observable<Authority> {
    return this.http.get<Authority>(this.authoritiesUrl + '/' + id);
  }
}
