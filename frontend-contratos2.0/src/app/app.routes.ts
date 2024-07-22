import {Routes} from '@angular/router';
import {LoginComponent} from "./Login/login/login.component";
import {RegisterComponent} from "./Login/register/register.component";
import {HomeComponent} from "./common/home/home.component";
import {AppComponent} from "./app.component";
import {ContactUsComponent} from "./common/header/components/contact-us/contact-us.component";
import {ContratosListComponent} from "./contratos/contratos-list/contratos-list.component";
import {ContratosEditComponent} from "./contratos/contratos-edit/contratos-edit.component";
import {AdministrationComponent} from "./common/header/components/administration/administration.component";
import {ContratosAddComponent} from "./contratos/contratos-add/contratos-add.component";
import {ContratosInventoryComponent} from "./contratos/contratos-inventory/contratos-inventory.component";
import {InventoryAddComponent} from "./contratos/contratos-inventory/inventory-add/inventory-add.component";
import {InventoryListComponent} from "./contratos/contratos-inventory/inventory-list/inventory-list.component";
import {InventoryEditComponent} from "./contratos/contratos-inventory/inventory-edit/inventory-edit.component";
import {ContratosFileManagerComponent} from "./contratos/contratos-file-manager/contratos-file-manager.component";
import {UsersComponent} from "./common/header/components/administration/users/users.component";
import {RolesComponent} from "./common/header/components/administration/roles/roles.component";
import {AuthoritiesComponent} from "./common/header/components/administration/authorities/authorities.component";
import {ContractorsComponent} from "./common/header/components/administration/contractors/contractors.component";

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'contact-us', component: ContactUsComponent},

    // el children de "home" carga el contenido del router-outlet
    // de home.component.html
    {
      path: 'home', component: HomeComponent, children: [
        {path: '', component: ContratosListComponent},
        {path: 'contracts-add', component: ContratosAddComponent},
        {
          path: 'contracts-edit/:id', component: ContratosEditComponent,
          children: [
            {path: 'inventory', component: ContratosInventoryComponent},
            {path: 'files', component: ContratosFileManagerComponent},

          ]
        },
        {
          path: 'administration', component: AdministrationComponent, children: [
            {path: 'users', component: UsersComponent},
            {path: 'roles', component: RolesComponent},
            {path: 'authorities', component: AuthoritiesComponent},
            {path: 'contractors', component: ContractorsComponent}
          ]
        },
      ],
    },
    {path: '**', redirectTo: 'home'}
  ]
;


