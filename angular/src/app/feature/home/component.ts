import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common';

type Interval = ReturnType<typeof setTimeout>;

@Component({
    //selector: 'app-home',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [DatePipe]
})
export class HomeComponent {
    timestamp = signal(Date.now());

    update = signal(true);

    seconds = signal(true);

    interval?: Interval;

    format?: string;

    private handleUpdate = effect(() => {
        if (this.update()) {
            this.updateTimestamp();
        }
        else if (this.interval) {
            clearTimeout(this.interval);
        }
    });

    private handleSeconds = effect(() => {
        this.format = this.seconds() ? 'H:mm:ss' : 'H:mm';
    });

    private updateTimestamp() {
        const value = Date.now(),
            seconds = this.seconds() ?  1 : 60,
            n = seconds * 1000;

        this.timestamp.set(value);

        if (this.interval) {
            clearTimeout(this.interval);
        }

        this.interval = setTimeout(() => {
            this.updateTimestamp();
        }, n - (value / n % 1 * n));
    }
}
