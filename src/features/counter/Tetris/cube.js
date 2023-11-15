import Figure from './Figure.js'

export default class cube extends Figure{
    name = 'cube';
    row = 2;
    col = 2;
    matrix = [[1, 1], [1, 1]];
    color= "black";

    getMatrix(){
        return this.matrix;
    }
}