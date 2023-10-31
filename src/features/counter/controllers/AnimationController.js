class AnimationController {
    animBall;
    constructor(animBall) {
        this.animBall = animBall;
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
            .fromTo(ball, 2.0,
                {
                    xPercent: "+=" + 0
                },
                {
                    xPercent: "+=" + 100, ease: "linear"
                }, 0.0)
            .fromTo(ball, 0.5,
                {
                    yPercent: 0
                },
                {
                    yPercent: -100, ease: sineEase(1), repeat: 3
                }, 0.0);

        this.animBall.play();
        (await anim.play())
            .then(function () {
                this.animBall.stop();
                this.count--;
                this.isForward = !this.isForward;
                console.log(12312321);
                if (this.count > 0)
                    this.animateBall();
            }.bind(this));

    }
}