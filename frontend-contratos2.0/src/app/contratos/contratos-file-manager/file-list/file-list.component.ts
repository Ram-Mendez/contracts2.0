import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContratosService} from "../../service/contratos.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent implements OnInit {
  contratoId: number = 0;
  files: any;

  constructor(private contratosService: ContratosService,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.contratoId = params['id'];
    });
    this.getFiles();
  }

  getFiles() {
    this.contratosService.getFiles(1).subscribe((data) => {
      this.files = data;
      console.log(data)
    });
  }

  downloadFile(id: number) {
    this.contratosService.downloadFile(this.contratoId, id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Obtener el nombre de archivo y tipo MIME del backend
      const file = this.files.find((f: any) => f.id === id);
      const filename = file.fileName;
      const mimeType = file.type;

      a.download = filename;
      a.type = mimeType;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  deleteFile(id: number) {
    this.contratosService.deleteFile(this.contratoId, id).subscribe(() => {
      this.getFiles();
    });
  }
}
