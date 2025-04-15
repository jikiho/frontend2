import { ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy, AfterViewInit, Optional } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime as rxDebounceTime, distinctUntilChanged as rxDistinctUntilChanged, map as rxMap } from 'rxjs';

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

    private inits?: Subscription;

    private changes?: Subscription;

    constructor(
        private cdr: ChangeDetectorRef,
        @Optional() private self: NgControl
    ) {
    }

    ngAfterViewInit() {
        this.inits = this.control.subscribe((control) => {
            if (control instanceof NgControl) {
                this.initStatus(control.control as FormControl);
            }
            else {
                this.initStatus(control);
            }
        });
    }

    ngOnDestroy() {
        this.inits?.unsubscribe();

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

        if (control instanceof FormControl) {
            this.changes = control.events.pipe(
                rxDebounceTime(25),
                rxMap(() => this.getStatus(control)),
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

    private hasValue(control: ControlType): boolean {
        return !!control.value;
    }

    private getStatus(control: ControlType): number {
        return (control.dirty ? 1 : 0) + (control.touched ? 2 : 0) + (control.invalid ? 4 : 0) +
                (this.hasValue(control) ? 8 : 0);
    }

    private updateStatus(control: ControlType | null) {
        if (control) {
            const markable = control.dirty || control.touched;

            this.invalid = markable && control.invalid || null;

            if (this.controlSuccess) {
                this.success = markable && control.valid && this.hasValue(control) || null;
            }
            else if (this.success) {
                this.success = null;
            }
        }
        else {
            this.invalid = this.success = null;
        }

        this.cdr.markForCheck();
    }
}
