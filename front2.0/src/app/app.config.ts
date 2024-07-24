import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {BrowserModule} from "@angular/platform-browser";
import {TreeModule} from "primeng/tree";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(),
    ReactiveFormsModule,
    MessageService,
    TreeModule,
    provideAnimations(),
    ButtonModule,
    BrowserModule,
    FormsModule,

  ]
};
