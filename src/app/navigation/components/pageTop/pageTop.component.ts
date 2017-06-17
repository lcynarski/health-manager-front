import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
    selector: 'page-top',
    templateUrl: './pageTop.component.html',
    styleUrls: ['./pageTop.component.scss']
})
export class PageTop {

    public isScrolled:boolean = false;
    public isMenuCollapsed:boolean = false;

    constructor(private _state:GlobalState) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }
}
