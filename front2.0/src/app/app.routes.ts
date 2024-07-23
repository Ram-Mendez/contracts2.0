import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {HomeComponent} from "./home/home/home.component";
import {confirmLoginGuard} from "./login/login/service/confirm-login.guard";
import {ContratosListComponent} from "./contratos/contratos-list/contratos-list.component";
import {ContratosAddComponent} from "./contratos/contratos-add/contratos-add.component";
import {ContratosEditComponent} from "./contratos/contratos-edit/contratos-edit.component";


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
    ],
  },
  {
    path: 'management', component: HomeComponent, canActivate: [confirmLoginGuard],
  }
];
