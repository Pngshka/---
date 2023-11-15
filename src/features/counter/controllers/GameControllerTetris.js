
export default class GameControllerTetris {
    inputController;

    constructor() { }

    static get instance() {
        if (!this._instance) this._instance = new GameControllerTetris();

        return this._instance;
    }

    static _instance = null;

    loadingManifest() { }

    async initialization() {
        var {InputController} = await import('../input-controller.js');
        var {KeyboardPlugin} = await import('../plugins/KeyboardPlugin.js');
        var {ActivWithKeyCode} = await import('../plugins/ActivWithKeyCode.js');

        let topAktiv = new ActivWithKeyCode("top", true, [38]);
        let leftAktiv = new ActivWithKeyCode("left", true, [37, 65]);
        let rightAktiv = new ActivWithKeyCode("right", true, [39, 68]);

        this.inputController = new InputController();

        let keyboardPlugin = new KeyboardPlugin(this.inputController);
        this.inputController.addPlugin(keyboardPlugin);

        this.inputController.bindActions(topAktiv);
        this.inputController.bindActions(leftAktiv);
        this.inputController.bindActions(rightAktiv);

        this.inputController.attach(document);
    }

    initLevel() {
    }

    playing() {

    }

}