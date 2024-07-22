import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  rolesUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) {
  }

  getRoles() {
    return this.http.get(this.rolesUrl);
  }

  createRole(role: any) {
    return this.http.post(this.rolesUrl, role);
  }
}
