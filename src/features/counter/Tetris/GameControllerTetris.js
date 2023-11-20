import { AnimationControllerTetris } from './AnimationControllerTetris.js'
import Utilities from './Utilities.js'
import I from './I.js'
import T from './T.js'
import cube from './cube.js'
import Z from './Z.js'
import { COL, ROW } from '../gameConstants.js'


export default class GameControllerTetris {
    animationControllerTetris;
    utilities;

    figure;
    matrix;

    fps;
    fpsInterval;
    startTime;
    now;
    then;
    elapsed;

    data;
    colorNow;

    constructor() {
        this.initialization();
    };

    async initialization(){
        const response = await fetch('/tetrisAssets.json');
        this.data = await response.json();

        this.utilities = new Utilities();

        this.matrix = Array(ROW).fill().map(() => Array(COL).fill(0));
        this.animationControllerTetris = new AnimationControllerTetris(this.data);

        this.fpsInterval = 1000 / 5;
        this.then = Date.now();
        this.startTime = this.then;

        this.getNextFigure();
        this.mainLoop();
    }

    chekingClicks(code) {
        if (code === 'left') {
            if (this.cheking(this.figure.matrix, this.figure.positionY, this.figure.positionX - 1)) {
                this.figure.positionX--;
            }
        }

        if (code === 'right') {
            console.log(this.matrix)
            if (this.cheking(this.figure.matrix, this.figure.positionY, this.figure.positionX + 1)) {
                this.figure.positionX++;
            }
        }

        let rotate = this.rotate(this.figure.matrix);
        if (code === 'top') {


            if (this.cheking(rotate, this.figure.positionY, this.figure.positionX)) {
                if (this.chekingRotate(this.matrix, this.figure, rotate)){
                    this.figure.matrix = rotate;
                    return;
                }
            }

            const count = this.figure.col / 2;

            if (this.cheking(rotate, this.figure.positionY, this.figure.positionX + count)) {
                if (this.chekingRotate(this.matrix, this.figure, rotate)){
                    this.figure.matrix = rotate;
                    this.figure.positionX += count;
                    return;
                }
            }
            if (this.cheking(rotate, this.figure.positionY, this.figure.positionX - 1)) {
                if (this.chekingRotate(this.matrix, this.figure, rotate)){
                    this.figure.matrix = rotate;
                    this.figure.positionX -= 1;
                    return;
                }
            }
        }

        if (code === 'down') {
            this.figure.positionY++;
            if (!this.cheking(this.figure.matrix, this.figure.positionY, this.figure.positionX)) {
                this.figure.positionY--;
                this.drawFigure();
            }
        }
    }

    rotate(matrix) {
        const n = matrix.length - 1;
        const result = matrix.map((row, i) =>
            row.map((val, j) => matrix[n - j][i])
        );

        return result;
    }

    cheking(matrix, cellRow, cellCol) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col]
                    && (cellCol + col < 0 || cellCol + col >= this.matrix[0].length || cellRow + row >= this.matrix.length || this.matrix[cellRow + row][cellCol + col])) {
                    return false;
                }
            }
        }

        return true;
    }

    mainLoop = () => {
        requestAnimationFrame(this.mainLoop);

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        if (this.elapsed > this.fpsInterval) {

            this.then = this.now - (this.elapsed % this.fpsInterval);

            this.figure.positionY++;
            if (!this.cheking(this.figure.matrix, this.figure.positionY, this.figure.positionX)) {
                this.figure.positionY--;
                this.drawFigure();
            }

            this.animationControllerTetris.runAnimation(this.matrix, this.figure, this.figure.positionY, this.figure.positionX, this.colorNow);
        }
    }
    
    getNextFigure() {
        const { randValue } = this.utilities.rand();
        const axis = [T, I, cube, Z][randValue];
        this.colorNow = `${this.data.colors[randValue]}`;

        this.figure = new axis();
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
                for (let i = row; i > 0; i--) {
                    for (let j = 0; j < this.matrix[i].length; j++) {
                        // console.log(i + '-------' + j)
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

    gameOver() {
        console.log('GameOver')
        this.animationControllerTetris.remove()
        this.matrix = Array(ROW).fill().map(() => Array(COL).fill(0));
    }

    chekingRotate(matrix, figure, matrixFigure){
        for (let row = 0; row < matrixFigure.length; row++) {
            for (let col = 0; col < matrixFigure[row].length; col++) {
                if (matrix[figure.positionY + row][figure.positionX + col] && matrixFigure[row][col]) {
                    return false
                }
                if (row === matrixFigure.length - 1 && matrix[figure.positionY + row][figure.positionX + col]){
                    return false
                }
            }
        }

        return true
    }
}