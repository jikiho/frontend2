import { Directive, HostBinding, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormControl, NgControl, PristineChangeEvent, StatusChangeEvent, TouchedChangeEvent } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

type ControlType = FormControl | NgControl | null;

@Directive({
    selector: '[formControlInvalid], [formControlStatus]'
})
export class FormControlStatusDirective implements OnInit, OnDestroy {
    @HostBinding('attr.invalid')
    invalid: true | null = null;

    @HostBinding('attr.success')
    success: true | null = null;

    private controlSuccess = false;

    @Input('formControlInvalid')
    set _controlInvalid(value: any) {
        this.initControl(value);

        this.controlSuccess = false;
    }

    @Input('formControlStatus')
    set _controlStatus(value: any) {
        this.initControl(value);

        this.controlSuccess = !!this.control.getValue();
    }

    private control = new BehaviorSubject<ControlType>(null);

    private initialized!: Subscription;

    private changes?: Subscription;

    constructor(
        @Optional() private self: NgControl
    ) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.initialized = this.control.subscribe((control) => {
                if (control instanceof NgControl) {
                    this.initStatus(control.control as FormControl);
                }
                else {
                    this.initStatus(control);
                }
            });
        });
    }

    ngOnDestroy() {
        this.initialized.unsubscribe();

        this.changes?.unsubscribe();
    }

    private initControl(value: '' | boolean | ControlType) {
        if (value === '' || value === true) {
            this.control.next(this.self);
        }
        else if (value instanceof FormControl || value instanceof NgControl) {
            this.control.next(value);
        }
        else {
            this.control.next(null);
        }
    }

    private initStatus(control: ControlType) {
        this.changes?.unsubscribe();

        this.updateStatus(control);

        if (control instanceof FormControl) {
            this.changes = control.events.subscribe((event) => {
                if (event instanceof PristineChangeEvent || event instanceof TouchedChangeEvent ||
                        event instanceof StatusChangeEvent) {
                    this.updateStatus(control);
                }
            });
        }
        else if (control?.statusChanges) {
console.warn("Detect only status changes", control);
            this.changes = control.statusChanges.subscribe(() => {
                this.updateStatus(control);
            });
        }
    }

    private updateStatus(control: ControlType) {
        this.invalid = control?.invalid && (control.dirty || control.touched) || null;

        if (this.controlSuccess) {
            this.success = control?.value && control?.valid || null;
        }
        else if (this.success) {
            this.success = null;
        }
    }
}
