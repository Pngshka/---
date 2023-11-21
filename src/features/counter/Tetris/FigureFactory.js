import { AbstractFactory } from './AbstractFactory.js';
import Utilities from './Utilities.js'

export class FigureFactory extends AbstractFactory {
    getElement() {
        const clazz = arguments[0];
        console.log(clazz);
        return new clazz();
    }

    getGoodElements() {
        const clazz = arguments[0];
        return this.pull.filter(x => x.constructor.name === clazz.name);
    }
}