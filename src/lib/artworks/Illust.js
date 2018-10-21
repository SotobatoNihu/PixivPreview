"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = require("../utilities/ContainerFactory");
const ArtWork_1 = require("./ArtWork");
/**
 * html上のページごとのイラスト情報を管理する
 */
class Illust extends ArtWork_1.ArtWork {
    constructor(page, innerContainer, json) {
        super();
        this.illustContainerID = 'popup-img';
        this.illustContainerCSS = `width: 100%; 
          height:100%;
          display:none;
          left: 0;
          top: 0;
          background-size: contain;
          background-position:center; 
          background-repeat:no-repeat;
            `;
        this.pixivJson = json;
        this.innerContainer = innerContainer;
        //中身を綺麗にする
        this.innerContainer.innerHTML = '';
        const factory = new ContainerFactory_1.ContainerFactory();
        this.illustContainer = factory.setId(this.className)
            .setClass(this.className)
            .setCSS(this.illustContainerCSS)
            .createDiv();
        const screen = this.illustContainer;
        innerContainer.appendChild(screen);
        this.innerContainer.appendChild(screen);
        //screen.style.backgroundColor= (hasClass) ? "rgb(255, 64, 96)" :"rgb(34, 34, 34)"
        screen.style.display = 'none';
        screen.style.backgroundImage = `url(${this.pixivJson.body.urls.regular})`;
        screen.style.left = '0';
        screen.style.top = '0';
        screen.style.width = '100%';
        screen.style.height = '100%';
        screen.style.backgroundSize = 'contain';
        screen.style.backgroundPosition = 'center';
        screen.style.backgroundRepeat = 'no-repeat';
    }
    /**
     * イラストをポップアップする
     * 外枠であるinnerContainerに、その他情報を元に画像elementをはめ込む
     *
     * @param page
     * @param innerContainer
     * @param elem
     * @param json
     */
    popup(hasClass) {
        this.innerContainer.style.backgroundColor = (hasClass) ? "rgb(255, 64, 96)" : "rgb(34, 34, 34)";
        this.illustContainer.style.display = 'block';
    }
}
exports.Illust = Illust;
