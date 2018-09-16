"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
class Setting {
    constructor(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.changeLayout = (jsonData.changeLayout == null) ? true : jsonData.changeLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.uiComponent = [enum_1.uiComponent.image, enum_1.uiComponent.manga, enum_1.uiComponent.caption];
    }
    set setData(jsonData) {
        this.changeLayout = (jsonData.changeLayout == null) ? true : jsonData.changeLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
    }
}
exports.Setting = Setting;
