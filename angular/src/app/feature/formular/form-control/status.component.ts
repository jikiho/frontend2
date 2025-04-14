import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { JsonerPipe } from '@shared/pipes/jsoner.pipe';

@Component({
    selector: 'form-control-status',
    templateUrl: './status.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [JsonerPipe]
})
export class FormControlStatusComponent {
    control = input.required<FormControl | FormGroup>();
}
