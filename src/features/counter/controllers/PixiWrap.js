"use client";

import { useEffect, useRef } from "react";
import * as PIXI from 'pixi.js'
import { useSelector, useDispatch } from 'react-redux';
import {
    selectState,
    initialization
  } from '../gameSlice';

export default function PixiWrap() {

    let pixiApp = useRef(null);
    const canvasRef = useRef(null);
    //onChildValue(canvasRef.current);
    const currentState = useSelector(selectState);
    const dispatch = useDispatch();
    useEffect(() => {
        const initPixiAndAppend = async () => {
            pixiApp.current = new PIXI.Application({ resizeTo: window, backgroundAlpha: 0 });
            // We add the pixi code to a div in our DOM after component mounts
            canvasRef.current.appendChild(pixiApp.current.view);
            if (currentState === 'initialization') {
                dispatch(initialization(pixiApp.current));
            }
        };


        initPixiAndAppend();

        // We reset the pixi app and its reference upon closing
        return () => {
            if (pixiApp.current) {
                pixiApp.current.stop();
                pixiApp.current.destroy(true);
                pixiApp.current = null;
            }
        };
    }, [currentState]);

    return <div ref={canvasRef}></div>;
}