import { Routes } from '@angular/router';

import { MenuComponent } from './';

export const menuRoutes: Routes = [
    {
        path: '',
        component: MenuComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
