import { GameController } from './GameController'
import gsap from "gsap";

export default class Game3DController /*extends GameController*/ {
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

    constructor() {
        //super();
    }

    static get instance() {
        if (!this._instance) this._instance = new Game3DController();

        return this._instance;
    }

    static _instance = null;

    async loadingManifest() {}

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

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        {
            const near = 0.01;
            const far = 3.52;
            const color = 'lightblue';
            this.scene.fog = new THREE.Fog(color, near, far);
            this.scene.background = new THREE.Color(color);
        }

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x2f3640);
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        this.container.appendChild(this.renderer.domElement);
        this.container.style.position = 'absolute';
        this.container.style.left = 300 + 'px';

        this.geometry = new THREE.BoxGeometry(1, 1, 1);

        this.material = new THREE.ShaderMaterial({
            vertexShader: `
              uniform vec3 color1;
              uniform vec3 color2;
              varying vec3 vColor;
            
              void main() {
                // Получение глобальной координаты вершины
                vec4 globalPosition = modelMatrix * vec4(position, 1.0);
                vec3 globalPositionXYZ = globalPosition.xyz;
                
                // Вычисление цвета в зависимости от глобальных координат
                vColor = mix(color1, color2, globalPositionXYZ);
                
                // Позиция вершины
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec3 vColor;
            
              void main() {
                // Устанавливаем цвет фрагмента
                gl_FragColor = vec4(vColor, 1.0);
              }
            `
        });

        this.elementRemoveScene.addEventListener('click', function () {
            if (this.count === 1){
                this.count--;
                this.removeThreeJS(this.renderer.domElement);
            }
          }.bind(this))

        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.z = 3;
        this.cube.position.y = 0;
        this.cube.position.x = 0;
        this.scene.add(this.cube);

        this.material.uniforms = {
            color1: { value: new THREE.Vector3(1, 1, 1) },
            color2: { value: new THREE.Vector3(1, 0, 0) }
        };

        this.animateObject();

        this.container.addEventListener('click', function () {
            this.animateObject();
        }.bind(this))
    }
}