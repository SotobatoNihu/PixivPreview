"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = require("./Enum");
/**
 *　機能の有効/無効等の設定内容
 *
 */
class Setting {
    constructor() {
        this.changeIllustPageLayout = true;
        this.changeMemberPageLayout = true;
        this.openComment = true;
        this.usePopup = true;
        this.popupCaption = true;
        this.popupComment = true;
        this.popupScale = 0.7;
        this.uiComponent = [Enum_1.uiComponent.image, Enum_1.uiComponent.manga, Enum_1.uiComponent.ugoira, Enum_1.uiComponent.caption];
    }
    async init() {
        // @ts-ignore
        await GM.getValue("pixiv_viewutil_setting").then(jsonString => {
            if (jsonString !== undefined) {
                const jsonData = JSON.parse(jsonString);
                this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
                this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
                this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
                this.usePopup = (jsonData.usePopup == null) ? true : jsonData.usePopup;
                this.popupCaption = (jsonData.popupCaption == null) ? true : jsonData.popupCaption;
                this.popupComment = (jsonData.popupComment == null) ? true : jsonData.popupComment;
                this.popupScale = (jsonData.popupScale == null) ? 0.7 : jsonData.popupScale;
            }
        });
    }
    set setStringData(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.setData(jsonData);
    }
    set setData(jsonData) {
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.usePopup = (jsonData.usePopup == null) ? true : jsonData.usePopup;
        this.popupCaption = (jsonData.popupCaption == null) ? true : jsonData.popupCaption;
        this.popupComment = (jsonData.popupComment == null) ? true : jsonData.popupComment;
        this.popupScale = (jsonData.usePopup == null) ? 0.7 : jsonData.popupScale;
    }
    get getJsonString() {
        const obj = {
            changeIllustPageLayout: this.changeIllustPageLayout,
            changeMemberPageLayout: this.changeMemberPageLayout,
            openComment: this.openComment,
            usePopup: this.usePopup,
            popupCaption: this.popupCaption,
            popupComment: this.popupComment,
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
