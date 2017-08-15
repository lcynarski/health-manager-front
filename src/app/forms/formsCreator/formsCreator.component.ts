import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsService } from '../../_services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
    providers: [FormsService],
    selector: 'form-creator',
    styleUrls: ['formCreator.component.scss'],
    templateUrl: './formCreator.component.html'
})

export class FormsCreator implements AfterViewInit {

    private router: Router;

    constructor(
        router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private formsService: FormsService) {
        this.router = router;
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

}
