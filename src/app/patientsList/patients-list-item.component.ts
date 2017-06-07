import {Component, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'patients-list-item',
    templateUrl: 'patients-list-item.component.html',
    styleUrls: ['./patientsList.component.scss']
})

export class PatientsListItemComponent {
    @Input('firstName') firstName: string;
    @Input('lastName') lastName: string;

    private router: Router;
    private route: ActivatedRoute;
    public id: number;

    constructor(router: Router, route: ActivatedRoute ) {
        this.router = router;
        this.route = route;
        this.id = parseInt(this.route.params['patientId'], 10);
    }

    public viewDetails(): void {
        this.router.navigate(['/patientDetails', {userId: this.id}]);
    }

    public goToList(): void {
        this.router.navigate(['/patientsList']);
    }
}