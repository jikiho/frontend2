import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MenuService } from '@shared/menu.service';

@Component({
    //selector: 'app-menu',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuComponent implements OnDestroy {
    private subs = new Subscription();

    constructor(
        public menu: MenuService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.menu.set(Number(this.route.snapshot.params['count']));

        this.subs.add(toObservable(this.menu.count).subscribe((count) => {
            this.router.navigate([{count}], {
                replaceUrl: true
            });
        }));
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
