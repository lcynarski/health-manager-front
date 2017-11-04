import { Directive, DoCheck, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';
import { ExtendedDicomSeries, ExtendedDicomInstance } from '../../_models';
import { CornerstoneService } from '../../_services/medcom';

declare const cornerstone;
declare const cornerstoneTools;
declare const cornerstoneWADOImageLoader;

const WadoImageLoaderSchemeName = 'wadouri:';

@Directive({
    selector: '[dicom]',
})

export class DicomDirective implements OnChanges, DoCheck {

    @Input()
    public series: ExtendedDicomSeries;

    @Output()
    public imageLoaded: EventEmitter<ExtendedDicomInstance> = new EventEmitter();

    private imageUrls: string[];
    private element: any;
    private toolsInitialized: boolean;
    private stackState = {
        currentImageIdIndex: 0,
        previousImageIdIndex: 0,
        imageIds: []
    };

    constructor(private elementRef: ElementRef,
                private service: CornerstoneService) {
        this.element = elementRef.nativeElement;
    }

    @HostListener('contextmenu', ['$event'])
    public onContextMenu(event) {
        event.preventDefault();
    }

    ngOnChanges() {
        if (!this.series || !this.series.instances.length) {
            console.warn('[dicom] no instances provided!');
            return;
        }
        try {
            this.imageUrls = this.series.instances.map((i) => i.dicomUrl);
            cornerstone.enable(this.element);
            this.toolsInitialized = false;
            this.stackState.currentImageIdIndex = 0;
            this.stackState.imageIds = this.imageUrls.map((url) => WadoImageLoaderSchemeName + url);
            this.imageUrls.forEach((url) => {
                console.log(`loading dicom image: '${url}'`);
                cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(url);
            });

            this.displayImage(this.stackState.currentImageIdIndex);
        } catch (error) {
            console.error(`failed to display dicom files: '${this.imageUrls}'!`, error);
        }
    }

    ngDoCheck(): void {
        // manual check for image index is needed as receiving events from cornerstone does not work
        if (this.stackState.currentImageIdIndex !== this.stackState.previousImageIdIndex) {
            this.onImageLoaded();
        }
        this.stackState.previousImageIdIndex = this.stackState.currentImageIdIndex;
    }

    private displayImage(index: number) {
        const url = WadoImageLoaderSchemeName + this.imageUrls[index];

        cornerstone.loadAndCacheImage(url)
            .then((image) => {
                console.log('successfully loaded dicom instance!', image);
                const viewport = cornerstone.getDefaultViewportForImage(this.element, image);

                cornerstone.displayImage(this.element, image, viewport);
                this.initializeTools();
                this.onImageLoaded();
            })
            .catch((error) => {
                console.error(`failed to load dicom file: '${url}'!`, error);
            });
    }

    private initializeTools() {
        if (this.toolsInitialized) {
            return;
        }

        cornerstoneTools.mouseInput.enable(this.element);
        cornerstoneTools.mouseWheelInput.enable(this.element);

        // Enable all tools we want to use with this element
        cornerstoneTools.wwwc.activate(this.element, 1); // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(this.element, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(this.element, 4); // zoom is the default tool for right mouse button
        // cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

        cornerstoneTools.addStackStateManager(this.element, ['stack', 'playClip']);
        cornerstoneTools.addToolState(this.element, 'stack', this.stackState);
        cornerstoneTools.stackScrollWheel.activate(this.element);
        cornerstoneTools.scrollIndicator.enable(this.element);

        this.toolsInitialized = true;
    }

    private onImageLoaded() {
        this.imageLoaded.emit(
            this.series.instances[this.stackState.currentImageIdIndex]
        );
    }

}
