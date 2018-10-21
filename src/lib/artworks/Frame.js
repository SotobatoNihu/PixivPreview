"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Frame {
    constructor() {
        //imageElement配列
        this.imgArray = [];
        //imageElementのsrc文字列の配列
        this._imgStringArray = [];
        //フレーム情報（ミリ秒単位の変更間隔）の配列
        this._frameArray = [];
    }
    pushDelay(delay) {
        this._frameArray.push(delay);
    }
    pushImgString(imgString) {
        this._imgStringArray.push(imgString);
    }
    get imgStringArray() {
        return this._imgStringArray;
    }
    set imgStringArray(value) {
        this._imgStringArray = value;
    }
    set frameArray(value) {
        this._frameArray = value;
    }
}
exports.Frame = Frame;
