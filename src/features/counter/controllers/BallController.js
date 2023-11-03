'use client';
import * as PIXI from 'pixi.js'

export class BallController {
    animBall;
    height;
    speed;

    constructor(spritesheet, config) {
        this.speed = config.speed;
        this.animBall = new PIXI.AnimatedSprite(spritesheet.animations.enemy);
    }

    async animationInit(pixiApp) {

        this.animBall.scale.set(0.7);
        this.animBall.x = 160;
        this.animBall.y = 200;

        this.animBall.animationSpeed =this.speed;
        pixiApp.stage.addChild(this.animBall);
    }



}