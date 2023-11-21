import * as THREE from 'three'
import { CUBE_GEOM } from '../gameConstants.js'

export class CubeFactory {
    cubes = [];

    constructor() {
        this.geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);
        this.material = new THREE.MeshBasicMaterial();
    }

    construct() {
        if (!this.cubes.length) {
            const figure = new THREE.Mesh(this.geometry, this.material);
            return figure;
        } else {
            return this.cubes.pop();
        }
    }

    deconstruct(cubes) {
        this.cubes.push(...cubes);
    }

}