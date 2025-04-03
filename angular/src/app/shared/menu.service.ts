import { computed, Injectable, signal } from '@angular/core';

import { ToastsService } from '@shared/toasts.service';

const alphabet = ['Alfa', 'Beta', 'Gama', 'Delta', 'Epsilon', 'Zéta', 'Éta', 'Théta', 'Ióta', 'Kappa', 'Lambda', 'Mí', 'Ný', 'Ksí', 'Omikron', 'Pí', 'Ró', 'Sigma', 'Tau', 'Ypsilon', 'Fí', 'Chí', 'Psí', 'Omega'];

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    count = signal(4);

    maxCount = alphabet.length;

    items = computed(() => alphabet.slice(0, this.count()));

    //alternative = signal(false);

    constructor(
        private toasts: ToastsService
    ) {
    }

    more(): string | undefined {
        return alphabet[this.count()];
    }

    less(): string | undefined {
        return alphabet[this.count() - 1];
    }

    add() {
        this.toasts.show(`Adding menu item ${this.more()}...`);

        this.count.update((value) => value += 1);
    }

    remove() {
        this.toasts.show(`Removing menu item ${this.less()}...`);

        this.count.update((value) => value -= 1);
    }

    set(value: number) {
        if (value >= 0 && value <= this.maxCount) {
            this.count.set(value);
        }
    }

    clear() {
        this.toasts.show('Removing all menu items...');

        this.count.set(0);
    }
}
