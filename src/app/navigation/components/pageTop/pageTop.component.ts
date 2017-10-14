import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../../global.state';

@Component({
    selector: 'page-top',
    templateUrl: './pageTop.component.html',
    styleUrls: ['./pageTop.component.scss']
})
export class PageTop {

    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;

    constructor(private _state: GlobalState,
                private router: Router,
                private route: ActivatedRoute,) {
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
