import {Routes} from '@angular/router';
import {LoginComponent} from "./Login/login/login.component";
import {RegisterComponent} from "./Login/register/register.component";
import {HomeComponent} from "./common/home/home.component";
import {AppComponent} from "./app.component";
import {ContactUsComponent} from "./common/header/components/contact-us/contact-us.component";
import {ContratosListComponent} from "./contratos/contratos-list/contratos-list.component";
import {ContratosEditComponent} from "./contratos/contratos-edit/contratos-edit.component";

export const routes: Routes = [
  // router-outlet de app-component carga estas rutas
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact-us', component: ContactUsComponent},

  {
    // el children de "home" carga el contenido del router-outlet
    // de home.component.html
    path: 'home', component: HomeComponent, children: [
      {
        path: '', component: ContratosListComponent, children: [
          {path: 'contracts-edit/:id', component: ContratosEditComponent} // Ruta modificada para incluir :id
        ]
      }
    ]
  },
  {path: '**', redirectTo: 'login'}
];


