'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const states = {
  loadingManifest: {nextState: "initialization" },
  initialization: {nextState: "initLevel" },
  initLevel: {nextState: "playing" },
  playing: {nextState: "null" },
}


export default function Game() {
  const currentState = useSelector(selectState);
  const dispatch = useDispatch();
  const [controller, setController ]= useState();

  debugger;
  function nextState(){
      dispatch(nextState());
  }

  useEffect(async()=>{
      const {default: GameController} = await import("./controllers/GameController.js")
      setController(GameController.instance);
  }, [])

  useEffect(() => {
    let  isUnmounted =false;
      if(!controller) return;
    (async ()=>{
      await controller[`${currentState}`]?.();
      if(isUnmounted)return;
      nextState();
    })()

    return ()=>{
      isUnmounted = true;
    }
    
  }, [currentState,controller]);

  return (
    <div>
      {currentState}
    </div>
  );
}
