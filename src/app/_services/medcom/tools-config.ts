import { CornerstoneAction, CornerstoneTool, CornerstoneButton } from '../../_models/medcom';


export const actions: CornerstoneAction[] = [
    {
        name: 'clear',
        icon: 'clear',
    },
    {
        name: 'previous',
        icon: 'skip_previous',
    },
    {
        name: 'next',
        icon: 'skip_next',
    },
];

export const tools: CornerstoneTool[] = [
    {
        name: 'pan',
        activeButton: CornerstoneButton.LEFT_AND_MIDDLE,
        secondaryButton: CornerstoneButton.MIDDLE,
        mobileVersion: 'panTouchDrag',
        icon: 'open_with',
    },
    {
        name: 'zoom',
        activeButton: CornerstoneButton.LEFT_AND_RIGHT,
        secondaryButton: CornerstoneButton.RIGHT,
        mobileVersion: 'zoomTouchDrag',
        icon: 'zoom_in',
    },
    {
        name: 'wwwc',
        activeButton: CornerstoneButton.LEFT,
        mobileVersion: 'wwwcTouchDrag',
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
        mobileVersion: 'probeTouch',
        icon: 'colorize',
    },
    {
        name: 'length',
        activeButton: CornerstoneButton.LEFT,
        mobileVersion: 'lengthTouch',
        icon: 'straighten',
    },
    {
        name: 'angle',
        activeButton: CornerstoneButton.LEFT,
        mobileVersion: 'angleTouch',
        icon: 'signal_cellular_null',
    },
    {
        name: 'ellipticalRoi',
        activeButton: CornerstoneButton.LEFT,
        mobileVersion: 'ellipticalRoiTouch',
        icon: 'panorama_fish_eye',
    },
    {
        name: 'rectangleRoi',
        activeButton: CornerstoneButton.LEFT,
        mobileVersion: 'rectangleRoiTouch',
        icon: 'crop_square',
    },
    {
        name: 'freehand',
        activeButton: CornerstoneButton.LEFT,
        icon: 'timeline',
    },
];

export const defaultToolIndex = 2;
