import { Routes } from '@angular/router';

import { ButtonComponent } from './';

export const buttonRoutes: Routes = [
    {
        path: '',
        component: ButtonComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
