import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({

    selector: 'patients-list-item',
    templateUrl: 'patients-list-item.component.html'
})

export class PatientsListItemComponent {

    private router: Router;
    private route: ActivatedRoute;
    public id: number;

    constructor(router: Router, route: ActivatedRoute ) {
        this.router = router;
        this.route = route;
        this.id = parseInt(this.route.params['patientId'], 10);
    }

    public goToList(): void {
        this.router.navigate(['/PatientsList']);
    }
}