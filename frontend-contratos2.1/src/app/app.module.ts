import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header/header.component";
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {HomeComponent} from "./home/home/home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './header/footer/footer.component';
import { SidebarComponent } from './header/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, LoginComponent, RegisterComponent, HomeComponent, FooterComponent, SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
