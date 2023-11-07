import gsap from "gsap";

export default class Game3DController {
    ballController;
    animationController;
    randOXY;
    randValue;
    render;
    renderer;
    container;
    scene;
    camera;
    geometry;
    material;
    cube;
    count = 1;

    constructor() {}

    static get instance() {
        if (!this._instance) this._instance = new Game3DController();

        return this._instance;
    }

    static _instance = null;

    async loadingManifest() { }

    async initialization() {
        this.container = document.createElement('div');
        this.container.id = 'CanvasFrame';
        document.body.appendChild(this.container);

        this.elementRemoveScene = document.createElement('button');
        this.elementRemoveScene.textContent = 'RemoveScene';
        this.elementRemoveScene.id = 'RemoveScene';
        document.body.appendChild(this.elementRemoveScene);

        this.element = document.createElement('button');
        this.element.textContent = 'AddScene';
        this.element.id = 'AddScene';
        document.body.appendChild(this.element);

        const THREE = await import('three');
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.scene.fog = new THREE.Fog('lightblue', 0.01, 3.52);
        this.scene.background = new THREE.Color('lightblue');

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x2f3640);
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        this.geometry = new THREE.BoxGeometry(1, 1, 1);

        this.material = new THREE.ShaderMaterial({
            vertexShader: `
              uniform vec3 color1;
              uniform vec3 color2;
              varying vec3 vColor;
            
              void main() {
                vec4 globalPosition = modelMatrix * vec4(position, 1.0);
                vec3 globalPositionXYZ = globalPosition.xyz;
                
                vColor = mix(color1, color2, globalPositionXYZ);
                
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec3 vColor;
            
              void main() {
                gl_FragColor = vec4(vColor, 1.0);
              }
            `
        });

        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.z = 3;
        this.cube.position.y = 0;
        this.cube.position.x = 0;

        this.material.uniforms = {
            color1: { value: new THREE.Vector3(1, 1, 1) },
            color2: { value: new THREE.Vector3(1, 0, 0) }
        };

    }

    async initLevel() {
        this.loadThreeJS();
    }

    playing() {

        this.element.addEventListener('click', function () {
            if (this.count === 0) {
                this.count++;
                this.loadThreeJS();
            }
        }.bind(this))

        this.container.addEventListener('click', function () {
            this.animateObject();
        }.bind(this))

    }

    removeThreeJS(scene) {
        scene.remove();
    }

    async animateObject() {
        const THREE = await import('three');
        //console.log('loadThreeJS')
        this.rand();
        switch (this.randOXY) {
            case 0:
                console.log('123');
                //cube.rotation.x += randValue;
                gsap.to(this.cube.rotation, { x: this.randValue });
                break;
            case 1:
                gsap.to(this.cube.rotation, { y: this.randValue });
                break;
            case 2:
                gsap.to(this.cube.rotation, { z: this.randValue });
                break;
        }

        this.renderer.render(this.scene, this.camera);
    }

    rand() {
        this.randOXY = Math.floor(Math.random() * 3);
        this.randValue = Math.floor(Math.random() * 360);
    }

    async loadThreeJS() {
        console.log('Btn')

        const THREE = await import('three');
        this.container = document.getElementById('CanvasFrame');

        this.container.appendChild(this.renderer.domElement);
        this.container.style.position = 'absolute';
        this.container.style.left = 300 + 'px';

        this.elementRemoveScene.addEventListener('click', function () {
            if (this.count === 1) {
                this.count--;
                this.removeThreeJS(this.renderer.domElement);
            }
        }.bind(this))

        this.scene.add(this.cube);

        this.animateObject();

        // this.container.addEventListener('click', function () {
        //     this.animateObject();
        // }.bind(this))
    }
}