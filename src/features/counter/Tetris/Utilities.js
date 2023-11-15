import I from './I.js'
import T from './T.js'

export class Utilities{

    constructor(){}
    
    rand() {
        return { randValue: Math.floor(Math.random() * 2), randCol: Math.floor(Math.random() * 10) };
    }

    // getClass(name) {
    //     let _cls_ = {};
    //     if (!_cls_[name]) {
    //         if (name.match(/^[a-zA-Z0-9_]+$/)) {
    //             _cls_[name] = eval(name);
    //         } else {
    //             throw new Error("Who let the dogs out?");
    //         }
    //     }
    //     return _cls_[name];
    // }
}

export function getClass(name) {
    let _cls_ = {};
    if (!_cls_[name]) {
        if (name.match(/^[a-zA-Z0-9_]+$/)) {
            _cls_[name] = eval(name);
        } else {
            throw new Error("Who let the dogs out?");
        }
    }
    return _cls_[name];
}