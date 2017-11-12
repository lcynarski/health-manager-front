import { CornerstoneButton } from './cornerstoneButton';

export interface CornerstoneTool {
    name: string;
    activeButton: CornerstoneButton;
    inactiveButton?: CornerstoneButton;
    icon?: string;
}
