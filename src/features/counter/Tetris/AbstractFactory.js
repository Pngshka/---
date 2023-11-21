export class AbstractFactory {
    figures = [];
    constructor(){}

    get Figure(){
        if (this.figures.length === 0){
            return figure;
        } else {
            return this.figures.pop();
        }
    }

    set Figure(figures){
        this.figures.push(...figures);
    }
}