import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CoreFooterComponent } from './core/footer.component';
import { CoreHeaderComponent } from './core/header.component';
import { CoreToastsComponent } from './core/toasts.component';
import { FeatureMenuComponent } from './feature//menu.component';
import { AppService } from '@shared/app.service';
import { ToastsService } from '@shared/toasts.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CoreFooterComponent, CoreHeaderComponent, CoreToastsComponent, FeatureMenuComponent, RouterOutlet]
})
export class AppComponent {
    constructor(
        public app: AppService,
        public toasts: ToastsService
    ) {
    }
}
