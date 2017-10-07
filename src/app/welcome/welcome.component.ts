import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({

    templateUrl: 'welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
    private doRegister: boolean;

    constructor(
        private router: Router,
    ) { }

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
