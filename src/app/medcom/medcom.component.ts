import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
    selector: 'medcom',
    templateUrl: 'medcom.component.html',
    styleUrls: ['medcom.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MedcomComponent implements OnInit, OnDestroy {

    readonly pages = [
        {
            name: 'Dicom Archive',
            path: '/pages/medcom/dicom-archive',
            index: 0,
        },
        {
            name: 'Procedures Schedule',
            path: '/pages/medcom/procedures-schedule',
            index: 1,
        },
        {
            name: 'Modalities',
            path: '/pages/medcom/modalities',
            index: 2,
        }
    ];
    activePageIndex: number;

    constructor(private router: Router) {
        this.onTabChange({ index: 0 });
        this.handleRouteChanges();
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {

    }

    onTabChange({ index }) {
        this.changePage(this.pages[index]);
    }

    private changePage(page) {
        this.router.navigateByUrl(page.path);
        this.activePageIndex = page.index;
    }

    private handleRouteChanges() {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map((event: NavigationEnd) => event.url)
            .subscribe((url: string) => {
                const newPage = this.pages.find((page) => page.path === url);
                if (newPage) {
                    this.changePage(newPage);
                }
            });
    }

}
