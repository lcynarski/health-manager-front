import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({

    templateUrl: 'welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
    private doRegister: boolean;

    constructor(private router: Router,
                private translate: TranslateService) {
        translate.addLangs(['en', 'pl']);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.doRegister = false;
    }

    public startRegister() {
        this.doRegister = true;
    }

    public backHome() {
        this.doRegister = false;
    }

    redirect(pagename: string) {
        this.router.navigate(['/' + pagename]);
    }

}
