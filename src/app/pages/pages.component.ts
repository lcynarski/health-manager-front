import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { MenuService } from '../navigation';
import { PAGES_MENU } from './pages.menu';
import { Spinner } from '../shared';

@Component({
    selector: 'pages',
    template: `
        <sidebar></sidebar>
        <page-top></page-top>
        <div class="hm-main">
            <div class="hm-content">
                <router-outlet></router-outlet>
            </div>
            <hm-spinner [spinner]="spinner.PAGE" [size]="150" [styles]="{marginLeft: '90px', position: 'fixed'}"></hm-spinner>
        </div>
    `,
    styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {

    spinner = Spinner;

    constructor(private _menuService: MenuService,) {
    }

    ngOnInit() {
        this._menuService.updateMenuByRoutes(PAGES_MENU as Routes);
    }
}
