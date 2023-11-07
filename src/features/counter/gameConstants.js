export const STATES = {
    'loadingManifest': { nextState: "initialization" },
    'initialization': { nextState: "initLevel" },
    'initLevel': { nextState: "playing" },
    'playing': { nextState: "null" },
  }
  