import { CornerstoneButton } from './cornerstoneButton';


export interface CornerstoneAction {
    name: string;
    icon: string;
}

export interface CornerstoneTool extends CornerstoneAction {
    activeButton: CornerstoneButton;
    secondaryButton?: CornerstoneButton;
    mobileVersion?: string;
}
