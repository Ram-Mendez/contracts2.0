import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Administrator} from "./administrator";

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  administratorUrl = 'http://localhost:8080/administrators';

  constructor(private http: HttpClient) {
  }

  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(this.administratorUrl);
  }

  getAdministratorById(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(`${this.administratorUrl}/${id}`);
  }

  createAdministrator(administrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(this.administratorUrl, administrator);

  }

  updateAdministrator(id: number, administrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(this.administratorUrl + '/' + id, administrator);
  }

  deleteAdministrator(id: number): Observable<any> {
    return this.http.delete(this.administratorUrl + '/' + id);
  }

}
