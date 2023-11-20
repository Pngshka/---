import * as THREE from 'three'
import { COL, ROW, CUBE_GEOM, CUBE_POS } from '../gameConstants.js'

export class AnimationControllerTetris {
    cubeF;
    cube;
    cubeB;
    renderer;
    camera;
    container;
    scene;
    geometry;
    material;
    dpr;
    data;
    heightAndWidth;
    canvas;

    constructor(data) {

        this.data = data;
        this.dpr = window.devicePixelRatio;

        this.container = document.createElement('div');

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(window.innerHeight / -1000, window.innerHeight / 1000, window.innerHeight / 1000, window.innerHeight / -1000, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();

        this.geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);
        this.material = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });
        this.materialF = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });
        this.materialB = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });

        this.container = document.getElementById('div');
        this.container.appendChild(this.renderer.domElement);

        this.settings();
    }

    settings() {
        this.camera.position.z = 3;
        this.renderer.setClearColor(this.data.colors[5]);
        this.renderer.setSize(window.innerHeight * this.dpr, window.innerHeight * this.dpr);

        this.canvas = document.getElementsByTagName('canvas');
        this.heightAndWidth = window.innerHeight / this.dpr + 200 + 'px';
        this.canvas[0].style.height = this.heightAndWidth
        this.canvas[0].style.width = this.heightAndWidth
    }

    initialization(matrix, figure, positionFigureY, positionFigureX, color) {
        window.addEventListener('resize', function () {
            this.onResize();
        }.bind(this))

        this.scene.remove.apply(this.scene, this.scene.children);
        
        for (let i = 0; i < ROW; i++) {
            for (let j = 0; j < COL; j++) {
                if (matrix[i][j]) {
                    this.cubeF = new THREE.Mesh(this.geometry, this.materialF);

                    this.cubeF.position.x = j * CUBE_GEOM - CUBE_POS;
                    this.cubeF.position.y = -(i * CUBE_GEOM - CUBE_POS);

                    this.scene.add(this.cubeF);
                }
            }
        }

        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col]) {
                    this.cube = new THREE.Mesh(this.geometry, this.material);

                    this.cube.material.color.set(`${color}`);

                    if (positionFigureY + row < 0) {
                        break;
                    }

                    
                    this.geometryB = new THREE.BoxGeometry(0.45, 2, 0.1);
                    this.cubeB = new THREE.Mesh(this.geometryB, this.materialB);
                    this.cubeB.material.color.set(`${this.data.colors[6]}`);
                    this.cubeB.position.z = -2;
                    this.scene.add(this.cubeB);


                    this.cube.position.x = (positionFigureX + col) * CUBE_GEOM - CUBE_POS;
                    this.cube.position.y = -((positionFigureY + row) * CUBE_GEOM - CUBE_POS);
                    this.scene.add(this.cube);
                }
            }
        }
        

        this.renderer.render(this.scene, this.camera);
    }

    remove() {
        this.scene.remove.apply(this.scene, this.scene.children);
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.renderer.setSize(window.innerWidth * this.dpr, window.innerWidth * this.dpr);

        this.heightAndWidth = window.innerHeight / this.dpr + 200 + 'px';
        this.canvas[0].style.width = this.heightAndWidth
        this.canvas[0].style.height = this.heightAndWidth

        this.renderer.render(this.scene, this.camera);
    }

} 