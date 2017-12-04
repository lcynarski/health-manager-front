import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Spinner } from '../../shared/spinner/Spinners';


@Injectable()
export class SpinnerService {

    public spinnerActionsStream: Observable<SpinnerAction>;
    private spinnerActionsSource: Subject<SpinnerAction>;

    constructor() {
        this.spinnerActionsSource = new Subject();
        this.spinnerActionsStream = this.spinnerActionsSource.asObservable();
    }

    public show(spinner: Spinner): void {
        this.spinnerActionsSource.next({
            spinner,
            isVisible: true
        });
    }

    public hide(spinner: Spinner): void {
        this.spinnerActionsSource.next({
            spinner,
            isVisible: false
        });
    }
}

export interface SpinnerAction {
    spinner: Spinner;
    isVisible: boolean;
}
