import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppService } from '@shared/app.service';

@Component({
    selector: 'core-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreFooterComponent {
    constructor(
        public app: AppService
    ) {
    }

    scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
