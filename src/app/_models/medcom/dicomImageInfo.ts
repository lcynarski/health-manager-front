export interface DicomImageInfo {
    imagesCount: number;
    imageIndex: number;
    scale: number;
    voi: {
        windowWidth: number
        windowCenter: number;
    };
}

