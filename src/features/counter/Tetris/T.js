import Figure from './Figure.js'

export default class T extends Figure{
    name = 'T';
    row = 3;
    col = 3;
    matrix = [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
    color = "blue";

    getMatrix(){
        return this.matrix;
    }
}
