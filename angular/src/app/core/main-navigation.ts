import {blockRapidClicks, createID, debounce, delay, firstFocusableElement, toBool} from "@gov-design-system-ce/utils";

const TABLET_SIZE = 768;

export class MainNavigation {
    rootElement: Element;

    constructor(rootElement: Element) {
        this.rootElement = rootElement;
        this.verifyAndFixAccesbillity(this.rootUlElement);

        this.calculateSizeOfElements();
        this.registerListeners();
        this.accesbillityMobileNavigation().catch();

        if (window.innerWidth >= TABLET_SIZE) {
            this.moveDeferredItems().catch()
            this.controlHeaderNavigation();
        } else {
            this.controlHeaderNavigation(false);
        }
    }

    private registerListeners() {
        this.registerClickTriggers();

        window.addEventListener('resize', debounce(() => {
            this.resetDeferredMenu();
            if (window.innerWidth >= TABLET_SIZE) {
                this.controlHeaderNavigation();
                this.moveDeferredItems().catch();
            } else {
                this.controlHeaderNavigation(false);
            }
        }, 50))
    }

    private async moveDeferredItems() {
        const gap = 16;
        let size = this.rootElement.getBoundingClientRect().width - 120;

        this.firstLevelLiElements.forEach((liElement) => {
            const itemSize = liElement.getBoundingClientRect().width + gap;

            if ((size - itemSize) >= 0) {
                size -= itemSize;
            } else {
                size -= itemSize;
                this.createDeferredContainer();
                this.deferredItemsContainer!.removeAttribute('hidden');
                this.deferredItemsContainer!.setAttribute('aria-hidden', 'false');
                this.temporaryListForDeferredItems!.appendChild(liElement);
            }
        })
    }

    private get temporaryListForDeferredItems() {
        return this.deferredItemsContainer!.querySelector('ul');
    }

    private createDeferredContainer() {
        if (this.deferredItemsContainer) {
            return;
        }

        const controlId = createID('MenuDeferred');
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        const trigger = document.createElement('gov-button');
        const icon = document.createElement('gov-icon');
        const deferredName = this.rootElement.getAttribute('data-deferred-item-name');

        li.classList.add('js-deferred-items-container');

        trigger.setAttribute('type', 'base');
        trigger.setAttribute('color', 'primary');
        trigger.setAttribute('size', 'l');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', controlId);
        trigger.setAttribute('aria-label', 'Zobrazit další položky');
        trigger.innerHTML = deferredName ?? 'Další';

        icon.setAttribute('type', 'templates');
        icon.setAttribute('name', 'chevron-down');
        icon.setAttribute('size', 'l');
        icon.setAttribute('slot', 'icon-end');

        ul.setAttribute('id', controlId);
        ul.setAttribute('hidden', 'hidden');
        ul.setAttribute('aria-hidden', 'true');
        ul.classList.add('gov-deferred-navigation');

        trigger.appendChild(icon);
        trigger.addEventListener('gov-click', blockRapidClicks(() => this.toggleMenu(trigger)));

        li.appendChild(trigger);
        li.appendChild(ul);

        this.rootUlElement.appendChild(li);
    }

    private resetDeferredMenu() {
        this.deferredItemsContainer?.querySelectorAll(':scope > ul > li').forEach((liElement) => this.rootUlElement.appendChild(liElement));
        this.rootUlElement?.querySelectorAll(':scope > .gov-mobile-only').forEach((liElement) => this.rootUlElement.appendChild(liElement));
        this.deferredItemsContainer?.remove();
    }

    private calculateSizeOfElements() {
        this.firstLevelLiElements.forEach((liElement, i) => {
            liElement.setAttribute('data-item-width', liElement.getBoundingClientRect().width.toString());
            liElement.setAttribute('data-item-index', i.toString());
        })
    }

    private registerClickTriggers() {
        this.firstLevelLiElements.forEach((liElement) => {
            const trigger = this.getTriggerInLiElement(liElement);
            const innerList = this.getInnerListInLiElement(liElement);

            if (!trigger || !innerList) {
                return;
            }

            trigger.addEventListener('gov-click', blockRapidClicks(() => this.toggleMenu(trigger)));
            trigger.addEventListener('click', blockRapidClicks(() => this.toggleMenu(trigger)));
        })
    }

    private hideOpenedMenu(icons: string[]) {
        this.firstLevelLiElements.forEach((liElement) => {
            const trigger = this.getTriggerInLiElement(liElement);
            const innerList = this.getInnerListInLiElement(liElement);

            if (!trigger || !innerList) {
                return;
            }

            const controlId = this.resolveTriggerType(trigger)!.getAttribute('aria-controls');
            const isExpanded = toBool(this.resolveTriggerType(trigger)!.getAttribute('aria-expanded'));
            const menuLevel = document.querySelector('[id="' + controlId + '"]');
            const iconElement = trigger.querySelector('gov-icon');

            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                menuLevel!.setAttribute('hidden', 'hidden');
                menuLevel!.setAttribute('aria-hidden', 'true');
                iconElement && iconElement.setAttribute('name', icons[0]);
            }
        })
    }

    private toggleMenu(trigger: HTMLElement, icons = ['chevron-down', 'chevron-up']) {
        this.hideOpenedMenu(icons);
        const controlId = this.resolveTriggerType(trigger)!.getAttribute('aria-controls');
        const isExpanded = toBool(this.resolveTriggerType(trigger)!.getAttribute('aria-expanded'));
        const menuLevel = document.querySelector('[id="' + controlId + '"]');
        const iconElement = trigger.querySelector('gov-icon');

        if (!menuLevel) {
            return;
        }

        if (isExpanded) {
            trigger.setAttribute('aria-expanded', 'false');
            menuLevel.setAttribute('hidden', 'hidden');
            menuLevel.setAttribute('aria-hidden', 'true');
            iconElement && iconElement.setAttribute('name', icons[0]);
        } else {
            trigger.setAttribute('aria-expanded', 'true');
            menuLevel.removeAttribute('hidden');
            menuLevel.setAttribute('aria-hidden', 'false');
            iconElement && iconElement.setAttribute('name', icons[1]);
        }

        const elementToFocus = firstFocusableElement(menuLevel);
        if (elementToFocus) {
            elementToFocus.focus && elementToFocus.focus();
        }
    }

    private verifyAndFixAccesbillity(ul: HTMLUListElement) {
        this.getLiElementsInUlElement(ul).forEach((liElement) => {
            const trigger = this.getTriggerInLiElement(liElement);
            const innerList = this.getInnerListInLiElement(liElement);

            if (!trigger || !innerList) {
                return;
            }

            const controlsId = createID('MainMenu');

            if (trigger.getAttribute('aria-controls') !== innerList.getAttribute('id')) {
                trigger.setAttribute('aria-controls', controlsId);
                innerList.setAttribute('id', controlsId);
            }

            if (!trigger.getAttribute('aria-expanded')) {
                trigger.setAttribute('aria-expanded', 'false')
            }

            if (!trigger.getAttribute('aria-label')) {
                trigger.setAttribute('aria-label', 'Zobrazit / Skrýt položky sekce ' + trigger.textContent)
            }

            this.verifyAndFixAccesbillity(innerList);
        })
    }

    private async accesbillityMobileNavigation() {
        const trigger = document.querySelector<HTMLElement>('.js-gov-header__navigation-trigger');
        const menu = this.headerNavigationElement;

        if (!trigger || !menu) {
            return
        }

        await delay(500);

        const controller = this.resolveTriggerType(trigger);
        const controlsId = createID('MainMobileMenu');

        if (controller!.getAttribute('aria-controls') !== menu.getAttribute('id') || menu.getAttribute('id') === null) {
            trigger.setAttribute('aria-controls', controlsId);
            menu.setAttribute('id', controlsId);
        }

        if (!controller!.getAttribute('aria-expanded')) {
            trigger.setAttribute('aria-expanded', 'false')
        }

        if (!controller!.getAttribute('aria-label')) {
            trigger.setAttribute('aria-label', 'Zobrazit / Skrýt menu')
        }

        trigger.addEventListener('gov-click', blockRapidClicks(() => this.toggleMenu(trigger, ['list', 'x-lg'])));
        trigger.addEventListener('click', blockRapidClicks(() => this.toggleMenu(trigger, ['list', 'x-lg'])));
    }

    private controlHeaderNavigation(show = true) {
        if (show) {
            this.headerNavigationElement?.removeAttribute('hidden')
            this.headerNavigationElement?.removeAttribute('aria-hidden')
        } else {
            this.headerNavigationElement?.setAttribute('hidden', 'hidden')
            this.headerNavigationElement?.setAttribute('aria-hidden', 'true')
        }
    }

    private resolveTriggerType(trigger: HTMLElement) {
        return trigger && trigger.nodeName === 'GOV-BUTTON' ? trigger.querySelector('button') : trigger;
    }

    private getTriggerInLiElement(liElement: HTMLLIElement) {
        return liElement.querySelector(':scope > gov-button, :scope > button') as HTMLLIElement;
    }

    private getInnerListInLiElement(liElement: HTMLLIElement) {
        return liElement.querySelector(':scope > ul') as HTMLUListElement;
    }

    private getLiElementsInUlElement(ulElement: HTMLUListElement): NodeListOf<HTMLLIElement> {
        return ulElement.querySelectorAll(':scope > li');
    }

    private get firstLevelLiElements(): NodeListOf<HTMLLIElement> {
        return this.rootUlElement.querySelectorAll(':scope > li:not(.gov-mobile-only)');
    }

    private get deferredItemsContainer() {
        return this.rootElement.querySelector('.js-deferred-items-container');
    }

    private get rootUlElement() {
        return this.rootElement.querySelector(':scope > ul') as HTMLUListElement;
    }

    private get headerNavigationElement() {
        return document.querySelector<HTMLElement>('.js-gov-header__navigation');
    }
}
