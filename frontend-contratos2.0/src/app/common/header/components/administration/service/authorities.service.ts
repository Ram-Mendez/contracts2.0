import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Authority} from "./authority";

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesService {
  private selectedAuthorityIdSource = new BehaviorSubject<number | null>(null);
  selectedAuthorityId$ = this.selectedAuthorityIdSource.asObservable();

  authoritiesUrl = 'http://localhost:8080/authorities';

  constructor(private http: HttpClient) {
  }

  getAuthorities(): Observable<Authority[]> {
    return this.http.get<Authority[]>(this.authoritiesUrl);
  }

  getAuthorityById(id: number): Observable<Authority> {
    return this.http.get<Authority>(this.authoritiesUrl + '/' + id);
  }

  createAuthority(authority: Authority): Observable<Authority> {
    return this.http.post<Authority>(this.authoritiesUrl, authority);
  }


  setSelectedAuthorityId(id: number) {
    this.selectedAuthorityIdSource.next(id);
  }
}
