import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';

export class PatientsDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor(public patients: any) {
        super();
    }

    connect(): Observable<any> {
        const displayDataChanges = [
            this.patients,
            this._filterChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.patients.slice().filter((item: any) => {
                const searchStr = (item.firstName + item.lastName).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });
        });
    }

    disconnect() {
    }
}