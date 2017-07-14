import {Component, Input} from '@angular/core';

import {DicomArchive} from '../../_models/medcom/archive';


@Component({
    selector: 'archive-tree',
    templateUrl: 'archive-tree.component.html',
    styleUrls: ['archive-tree.component.scss']
})

/**
 *  Renders archive tree view (temporary solution)
 */
export class ArchiveTreeComponent {

    @Input()
    public archive: DicomArchive;

    private hoveredNodeId: string = null;
    private hoveredNodeLevel: number = -1;

    constructor() {
    }

    private onMouseOver(id, level) {
        if (this.hoveredNodeLevel < level) {
            this.hoveredNodeId = id;
            this.hoveredNodeLevel = level;
        }
    }

    private onMouseLeave(id) {
        if (this.hoveredNodeId === id) {
            this.hoveredNodeId = null;
            this.hoveredNodeLevel = -1;
        }
    }
}
