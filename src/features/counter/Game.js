'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  //loadingManifest,
  //loadingAssets, 
  initialization, 
  initLevel, 
  playing,
  selectState,
} from './gameSlice';
import GameController from './controllers/GameController';

const nextStateMap = {
  loadingManifest: initialization,
  //loadingAssets: initialization, 
  initialization: initLevel, 
  initLevel: playing, 
  playing: null,
}
const gameController = new GameController();

export function Game() {
  const currentState = useSelector(selectState);
  const dispatch = useDispatch();


  function nextState(){
    console.log(currentState);
    console.log(gameController);
    const nextStateDispatch = nextStateMap[currentState];
    console.log(nextStateDispatch);
    if (nextStateDispatch!=null)
      dispatch(nextStateDispatch());
  }

  useEffect(() => {
    const temp = gameController[`${currentState}`]?.();
    if (temp == null) { return nextState();  }
    if (temp.constructor.name == 'Promise') {
      //debugger
      temp.then(nextState)
    } else {
      debugger;
      nextState();
    }
    
  }, [currentState]);

  return (
    <div>
      {currentState}
    </div>
  );
}
