import {uiComponent} from "./enum";

export class Setting {
    changeIllustPageLayout: boolean;
    changeMemberPageLayout: boolean;
    openComment: boolean;
    popup: boolean;
    uiComponent:Array<any>;

    constructor(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout== null) ? true : jsonData.changeIllustPageLayout
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout== null) ? true : jsonData.changeMemberPageLayout
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.uiComponent=[uiComponent.image,uiComponent.manga,uiComponent.caption]
    }

    set setData(jsonData) {
        this.changeIllustPageLayout= (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout== null) ? true : jsonData.changeMemberPageLayout
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
    }
}