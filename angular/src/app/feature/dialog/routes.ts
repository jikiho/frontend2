import { Routes } from '@angular/router';

import { DialogComponent } from './';

export const dialogRoutes: Routes = [
    {
        path: '',
        component: DialogComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
