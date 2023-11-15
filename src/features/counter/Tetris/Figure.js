export default class Figure{
    matrix;
    color;
    positionX; 
    positionY;

    get col(){
        return this.matrix[0].length;
    }

    get row(){
        return this.matrix.length;
    }
}