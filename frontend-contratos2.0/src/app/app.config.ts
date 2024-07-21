import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ContractorsService} from "./contratos/service/contractors.service";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    ContractorsService,


  ]
};
