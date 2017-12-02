import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CornerstoneTool, DicomInstance, DicomSeries } from '../../_models';
import { CornerstoneService, tools } from '../../_services/medcom';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

const WadoImageLoaderSchemeName = 'wadouri:';


@Directive({
    selector: '[dicom]',
})
export class DicomDirective implements OnChanges, OnDestroy {

    @Input()
    public series: DicomSeries;

    @Output()
    public imageLoaded: EventEmitter<DicomInstance> = new EventEmitter();

    private imageUrls: string[];
    private element: any;
    private stackState = {
        currentImageIdIndex: 0,
        imageIds: []
    };

    private activeTool: CornerstoneTool;

    private toolsChangeSubscription: Subscription;
    private actionsSubscription: Subscription;

    private actionsMap: any = {
        clear: () => this.clearTools(),
        next: () => this.nextImage(),
        previous: () => this.previousImage(),
    };

    constructor(private elementRef: ElementRef,
                private service: CornerstoneService) {
        this.element = elementRef.nativeElement;
        this.element.addEventListener('cornerstoneimagerendered', (e) => this.onImageReRendered(e.detail));
        this.element.addEventListener('cornerstonenewimage', (e) => this.onImageLoaded());
    }

    @HostListener('contextmenu', ['$event'])
    public onContextMenu(event) {
        event.preventDefault();
    }

    ngOnChanges() {
        if (!this.series || !this.series.instances || !this.series.instances.length) {
            return;
        }
        try {
            this.unsubscribe();
            cornerstone.enable(this.element);
            this.imageUrls = this.series.instances.map((i) => i.dicomUrl);
            this.stackState.currentImageIdIndex = 0;
            this.stackState.imageIds = this.imageUrls.map((url) => WadoImageLoaderSchemeName + url);
            this.imageUrls.forEach((url) => {
                console.log(`loading dicom image: '${url}'`);
                cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(url);
            });

            this.displayImage()
                .then(() => {
                    this.initializeTools();
                    this.handleToolEvents();
                })
                .catch((error) => {
                    console.error(`failed to load dicom file '${this.imageUrls[this.stackState.currentImageIdIndex]}'`, error);
                });
        } catch (error) {
            console.error(`failed to display dicom files: '${this.imageUrls}'!`, error);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe();
        this.clearTools();
    }

    private unsubscribe(): void {
        if (this.toolsChangeSubscription) {
            this.toolsChangeSubscription.unsubscribe();
        }
        if (this.actionsSubscription) {
            this.actionsSubscription.unsubscribe();
        }
    }

    private displayImage(): Promise<void> {
        const url = this.stackState.imageIds[this.stackState.currentImageIdIndex];

        return cornerstone.loadAndCacheImage(url)
            .then((image) => {
                console.log('successfully loaded dicom instance!', image);
                const viewport = cornerstone.getDefaultViewportForImage(this.element, image);

                cornerstone.displayImage(this.element, image, viewport);
            });
    }

    private initializeTools() {
        cornerstoneTools.mouseInput.enable(this.element);
        cornerstoneTools.mouseWheelInput.enable(this.element);

        tools
            .filter((t) => t.inactiveButton)
            .forEach((t) => this.deactivateTool(t));

        cornerstoneTools.addStackStateManager(this.element, ['stack', 'playClip']);
        cornerstoneTools.addToolState(this.element, 'stack', this.stackState);
        cornerstoneTools.stackScrollWheel.activate(this.element);

        const scrollIndicatorConf: any = cornerstoneTools.scrollIndicator.getConfiguration();
        scrollIndicatorConf.backgroundColor = 'rgba(black, 0.5)';
        scrollIndicatorConf.fillColor = 'rgb(116, 143, 252)';
        cornerstoneTools.scrollIndicator.enable(this.element);
    }

    private activateTool(tool: CornerstoneTool): void {
        cornerstoneTools[tool.name].activate(this.element, tool.activeButton);
        this.activeTool = tool;
    }

    private deactivateTool(tool: CornerstoneTool): void {
        if (tool.inactiveButton) {
            cornerstoneTools[tool.name].activate(this.element, tool.inactiveButton);
        } else {
            cornerstoneTools[tool.name].deactivate(this.element, tool.activeButton);
        }
    }

    private handleToolEvents(): void {
        this.toolsChangeSubscription = this.service.currentToolStream.subscribe(
            (tool) => this.onToolChange(tool)
        );

        this.actionsSubscription = this.service.actionsStream.subscribe(
            (action) => {
                if (this.actionsMap[action.name]) {
                    this.actionsMap[action.name]();
                }
            }
        );
    }

    private onToolChange(tool: CornerstoneTool): void {
        if (this.activeTool) {
            this.deactivateTool(this.activeTool);
        }
        this.activateTool(tool);
        // console.log(`${tool.name} tool activated`);
    }

    // TODO fix
    private clearTools() { // only works for current image id
        tools
            .map((tool) => tool.name)
            .forEach((tool) =>
                cornerstoneTools.clearToolState(this.element, tool));

        cornerstone.updateImage(this.element);
    }

    private nextImage(): void {
        if (this.stackState.currentImageIdIndex === this.stackState.imageIds.length - 1) {
            return;
        }
        this.stackState.currentImageIdIndex++;
        this.displayImage();
    }

    private previousImage(): void {
        if (this.stackState.currentImageIdIndex === 0) {
            return;
        }
        this.stackState.currentImageIdIndex--;
        this.displayImage();
    }

    private onImageLoaded(): void {
        this.imageLoaded.emit(
            this.series.instances[this.stackState.currentImageIdIndex]
        );
    }

    private onImageReRendered(e: any): void {
        this.service.propagateImageInfo({
            imagesCount: this.imageUrls.length,
            imageIndex: this.stackState.currentImageIdIndex,
            scale: e.viewport.scale,
            voi: e.viewport.voi
        });
    }
}
