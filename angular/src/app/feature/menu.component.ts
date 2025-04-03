import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuService } from '@shared/menu.service';

@Component({
    selector: 'feature-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterModule]
})
export class FeatureMenuComponent {
    constructor(
        public menu: MenuService
    ) {
    }
}
