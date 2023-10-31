class BallController {
    #ballElement;
    height;
    speed;

    get ballElement() {
        return this.#ballElement;
    }

    constructor(spritesheet, pixiApp) {
        this.#ballElement = document.createElement('div');
        this.height = 1;
        this.speed = 0.192;

        this.#ballElement.style.width = 100 + 'px';
        this.#ballElement.style.height = 100 + 'px';
        
        this.#animationInit(spritesheet, pixiApp);
    }

    play(){
        this.#ballElement.addEventListener('click', function () {
            this.count++;
            if (this.count === 1)
                this.animateBall();
            console.log(this.count);
        }.bind(this));
        //this.ball.appendChild(this.#pixiApp.view);
    }

    #animationInit(spritesheet, pixiApp) {
        this.animBall = new PIXI.AnimatedSprite(spritesheet.animations.enemy);

        this.animBall.scale.set(0.7);
        this.animBall.x = 560;
        this.animBall.y = 180;

        this.animBall.animationSpeed = 0.191;
        pixiApp.stage.addChild(this.animBall);
    }



}