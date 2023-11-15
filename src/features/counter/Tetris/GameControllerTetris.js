import {AnimationControllerTetris} from './AnimationControllerTetris.js'
import Utilities from './Utilities.js'
import I from './I.js'
import T from './T.js'
import cube from './cube.js'
import Z from './Z.js'
import {COL, ROW} from '../gameConstants.js'


export default class GameControllerTetris {
    animationControllerTetris;
    utilities;

    figure;
    matrix;

    //to do: поменять камеру
        //очертить границы поля
        //вынести константы
        //config
        //свет
        //dataTime
        //фабрика: после удаления линии использовать кубы в отрисовке следующей фигуры
        //to do: поправит I
        //dpr

    constructor() {
        this.utilities = new Utilities();
        this.matrix = Array(ROW).fill().map(() => Array(COL).fill(0));
        this.getNextFigure();
        this.animationControllerTetris = new AnimationControllerTetris();
        setInterval(() => this.mainLoop(), 300);
    };

    chekingClicks(code) {
        if (code === 'left') {
            if (this.cheking(this.figure.matrix, this.figure.positionY, this.figure.positionX - 1)) {
                this.figure.positionX--;
            }
        }

        if (code === 'right') {
            if (this.cheking(this.figure.matrix, this.figure.positionY,this.figure.positionX + 1)) {
                this.figure.positionX++;
            }
        }

        //to do: поправит I
        let rotate = this.rotate(this.figure.matrix);
        if (code === 'top') {

            if (this.cheking(rotate, this.figure.positionY, this.figure.positionX)) {
                this.figure.matrix = rotate;
                return;
            } 

            let count = this.figure.col / 2
            
            //console.log('count---------' + count);
            if (this.cheking(rotate, this.figure.positionY, this.figure.positionX + count)) {
                this.figure.matrix = rotate;
                this.figure.positionX+=count;
                return;
            } 
            if (this.cheking(rotate, this.figure.positionY, this.figure.positionX - count)) {
                this.figure.matrix = rotate;
                this.figure.positionX-=count;
                return;
            }
            
        
        }

    }

    rotate(matrix) {
        console.log(matrix)

        const n = matrix.length - 1;
        const result = matrix.map((row, i) =>
            row.map((val, j) => matrix[n - j][i])
        );

        console.log(result);
        return result;
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

        //проверка пересечения фигур (переделать)
        // for (let row = 0; row < matrix.length; row++) {
        //     for (let col = 0; col < matrix[row].length; col++) {
        //         if ( this.matrix[matrix.positionY + row][matrix.positionX + col] && matrix[row][col]) {
        //             return false;
        //         }
        //     }
        // }

        return true;
    }

    mainLoop() {
        this.figure.positionY++;
        if (!this.cheking(this.figure.matrix, this.figure.positionY, this.figure.positionX)) {
            this.figure.positionY--;
            this.drawFigure();
        }
        this.animationControllerTetris.initialization(this.matrix, this.figure, this.figure.positionY, this.figure.positionX);
    }

    getNextFigure() {
       const { randValue } = this.utilities.rand();
       const axis = [T, I, cube, Z][randValue];

        //    const classes = {
        //         "I":I,
        //         "T":T
        //    };//to do: Переделать в Map
        //   let x = this.utilities.getClassByMap(classes, `${axis}`)

       this.figure = new axis();
       //eval(this.figure = new ${axis}(););

    //    this.figure.row = this.figure.row;
    //    this.figure.col = this.figure.col;
    //    console.log(this.figure.row, this.figure.col)

       this.figure.positionX = 4;
       this.figure.positionY = 0;

        for (let row = 0; row < this.figure.matrix.length; row++) {
            for (let col = 0; col < this.figure.matrix[row].length; col++) {
                if (this.figure.matrix[row][col] && this.matrix[this.figure.positionY + row][this.figure.positionX + col]) {
                    this.gameOver();

                    
                }
            }
        }
    }

    drawFigure() {
        for (let row = 0; row < this.figure.matrix.length; row++) {
            for (let col = 0; col < this.figure.matrix[row].length; col++) {
                if (this.figure.matrix[row][col]) {
                    this.matrix[this.figure.positionY + row][this.figure.positionX + col] = 1;
                    
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
        this.getNextFigure();
    }

    gameOver(){
        console.log('GameOver')
        this.animationControllerTetris.remove()
        this.matrix = Array(ROW).fill().map(() => Array(COL).fill(0));
    }
}