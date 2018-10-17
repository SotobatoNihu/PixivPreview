"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
/**
 *　機能の有効/無効等の設定内容
 *
 */
class Setting {
    constructor() {
        this.changeIllustPageLayout = true;
        this.changeMemberPageLayout = true;
        this.openComment = true;
        this.popup = true;
        this.popupScale = 0.7;
    }
    async init() {
        // @ts-ignore
        await GM.getValue("pixiv_viewutil_setting").then(jsonString => {
            if (jsonString !== undefined) {
                const jsonData = JSON.parse(jsonString);
                this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
                this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
                this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
                this.popup = (jsonData.popup == null) ? true : jsonData.popup;
                this.popupScale = (jsonData.popupScale == null) ? 0.7 : jsonData.popupScale;
            }
        });
    }
    set setStringData(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.popupScale = (jsonData.popup == null) ? 0.7 : jsonData.popupScale;
        this.uiComponent = [enum_1.uiComponent.image, enum_1.uiComponent.manga, enum_1.uiComponent.ugoira, enum_1.uiComponent.caption];
    }
    set setData(jsonData) {
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.popupScale = (jsonData.popup == null) ? 0.7 : jsonData.popupScale;
    }
    get getJsonString() {
        const obj = {
            changeIllustPageLayout: this.changeIllustPageLayout,
            changeMemberPageLayout: this.changeMemberPageLayout,
            openComment: this.openComment,
            popup: this.popup,
            popupScale: this.popupScale,
        };
        return JSON.stringify(obj);
    }
    save() {
        // @ts-ignore
        GM.setValue("pixiv_viewutil_setting", this.getJsonString);
    }
}
exports.Setting = Setting;
