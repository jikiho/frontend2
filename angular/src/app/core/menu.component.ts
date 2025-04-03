import { AfterViewInit, Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { MenuService } from '@shared/menu.service';
import { MainNavigation } from './main-navigation';

@Component({
    selector: 'core-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreMenuComponent implements AfterViewInit {
    @ViewChild('menu_element')
    private menuElement?: ElementRef;

    constructor(
        public menu: MenuService
    ) {
        toObservable(this.menu.items).subscribe(() => {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            });
        });
    }

    ngAfterViewInit() {
        if (this.menuElement) {
            new MainNavigation(this.menuElement.nativeElement);
        }
    }
}
