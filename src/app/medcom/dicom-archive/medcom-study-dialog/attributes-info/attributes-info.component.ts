import { Component, Input } from '@angular/core';
import { DicomStudy, DicomSeries } from '../../../../_models';

@Component({
    selector: 'attributes-info',
    templateUrl: 'attributes-info.component.html',
    styleUrls: ['attributes-info.component.scss'],
})
export class AttributesInfoComponent {

    @Input()
    study: DicomStudy;

    @Input()
    series: DicomSeries;

    constructor() {}

}
