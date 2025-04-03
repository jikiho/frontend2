import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GovDesignSystemModule, GovDialog } from "@gov-design-system-ce/angular";

import { AppService } from '@shared/app.service';
import { GovDialogFooterComponent, GovDialogTitleComponent } from '@shared/dialog';
import { ToastsService } from '@shared/toasts.service';

@Component({
    //selector: 'app-dialog',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [GovDialogFooterComponent, GovDialogTitleComponent, GovDesignSystemModule]
})
export class DialogComponent {
    texts = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Donec per tellus et habitasse; gravida adipiscing. Interdum erat tortor consequat mollis netus mauris. Lobortis penatibus gravida proin, ante egestas lectus urna habitant. Suspendisse porttitor tristique nisi primis odio. Pretium gravida diam purus odio imperdiet lectus habitant. Porta lacus at pretium placerat viverra amet blandit mattis. Sodales aenean bibendum per conubia vel potenti penatibus ornare.', 'Augue felis blandit natoque sit vehicula ornare porta. Orci aliquam lobortis arcu dictum et ullamcorper quis turpis. Blandit vehicula mus sagittis risus; ipsum platea. Id eu facilisi non arcu tempus mollis quam. Volutpat vivamus proin volutpat curae eget pretium quisque. Fames tortor hendrerit sit morbi vulputate eleifend consequat. Urna lobortis morbi elementum erat turpis montes cras.', 'Eros nascetur lorem purus sollicitudin mattis iaculis facilisis parturient. Eros praesent massa diam turpis nisi vulputate suspendisse id. Maximus tristique suspendisse nisl blandit class cras odio. Est conubia semper magnis finibus volutpat nullam justo donec. Pellentesque commodo fermentum nisl facilisi ultricies per ligula nisi. Curabitur tempus scelerisque ridiculus praesent feugiat elit. Rutrum venenatis dictum, imperdiet tempus pharetra ligula. Aliquet curae ullamcorper maecenas senectus suspendisse mollis. Egestas nulla montes ultricies vehicula nam sociosqu ante dictumst.', 'Duis in ut dis suscipit taciti faucibus est. Lacinia arcu turpis nulla, sodales mattis phasellus vel hendrerit. Cubilia elit neque ornare tristique ligula et. Nulla scelerisque dictum accumsan vehicula in fames. Suscipit vulputate maecenas mauris leo turpis sapien vehicula. Habitant rutrum quis habitant, massa tempor tempus. Dui cursus massa potenti placerat blandit.'];

    constructor(
        public app: AppService,
        private toasts: ToastsService
    ) {
    }

    handleClose(dialog: GovDialog, event: Event) {
console.log(event.type, dialog, event);
        this.toasts.show('Dialog closed');
    }
}
