import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './instaverse-app.routes';

export const instaverseAppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
