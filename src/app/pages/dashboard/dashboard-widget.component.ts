import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
    selector: 'dashboard-widget',
    styleUrls: ['./dashboard-widget.scss'],
    templateUrl: './dashboard-widget.component.html'
})

export class DashboardWidgetComponent implements OnInit {
    @Input('title') title: string;
    @Input('buttonLabel') buttonLabel: string;
    @Input('link') link: string;
    @Input('roles') roles: any;

    public currentUserRole;
    private router: Router;
    private route: ActivatedRoute;
    private toDisplay: boolean;

    constructor(router: Router, route: ActivatedRoute, private authService: AuthenticationService ) {
        this.router = router;
        this.route = route;
    }

    public ngOnInit() {
        this.currentUserRole = this.authService.getRole();
        this.toDisplay = this.roles.includes(this.currentUserRole);
    }
}
