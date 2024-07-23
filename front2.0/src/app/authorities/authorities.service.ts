import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesService {
  authoritiesUrl = 'http://localhost:8080/authorities';

  constructor(private http: HttpClient) {
  }

  getAuthorities(): Observable<any> {
    return this.http.get(this.authoritiesUrl);
  }
}
