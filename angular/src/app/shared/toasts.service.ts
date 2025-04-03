import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastsService {
    items = signal<any[]>([]);

    private count = 0;

    private config = {
        color: 'primary',
        type: 'subtle',
        gravity: 'top',
        position: 'center',
        time: 1500,
        icon: ''
    };

    show(message: string, config?: any) {
        const item = {
                index: ++this.count,
                message,
                hidden: signal(true),
                ...this.config,
                ...config
            };

        this.items.update((items) => items.concat(item));

        setTimeout(() => {
            item.hidden.set(false);
        });
    }

    neutral(message: string, config?: any) {
        this.show(message, {
            color: 'neutral',
            ...config
        });
    }

    success(message: string, config?: any) {
        this.show(message, {
            color: 'success',
            ...config
        });
    }

    warning(message: string, config?: any) {
        this.show(message, {
            color: 'warning',
            ...config
        });
    }

    error(message: string, config?: any) {
        this.show(message, {
            color: 'error',
            ...config
        });
    }
}
