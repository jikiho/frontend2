import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GovDesignSystemModule, GovFormAutocomplete } from "@gov-design-system-ce/angular";

import { FormControlStatusComponent, FormControlStatusDirective } from './form-control/status';

@Component({
    //selector: 'app-formular',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormControlStatusComponent, FormControlStatusDirective, GovDesignSystemModule, ReactiveFormsModule]
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

    items: any[] = this.states.map((name) => ({
        name,
        value: name.toLowerCase()
    }));

    formular = new FormGroup({
        stateGovInput: new FormControl(null, Validators.required),
        stateGovAutocomplete: new FormControl(null, Validators.required),
        stateGovSelect: new FormControl(),
        stateSelect: new FormControl()
    });

    defaults = this.formular.value;

    filter(autocomplete: GovFormAutocomplete, event: Event,
            target: any = event.target, name: string | null = target.value) {
        autocomplete.setProcessing(true);

        const value = name?.toLowerCase(),
            options = value ? this.items.filter((option) => option.value.includes(value)) : this.items;

        autocomplete.setOptions(options);

        autocomplete.setProcessing(false);
console.log(event.type, options.length, name);
    }

    select(event: CustomEvent,
            detail: any = event.detail, value: any | null = detail.selected) {
console.log(event.type, value);
        const control = this.formular.controls.stateGovAutocomplete;

        control.setValue(value);

        control.markAsDirty();
    }
}
