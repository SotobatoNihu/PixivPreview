"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtWork {
    constructor() {
        this.imgScale = 0.7;
    }
    adjustScreenSize(scale) {
        const oldWidth = this.pixivJson.body.width;
        const oldHeight = this.pixivJson.body.height;
        let newWidth = oldWidth;
        let newHeight = oldHeight;
        if (oldHeight > window.innerHeight * scale || oldWidth > window.innerWidth * scale) {
            const heightScale = Number(window.innerHeight * scale) / oldHeight;
            const widthScale = Number(window.innerWidth * scale) / oldWidth;
            //縦が長い
            if (heightScale < widthScale) {
                newHeight *= heightScale;
                newWidth *= heightScale;
                this.imgScale = heightScale;
            }
            else {
                //横が長い
                newHeight *= widthScale;
                newWidth *= widthScale;
                this.imgScale = widthScale;
            }
        }
        const innerScreen = this.innerScreen;
        innerScreen.style.width = `${Math.round(newWidth)}px`;
        innerScreen.style.height = `${Math.round(newHeight)}px`;
    }
    popup(hasClass) {
    }
    /**
     * 大きさがあるHTMLelementを引数に、それが画面の中央に表示されるようになるelementのtop・leftの値を返す
     * @param elem
     */
    getOffset(elem) {
        const w_height = $(window).height();
        const w_width = $(window).width();
        const el_height = $(elem).height();
        const el_width = $(elem).width();
        const scroll_height = $(window).scrollTop();
        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;
        return { top: Math.round(position_h), left: Math.round(position_w) };
    }
    set setInnerScreen(elem) {
        this.innerScreen = elem;
    }
    set setClassName(className) {
        this.className = className;
    }
    getClassName() {
        return this.className;
    }
    set setImgScale(scale) {
        this.imgScale = scale;
    }
    getInnerScreen() {
        return this.innerScreen;
    }
}
exports.ArtWork = ArtWork;
