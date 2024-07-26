import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContratosFileService {
  filesUrl = 'http://localhost:8080/contracts-inventory';

  constructor(private http: HttpClient) {
  }

  uploadFile(contractId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.filesUrl}/${contractId}/files/upload`, formData);
  }

  getFiles(contractId: number): Observable<any> {
    return this.http.get(this.filesUrl + '/' + contractId + '/files');
  }

  downloadFile(contractId: number, fileId: number): Observable<Blob> {
    return this.http.get(`${this.filesUrl}/${contractId}/files/${fileId}/download`, {
      responseType: 'blob'
    });
  }

  deleteFile(contractId: number, fileId: number): Observable<any> {
    return this.http.delete(this.filesUrl + '/' + contractId + '/files/' + fileId);
  }
}
