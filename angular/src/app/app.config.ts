import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { featureRoutes } from './feature/routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({
            eventCoalescing: true
        }),
        provideRouter(
            featureRoutes,
            //withComponentInputBinding(),
            withRouterConfig({
                onSameUrlNavigation: 'reload'
            })
        )
    ]
};
