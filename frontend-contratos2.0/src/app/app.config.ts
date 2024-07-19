import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {MenubarModule} from "primeng/menubar";
import {MessageService} from "primeng/api";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {TableModule} from "primeng/table";
import {TreeModule} from "primeng/tree";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    MenubarModule,
    MessageService,
    MessageModule,
    MessagesModule,
    provideHttpClient(),
    provideAnimations(),
    MenubarModule,
    TableModule,
    TreeModule

  ]
};
