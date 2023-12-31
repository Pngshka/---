//import dynamic from 'next/dynamic';
//import * as PIXI from 'pixi.js'
import { BallController } from './BallController.js'
import { AnimationController } from './AnimationController'

// const PIXI = dynamic(() => import('pixi.js'), {
//     ssr: false,
//   });

export default class GameController {
    ballController;
    animationController;
    spritesheet;
    pixiApp;
    count = 0;
    atlasData;
    data;

    static get instance(){
        if(!this._instance) this._instance =  new GameController();

        return this._instance;
    }

    static _instance = null;
    
    async loadingManifest() {

        const response = await fetch('/pixiAssetsMy.json')
        this.data = await response.json();
        //debugger;
        const response2 = await fetch('/pixiAtlas.json')
        this.atlasData = await response2.json();
    }

    async initialization() {
        await import('pixi.js').then(PIXI => {
            console.log('PIXI')
            this.spritesheet = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(this.atlasData.meta.image),
                this.atlasData
            );


            // this.spritesheet = new PIXI.Spritesheet(
            //     PIXI.BaseTexture.from(this.atlasData.meta.image),
            //     this.atlasData
            // );
            //await 
            this.spritesheet.parse();

            this.pixiApp = new PIXI.Application({ resizeTo: window, backgroundAlpha: 0 });
        });
    }

    async initLevel() {
        //debugger;
        document.body.appendChild(this.pixiApp.view);
        this.ballController = new BallController(this.spritesheet, this.data);
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