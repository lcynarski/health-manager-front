import { Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Spinner } from './Spinners';
import { SpinnerService } from '../../_services';


// make sure container component has position:relative style
@Component({
    selector: 'hm-spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

    @Input()
    public size: number = 20;

    @Input()
    public spinner: Spinner = null;

    @Input()
    public className: string;

    @Input()
    public isVisible: boolean = false;

    private subscription: Subscription;

    constructor(private spinnerService: SpinnerService) {
    }

    ngOnInit(): void {
        if (this.spinner !== null) {
            this.subscription = this.spinnerService.spinnerActionsStream
                .filter((action) => action.spinner === this.spinner)
                .subscribe((action) => this.isVisible = action.isVisible);
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    @HostListener('mousewheel', ['$event'])
    @HostListener('mousedown', ['$event'])
    private stopEvents(e: Event) {
        e.stopPropagation();
    }
}
