import {uiComponent} from "./Enum";


/**
 *　機能の有効/無効等の設定内容
 *
 */

export class Setting {

    changeIllustPageLayout = true
    changeMemberPageLayout = true
    openComment = true
    usePopup = true
    popupCaption = true
    popupScale = 0.7
    uiComponent: Array<uiComponent> = [uiComponent.image, uiComponent.manga, uiComponent.ugoira, uiComponent.caption]

    constructor(){

    }

    async init() {
        // @ts-ignore
        await GM.getValue("pixiv_viewutil_setting").then(jsonString => {

                if (jsonString !== undefined) {

                    const jsonData = JSON.parse(jsonString);
                    this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout
                    this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout
                    this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment
                    this.usePopup = (jsonData.usePopup == null) ? true : jsonData.usePopup
                    this.popupCaption = (jsonData.popupCaption == null) ? true : jsonData.popupCaption
                    this.popupScale = (jsonData.popupScale == null) ? 0.7 : jsonData.popupScale;
                }
            }
        )
    }

    set setStringData(jsonString: string) {
        const jsonData = JSON.parse(jsonString);
        this.setData(jsonData)
    }

    set setData(jsonData) {
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment
        this.usePopup = (jsonData.usePopup == null) ? true : jsonData.usePopup
        this.popupCaption = (jsonData.popupCaption == null) ? true : jsonData.popupCaption
        this.popupScale = (jsonData.usePopup == null) ? 0.7 : jsonData.popupScale;
    }

    get getJsonString(): string {
        const obj = {
            changeIllustPageLayout: this.changeIllustPageLayout,
            changeMemberPageLayout: this.changeMemberPageLayout,
            openComment: this.openComment,
            usePopup: this.usePopup,
            popupCaption:this.popupCaption,
            popupScale: this.popupScale,
        }
        return JSON.stringify(obj)
    }

    save() {
        // @ts-ignore
        GM.setValue("pixiv_viewutil_setting", this.getJsonString);
    }


}