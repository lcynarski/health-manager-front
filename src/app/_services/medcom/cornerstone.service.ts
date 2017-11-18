import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import { CornerstoneTool } from '../../_models/medcom';
import { tools, defaultToolIndex } from './tools-config';
import { CornerstoneAction } from '../../_models/medcom/cornerstoneTool';

declare const cornerstoneWADOImageLoader;


@Injectable()
export class CornerstoneService {

    public currentToolStream: Observable<CornerstoneTool>;
    public actionsStream: Observable<CornerstoneAction>;

    private currentToolSource: ReplaySubject<CornerstoneTool>;
    private actionsSource: Subject<CornerstoneAction>;

    constructor() {
        this.actionsSource = new Subject();
        this.actionsStream = this.actionsSource.asObservable();

        this.currentToolSource = new ReplaySubject(1);
        this.currentToolStream = this.currentToolSource.asObservable()
            .distinctUntilChanged();

        this.initializeCornerstone();
    }

    public activateTool(tool: CornerstoneTool): void {
        this.currentToolSource.next(tool);
    }

    public propagateAction(action: CornerstoneAction) {
        this.actionsSource.next(action);
    }

    public resetTools(): void {
        this.currentToolSource.next(tools[defaultToolIndex]);
    }

    private initializeCornerstone(): void {
        // cornerstoneWADOImageLoader.configure({
        //     beforeSend: (xhr) => {
        //         // Add custom headers here (e.g. auth tokens)
        //         // xhr.setRequestHeader('APIKEY', 'my auth token');
        //     }
        // });

        const cornerstoneWorkersConfig = {
            webWorkerPath: '/node_modules/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderWebWorker.min.js',
            taskConfiguration: {
                decodeTask: {
                    codecsPath: '/node_modules/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderCodecs.min.js'
                }
            }
        };
        cornerstoneWADOImageLoader.webWorkerManager.initialize(cornerstoneWorkersConfig);
    }
}
