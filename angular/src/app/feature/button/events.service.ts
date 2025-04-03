import { computed, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    items = signal<any[]>([]);

    count = computed(() => this.items().length);

    add(item: any) {
        this.items.update((items) => items.concat(item));
    }

    clear() {
        this.items.set([]);
    }
}
