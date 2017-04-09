import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({

    templateUrl: 'welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    redirect(pagename: string) {
        this.router.navigate(['/'+pagename]);
    }

}