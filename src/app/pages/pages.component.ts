import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { MenuService } from '../navigation';
import { PAGES_MENU } from './pages.menu';
import { Sidebar } from '../navigation/components/sidebar';
import { PageTopComponent } from '../navigation/components/pageTop';

@Component({
    selector: 'pages',
    template: `
        <sidebar></sidebar>
        <page-top></page-top>
        <div class="al-main">
            <div class="al-content">
                <!--<ba-content-top></ba-content-top>-->
                <router-outlet></router-outlet>
            </div>
        </div>
        <!--<ba-back-top position="200"></ba-back-top>-->
    `,
    styles: [
        '.al-main {padding: 66px 0 34px 0; margin-left: 180px}',
        '.al-content {padding: 8px 32px 8px 40px;}'
    ]
})

export class Pages {

    constructor(private _menuService: MenuService,) {
    }

    ngOnInit() {
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }
}
