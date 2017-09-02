import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalitiesService } from '../../_services/medcom/modalities.service';
import { Modality } from '../../_models/medcom/modality';


@Component({
    selector: 'modalities',
    templateUrl: 'modalities.component.html',
    styleUrls: ['modalities.component.scss']
})
export class ModalitiesComponent implements OnInit, OnDestroy {

    modalities: Modality[];

    constructor(private modalitiesService: ModalitiesService) {}

    public ngOnInit() {
        this.modalitiesService.getMockModalities()
            .subscribe(
                (modalities) => {
                    this.modalities = modalities;
                }
            );
    }

    public ngOnDestroy() {}

}
