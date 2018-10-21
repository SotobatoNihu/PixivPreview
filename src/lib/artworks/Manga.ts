import {Util} from "../utilities/Util";
import {prop} from "../others/Enum";
import {PixivJson} from "../others/jsonInterface";
import {ContainerFactory} from "../utilities/ContainerFactory";
import {ArtWork} from "./ArtWork";

/**
 * html上のページごとの漫画情報を管理する
 */
export class Manga extends ArtWork {

    private mangaContainer: HTMLElement;
    private mangaContainerID: string = 'popup-manga'
    private pageNum = 0
    private imgArray: HTMLImageElement[]
    private DELTASCALE: number

    //elementのcss
    private mangaContainerCSS: string
        = ` background-color:black;
           overflow-x:auto;
           white-space:nowrap;
           width: 100%; 
           height:auto;
           top:0;
           left:0;
            `

    constructor(pixivJson: PixivJson) {
        super();
        this.pixivJson = pixivJson
        this.pageNum = this.getPageNum(pixivJson);
        this.imgArray = new Array(this.pageNum)
        const factory = new ContainerFactory()
        this.mangaContainer = factory.setId(this.mangaContainerID)
            .setClass(this.className)
            .setCSS(this.mangaContainerCSS)
            .createDiv()
        this.DELTASCALE=('mozInnerScreenX' in window) ? 70 : 4

    }

    public adjustScreenSize(scale: number) {
        const innerScreen = this.innerScreen
        innerScreen.style.width = `${window.innerWidth * scale}px`
        innerScreen.style.height = `${window.innerHeight * scale}px`
    }

    /**
     * 漫画をポップアップする
     * @param innerContainer
     * @param hrefElem
     * @param json
     * @param count
     */
    popup(hasClass: boolean) {
        this.innerScreen.style.display = 'block'
        this.innerScreen.style.width = `${Number(this.innerScreen.style.maxWidth) * this.imgScale}px`
        this.innerScreen.style.height = `${Number(this.innerScreen.style.maxHeight) * this.imgScale}px`
        this.innerScreen.innerHTML = '';
        this.innerScreen.style.backgroundColor = (hasClass) ? "rgb(255, 64, 96)" : "rgb(34, 34, 34)"
        const firstPageURL = this.getImgUrl()
        //各ページをセット
        this.initImgArray(this.mangaContainer, firstPageURL);

        this.innerScreen.appendChild(this.mangaContainer);
        this.setScrool(this.mangaContainer, this.innerScreen, this.DELTASCALE)

    }

    /**
     * imgエレメントの配列を作成し漫画の各ページを格納
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     * @param primaryLink
     * @param pageNum
     */
    private initImgArray(mangaContainer: HTMLElement, firstPageURL: string,) {
        for (let i = 0; i < this.pageNum; i++) {
            const imgElem = document.createElement('img')
            imgElem.src = firstPageURL.replace('p0', 'p' + i);
            imgElem.style.maxWidth = this.innerScreen.style.width
            imgElem.style.maxHeight = this.innerScreen.style.height
            imgElem.style.height = this.innerScreen.style.height
            imgElem.style.width = 'auto'
            this.imgArray.push(imgElem)
            mangaContainer.appendChild(imgElem);
        }
    }

    /**
     * mangaコンテナ上でスクロール機能を実現
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     */
    private setScrool(mangaContainer: HTMLElement, innerContainer: HTMLElement, deltaScale: number) {
        this.mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (innerContainer.getBoundingClientRect().top < 0)) {
                innerContainer.scrollIntoView({block: "start", behavior: "smooth"}); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (innerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                innerContainer.scrollIntoView({block: "end", behavior: "smooth"}); //aligning to bottom screen side on scrollDown if needed
            }

            let scrlLft = mangaContainer.scrollLeft;
            if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                e.preventDefault();
                mangaContainer.scrollLeft += e.deltaY * deltaScale// TODO - find better value for opera/chrome
            }
        };
    }

    /**
     * 画像のURLを取得
     * @param json
     */
    private getImgUrl() {
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return this.pixivJson.body.urls.regular.replace(/\/...x...\//, '/600x600/')
    }


    public getPageNum(pixivJson: PixivJson): number {
        return Number(pixivJson.body.pageCount)
    }
}