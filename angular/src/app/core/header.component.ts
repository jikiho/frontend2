import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreMenuComponent } from './menu.component';
import { MenuService } from '@shared/menu.service';

@Component({
    selector: 'core-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CoreMenuComponent, RouterModule]
})
export class CoreHeaderComponent {
    constructor(
        public menu: MenuService
    ) {
    }
}
