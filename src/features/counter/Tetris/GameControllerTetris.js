import {AnimationControllerTetris} from './AnimationControllerTetris.js'
import {Utilities, getClass, getClassByMap} from './Utilities.js'
import I from './I.js'
import T from './T.js'


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
    positionFigureX; //вычисляется случайно
    positionFigureY;

    flag;

    constructor() {
        
        this.utilities = new Utilities();
        this.getNextFigure();
        this.matrix = Array(20).fill().map(() => Array(10).fill(0));

        // this.matrix = [];
        // for (let i = 0; i < this.row; i++) {
        //     //переписать matrix как массив объектов: цвет, 1/0
        //     this.matrix[i] = []
        //     for (let j = 0; j < this.col; j++) {
        //         this.matrix[i][j] = 0;
        //     }
        // }

        this.animationControllerTetris = new AnimationControllerTetris();
        setInterval(() => this.mainLoop(), 500);
    };

    chekingClicks(flag) {
        if (flag === 'left') {
            if (this.isValidMove(this.figure.matrix, this.positionFigureY, this.positionFigureX - 1)) {
                this.positionFigureX--;
            }
        }

        if (flag === 'right') {
            if (this.isValidMove(this.figure.matrix, this.positionFigureY, this.positionFigureX + 1)) {
                this.positionFigureX++;
            }
        }

        //to do: переписать нормально
        if (flag === 'top') {
            console.log('top');

            if (this.isValidMove(this.rotate(this.figure.matrix), this.positionFigureY, this.positionFigureX)) {
                this.figure.matrix = this.rotate(this.figure.matrix);
            } else{
                if (this.isValidMove(this.rotate(this.figure.matrix), this.positionFigureY, this.positionFigureX + 1)) {
                    this.figure.matrix = this.rotate(this.figure.matrix);
                    this.positionFigureX++;
                } else {
                    if (this.isValidMove(this.rotate(this.figure.matrix), this.positionFigureY, this.positionFigureX - 1)) {
                        this.figure.matrix = this.rotate(this.figure.matrix);
                        this.positionFigureX--;
                    }
                }
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

    gameOver() {

    }

    isValidMove(matrix, cellRow, cellCol) {
        // проверяем все строки и столбцы
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] && (
                    // если выходит за границы поля…
                    cellCol + col < 0 ||
                    cellCol + col >= this.matrix[0].length ||
                    cellRow + row >= this.matrix.length ||
                    // …или пересекается с другими фигурами
                    this.matrix[cellRow + row][cellCol + col])
                ) {
                    // то возвращаем, что нет, так не пойдёт
                    return false;
                }
            }
        }
        // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
        return true;
    }

    mainLoop() {
        console.log('mainLoop-----------' + (this.positionFigureX, this.positionFigureY))


        this.positionFigureY++; //tetromino.row++;

        // если движение закончилось — рисуем фигуру в поле и проверяем, можно ли удалить строки
        if (!this.isValidMove(this.figure.matrix, this.positionFigureY, this.positionFigureX)) {
            this.positionFigureY--;
            this.placeTetromino();
        }


        this.animationControllerTetris.initialization(this.matrix, this.figure, this.positionFigureY, this.positionFigureX);
        //this.animationControllerTetris.drawField(this.matrix);

    }

    getNextFigure() {
       // тут — сами фигуры
       const { randValue, randCol } = this.utilities.rand();
       const axis = ["T", "I"][randValue];

       //console.log(`${axis}`);
       //debugger;
       const classes = {
            "I":I,
            "T":T
       };//Переделать в Map
       let x = getClassByMap(classes, `${axis}`)
       //debugger;
       this.figure = new x();
       //eval(this.figure = new ${axis}(););

       this.figure.row = this.figure.row;
       this.figure.col = this.figure.col;
       console.log(this.figure.row, this.figure.col)

       this.positionFigureX = 5; //вычисляется случайно
       this.positionFigureY = 0;
    }

    placeTetromino() {
        // обрабатываем все строки и столбцы в игровом поле
        for (let row = 0; row < this.figure.matrix.length; row++) {
            for (let col = 0; col < this.figure.matrix[row].length; col++) {
                if (this.figure.matrix[row][col]) {

                    // если край фигуры после установки вылезает за границы поля, то игра закончилась
                    if (this.positionFigureY + row < 0) {
                        return showGameOver();
                    }
                    // если всё в порядке, то записываем в массив игрового поля нашу фигуру
                    this.matrix[this.positionFigureY + row][this.positionFigureX + col] = 1;
                    
                }
            }
        }

        // проверяем, чтобы заполненные ряды очистились снизу вверх
        for (let row = this.matrix.length - 1; row >= 0;) {
            // если ряд заполнен
            if (this.matrix[row].every(cell => !!cell)) {

                // очищаем его и опускаем всё вниз на одну клетку
                for (let r = row; r >= 0; r--) {
                    for (let c = 0; c < this.matrix[r].length; c++) {
                        this.matrix[r][c] = this.matrix[r - 1][c];
                    }
                }
            }
            else {
                // переходим к следующему ряду
                row--;
            }
        }
        console.log(this.matrix);
        // получаем следующую фигуру
        this.getNextFigure();
    }
}