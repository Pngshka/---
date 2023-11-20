import * as THREE from 'three'
import { COL, ROW, CUBE_GEOM, CUBE_POS, CAMERA } from '../gameConstants.js'

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
    dpr;
    data;

    constructor(data) {
        

        this.onResize = this.onResize.bind(this);
        this.data = data;
        this.dpr = window.devicePixelRatio;

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -CAMERA, window.innerWidth / CAMERA, window.innerHeight / CAMERA, window.innerHeight / -CAMERA, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();

        this.material = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });
        this.materialF = new THREE.MeshBasicMaterial({ color: this.data.colors[4] });
        this.materialB = new THREE.MeshBasicMaterial({ color: this.data.colors[6] });

        this.geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);

        this.geometryB = new THREE.BoxGeometry(0.4, 2, 0.1);
        this.cubeB = new THREE.Mesh(this.geometryB, this.materialB);
        this.container = document.getElementById('div');
        this.container.appendChild(this.renderer.domElement);

        this.initialization();
    }

    initialization() {
        window.addEventListener('resize', this.onResize)
        this.camera.position.z = 3;
        this.renderer.setClearColor(this.data.colors[5]);
        this.renderer.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);

        this.cubeB.position.z = -2;
        this.cubeB.position.x = -0.02;

        for (let i=0; i<20;i++){
            if (i<5){
                const cubeF = new THREE.Mesh(this.geometry, this.materialF);
                this.cubesF.push(cubeF)
            }
            this.cubes[i]=[];
            for (let j=0;j<10;j++){
                const cube = new THREE.Mesh(this.geometry, this.material);
                this.cubes[i].push(cube)
            }
        }
    }

    runAnimation(matrix, figure, positionFigureY, positionFigureX, color) {

        this.scene.clear(); 
        
        //статичная фигура
        for (let i = 0; i < ROW; i++) {
            for (let j = 0; j < COL; j++) {
                if (matrix[i][j]) {
                    const cube = this.cubes[i][j];

                    cube.position.x = j * CUBE_GEOM - CUBE_POS;
                    cube.position.y = -(i * CUBE_GEOM - CUBE_POS);

                    this.scene.add(cube);
                }
            }
        }


        let countF=0
        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col]) {
                    if (positionFigureY + row < 0) {
                        break;
                    }

                    const cube = this.cubesF[countF];
                    countF++;

                    cube.material.color.set(`${color}`);

                    cube.position.x = (positionFigureX + col) * CUBE_GEOM - CUBE_POS;
                    cube.position.y = -((positionFigureY + row) * CUBE_GEOM - CUBE_POS);

                    this.scene.add(cube);
                }
            }
        }
        
        this.scene.add(this.cubeB);
        this.renderer.render(this.scene, this.camera);
    }

    remove() {
        this.scene.clear(); 
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.left = window.innerWidth / -CAMERA;
		this.camera.right = window.innerWidth / CAMERA;
		this.camera.top = window.innerHeight / CAMERA;
		this.camera.bottom = window.innerHeight / -CAMERA;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);
        this.renderer.render(this.scene, this.camera);
    }

} 