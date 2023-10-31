class GameController {
    ballController;
    animationController;
    spritesheet;
    pixiApp;

    async loadingManifest() {
        var request = new XMLHttpRequest();
        request.open("GET", "./pixiAssets.json");
        request.responseType = "json";
        request.send();
        request.onload = function () {
            var test = request.response;
            console.log(test["speed"]);
        };

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
        this.ballController = new BallController(this.spritesheet, this.pixiApp);
        this.animationController = new AnimationController(ballController.ballElement());
    }

    playing(){
        
    }
}