import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
    selector: 'medcom',
    templateUrl: 'medcom.component.html',
    styleUrls: ['medcom.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MedcomComponent implements OnInit {

    readonly pages = [
        {
            resCode: 'medcom.dicomArchive.title',
            path: '/pages/medcom/dicom-archive',
            index: 0,
        },
        {
            resCode: 'medcom.proceduresSchedule.title',
            path: '/pages/medcom/procedures-schedule',
            index: 1,
        },
        {
            resCode: 'medcom.modalities.title',
            path: '/pages/medcom/modalities',
            index: 2,
        }
    ];
    activePageIndex: number = 0;

    constructor(private router: Router) {
    }

    public ngOnInit() {
        this.handleRouteChanges();
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
