import { Injectable } from '@angular/core';


declare const cornerstone;
declare const cornerstoneTools;
declare const cornerstoneWADOImageLoader;

@Injectable()
export class CornerstoneService {

    constructor() {
        this.initialize();
    }

    private initialize(): void {
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
