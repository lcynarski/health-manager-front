import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import { CornerstoneTool } from '../../_models/medcom';
import { tools, defaultTool } from './tools-config';

declare const cornerstoneWADOImageLoader;


@Injectable()
export class CornerstoneService {

    public currentToolStream: Observable<CornerstoneTool>;
    private currentToolSource: ReplaySubject<CornerstoneTool>;

    constructor() {
        this.currentToolSource = new ReplaySubject();
        this.currentToolStream = this.currentToolSource.asObservable()
            .distinctUntilChanged();
        this.currentToolSource.next(tools[defaultTool]);
        this.initializeCornerstone();

        // FIXME - REMOVE
        (window as any).activateTool = (i: number) => this.activateTool(tools[i]);
    }

    public activateTool(tool: CornerstoneTool): void {
        this.currentToolSource.next(tool);
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
