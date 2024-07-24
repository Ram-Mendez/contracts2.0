import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractorsService {
  contractorsUrl = 'http://localhost:8080/contractors';

  constructor(private http: HttpClient) {
  }

  createContractor(contractor: any): Observable<any> {
    return this.http.post(this.contractorsUrl, contractor);
  }

  getContractors(): Observable<any> {
    return this.http.get(this.contractorsUrl);
  }

  getContractorById(id: number): Observable<any> {
    return this.http.get(this.contractorsUrl + '/' + id);
  }

  updateContractor(id: number, contractor: any): Observable<any> {
    return this.http.put(this.contractorsUrl + '/' + id, contractor);
  }

  deleteContractor(id: number): Observable<any> {
    return this.http.delete(this.contractorsUrl + '/' + id);
  }
}
