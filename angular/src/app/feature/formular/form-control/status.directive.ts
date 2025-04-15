import { ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy, AfterViewInit, Optional } from '@angular/core';
import { AbstractControl, FormControl, NgControl, PristineChangeEvent, StatusChangeEvent, TouchedChangeEvent } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged as rxDistinctUntilChanged, map as rxMap } from 'rxjs';

type ControlType = FormControl | NgControl;

@Directive({
    selector: '[formControlInvalid], [formControlStatus]'
})
export class FormControlStatusDirective implements AfterViewInit, OnDestroy {
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

    private control = new BehaviorSubject<ControlType | null>(null);

    private initialized!: Subscription;

    private changes?: Subscription;

    constructor(
        private cdr: ChangeDetectorRef,
        @Optional() private self: NgControl
    ) {
    }

    ngAfterViewInit() {
        this.initialized = this.control.subscribe((control) => {
            if (control instanceof NgControl) {
                this.initStatus(control.control as FormControl);
            }
            else {
                this.initStatus(control);
            }
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

    private initStatus(control: ControlType | null) {
        this.changes?.unsubscribe();

        this.updateStatus(control);

        //TODO? první nastavení invalid se jinak neprojeví
        this.cdr.markForCheck();

        if (control instanceof FormControl) {
            this.changes = control.events.pipe(
                rxMap(() => (control.dirty ? 1 : 0) + (control.touched ? 2 : 0) + (control.invalid ? 4 : 0)),
                rxDistinctUntilChanged()
            )
            .subscribe(() => {
                this.updateStatus(control);
            });
        }
        else if (control?.statusChanges) {
console.warn("Detect only status changes", control);
            this.changes = control.statusChanges.subscribe(() => {
                this.updateStatus(control);
            });
        }
    }

    private updateStatus(control: ControlType | null) {
        if (!control) {
            this.invalid = this.success = null;
        }
        else {
            const markable = this.isMarkable(control);

            this.invalid = markable && control?.invalid || null;

            if (this.controlSuccess) {
                this.success = markable && control?.valid || null;
            }
            else if (this.success) {
                this.success = null;
            }
        }
    }

    private isMarkable(control: ControlType): boolean {
        if (control.dirty || control.touched) {
            return true;
        }
        //else if (this.options.markNotNull && control.value !== null) {
        //    return true;
        //}
        //else if (this.options.markNotEmpty && control.value !== '') {
        //    return true;
        //}

        return false;
    }
}
