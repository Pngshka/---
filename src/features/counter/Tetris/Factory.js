import * as THREE from 'three'
import { COL, ROW, CUBE_GEOM, CUBE_POS, CAMERA } from '../gameConstants.js'

export class Factory {
    //to do: абстрактная фабрика
    cubes= [];
    cubesF= [];

    constructor(color){
        this.geometry = new THREE.BoxGeometry(CUBE_GEOM, CUBE_GEOM, CUBE_GEOM);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.materialF = new THREE.MeshBasicMaterial();
    }

    getCube(flag){
        if (flag ? this.cubes.length===0 :  this.cubesF.length===0){
            const cube = flag ? new THREE.Mesh(this.geometry, this.material) : new THREE.Mesh(this.geometry, this.materialF);
            return cube;
        } else {
            return flag ? this.cubes.pop() : this.cubesF.pop();
        }
    }

    setCube(flag, cubes){
        flag ? this.cubes.push(...cubes) : this.cubesF.push(...cubes);
    }

}