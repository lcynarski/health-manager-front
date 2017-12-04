// import { Component } from '@angular/core';
//
// @Component({
//     selector: 'app',
//     templateUrl: './app.component.html'
//     // styleUrls: ['./app.component.css']
// })
//
// export class AppComponent { }

import { Component } from '@angular/core';
import { GlobalState } from './global.state';
import { TranslateService } from '@ngx-translate/core';
import { Spinner } from './shared';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isMenuCollapsed: boolean = false;
    spinner = Spinner;

    constructor(private _state: GlobalState,
                private translate: TranslateService) {

        const currentLang = localStorage.getItem('currentLang');

        translate.use(currentLang || 'en');

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

}
