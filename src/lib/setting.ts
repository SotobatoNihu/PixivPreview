import {uiComponent} from "./enum";


/**
 *　機能の有効/無効等の設定内容
 *
 */

export class Setting {

    changeIllustPageLayout=true
    changeMemberPageLayout=true
    openComment=true
    popup=true
    popupScale=0.7
    uiComponent: Array<any>;


    async init(){
        // @ts-ignore
         await GM.getValue("pixiv_viewutil_setting").then(jsonString=>{
            if (jsonString !== undefined) {
                const jsonData = JSON.parse(jsonString);
                this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout
                this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout
                this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;

                this.popup = (jsonData.popup == null) ? true : jsonData.popup;
                this.popupScale = (jsonData.popupScale == null) ? 0.7 : jsonData.popupScale
            }
            }
        )
    }

    set setStringData(jsonString: string) {
        const jsonData = JSON.parse(jsonString);
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.popupScale = (jsonData.popup == null) ? 0.7 : jsonData.popupScale;
        this.uiComponent = [uiComponent.image, uiComponent.manga,uiComponent.ugoira, uiComponent.caption]
    }

    set setData(jsonData) {
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.popupScale = (jsonData.popup == null) ? 0.7 : jsonData.popupScale;
    }

    get getJsonString(): string {
        const obj = {
            changeIllustPageLayout: this.changeIllustPageLayout,
            changeMemberPageLayout: this.changeMemberPageLayout,
            openComment: this.openComment,
            popup: this.popup,
            popupScale: this.popupScale,
        }
        return JSON.stringify(obj)
    }

    save() {
        // @ts-ignore
        GM.setValue("pixiv_viewutil_setting", this.getJsonString);
    }
}