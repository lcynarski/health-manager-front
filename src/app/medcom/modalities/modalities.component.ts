import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalitiesService } from '../../_services/medcom/modalities.service';
import { DicomModality } from '../../_models/medcom/dicomModality';


@Component({
    selector: 'modalities',
    templateUrl: 'modalities.component.html',
    styleUrls: ['modalities.component.scss']
})
export class ModalitiesComponent implements OnInit, OnDestroy {

    modalities: DicomModality[];
    fetching: boolean = false;

    constructor(private modalitiesService: ModalitiesService) {}

    public ngOnInit() {
        this.fetching = true;
        this.modalitiesService.getModalities()
            .subscribe(
                (modalities) => {
                    this.modalities = modalities;
                    this.fetching = false;
                }
            );
    }

    public ngOnDestroy() {}

}
