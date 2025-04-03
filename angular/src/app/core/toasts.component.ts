import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ToastsService } from '@shared/toasts.service';

@Component({
    selector: 'core-toasts',
    templateUrl: './toasts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreToastsComponent {
    constructor(
        public toasts: ToastsService
    ) {
    }
}
