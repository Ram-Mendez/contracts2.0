import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  contratosUrl = 'http://localhost:8080/contracts';
  selectedContratoid = new Subject<number>();

  constructor(private http: HttpClient) {
  }

  createContrato(contrato: any): Observable<any> {
    return this.http.post(this.contratosUrl, contrato);
  }

  getContratos(): Observable<any> {
    return this.http.get(this.contratosUrl);
  }

  getContratobyId(id: number): Observable<any> {
    return this.http.get(this.contratosUrl + '/' + id);
  }

  updateContrato(id: number, contrato: any): Observable<any> {
    return this.http.put(this.contratosUrl + '/' + id, contrato);
  }

  deleteContrato(id: number): Observable<any> {
    return this.http.delete(this.contratosUrl + '/' + id);
  }

  // end of CRUD operations


  // start of other operations
  setSelectedContratoId(id: number) {
    this.selectedContratoid.next(id);
  }

  getSelectedContratoId(): Observable<number> {
    return this.selectedContratoid.asObservable();
  }

}
