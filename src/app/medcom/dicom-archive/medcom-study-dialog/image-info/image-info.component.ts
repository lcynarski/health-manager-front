import { Component } from '@angular/core';
import { CornerstoneService } from '../../../../_services/medcom';
import { DicomImageInfo } from '../../../../_models/medcom/dicomImageInfo';


@Component({
    selector: 'image-info',
    templateUrl: 'image-info.component.html',
    styleUrls: ['image-info.component.scss'],
})
export class ImageInfoComponent {

    imageInfo: DicomImageInfo;

    constructor(private cornerstoneService: CornerstoneService) {
        cornerstoneService.imageInfoStream.subscribe((info) =>
            this.imageInfo = info
        );
    }
}


