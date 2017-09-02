import { Directive, Input, ElementRef, OnChanges, HostListener } from '@angular/core';

declare const cornerstone;
declare const cornerstoneTools;
declare const cornerstoneWADOImageLoader;

const WadoImageLoaderSchemeName = 'wadouri:';

@Directive({
    selector: '[dicom]',
})

export class DicomDirective implements OnChanges {

    private static configureCornerstone() { // TODO move to service - should only be called once
        cornerstoneWADOImageLoader.configure({
            beforeSend: (xhr) => {
                // Add custom headers here (e.g. auth tokens)
                // xhr.setRequestHeader('APIKEY', 'my auth token');
            }
        });
        const config = {
            webWorkerPath: '../../../node_modules/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderWebWorker.js',
            taskConfiguration: {
                decodeTask: {
                    codecsPath: '../../../node_modules/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderCodecs.js'
                }
            }
        };
        try {
            cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
        } catch (e) {
            console.warn('double cornerstone init!');
        }
    }


    @Input()
    public imageUrls: string[];

    private element: any;
    private currentImageIndex: number;
    private toolsInitialized: boolean;


    constructor(private elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
        DicomDirective.configureCornerstone();
    }

    @HostListener('contextmenu', ['$event'])
    public onContextMenu(event) {
        event.preventDefault();
    }

    public ngOnChanges() {
        if (!this.imageUrls || !this.imageUrls.length) {
            console.warn('[dicom] no images provided!');
            return;
        }
        try {
            cornerstone.enable(this.element);
            this.toolsInitialized = false;
            this.currentImageIndex = 0;

            this.imageUrls.forEach((url) => {
                console.log(`loading dicom image: '${url}'`);
                cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(url);
            });

            this.displayImage(this.currentImageIndex);
        } catch (error) {
            console.error(`failed to display dicom files: '${this.imageUrls}'!`, error);
        }
    }

    private displayImage(index: number) {
        const url = WadoImageLoaderSchemeName + this.imageUrls[index];

        cornerstone.loadAndCacheImage(url)
            .then((image) => {
                console.log('successfully loaded dicom instance!', image);
                const viewport = cornerstone.getDefaultViewportForImage(this.element, image);

                cornerstone.displayImage(this.element, image, viewport);
                this.initializeTools();
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
        cornerstoneTools.addToolState(this.element, 'stack', {
            currentImageIdIndex: this.currentImageIndex,
            imageIds: this.imageUrls.map((url) => WadoImageLoaderSchemeName + url)
        });
        cornerstoneTools.stackScrollWheel.activate(this.element);
        cornerstoneTools.scrollIndicator.enable(this.element);

        this.toolsInitialized = true;
    }

}
