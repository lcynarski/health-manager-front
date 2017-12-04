import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import { CornerstoneTool, CornerstoneAction, DicomImageInfo } from '../../_models/medcom';
import { tools, defaultToolIndex } from './tools-config';
import { AuthenticationService } from '../index';

import * as $ from 'jquery';
import * as Hammer from 'hammerjs';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';


@Injectable()
export class CornerstoneService {

    public currentToolStream: Observable<CornerstoneTool>;
    public actionsStream: Observable<CornerstoneAction>;
    public imageInfoStream: Observable<DicomImageInfo>;

    private currentToolSource: ReplaySubject<CornerstoneTool>;
    private actionsSource: Subject<CornerstoneAction>;
    private imageInfoSource: Subject<DicomImageInfo>;

    constructor(private authService: AuthenticationService) {

        this.actionsSource = new Subject();
        this.actionsStream = this.actionsSource.asObservable();

        this.currentToolSource = new ReplaySubject(1);
        this.currentToolStream = this.currentToolSource.asObservable()
            .distinctUntilChanged();

        this.imageInfoSource = new Subject();
        this.imageInfoStream = this.imageInfoSource.asObservable();

        this.initializeCornerstone();
    }

    public activateTool(tool: CornerstoneTool): void {
        this.currentToolSource.next(tool);
    }

    public propagateAction(action: CornerstoneAction): void {
        this.actionsSource.next(action);
    }

    public resetTools(): void {
        this.currentToolSource.next(tools[defaultToolIndex]);
    }

    public propagateImageInfo(info: DicomImageInfo): void {
        this.imageInfoSource.next(info);
    }

    private initializeCornerstone(): void {
        // Specify external dependencies
        cornerstone.external.$ = $;
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.$ = $;
        cornerstoneTools.external.cornerstone = cornerstone;
        cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
        cornerstoneTools.external.$ = $;
        cornerstoneTools.external.Hammer = Hammer;

        const headers: Headers = new Headers();
        this.authService.addAuthHeader(headers);
        cornerstoneWADOImageLoader.configure({
            beforeSend: (xhr) => {
                headers.forEach((value, key) => {
                    xhr.setRequestHeader(key, value);
                });
            }
        });

        const cornerstoneWorkersConfig = {
            webWorkerPath: '/node_modules/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderWebWorker.min.js',
            taskConfiguration: {
                decodeTask: {
                    codecsPath: '/node_modules/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderCodecs.js'
                }
            }
        };
        cornerstoneWADOImageLoader.webWorkerManager.initialize(cornerstoneWorkersConfig);
    }
}
