import { Routes } from '@angular/router';

import { buttonRoutes } from './button/routes';
import { dialogRoutes } from './dialog/routes';
import { formularRoutes } from './formular/routes';
import { HomeComponent } from './home';
import { menuRoutes } from './menu/routes';

export const featureRoutes: Routes = [
    {
        path: 'button',
        children: buttonRoutes
    },
    {
        path: 'dialog',
        children: dialogRoutes
    },
    {
        path: 'formular',
        children: formularRoutes
    },
    {
        path: 'menu',
        children: menuRoutes
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
