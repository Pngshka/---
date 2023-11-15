import {AnimationControllerTetris} from './AnimationControllerTetris.js'
import Utilities from './Utilities.js'
import I from './I.js'
import T from './T.js'
import cube from './cube.js'
import Z from './Z.js'


export default class GameControllerTetris {
    animationControllerTetris;
    utilities;

    figure;
    field;

    //row, matrix и col поля
    row = 20;
    col = 10;
    matrix;

    //позиция считается с левого верхнего угла, позиция на поле
    positionFigureX; 
    positionFigureY;

    constructor() {
        this.utilities = new Utilities();
        this.matrix = Array(20).fill().map(() => Array(10).fill(0));
        this.getNextFigure();
        this.animationControllerTetris = new AnimationControllerTetris();
        setInterval(() => this.mainLoop(), 300);
    };

    chekingClicks(code) {
        if (code === 'left') {
            if (this.cheking(this.figure.matrix, this.positionFigureY, this.positionFigureX - 1)) {
                this.positionFigureX--;
            }
        }

        if (code === 'right') {
            if (this.cheking(this.figure.matrix, this.positionFigureY, this.positionFigureX + 1)) {
                this.positionFigureX++;
            }
        }

        //to do: переписать нормально
        let rotate = this.rotate(this.figure.matrix);
        if (code === 'top') {

            if (this.cheking(rotate, this.positionFigureY, this.positionFigureX)) {
                this.figure.matrix = rotate;
                return;
            } 

            let count = this.figure.col / 2
            
            console.log('count---------' + count);
            if (this.cheking(rotate, this.positionFigureY, this.positionFigureX + count)) {
                this.figure.matrix = rotate;
                this.positionFigureX+=count;
                return;
            } 
            if (this.cheking(rotate, this.positionFigureY, this.positionFigureX - count)) {
                this.figure.matrix = rotate;
                this.positionFigureX-=count;
                return;
            }
            
        
        }

    }

    rotate(matrix) {
        console.log(matrix)

        let n = matrix.length - 1;
        let result = matrix.map((row, i) =>
            row.map((val, j) => matrix[n - j][i])
        );


        console.log(result);
        return result;


        // matrix = [[0, 1, 0],
        //           [1, 1, 1]];

        // matrix = [[1, 0],
        //           [1, 1],
        //           [1, 0]];
    }

    cheking(matrix, cellRow, cellCol) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] 
                    && (cellCol + col < 0 || cellCol + col >= this.matrix[0].length || cellRow + row >= this.matrix.length ||this.matrix[cellRow + row][cellCol + col])) {
                    return false;
                }
            }
        }
        return true;
    }

    mainLoop() {
        console.log('mainLoop-----------' + (this.positionFigureX, this.positionFigureY))


        this.positionFigureY++;
        if (!this.cheking(this.figure.matrix, this.positionFigureY, this.positionFigureX)) {
            this.positionFigureY--;
            this.drawFigure();
        }
        this.animationControllerTetris.initialization(this.matrix, this.figure, this.positionFigureY, this.positionFigureX);
    }

    getNextFigure() {
       const { randValue, randCol } = this.utilities.rand();
       const axis = [T, I, cube, Z][randValue];

        //    const classes = {
        //         "I":I,
        //         "T":T
        //    };//to do: Переделать в Map
        //   let x = this.utilities.getClassByMap(classes, `${axis}`)

       this.figure = new axis();
       //eval(this.figure = new ${axis}(););

       this.figure.row = this.figure.row;
       this.figure.col = this.figure.col;
       console.log(this.figure.row, this.figure.col)

       this.positionFigureX = 4; //вычисляется случайно
       this.positionFigureY = 0;

        for (let row = 0; row < this.figure.matrix.length; row++) {
            for (let col = 0; col < this.figure.matrix[row].length; col++) {
                if (this.figure.matrix[row][col] && this.matrix[this.positionFigureY + row][this.positionFigureX + col]) {
                    this.gameOver();

                    
                }
            }
        }
    }

    drawFigure() {
        for (let row = 0; row < this.figure.matrix.length; row++) {
            for (let col = 0; col < this.figure.matrix[row].length; col++) {
                if (this.figure.matrix[row][col]) {
                    this.matrix[this.positionFigureY + row][this.positionFigureX + col] = 1;
                    
                }
            }
        }

        for (let row = this.matrix.length - 1; row >= 0;) {
            if (this.matrix[row].every(cell => !!cell)) {
                for (let i = row; i >= 0; i--) {
                    for (let j = 0; j < this.matrix[i].length; j++) {
                        this.matrix[i][j] = this.matrix[i - 1][j];
                    }
                }
            }
            else {
                row--;
            }
        }
       // console.log(this.matrix);
        this.getNextFigure();
    }

    gameOver(){
        console.log('GameOver')
        this.animationControllerTetris.remove()
        this.matrix = Array(20).fill().map(() => Array(10).fill(0));
    }
}