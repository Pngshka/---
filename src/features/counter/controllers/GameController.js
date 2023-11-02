import * as PIXI from 'pixi.js'
import {BallController} from './BallController.js'
import {AnimationController} from './AnimationController'

export default class GameController {
    ballController;
    animationController = 10;
    spritesheet;
    pixiApp;
    count=0;

    constructor(){
        //debugger
        this.ballController = new BallController();
        this.animationController = new AnimationController(this.ballController.ballElement);
    }

    async loadingManifest() {
        // var request = new XMLHttpRequest();
        // request.open("GET", "./pixiAssets.json");
        // request.responseType = "json";
        // request.send();
        // request.onload = function () {
        //     var test = request.response;
        //     console.log(test["speed"]);
        // };

        this.atlasData = {
            frames: {
                animations1: {
                    frame: { x: 138, y: 16, w: 174, h: 174 },
                    sourceSize: { w: 174, h: 174 },
                    spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
                },
                animations2: {
                    frame: { x: 579, y: 47, w: 174, h: 174 },
                    sourceSize: { w: 174, h: 174 },
                    spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
                },
                animations3: {
                    frame: { x: 1016, y: 169, w: 174, h: 174 },
                    sourceSize: { w: 174, h: 174 },
                    spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
                },
                animations4: {
                    frame: { x: 1441, y: 278, w: 211, h: 121 },
                    sourceSize: { w: 211, h: 121 },
                    spriteSourceSize: { x: 0, y: 0, w: 211, h: 121 }
                },
                animations5: {
                    frame: { x: 1910, y: 154, w: 158, h: 183 },
                    sourceSize: { w: 158, h: 183 },
                    spriteSourceSize: { x: 0, y: 0, w: 158, h: 183 }
                },
                animations6: {
                    frame: { x: 2339, y: 56, w: 174, h: 174 },
                    sourceSize: { w: 174, h: 174 },
                    spriteSourceSize: { x: 0, y: 0, w: 174, h: 174 }
                },
            },
            meta: {
                image: '../photo.png',
                format: 'RGBA8888',
                size: { w: 2640, h: 440 },
                scale: 1
            },
            animations: {
                enemy: ['animations1', 'animations2', 'animations3', 'animations4', 'animations3', 'animations2', 'animations1', 'animations2', 'animations3', 'animations4', 'animations3', 'animations2', 'animations1', 'animations2', 'animations3', 'animations4', 'animations3', 'animations2', 'animations1'] //array of frames by name
            }
        }

        this.spritesheet = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(this.atlasData.meta.image),
            this.atlasData
        );
        await this.spritesheet.parse();
    }

    initialization() {
        this.pixiApp = new PIXI.Application({ resizeTo: window, backgroundAlpha: 0 });
    }

    initLevel() {
        console.log("initLevel____________________");
        //скопировать с примера асинковый деспатч
        this.ballController = new BallController();
        this.animationController = new AnimationController(this.ballController.ballElement);
    }

    playing() {
        // for (let i=1; i<10000000;i++){

        // }
        // console.log("playing__________________");
        // debugger;
        //self = this;

        document.body.addEventListener('click', async()=> {
            //debugger;
            console.log(this.count);
            this.count++;
            if (this.count === 1)
                {
                    this.animationController.countSet(this.count);
                    await this.animationController.animateObject();
                    this.count = this.animationController.countGet();
            } else this.animationController.countSet(this.count);
            
        })
    }
} 