'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  nextState, selectState
} from './gameSlice';

export const states = {
  'loadingManifest': { nextState: "initialization" },
  'initialization': { nextState: "initLevel" },
  'initLevel': { nextState: "playing" },
  'playing': { nextState: "null" },
}


export default function Game() {
  const currentState = useSelector(selectState);
  
  const dispatch = useDispatch();
  const [controller, setController] = useState();

  //debugger;
  function nextStateGame() {
    dispatch(nextState());
  }

  useEffect(() => {
    (async () => {const { default: Game3DController } = await import("./controllers/Game3DComtroller")
    setController(Game3DController.instance);})();
  }, [])

  useEffect(() => {
    //console.log('curr' + currentState);
    let isUnmounted = false;
    if (!controller) return;
    (async () => {
      await controller[`${currentState}`]?.();
      if (isUnmounted) return;
      nextStateGame.bind(this)();
      //const test = currentState;
      //console.log(test);
    })();

    return () => {
      isUnmounted = true;
    }

  }, [currentState, controller]);

  return (
    <div>
      {currentState}
    </div>
  );
}
