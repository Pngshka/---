import Figure from './Figure.js'

export default class I extends Figure{
    name = 'I';
    row = 3;
    col = 3;
    matrix = [[0, 0, 0], [1, 1, 1], [0, 0, 0]];

    getMatrix(){
        return this.matrix;
    }
}