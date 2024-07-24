import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesService {
  authoritiesUrl = 'http://localhost:8080/authorities';

  constructor(private http: HttpClient) {
  }

  createAuthority(authority: any): Observable<any> {
    return this.http.post(this.authoritiesUrl, authority);
  }

  getAuthorities(): Observable<any> {
    return this.http.get(this.authoritiesUrl);
  }

  getAuthorityById(authorityId: number): Observable<any> {
    return this.http.get(this.authoritiesUrl + '/' + authorityId);
  }

  updateAuthority(authorityId: number, authority: any): Observable<any> {
    return this.http.put(this.authoritiesUrl + '/' + authorityId, authority);
  }

  deleteAuthority(authorityId: number): Observable<any> {
    return this.http.delete(this.authoritiesUrl + '/' + authorityId);
  }
}
