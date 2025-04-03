import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { defineCustomElements } from '@gov-design-system-ce/components/loader';
defineCustomElements(window);

bootstrapApplication(AppComponent, appConfig).catch((error) => {
    console.error(error);
});
