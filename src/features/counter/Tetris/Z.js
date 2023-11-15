import Figure from './Figure.js'

export default class Z extends Figure{
    name = 'Z';
    row = 3;
    col = 3;
    matrix = [[1, 0, 0], [1, 1, 1], [0, 0, 1]];
    color= "red";

    getMatrix(){
        return this.matrix;
    }
}