export const STATES = {
    'loadingManifest': { nextState: "initialization" },
    'initialization': { nextState: "initLevel" },
    'initLevel': { nextState: "playing" },
    'playing': { nextState: "null" },
}

export const ROW = 20;
export const COL = 10;
  