import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {Contratos} from "./contratos";
import {AbstractControl, ValidationErrors, ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  contratosUrl = 'http://localhost:8080/contracts';

  contractName = new Subject<string>();
  resetHeader = new Subject<void>();
  contractId = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {
  }

//CRUD
  getContratos(): Observable<Contratos[]> {
    return this.http.get<Contratos[]>(this.contratosUrl);
  }

//CRUD
  getContractById(id: number): Observable<Contratos> {
    return this.http.get<Contratos>(this.contratosUrl + '/' + id);
  }

//CRUD
  createContract(contract: Contratos): Observable<Contratos> {
    return this.http.post<Contratos>(this.contratosUrl, contract);
  }

//CRUD
  updateContract(id: number, contract: ɵTypedOrUntyped<{
    contractor: ɵElement<(number | ((control: AbstractControl) => (ValidationErrors | null))[])[], null>;
    authority: ɵElement<(number | ((control: AbstractControl) => (ValidationErrors | null))[])[], null>;
    name: ɵElement<(string | ((control: AbstractControl) => (ValidationErrors | null))[])[], null>
  }, ɵFormGroupValue<{
    contractor: ɵElement<(number | ((control: AbstractControl) => (ValidationErrors | null))[])[], null>;
    authority: ɵElement<(number | ((control: AbstractControl) => (ValidationErrors | null))[])[], null>;
    name: ɵElement<(string | ((control: AbstractControl) => (ValidationErrors | null))[])[], null>
  }>, any>): Observable<Contratos> {
    return this.http.put<Contratos>(this.contratosUrl + '/' + id, contract);
  }

//CRUD
  deteleContract(id: number): Observable<void> {
    return this.http.delete<void>(this.contratosUrl + '/' + id);
  }


  uploadFile(contratoId: number, formData: FormData) {
    return this.http.post(this.contratosUrl + '/' + contratoId + '/files/upload', formData);
  }

  getFiles(contratoId: number): Observable<any> {
    return this.http.get(this.contratosUrl + '/' + contratoId + '/files');
  }

  deleteFile(contratoId: number, fileId: number): Observable<any> {
    return this.http.delete(this.contratosUrl + '/' + contratoId + '/files/' + fileId);
  }

  downloadFile(contratoId: number, fileId: number): Observable<any> {
    return this.http.get(this.contratosUrl + '/' + contratoId + '/files/' + fileId + '/download', {responseType: 'blob'});
  }
}
