import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ISlimScrollOptions } from 'ngx-slimscroll';

import { DicomStudy, DicomSeries, DicomInstance } from '../../../../_models';
import { Attribute, DicomAttributesService } from '../../../../_services/medcom';


@Component({
    selector: 'attributes-viewer',
    templateUrl: 'attributes-viewer.component.html',
    styleUrls: ['attributes-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush // treat inputs as immutable objects
})
export class AttributesViewerComponent {

    @Input()
    study: DicomStudy;

    @Input()
    series: DicomSeries;

    @Input()
    instance: DicomInstance;

    scrollOptions: ISlimScrollOptions = {
        position: 'left',
        barBackground: '#748ffc',
        barOpacity: '0.6',
        barWidth: '5',
        barBorderRadius: '0',
        gridBackground: '#fff',
        gridOpacity: '0.6',
        gridWidth: '0',
        gridBorderRadius: '0',
        alwaysVisible: true,
    };

    constructor(private attributesService: DicomAttributesService) {
    }

    get studyAttributes(): Attribute[] {
        return this.attributesService.getAttributes(this.study);
    }

    get seriesAttributes(): Attribute[] {
        return this.attributesService.getAttributes(this.series);
    }

    get instanceAttributes(): Attribute[] {
        return this.attributesService.getAttributes(this.instance);
    }

    @HostListener('mousewheel', ['$event'])
    @HostListener('mousedown', ['$event'])
    private stopEvents(e: Event) {
        e.stopPropagation();
    }
}


