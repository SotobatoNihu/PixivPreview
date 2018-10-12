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
        this.uiComponent = [uiComponent.image, uiComponent.manga,uiComponent.ugoira, uiComponent.caption]
    }

    set setData(jsonData) {
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
    }

    get getJsonString(): string {
        const obj = {
            changeIllustPageLayout: this.changeIllustPageLayout,
            changeMemberPageLayout: this.changeMemberPageLayout,
            openComment: this.openComment,
            popup: this.popup,
        }
        return JSON.stringify(obj)
    }

    save() {
        // @ts-ignore
        GM.setValue("pixiv_viewutil_setting", this.getJsonString);
    }
}