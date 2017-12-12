import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({

    templateUrl: 'welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
    private doRegister: boolean;
    private currentLanguage = '';

    constructor(private router: Router,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.doRegister = false;
        this.currentLanguage = sessionStorage.getItem('currentLang') || 'pl';
    }

    public startRegister() {
        this.doRegister = true;
    }

    public backHome() {
        this.doRegister = false;
    }

    public onLangChange(value) {
        this.translate.use(value);
        sessionStorage.setItem('currentLang', value);
    }

    redirect(pagename: string) {
        this.router.navigate(['/' + pagename]);
    }

}
