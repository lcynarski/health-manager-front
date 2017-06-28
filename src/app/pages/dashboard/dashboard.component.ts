import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class Dashboard {
    private router: Router;

    constructor() {
    }

    public goToCreatePatient = () => {
        this.router.navigate(['/createPatient']);
    }
}
