import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GovDesignSystemModule, GovFormAutocomplete } from "@gov-design-system-ce/angular";

import { JsonerPipe } from '@shared/pipes/jsoner.pipe';

@Component({
    //selector: 'app-formular',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [GovDesignSystemModule, JsonerPipe, ReactiveFormsModule]
})
export class FormularComponent {
    states: string[] = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    formular = new FormGroup({
        name: new FormControl('Johan Jouda', Validators.required),
        state: new FormControl()
    });

    defaults = this.formular.value;

    status = ['dirty', 'valid', 'value'];

    filter(autocomplete: GovFormAutocomplete, event: Event,
            target: any = event.target, value: string | null = target.value) {
console.log(event.type, autocomplete, event);
        autocomplete.setProcessing(true);

        const expr = value && new RegExp(value, 'i'),
            options = expr ? this.states.filter((option) => expr.test(option)) : this.states;

        autocomplete.setOptions(options.map((name) => ({name})));

        autocomplete.setProcessing(false);
    }

    select(event: CustomEvent,
            detail: any = event.detail, value: string | null = detail.selected) {
console.log(event.type, value);
        const control = this.formular.controls.state;

        control.setValue(value);

        control.markAsDirty();
    }
}
