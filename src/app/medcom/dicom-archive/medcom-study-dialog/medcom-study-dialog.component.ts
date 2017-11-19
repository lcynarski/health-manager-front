import { Component, HostListener, Inject, InjectionToken, OnInit, ViewEncapsulation } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';

import { DicomInstance, DicomSeries, DicomStudy } from '../../../_models';
import { ArchiveService, CornerstoneService, DicomAttributesService } from '../../../_services';


export const STUDY_INJECTION_TOKEN = new InjectionToken<DicomStudy>('studyDetails');

@Component({
    selector: 'study-dialog',
    templateUrl: 'medcom-study-dialog.component.html',
    styleUrls: ['medcom-study-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MedcomStudyDialogComponent implements OnInit {

    seriesList: DicomSeries[] = [];
    activeSeries: DicomSeries;
    activeInstance: DicomInstance;

    fetchingSeries: boolean = false;
    errorMessage: string;
    infoBoxVisible: boolean = false;
    toolsPaneVisible: boolean = true;

    constructor(@Inject(STUDY_INJECTION_TOKEN) public study: DicomStudy,
                private dialog: MdlDialogReference,
                private archiveService: ArchiveService,
                private cornerstoneService: CornerstoneService,
                private attributesService: DicomAttributesService) {
    }

    ngOnInit(): void {
        this.attributesService.clearCache();
        this.cornerstoneService.resetTools();
        this.fetchSeries();
    }

    onSeriesChange(index) {
        this.activeSeries = this.seriesList[index];
    }

    onImageLoaded(instance: DicomInstance) {
        this.activeInstance = instance;
    }

    @HostListener('document:keydown.i')
    toggleInfoBox() {
        this.infoBoxVisible = !this.infoBoxVisible;
        this.toolsPaneVisible = false;
    }

    @HostListener('document:keydown.t')
    toggleToolsPane() {
        this.toolsPaneVisible = !this.toolsPaneVisible;
        this.infoBoxVisible = false;
    }

    @HostListener('document:keydown.esc')
    public closeDialog(): void {
        this.dialog.hide();
    }

    private fetchSeries() {
        this.archiveService.getSeries(this.study.instanceUID)
            .subscribe(
                (seriesList: DicomSeries[] = []) => { // TODO fit multiple tabs
                    // MOCK
                    /*
                     seriesList.push({
                     instanceUID: '1.3.6.1.4.1.5962.1.1.0.0.0.1194732126.13032.0.55',
                     studyInstanceUID: 'test1',
                     modalityAET: 'test1',
                     attributes: {
                     SeriesDescription: 'test series 1'
                     },
                     });
                     seriesList.push({
                     instanceUID: '1.3.6.1.4.1.5962.1.1.0.0.0.1194732126.13032.0.55',
                     studyInstanceUID: 'test2',
                     modalityAET: 'test2',
                     attributes: {
                     SeriesDescription: 'test series 2'
                     },
                     });
                     */
                    // MOCK

                    Promise.all(seriesList.map((series) => this.onSeries(series))) // TODO maybe do this with rxjs instead
                        .then(() => {
                            if (seriesList.length) {
                                this.onSeriesChange(0);
                            }
                            this.fetchingSeries = false;
                        })
                        .catch((error) => this.onError(error, 'Could not fetch images'));
                },
                (error) => this.onError(error, 'Could not fetch series')
            );
    }

    private onError(error: any, message: string): void {
        this.fetchingSeries = false;
        this.errorMessage = `${message}: ${error.status} ${error.statusText}`;
    }

    private onSeries(series: DicomSeries): Promise<any> {
        this.seriesList.push(series);

        return new Promise((resolve, reject) => {
            this.archiveService.getInstances(series.instanceUID)
                .subscribe(
                    (instances: DicomInstance[]) => {
                        series.instances = instances.map((instance) => {
                            instance.dicomUrl = this.archiveService.resolveDicomUrl(this.study, instance);
                            return instance;
                        });
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    }
}
