import * as THREE from 'three'
import { CUBE_GEOM } from '../gameConstants.js'
import { AbstractFactory } from './AbstractFactory.js';

export class Factory extends AbstractFactory{

    constructor(color){
        super()
        this.geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);
        this.material = new THREE.MeshBasicMaterial({ color: color });
    }

    get Figure(){
        if (this.figures.length === 0){
            const figure = new THREE.Mesh(this.geometry, this.material);
            return figure;
        } else {
            return this.figures.pop();
        }
    }

    set Figure(figures){
        this.figures.push(...figures);
    }

}