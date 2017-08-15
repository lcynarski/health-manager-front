import {Component, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dashboard-widget',
    templateUrl: './dashboard-widget.component.html'
    // styleUrls: ['./patientsList.component.scss']
})

export class DashboardWidgetComponent {
    @Input('title') title: string;
    @Input('buttonLabel') buttonLabel: string;
    @Input('link') link: string;
    @Input('roles') roles: any

    private router: Router;
    private route: ActivatedRoute;
    public id: number;

    constructor(router: Router, route: ActivatedRoute ) {
        this.router = router;
        this.route = route;
        this.id = parseInt(this.route.params['patientId'], 10);
    }

    public viewDetails(): void {
        this.router.navigate(['/patientDetails', {patientId: this.id}]);
    }

    public goToList(): void {
        this.router.navigate(['/patientsList']);
    }
}