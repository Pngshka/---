import gsap from "gsap";

export class AnimationController {
    animBall;
    count;

    constructor(animBall) {
        this.animBall = animBall;
        console.log('constructor-----------------AnimationController')
        console.log(this.animBall)
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

        var anim = gsap.timeline()
            .fromTo(this.animBall, 2.0,
                {
                    xPercent: "+=" + 0
                },
                {
                    xPercent: "+=" + 100, ease: "linear"
                }, 0.0)
            .fromTo(this.animBall, 0.5,
                {
                    yPercent: 0
                },
                {
                    yPercent: -100, ease: sineEase(1), repeat: 3
                }, 0.0);

        //this.animBall.play();
        (await anim.play())
            .then(function () {
                //this.animBall.stop();
                this.count--;
                this.isForward = !this.isForward;
                console.log(12312321);
                if (this.count > 0)
                    this.animateObject();
            }.bind(this));

    }
}