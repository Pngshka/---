import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export class AnimationController {
    animBall;
    count;



    constructor(animBall, config) {
        this.animBall = animBall;
        console.log('constructor-----------------AnimationController')
        this.speed = config.speed;
        console.log( this.speed)

    }

    countSet(count){
        this.count = count;
    }

    countGet(){
        return this.count;
    }

    async animateObject() {
        if (this.count === 0)
            return;

        function sineEase(repeat = 1, attenuation = 0) {
            return function (x) {
                return Math.sin(x * Math.PI * repeat) *
                    (Math.pow(1 - x, 2) * attenuation + (1 - attenuation));
            };
        }

        //debugger;
        var anim = gsap.timeline()
            .fromTo(this.animationController.animBall, 2.0,
                {
                    x: "+=" + 0
                },
                {
                    x: "+=" + 100, ease: "linear"
                }, 0.0)
            .fromTo(this.animationController.animBall, 0.5,
                {
                    y: 0
                },
                {
                    y: -100, ease: sineEase(1), repeat: 3
                }, 0.0);

        this.animationController.animBall.play();
        (await anim.play())
            .then(function () {
                this.animationController.animBall.stop();
                this.count--;
                this.isForward = !this.isForward;
                console.log(12312321);
                if (this.count > 0)
                    this.animationController.animateObject.bind(this)();
            }.bind(this));

    }
}