import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {AdministratorService} from "../service/administrator.service";
import {Router} from "@angular/router";
import {Confirmation, MessageService} from "primeng/api";
import {ContratosService} from "../../contratos/service/contratos.service";
import {AuthoritiesService} from "../../authorities/authorities.service";
import {UsersService} from "../../users/service/users.service";

@Component({
  selector: 'app-administrators-add',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './administrators-add.component.html',
  styleUrl: './administrators-add.component.css'
})
export class AdministratorsAddComponent implements OnInit {
  contratos: any;
  authorities: any;
  users: any;


  constructor(private administratorService: AdministratorService, private router: Router,
              private messageService: MessageService, private fb: FormBuilder,
              private contratosService: ContratosService, private authoritiesService: AuthoritiesService,
              private userService: UsersService) {
  }

  ngOnInit() {
    this.getContratos();
    this.getAuthorities();
    this.getUsers();
  }

  administratorForm = this.fb.group({
    contrato: ['', Validators.required],
    authority: ['', Validators.required],
    user: ['', Validators.required]
  })


  createAdministrator() {
    this.administratorService.createAdministrator(this.administratorForm.value).subscribe(
      () => {
        this.messageService.add({
          severity: 'success', detail: 'Administrator created', icon: 'pi pi-check'
        });
        this.router.navigate(['/management/administrators']);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error creating administrator'});
      }
    );

  }

  getContratos() {
    this.contratosService.getContratos().subscribe((contratos: any) => {
      this.contratos = contratos;
      console.log(this.contratos)
    });
  }

  getAuthorities() {
    this.authoritiesService.getAuthorities().subscribe((authorities: any) => {
      this.authorities = authorities;
      console.log(this.authorities)
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.log(this.users)
    });
  }
}
