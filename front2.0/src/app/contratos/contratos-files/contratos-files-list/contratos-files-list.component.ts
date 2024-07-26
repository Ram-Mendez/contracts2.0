import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {MessageService, PrimeTemplate, TreeNode} from "primeng/api";
import {TableModule} from "primeng/table";
import {TreeModule} from "primeng/tree";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ContratosFileService} from '../../service/contratos-file.service';
import {FileUploadEvent, FileUploadModule} from "primeng/fileupload";

@Component({
  selector: 'app-contratos-files',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule,
    TreeModule,
    RouterLink,
    FileUploadModule
  ],
  templateUrl: './contratos-files-list.component.html',
  styleUrl: './contratos-files-list.component.css'
})
export class ContratosFilesListComponent implements OnInit {
  contratoId: number = 0;
  data: TreeNode[] = []
  isFileSelected: boolean = false;
  fileSelected = 0;
  fileId: number = 0;
  files: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private contratosFileService: ContratosFileService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contratoId = params['id'];
      console.log(this.contratoId, "contratoId")
      this.getFiles();
      this.initializeTreeNode();
    });
    this.initializeTreeNode();
  }

  initializeTreeNode() {
    this.data = [
      {
        label: 'Inventory',
        selectable: true,
        expanded: false,
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        data: {path: `/home/edit-contract/${this.contratoId}/inventory`},
      },
      {
        label: 'Files',
        selectable: true,
        expanded: false,
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        data: {path: `/home/edit-contract//${this.contratoId}/files`},

      },
    ];
  }

  getFiles() {
    this.contratosFileService.getFiles(this.contratoId).subscribe(
      files => {
        this.files = files;
        console.log(files, "files")
      });
  }

  addFile($event: any) {
    const file = $event.files[0];
    const contratoId = this.contratoId;
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.contratosFileService.uploadFile(contratoId, formData).subscribe(
      response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Uploading file',
          icon: 'pi pi-check'
        });
        this.getFiles();
      },
      error => {
        console.log('Error uploading file', error);
      });
  }

  deleteFile() {
    this.contratosFileService.deleteFile(this.contratoId, this.fileSelected).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deleting file',
          icon: 'pi pi-check'
        });
        this.getFiles();
      });
  }

  onRowSelect($event: any) {
    this.isFileSelected = true;
    this.fileSelected = $event.data.id;
    this.fileId = $event.data.id;
    console.log(this.fileSelected, "fileSelectedId")
  }

  onRowUnselect($event: any) {
    this.isFileSelected = false;
  }

  downloadFile() {
    this.isFileSelected = true;
    const fileId = this.fileId;
    const contratoId = this.contratoId;
    this.contratosFileService.downloadFile(contratoId, fileId).subscribe(
      response => {
        console.log(response, "response")
        const blob = new Blob([response], {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });

  }
}
