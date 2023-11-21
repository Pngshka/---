import {CubeFactory} from './CubeFactory'
import {FigureFactory} from './FigureFactory'
import { CUBE_TYPE, FIGURE_TYPE } from '../gameConstants'

export class AbstractFactory {

    constructor(){}

    initialization(type){
        if (type === CUBE_TYPE)
            return new CubeFactory();
        if (type === FIGURE_TYPE)
            return new FigureFactory();

        throw new Error(`Undeclaried class: "${type}"!`);
        
    }
}