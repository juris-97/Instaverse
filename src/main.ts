import {bootstrapApplication} from '@angular/platform-browser';
import {instaverseAppConfig} from './app/instaverse-app.config';
import {InstaverseAppComponent} from './app/instaverse-app.component';

bootstrapApplication(InstaverseAppComponent, instaverseAppConfig)
  .catch((err) => console.error(err));
