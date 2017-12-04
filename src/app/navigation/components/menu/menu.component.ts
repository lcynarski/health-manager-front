import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MenuService } from '../../services';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../_services';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @Input() sidebarCollapsed: boolean = false;
    @Input() menuHeight: number;

    @Output() expandMenu = new EventEmitter<any>();

    public menuItems: any[];
    protected _menuItemsSub: Subscription;
    public showHoverElem: boolean;
    public hoverElemHeight: number;
    public hoverElemTop: number;
    protected _onRouteChange: Subscription;
    public outOfArea: number = -200;
    public userRole: string = "";

    constructor(
        private _router: Router,
        private _service: MenuService,
        private _state: GlobalState,
        private _authService: AuthenticationService) {
    }

    public updateMenu(newMenuItems) {
        this.menuItems = newMenuItems;
        this.selectMenuAndNotify();
    }

    public selectMenuAndNotify(): void {
        if (this.menuItems) {
            this.menuItems = this._service.selectMenuItem(this.menuItems);
            this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
        }
    }

    public ngOnInit(): void {
        this._onRouteChange = this._router.events.subscribe((event) => {

            if (event instanceof NavigationEnd) {
                if (this.menuItems) {
                    this.selectMenuAndNotify();
                } else {
                    // on page load we have to wait as event is fired before menu elements are prepared
                    setTimeout(() => this.selectMenuAndNotify());
                }
            }
        });

        this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
        this.userRole = this._authService.getRole();
    }

    public ngOnDestroy(): void {
        this._onRouteChange.unsubscribe();
        this._menuItemsSub.unsubscribe();
    }

    public hoverItem($event): void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        // TODO: get rid of magic 66 constant
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
    }

    // public toggleSubMenu($event): boolean {
    //     let submenu = jQuery($event.currentTarget).next();
    //
    //     if (this.sidebarCollapsed) {
    //         this.expandMenu.emit(null);
    //         if (!$event.item.expanded) {
    //             $event.item.expanded = true;
    //         }
    //     } else {
    //         $event.item.expanded = !$event.item.expanded;
    //         submenu.slideToggle();
    //     }
    //
    //     return false;
    // }
}
