import Figure from './Figure.js'

export default class I extends Figure{
    name = 'I';
    row = 4;
    col = 4;
    matrix = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
    color= "blue";

    getMatrix(){
        return this.matrix;
    }
}