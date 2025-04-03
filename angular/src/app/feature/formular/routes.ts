import { Routes } from '@angular/router';

import { FormularComponent } from './';

export const formularRoutes: Routes = [
    {
        path: '',
        component: FormularComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
