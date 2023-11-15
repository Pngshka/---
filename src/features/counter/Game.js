'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  nextState, selectState
} from './gameSlice';

export default function Game() {
  const currentState = useSelector(selectState);
  
  const dispatch = useDispatch();
  const [controller, setController] = useState();

  //debugger;
  function nextStateGame() {
    dispatch(nextState());
  }

  useEffect(() => {
    (async () => {const { default: GameControllerTetris } = await import("./controllers/GameControllerTetris")
    setController(GameControllerTetris.instance);})();
  }, [])

  useEffect(() => {
    let isUnmounted = false;
    if (!controller) return;
    (async () => {
      await controller[`${currentState}`]?.();
      if (isUnmounted) return;
      nextStateGame.bind(this)();
    })();

    return () => {
      isUnmounted = true;
    }

  }, [currentState, controller]);

  return (
    <div>
      <div id='div'></div>
      {currentState}
    </div>
  );
}
