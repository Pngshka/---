'use client';
import * as PIXI from 'pixi.js'

export class BallController {
    animBall;
    height;
    speed;

    constructor(spritesheet) {
        this.animBall = new PIXI.AnimatedSprite(spritesheet.animations.enemy);
    }

    async animationInit(pixiApp) {

        this.animBall.scale.set(0.7);
        this.animBall.x = 560;
        this.animBall.y = 180;

        this.animBall.animationSpeed = 0.191;
        pixiApp.stage.addChild(this.animBall);
    }



}