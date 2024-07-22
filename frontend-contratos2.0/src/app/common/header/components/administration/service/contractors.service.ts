import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Contractor} from "./contractor";

@Injectable({
  providedIn: 'root'
})
export class ContractorsService {
  contractorsUrl = 'http://localhost:8080/contractors';

  constructor(private http: HttpClient) {
  }

  getContractors(): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(this.contractorsUrl);
  }

  getContractorById(id: number): Observable<Contractor> {
    return this.http.get<Contractor>(this.contractorsUrl + '/' + id);
  }
}
