import { CornerstoneAction, CornerstoneTool, CornerstoneButton } from '../../_models/medcom';


export const actions: CornerstoneAction[] = [
    {
        name: 'clear',
        icon: 'clear',
    },
];

export const tools: CornerstoneTool[] = [
    {
        name: 'pan',
        activeButton: CornerstoneButton.LEFT_AND_MIDDLE,
        inactiveButton: CornerstoneButton.MIDDLE,
        icon: 'open_with',
    },
    {
        name: 'zoom',
        activeButton: CornerstoneButton.LEFT_AND_RIGHT,
        inactiveButton: CornerstoneButton.RIGHT,
        icon: 'zoom_in',
    },
    {
        name: 'wwwc',
        activeButton: CornerstoneButton.LEFT,
        icon: 'settings_brightness',
    },
    {
        name: 'highlight',
        activeButton: CornerstoneButton.LEFT,
        icon: 'highlight',
    },
    {
        name: 'probe',
        activeButton: CornerstoneButton.LEFT,
        icon: 'colorize',
    },
    {
        name: 'length',
        activeButton: CornerstoneButton.LEFT,
        icon: 'straighten',
    },
    {
        name: 'angle',
        activeButton: CornerstoneButton.LEFT,
        icon: 'signal_cellular_null',
    },
    {
        name: 'ellipticalRoi',
        activeButton: CornerstoneButton.LEFT,
        icon: 'panorama_fish_eye',
    },
    {
        name: 'rectangleRoi',
        activeButton: CornerstoneButton.LEFT,
        icon: 'crop_square',
    },
    {
        name: 'freehand',
        activeButton: CornerstoneButton.LEFT,
        icon: 'timeline',
    },
];

export const defaultToolIndex = 2;
