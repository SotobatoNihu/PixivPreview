"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = require("../utilities/ContainerFactory");
const ArtWork_1 = require("./ArtWork");
/**
 * html上のページごとの漫画情報を管理する
 */
class Manga extends ArtWork_1.ArtWork {
    constructor(pixivJson) {
        super();
        this.mangaContainerID = 'popup-manga';
        this.pageNum = 0;
        //elementのcss
        this.mangaContainerCSS = ` background-color:black;
           overflow-x:auto;
           white-space:nowrap;
           width: 100%; 
           height:auto;
           top:0;
           left:0;
            `;
        this.pixivJson = pixivJson;
        this.pageNum = this.getPageNum(pixivJson);
        this.imgArray = new Array(this.pageNum);
        const factory = new ContainerFactory_1.ContainerFactory();
        this.mangaContainer = factory.setId(this.mangaContainerID)
            .setClass(this.className)
            .setCSS(this.mangaContainerCSS)
            .createDiv();
        this.DELTASCALE = ('mozInnerScreenX' in window) ? 70 : 4;
    }
    adjustScreenSize(scale) {
        const innerScreen = this.innerScreen;
        innerScreen.style.width = `${window.innerWidth * scale}px`;
        innerScreen.style.height = `${window.innerHeight * scale}px`;
    }
    /**
     * 漫画をポップアップする
     * @param innerContainer
     * @param hrefElem
     * @param json
     * @param count
     */
    popup(hasClass) {
        this.innerScreen.style.display = 'block';
        this.innerScreen.style.width = `${Number(this.innerScreen.style.maxWidth) * this.imgScale}px`;
        this.innerScreen.style.height = `${Number(this.innerScreen.style.maxHeight) * this.imgScale}px`;
        this.innerScreen.innerHTML = '';
        this.innerScreen.style.backgroundColor = (hasClass) ? "rgb(255, 64, 96)" : "rgb(34, 34, 34)";
        const firstPageURL = this.getImgUrl();
        //各ページをセット
        this.initImgArray(this.mangaContainer, firstPageURL);
        this.innerScreen.appendChild(this.mangaContainer);
        this.setScrool(this.mangaContainer, this.innerScreen, this.DELTASCALE);
    }
    /**
     * imgエレメントの配列を作成し漫画の各ページを格納
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     * @param primaryLink
     * @param pageNum
     */
    initImgArray(mangaContainer, firstPageURL) {
        for (let i = 0; i < this.pageNum; i++) {
            const imgElem = document.createElement('img');
            imgElem.src = firstPageURL.replace('p0', 'p' + i);
            imgElem.style.maxWidth = this.innerScreen.style.width;
            imgElem.style.maxHeight = this.innerScreen.style.height;
            imgElem.style.height = this.innerScreen.style.height;
            imgElem.style.width = 'auto';
            this.imgArray.push(imgElem);
            mangaContainer.appendChild(imgElem);
        }
    }
    /**
     * mangaコンテナ上でスクロール機能を実現
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     */
    setScrool(mangaContainer, innerContainer, deltaScale) {
        this.mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (innerContainer.getBoundingClientRect().top < 0)) {
                innerContainer.scrollIntoView({ block: "start", behavior: "smooth" }); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (innerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                innerContainer.scrollIntoView({ block: "end", behavior: "smooth" }); //aligning to bottom screen side on scrollDown if needed
            }
            let scrlLft = mangaContainer.scrollLeft;
            if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                e.preventDefault();
                mangaContainer.scrollLeft += e.deltaY * deltaScale; // TODO - find better value for opera/chrome
            }
        };
    }
    /**
     * 画像のURLを取得
     * @param json
     */
    getImgUrl() {
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return this.pixivJson.body.urls.regular.replace(/\/...x...\//, '/600x600/');
    }
    getPageNum(pixivJson) {
        return Number(pixivJson.body.pageCount);
    }
}
exports.Manga = Manga;
