import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {MessageService, PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Router} from "@angular/router";
import {Administrator} from "../service/administrator";
import {AdministratorService} from "../service/administrator.service";
import {UsersService} from "../../users/service/users.service";
import {AuthoritiesService} from "../../authorities/authorities.service";
import {ContratosService} from "../../contratos/service/contratos.service";

@Component({
  selector: 'app-administrators',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './administrators-list.component.html',
  styleUrl: './administrators-list.component.css'
})
export class AdministratorsListComponent implements OnInit {
  administrators: Administrator[] = []
  administratorSelected = 0;
  isAdministratorSelected: boolean = false;

  constructor(private router: Router,
              private administratorService: AdministratorService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getAdministrators();
  }

  getAdministrators() {
    this.administratorService.getAdministrators().subscribe(
      administrators => {
        this.administrators = administrators
        console.log(this.administrators);
      }
    );
  }

  addAdministrator() {
    this.router.navigate(['/management/administrators-add'])
  }

  editAdministrator() {
    this.router.navigate(['/management/administrators-edit', this.administratorSelected])
  }

  deleteAdministrator() {
    this.administratorService.deleteAdministrator(this.administratorSelected).subscribe(
      () => {
        this.messageService.add({
          severity: 'success', detail: 'Administrator deleted', icon: 'pi pi-check'
        });
      }
    )
  }

  onRowSelect($event: any) {
    this.isAdministratorSelected = true;
    this.administratorSelected = $event.data.id;

  }

  onRowUnselect($event: any) {
    this.isAdministratorSelected = true;
    this.administratorSelected = $event.data.id;
  }
}
