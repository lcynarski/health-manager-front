import { Component, OnInit } from '@angular/core';
import { ModalitiesService, SpinnerService } from '../../_services';
import { DicomModality } from '../../_models/medcom/dicomModality';
import { Spinner } from '../../shared';

@Component({
    selector: 'modalities',
    templateUrl: 'modalities.component.html',
    styleUrls: ['modalities.component.scss']
})
export class ModalitiesComponent implements OnInit {

    modalities: DicomModality[];

    constructor(private modalitiesService: ModalitiesService,
                private spinnerService: SpinnerService) {}

    public ngOnInit() {
        this.spinnerService.show(Spinner.PAGE);
        this.modalitiesService.getModalities()
            .subscribe(
                (modalities) => {
                    this.modalities = modalities;
                    this.spinnerService.hide(Spinner.PAGE);
                },
                (error) => {
                    console.error('could not fetch modalities!', error);
                    this.spinnerService.hide(Spinner.PAGE);
                }
            );
    }

}
