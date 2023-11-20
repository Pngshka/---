import * as THREE from 'three'
import { COL, ROW, CUBE_GEOM, CUBE_POS, CAMERA, BG_X, BG_Y, BG_Z, CAMERA_POS_Z, CUBE_BG_Z, CUBE_BG_X } from '../gameConstants.js'
import {Factory} from './Factory.js'

export class AnimationControllerTetris {
    cubes= [];
    cubesF = [];
    cubeB;

    renderer;
    camera;
    container;
    scene;
    geometry;
    material;
    materialF;
    materialB;
    dpr;
    data;

    factory;

    constructor(data) {
        this.factory = new Factory(data.colors[4]);

        this.onResize = this.onResize.bind(this);
        this.data = data;
        this.dpr = window.devicePixelRatio;

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -CAMERA, window.innerWidth / CAMERA, window.innerHeight / CAMERA, window.innerHeight / -CAMERA, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();

        this.material = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });
        this.materialF = new THREE.MeshBasicMaterial();
        this.materialB = new THREE.MeshBasicMaterial({ color: this.data.colors[6] });

        this.geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);

        this.geometryB = new THREE.BoxGeometry(BG_X, BG_Y, BG_Z);
        this.cubeB = new THREE.Mesh(this.geometryB, this.materialB);

        this.initialization();
    }

    initialization() {
        window.addEventListener('resize', this.onResize)

        this.container = document.getElementById('div');
        this.container.appendChild(this.renderer.domElement);

        this.renderer.setClearColor(this.data.colors[5]);
        this.onResize()
        //this.renderer.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);

        this.camera.position.z = CAMERA_POS_Z;
        this.cubeB.position.z = CUBE_BG_Z;
        this.cubeB.position.x = CUBE_BG_X;

    }

    runAnimation(matrix, figure, positionFigureY, positionFigureX, color) {

        this.scene.clear(); 
        
        //статичная фигура
        for (let i = 0; i < ROW; i++) {
            for (let j = 0; j < COL; j++) {
                if (matrix[i][j]) {
                    const cube = this.factory.getCube(true);

                    cube.position.x = j * CUBE_GEOM - CUBE_POS;
                    cube.position.y = -(i * CUBE_GEOM - CUBE_POS);
                    
                    this.cubes.push(cube);
                    this.scene.add(cube);
                }
            }
        }

        this.factory.setCube(true, this.cubes);
        this.cubes.splice(0, this.cubes.length);

        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col]) {
                    if (positionFigureY + row < 0) {
                        break;
                    }

                    const cube = this.factory.getCube(false);
                    cube.material.color.set(`${color}`);

                    cube.position.x = (positionFigureX + col) * CUBE_GEOM - CUBE_POS;
                    cube.position.y = -((positionFigureY + row) * CUBE_GEOM - CUBE_POS);

                    this.cubes.push(cube);
                    this.scene.add(cube);
                }
            }
        }

        this.factory.setCube(false, this.cubes);
        this.cubes.splice(0, this.cubes.length);
        
        this.scene.add(this.cubeB);
        this.renderer.render(this.scene, this.camera);
    }

    remove() {
        this.scene.clear(); 
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.dpr = window.devicePixelRatio;
        
        const {renderer:{domElement}} = this;
        const {offsetWidth, offsetHeight} = domElement.parentNode;
        this.camera.left = offsetWidth / -CAMERA;
		this.camera.right = offsetWidth / CAMERA;
		this.camera.top = offsetHeight / CAMERA;
		this.camera.bottom =offsetHeight/ -CAMERA;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(offsetWidth* this.dpr, offsetHeight * this.dpr);
        this.renderer.domElement.style.width=offsetWidth +'px';
        this.renderer.domElement.style.height=offsetHeight +'px';
        console.log( this.renderer.domElement.style.height)
        this.renderer.render(this.scene, this.camera);
    }
} 