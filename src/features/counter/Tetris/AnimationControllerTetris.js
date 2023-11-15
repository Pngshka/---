

import * as THREE from 'three'

export class AnimationControllerTetris {
    cubeF;
    cube;
    renderer;
    camera;
    container;
    _doc;
    scene;
    geometry;
    material;

    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'CanvasFrame';
        this._doc = document.getElementById('div');
        this._doc.appendChild(this.container);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 3;


        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x2f3640);
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.materialF = new THREE.MeshBasicMaterial({ color: 0x00ff00 });


         //-----------------------------------------------------------------------------------

         this.container = document.getElementById('CanvasFrame');

         this.container.appendChild(this.renderer.domElement);
         this.container.style.position = 'absolute';
         this.container.style.left = 300 + 'px';
    }

    initialization(matrix, figure, positionFigureY, positionFigureX) {

        this.scene.remove.apply(this.scene, this.scene.children);
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                if (matrix[i][j]) {
                    this.cubeF = new THREE.Mesh(this.geometry,this.materialF);
    
                    this.cubeF.position.x = j/10 * 1; 
                    this.cubeF.position.y = -(i/10 * 1); 

                    this.scene.add(this.cubeF);
                }
            }
        }

        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col]) {
                    this.cube = new THREE.Mesh(this.geometry, this.material);
                    this.cube.material.color.set( figure.color );
                    if (positionFigureY + row < 0) {
                        break;
                    }
                    this.cube.position.x = (positionFigureX + col)/10 * 1; 
                    this.cube.position.y = -((positionFigureY + row)/10 * 1); 
                    this.scene.add(this.cube);
                }
            }
        }

        this.renderer.render(this.scene, this.camera);

    }

    remove(){
        this.scene.remove.apply(this.scene, this.scene.children);
        this.renderer.render(this.scene, this.camera);
    }

} 