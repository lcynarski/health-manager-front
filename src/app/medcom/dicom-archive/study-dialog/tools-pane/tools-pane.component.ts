import { Component, HostListener } from '@angular/core';
import { CornerstoneService } from '../../../../_services/medcom';
import { CornerstoneAction, CornerstoneTool } from '../../../../_models/medcom/cornerstoneTool';
import { tools as toolsList, actions as actionsList } from '../../../../_services';

@Component({
    selector: 'tools-pane-component',
    templateUrl: 'tools-pane.component.html',
    styleUrls: ['tools-pane.component.scss']
})

export class ToolsPaneComponent {

    readonly tools: CornerstoneTool[] = toolsList;
    readonly actions: CornerstoneAction[] = actionsList;
    private activeTool: CornerstoneTool = null;

    constructor(private cornerstoneService: CornerstoneService) {
        cornerstoneService.currentToolStream
            .subscribe(
                (tool) => this.activeTool = tool
            );
    }

    activateTool(tool: CornerstoneTool): void {
        this.cornerstoneService.activateTool(tool);
    }

    executeAction(action: CornerstoneAction) {
        this.cornerstoneService.propagateAction(action);
    }

    @HostListener('DOMMouseScroll', ['$event'])
    @HostListener('mousewheel', ['$event'])
    @HostListener('mousedown', ['$event'])
    private stopEvents(e: Event) {
        e.stopPropagation();
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('touchend', ['$event'])
    @HostListener('touchmove', ['$event'])
    @HostListener('touchcancel', ['$event'])
    private stopTouchEvents(e: Event) {
        e.stopPropagation();
    }
}
