import {uiComponent} from "./enum";

export class Setting {
    changeLayout: boolean;
    openComment: boolean;
    popup: boolean;
    uiComponent:Array<any>;

    constructor(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.changeLayout = (jsonData.changeLayout == null) ? true : jsonData.changeLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.uiComponent=[uiComponent.image,uiComponent.manga,uiComponent.caption]
    }

    set setData(jsonData) {
        this.changeLayout = (jsonData.changeLayout == null) ? true : jsonData.changeLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
    }
}