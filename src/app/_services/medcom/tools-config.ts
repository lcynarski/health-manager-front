import { CornerstoneTool, CornerstoneButton } from '../../_models/medcom';


export const tools: CornerstoneTool[] = [
    {
        name: 'pan',
        activeButton: CornerstoneButton.LEFT_AND_MIDDLE,
        inactiveButton: CornerstoneButton.MIDDLE,
    },
    {
        name: 'zoom',
        activeButton: CornerstoneButton.LEFT_AND_RIGHT,
        inactiveButton: CornerstoneButton.RIGHT,
    },
    {
        name: 'wwwc',
        activeButton: CornerstoneButton.LEFT,
    },
    {
        name: 'highlight',
        activeButton: CornerstoneButton.LEFT,
    },
    {
        name: 'probe',
        activeButton: CornerstoneButton.LEFT,
    },
    {
        name: 'length',
        activeButton: CornerstoneButton.LEFT,
    },
    {
        name: 'angle',
        activeButton: CornerstoneButton.LEFT,
    },
    {
        name: 'ellipticalRoi',
        activeButton: CornerstoneButton.LEFT,
    },
    {
        name: 'rectangleRoi',
        activeButton: CornerstoneButton.LEFT,
    },
    {
        name: 'freehand',
        activeButton: CornerstoneButton.LEFT,
    },
];

export enum Tool {
    Pan = 0,
    Zoom = 1,
    Wwwc = 2,
    Highligh = 3,
    Probe = 4,
    Length = 5,
    Angle = 6,
    EllipticalRoi = 7,
    RectangleRoi = 8,
    Freehand  = 9,
}

export const defaultTool: Tool = Tool.Wwwc;
