import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

declare const cornerstone;
declare const cornerstoneTools;
declare const cornerstoneWADOImageLoader;

const WadoImageLoaderSchemeName = 'wadouri:';

@Directive({ selector: '[dicomInstance]' })
export class DicomDirective implements OnChanges {

    @Input()
    public url: string;

    constructor(private elementRef: ElementRef) {
        // TODO move configuration out of directive
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

    public ngOnChanges() {
        if (!this.url) {
            console.warn('[dicom] no url provided!');
            return;
        }
        try {
            const element = this.elementRef.nativeElement;
            cornerstone.enable(element);
            console.log(`loading dicom image: '${this.url}'`);
            cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(this.url);

            cornerstone.loadAndCacheImage(WadoImageLoaderSchemeName + this.url)
                .then((image) => {
                    console.log('successfully loaded dicom instance!', image);
                    const viewport = cornerstone.getDefaultViewportForImage(element, image);

                    cornerstone.displayImage(element, image, viewport);

                    // cornerstoneTools.mouseInput.enable(element);
                    cornerstoneTools.mouseWheelInput.enable(element);

                    // Enable all tools we want to use with this element
                    // cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
                    // cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
                    // cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
                    cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

                })
                .catch((error) => {
                    console.error(`failed to load dicom file: '${this.url}'!`, error);
                });
        } catch (error) {
            console.error(`failed to load dicom file: '${this.url}'!`, error);
        }
    }
}
