import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
    selector: 'gov-dialog-title',
    //template: '<ng-content></ng-content>',
    templateUrl: './gov-dialog-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    host: {
        slot: 'title'
    }
})
export class GovDialogTitleComponent {
    label = input<string>();
}
