import {
    Directive,
    DoCheck,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DicomSeries, DicomInstance, CornerstoneTool } from '../../_models';
import { CornerstoneService, tools } from '../../_services/medcom';


declare const cornerstone;
declare const cornerstoneTools;
declare const cornerstoneWADOImageLoader;

const WadoImageLoaderSchemeName = 'wadouri:';


@Directive({
    selector: '[dicom]',
})
export class DicomDirective implements OnChanges, DoCheck, OnDestroy {

    @Input()
    public series: DicomSeries;

    @Output()
    public imageLoaded: EventEmitter<DicomInstance> = new EventEmitter();

    private imageUrls: string[];
    private element: any;
    private stackState = {
        currentImageIdIndex: 0,
        previousImageIdIndex: 0,
        imageIds: []
    };

    private activeTool: CornerstoneTool;
    private initialized = false;
    private pendingToolChangeCb: () => void;

    private toolsChangeSubscription: Subscription;
    private actionsSubscription: Subscription;

    private actionsMap: any = {
        clear: () => this.clearTools(),
    };

    constructor(private elementRef: ElementRef,
                private service: CornerstoneService) {
        this.element = elementRef.nativeElement;
        this.handleEvents();
    }

    @HostListener('contextmenu', ['$event'])
    public onContextMenu(event) {
        event.preventDefault();
    }

    ngOnChanges() {
        if (!this.series || !this.series.instances || !this.series.instances.length) {
            console.warn('[dicom] no instances provided!');
            return;
        }
        try {
            this.initialized = false;
            cornerstone.enable(this.element);
            this.imageUrls = this.series.instances.map((i) => i.dicomUrl);
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

    ngOnDestroy(): void {
        this.clearTools();
        this.toolsChangeSubscription.unsubscribe();
        this.actionsSubscription.unsubscribe();
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
        cornerstoneTools.mouseInput.enable(this.element);
        cornerstoneTools.mouseWheelInput.enable(this.element);

        tools
            .filter((t) => t.inactiveButton)
            .forEach((t) => this.deactivateTool(t));

        cornerstoneTools.addStackStateManager(this.element, ['stack', 'playClip']);
        cornerstoneTools.addToolState(this.element, 'stack', this.stackState);
        cornerstoneTools.stackScrollWheel.activate(this.element);
        cornerstoneTools.scrollIndicator.enable(this.element);

        if (this.pendingToolChangeCb) {
            this.pendingToolChangeCb();
            this.pendingToolChangeCb = null;
        } else if (this.activeTool) {
            this.activateTool(this.activeTool);
        }

        this.initialized = true;
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

    private handleEvents(): void {
        this.toolsChangeSubscription = this.service.currentToolStream.subscribe(
            (tool) => {
                if (this.initialized) {
                    this.onToolChange(tool);
                } else {
                    this.pendingToolChangeCb = () => this.onToolChange(tool);
                }
            }
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
        console.log(`${tool.name} tool activated`);
    }

    private clearTools() { // only works for current image id
        tools
            .map((tool) => tool.name)
            .forEach((tool) =>
                cornerstoneTools.clearToolState(this.element, tool));

        cornerstone.updateImage(this.element);
    }

    private onImageLoaded(): void {
        this.imageLoaded.emit(
            this.series.instances[this.stackState.currentImageIdIndex]
        );
    }

}
