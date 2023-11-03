//import dynamic from 'next/dynamic';
import * as PIXI from 'pixi.js'
import {BallController} from './BallController.js'
import {AnimationController} from './AnimationController'

// const PIXI = dynamic(() => import('pixi.js'), {
//     ssr: false,
//   });

export default class GameController {
    ballController;
    animationController;
    spritesheet;
    pixiApp;
    count=0;
    atlasData;
    data;

    constructor(){
        //debugger
    }

    async loadingManifest() {

        const response = await fetch('/pixiAssetsMy.json')
        this.data = await response.json();
        //debugger;
        const response2 = await fetch('/pixiAtlas.json')
        this.atlasData = await response2.json();
    }

    async initialization() {
        this.spritesheet = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(this.atlasData.meta.image),
            this.atlasData
        );
        await this.spritesheet.parse();

        this.pixiApp = new PIXI.Application({ resizeTo: window, backgroundAlpha: 0 });
    }

    async initLevel() {
        //debugger;
        document.body.appendChild(this.pixiApp.view);
        this.ballController = new BallController(this.spritesheet);
        this.animationController = new AnimationController(this.ballController.animBall, this.data);
        //debugger;
        await this.ballController.animationInit(this.pixiApp);
    }

    playing() {//this.ballController.animBall
        document.body.addEventListener('click', () => {
            this.count++;
            if (this.count == 1)
                this.animationController.animateObject.bind(this)();
            console.log(this.count);
        })

    }
} 