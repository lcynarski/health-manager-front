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

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isMenuCollapsed: boolean = false;

    constructor(private _state: GlobalState ) {

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

}
