import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../_services';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-top',
    templateUrl: './pageTop.component.html',
    styleUrls: ['./pageTop.component.scss']
})
export class PageTopComponent implements OnInit {

    public isMenuCollapsed: boolean = false;
    private email: string = '';
    private labels = {
        logout: 'logout'
    };

    constructor(private _state: GlobalState,
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthenticationService,
                private translate: TranslateService) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public ngOnInit() {
        this.email = this.authService.getEmail();
        this.translate.get('Logout')
            .subscribe((res) => this.labels.logout = res);
    }

    public logout() {
        this.authService.logout();
    }
}
