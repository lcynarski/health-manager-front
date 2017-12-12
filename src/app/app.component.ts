// import { Component } from '@angular/core';
//
// @Component({
//     selector: 'app',
//     templateUrl: './app.component.html'
//     // styleUrls: ['./app.component.css']
// })
//
// export class AppComponent { }

import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalState } from './global.state';
import { TranslateService } from '@ngx-translate/core';
import { Spinner } from './shared';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    isMenuCollapsed: boolean = false;
    spinner = Spinner;

    constructor(private _state: GlobalState,
                private translate: TranslateService) {

        translate.addLangs(['en', 'pl']);
        translate.setDefaultLang('pl');
        const currentLang = sessionStorage.getItem('currentLang');

        translate.use(currentLang || 'pl' || 'en');

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

}
