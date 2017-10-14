import {
    Component, HostListener, Inject,
    InjectionToken, OnInit, ViewEncapsulation
} from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';

import {
    DicomStudy, DicomSeries, ExtendedDicomSeries,
    DicomInstance, ExtendedDicomInstance
} from '../../../_models';
import { ArchiveService } from '../../../_services';


export const STUDY_INJECTION_TOKEN = new InjectionToken<DicomStudy>('studyDetails');

@Component({
    selector: 'study-dialog',
    templateUrl: 'medcom-study-dialog.component.html',
    styleUrls: ['medcom-study-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MedcomStudyDialogComponent implements OnInit {

    seriesList: ExtendedDicomSeries[] = [];
    activeSeriesDicomUrls: string[];
    fetchingSeries: boolean = false;
    errorMessage: string;

    constructor(@Inject(STUDY_INJECTION_TOKEN) public study: DicomStudy,
                private dialog: MdlDialogReference,
                private archiveService: ArchiveService) {
    }

    ngOnInit(): void {
        this.fetchSeries();
    }

    onSeriesChange({ index }) {
        console.log('series changed to ' + index);
        const instances = this.seriesList[index].instances;

        this.activeSeriesDicomUrls = (instances)
            ? instances.map((i) => i.dicomUrl)
            : [];
    }

    @HostListener('document:keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }

    private fetchSeries() {
        this.archiveService.getSeries(this.study.instanceUID)
            .subscribe(
                (seriesList: DicomSeries[] = []) => {
                    Promise.all(seriesList.map((series) => this.onSeries(series))) // TODO maybe do this with rxjs instead
                        .then(() => {
                            if (seriesList.length) {
                                this.onSeriesChange({ index: 0 });
                            }
                            this.fetchingSeries = false;
                        });
                },
                (error) => {
                    this.fetchingSeries = false;
                    this.errorMessage = `Error while fetching series: ${error.status} ${error.statusText}`;
                }
            );
    }

    private onSeries(series: DicomSeries): Promise<any> {
        const extendedSeries: ExtendedDicomSeries = { ...series, instances: null };
        this.seriesList.push(extendedSeries);

        return new Promise((resolve, reject) => {
            this.archiveService.getInstances(series.instanceUID)
                .subscribe(
                    (instances: DicomInstance[]) => {
                        extendedSeries.instances = instances.map((instance) =>
                            this.extendInstance(instance));
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    }

    private extendInstance(instance: DicomInstance): ExtendedDicomInstance {
        return {
            ...instance,
            dicomUrl: this.archiveService.resolveDicomUrl(this.study, instance)
        };
    }
}
