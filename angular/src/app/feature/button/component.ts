import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EventsService } from './events.service';
import { ToastsService } from '@shared/toasts.service';

@Component({
    //selector: 'app-button',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonComponent {
    govButtonColor = 'primary';

    noGovButton = false;

    htmlButtonColor = 'neutral';

    noHtmlButton = false;

    constructor(
        public events: EventsService,
        private toasts: ToastsService
    ) {
    }

    click(event: any, action: any = event.detail?.originalEvent ?? event) {
console.log(event.type, event.button, action.which, event);
        if (this.specialKey(event)) {
            this.toasts.warning(`Special key ${event.type} event...`);
        }
        else {
            event.preventDefault();

            if (event.type === 'auxclick' && action.which !== 2) {
                return;
            }

            this.events.add({
                color: event.target?.getAttribute('color') ?? event.target?.parentNode.color,
                type: event.type
            });

            this.toasts.show(`Handling ${event.type} event...`);
        }
    }

    private specialKey(event: any): boolean {
        //if (event.type.startsWith('gov-')) {
        //    event = event.detail?.originalEvent ?? event;
        //}

        return event.ctrlKey || event.altKey || event.shiftKey;
    }

    clear() {
        this.toasts.show(`Removing all event items...`);

        this.events.clear();
    }
}
