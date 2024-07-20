import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {Contratos} from "./contratos";
import {AbstractControl, ValidationErrors, ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  contratosUrl = 'http://localhost:8080/contracts';

  contractName = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getContratos(): Observable<Contratos[]> {
    return this.http.get<Contratos[]>(this.contratosUrl);
  }

  getContractById(id: number): Observable<Contratos> {
    return this.http.get<Contratos>(this.contratosUrl + '/' + id);
  }

  createContract(): Observable<Contratos> {
    return this.http.post<Contratos>(this.contratosUrl, {});
  }

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

  deteleContract(id: number): Observable<void> {
    return this.http.delete<void>(this.contratosUrl + '/' + id);
  }

}
