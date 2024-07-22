import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ContratosService} from '../../service/contratos.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-file-add',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './file-add.component.html',
  styleUrl: './file-add.component.css'
})
export class FileAddComponent implements OnInit {
  contratoId: number = 0;
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder,
              private contratosService: ContratosService,
              private route: ActivatedRoute) {
  }

  fileForm = this.fb.group({
    fileName: [null]
  });


  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.contratoId = params['id'];
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.contratosService.uploadFile(this.contratoId, formData)
        .subscribe(() => {
          console.log('file uploaded');
        });
    } else {
      console.error('No file selected');
    }
  }
}
