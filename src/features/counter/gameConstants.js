export const STATES = {
    'loadingManifest': { nextState: "initialization" },
    'initialization': { nextState: "initLevel" },
    'initLevel': { nextState: "playing" },
    'playing': { nextState: "null" },
}

export const ROW = 20;
export const COL = 10;
export const CUBE_GEOM = 0.04;
export const CUBE_POS = 0.2;
export const CAMERA = 1000;  