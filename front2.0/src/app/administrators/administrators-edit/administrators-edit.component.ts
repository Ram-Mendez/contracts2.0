import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ActivatedRoute, Router} from "@angular/router";
import {AdministratorService} from "../service/administrator.service";
import {MessageService} from "primeng/api";
import {ContratosService} from "../../contratos/service/contratos.service";
import {AuthoritiesService} from "../../authorities/authorities.service";
import {UsersService} from "../../users/service/users.service";

@Component({
  selector: 'app-administrators-edit',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './administrators-edit.component.html',
  styleUrl: './administrators-edit.component.css'
})
export class AdministratorsEditComponent implements OnInit {
  administratorId: number = 0;
  contratos: any;
  authorities: any;
  users: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private administratorService: AdministratorService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private contratoService: ContratosService,
              private authoritiesService: AuthoritiesService,
              private userService: UsersService) {
  }

  editAdministratorForm = this.fb.group({
    contrato: ['', Validators.required],
    authority: ['', Validators.required],
    user: ['', Validators.required],
  });

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.administratorId = params['id'];
      }
    );
    this.getAdministratorById();
    this.getContratos();
    this.getAuthorities();
    this.getUsers();
  }

  getAdministratorById() {
    this.administratorService.getAdministratorById(this.administratorId).subscribe(
      (response: any) => {
        this.editAdministratorForm.patchValue(response);
      },
      error => {
        console.error('Error getting administrator by id');
      });

  }

  updateAdministrator() {
    console.log(this.editAdministratorForm.value)
    this.administratorService.updateAdministrator(this.editAdministratorForm.value).subscribe(
      () => {
        this.messageService.add({
          severity: 'success', detail: 'Administrator updated', icon: 'pi pi-check'
        });
        this.router.navigate(['/management/administrators']);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error updating administrator'});
      });
  }

  getContratos() {
    this.contratoService.getContratos().subscribe((contratos: any) => {
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
