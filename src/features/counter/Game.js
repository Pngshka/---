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

  //let initialState = 'loadingManifest';

  // async function testt() {
  //   //debugger;
  //   (new Promise((resolve) => {
  //     dispatch(decrement());
  //     resolve();
  //   }))
  //   .then(() => new Promise(resolve => {
  //     console.log('123');
  //     setTimeout(resolve, 1000);
  //     console.log('dasdasd');
  //   }))
  //   .then(() => dispatch(increment()))
  //   .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
  //   .then(() => dispatch(increment()))
  //   .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
  //   .then(() => dispatch(decrement()))
  // }
  function nextState(){
    console.log(currentState);
    const nextStateDispatch = nextStateMap[currentState];
    console.log(nextStateDispatch);
    if (nextStateDispatch!=null)
      dispatch(nextStateDispatch());
  }

  useEffect(() => {
    gameController[`${currentState}`]?.();
    nextState();
  }, [currentState]);

  return (
    <div>
      {currentState}
    </div>
  );
}
