import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DicomObject, DicomStudy, DicomSeries, DicomInstance } from '../../_models/medcom';

export interface Attribute {
    key: string;
    value: string;
}

const DATE_FORMAT = 'dd.MM.yyyy HH:mm:ss';

@Injectable()
export class DicomAttributesService {

    private attributesCache: Map<string, Attribute[]> = new Map();
    private datePipe = new DatePipe('pl');

    public getAttributes(dicomObject: DicomObject): Attribute[] {
        let attributes = this.attributesCache.get(dicomObject.instanceUID);

        if (attributes) {
            return attributes;
        }

        if (DicomInstance.is(dicomObject)) {
            attributes = this.createInstanceAttributes(dicomObject as DicomInstance);
        } else if (DicomSeries.is(dicomObject)) {
            attributes = this.createSeriesAttributes(dicomObject as DicomSeries);
        } else if (DicomStudy.is(dicomObject)) {
            attributes = this.createStudyAttributes(dicomObject as DicomStudy);
        } else {
            throw new TypeError(`unknown dicomObject - ${typeof dicomObject}`);
        }

        this.attributesCache.set(dicomObject.instanceUID, attributes);
        return attributes;
    }

    public clearCache(): void {
        this.attributesCache.clear();
    }

    private createInstanceAttributes(instance: DicomInstance): Attribute[] {
        return this.createAttributesList(
            instance.attributes,
            ['InstanceCreationDate', 'InstanceCreationTime', 'modality'],
            {
                sopClassName: instance.sopClassName,
                creationDate: this.formatDate(instance.creationDate)
            }
        );
    }

    private createSeriesAttributes(series: DicomSeries): Attribute[] {
        return this.createAttributesList(
            series.attributes,
            ['SeriesDate', 'SeriesTime'],
            {
                creationDate: this.formatDate(series.creationDate),
                modality: series.modalityAET
            }
        );
    }

    private createStudyAttributes(study: DicomStudy): Attribute[] {
        return this.createAttributesList(
            study.attributes,
            ['StudyDate', 'StudyTime'],
            {creationDate: this.formatDate(study.creationDate)}
        );
    }

    private createAttributesList(attributes: object,
                                 exclusions: string[] = [],
                                 extensions: object = {}): Attribute[] {
        const all = {...extensions, ...attributes};
        return Object.keys(all)
            .filter((key) => !exclusions.includes(key))
            .filter((key) => !!all[key] && all[key] !== '')
            .reduce((array, key) => {
                array.push({key, value: all[key]});
                return array;
            }, []);
    }

    private formatDate(dateMs: number): string {
        return this.datePipe.transform(dateMs, DATE_FORMAT);
    }
}
