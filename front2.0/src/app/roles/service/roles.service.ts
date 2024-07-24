import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  rolesUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<any> {
    return this.http.get(this.rolesUrl);
  }

  createRole(role: any): Observable<any> {
    return this.http.post(this.rolesUrl, role);
  }

  deleteRoleById(roleId: number): Observable<any> {
    return this.http.delete(this.rolesUrl + '/' + roleId);
  }

}
