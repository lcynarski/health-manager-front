import { Component, HostListener, Inject, InjectionToken, OnInit, ViewEncapsulation } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { DicomInstance, DicomSeries, DicomStudy } from '../../../_models';
import { ArchiveService, CornerstoneService, DicomAttributesService } from '../../../_services';


export const STUDY_INJECTION_TOKEN = new InjectionToken<DicomStudy>('studyDetails');

@Component({
    selector: 'study-dialog',
    templateUrl: 'study-dialog.component.html',
    styleUrls: ['study-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class StudyDialogComponent implements OnInit {

    seriesList: DicomSeries[] = [];
    activeSeries: DicomSeries;
    activeInstance: DicomInstance;

    infoBoxVisible: boolean = false;
    toolsPaneVisible: boolean = true;
    loading: boolean = false;

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
        this.loading = true;
        this.activeSeries = Object.assign({}, this.seriesList[index]);
    }

    onImageLoaded(instance: DicomInstance) {
        this.activeInstance = instance;
        this.loading = false;
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
        this.loading = false;
        this.dialog.hide();
    }

    private fetchSeries() {
        this.loading = true;
        this.archiveService.getSeries(this.study.instanceUID)
            .subscribe(
                (seriesList: DicomSeries[] = []) => { // TODO fit multiple tabs
                    Promise.all(seriesList.map((series) => this.onSeries(series))) // TODO maybe do this with rxjs instead
                        .then(() => {
                            if (seriesList.length) {
                                this.onSeriesChange(0);
                            }
                        })
                        .catch((error) => this.onError(error, 'Could not fetch images'));
                },
                (error) => this.onError(error, 'Could not fetch series')
            );
    }

    private onError(error: any, message: string): void {
        this.loading = false;
        console.error(message, error);
        this.closeDialog();
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
