import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {HomeComponent} from "./home/home/home.component";
import {confirmLoginGuard} from "./login/login/service/confirm-login.guard";
import {ContratosListComponent} from "./contratos/contratos-list/contratos-list.component";
import {ContratosAddComponent} from "./contratos/contratos-add/contratos-add.component";
import {ContratosEditComponent} from "./contratos/contratos-edit/contratos-edit.component";
import {UsersListComponent} from "./users/users-list/users-list.component";
import {ManagementComponent} from "./management/management/management.component";
import {AuthoritiesListComponent} from "./authorities/authorities-list/authorities-list.component";
import {AuthoritiesAddComponent} from "./authorities/authorities-add/authorities-add.component";
import {AuthoritiesEditComponent} from "./authorities/authorities-edit/authorities-edit.component";
import {ContractorListComponent} from "./contractors/contractor-list/contractor-list.component";
import {ContractorsAddComponent} from "./contractors/contractors-add/contractors-add.component";
import {ContractorsEditComponent} from "./contractors/contractors-edit/contractors-edit.component";
import {RolesComponent} from "./roles/roles/roles.component";
import {RolesAddComponent} from "./roles/roles-add/roles-add.component";
import {UsersAddComponent} from "./users/users-add/users-add.component";
import {UsersEditComponent} from "./users/users-edit/users-edit.component";
import {AdministratorsListComponent} from "./administrators/administrators-list/administrators-list.component";
import {AdministratorsAddComponent} from "./administrators/administrators-add/administrators-add.component";
import {AdministratorsEditComponent} from "./administrators/administrators-edit/administrators-edit.component";
import {
  ContratosInventoryListComponent
} from "./contratos/contratos-inventory/contratos-inventory-list/contratos-inventory-list.component";
import {
  ContratosFilesListComponent
} from "./contratos/contratos-files/contratos-files-list/contratos-files-list.component";
import {
  ContratosInventoryAddComponent
} from "./contratos/contratos-inventory/contratos-inventory-add/contratos-inventory-add.component";
import {
  ContratosInventoryEditComponent
} from "./contratos/contratos-inventory/contratos-inventory-edit/contratos-inventory-edit.component";


export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: 'home', component: HomeComponent, canActivate: [confirmLoginGuard],
    children: [
      {path: '', component: ContratosListComponent, canActivate: [confirmLoginGuard]},
      {path: 'add-contract', component: ContratosAddComponent, canActivate: [confirmLoginGuard]},
      {path: 'edit-contract/:id', component: ContratosEditComponent, canActivate: [confirmLoginGuard]},
      {
        path: 'edit-contract/:id/inventory',
        component: ContratosInventoryListComponent,
        canActivate: [confirmLoginGuard]
      },
      {
        path: 'edit-contract/:id/inventory/add-item',
        component: ContratosInventoryAddComponent,
        canActivate: [confirmLoginGuard]
      },
      {
        path: 'edit-contract/:contractId/inventory/:id/edit-item',
        component: ContratosInventoryEditComponent,
        canActivate: [confirmLoginGuard]
      },
      {path: 'edit-contract/:id/files', component: ContratosFilesListComponent, canActivate: [confirmLoginGuard]},
    ],
  },
  {
    path: 'management', component: ManagementComponent, canActivate: [confirmLoginGuard],
    children: [
      {path: 'authorities', component: AuthoritiesListComponent, canActivate: [confirmLoginGuard]},
      {path: 'add-authority', component: AuthoritiesAddComponent, canActivate: [confirmLoginGuard]},
      {path: 'edit-authority/:id', component: AuthoritiesEditComponent, canActivate: [confirmLoginGuard]},
      {path: 'contractors', component: ContractorListComponent, canActivate: [confirmLoginGuard]},
      {path: 'add-contractor', component: ContractorsAddComponent, canActivate: [confirmLoginGuard]},
      {path: 'edit-contractor/:id', component: ContractorsEditComponent, canActivate: [confirmLoginGuard]},
      {path: 'roles', component: RolesComponent, canActivate: [confirmLoginGuard]},
      {path: 'roles-add', component: RolesAddComponent, canActivate: [confirmLoginGuard]},
      {path: 'users', component: UsersListComponent, canActivate: [confirmLoginGuard]},
      {path: 'users-add', component: UsersAddComponent, canActivate: [confirmLoginGuard]},
      {path: 'users-edit/:id', component: UsersEditComponent, canActivate: [confirmLoginGuard]},
      {path: 'administrators', component: AdministratorsListComponent, canActivate: [confirmLoginGuard]},
      {path: 'administrators-add', component: AdministratorsAddComponent, canActivate: [confirmLoginGuard]},
      {path: 'administrators-edit/:id', component: AdministratorsEditComponent, canActivate: [confirmLoginGuard]},
    ]
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
