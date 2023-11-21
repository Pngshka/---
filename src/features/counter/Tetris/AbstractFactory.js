export class AbstractFactory {
    pull = [];
    construct(type) {
        const goodElements = this.getGoodElements(...arguments);
        const args = [...arguments];
        if (goodElements.length === 0)
            return this.getElement(...args);
        const resultElement = goodElements[0];
        const indexOfGoodElement = this.pull.indexOf(resultElement);
        this.pull.splice(indexOfGoodElement, 1);
        return resultElement;
     }
    deconstruct(objects) { 
        this.pull.push(...objects);
    }
    getElement() { return new Object(); }
    getGoodElements() { return []; }
}