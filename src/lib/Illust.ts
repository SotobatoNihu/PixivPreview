import {PixivJson} from "./jsonInterface";
import {ContainerFactory} from "./ContainerFactory";
import {Page} from "./page";

/**
 * html上のページごとのイラスト情報を管理する
 */
export class Illust {
    private innerContainer: HTMLElement;
   // private illustContainer:HTMLElement;
    private className: string;
    private pixivJson: PixivJson;
    private illustContainer:HTMLElement
    private illustContainerID:string='popup-img'

    private illustContainerCSS: string
        = `width: 100%; 
          height:100%;
          display:none;
          left: 0;
          top: 0;
          background-size: contain;
          background-position:center; 
          background-repeat:no-repeat;
            `
    constructor(page: Page, innerContainer: HTMLElement,  json: PixivJson){
        this.pixivJson=json
        //中身を綺麗にする
        innerContainer.innerHTML= ''

        const factory = new ContainerFactory()
      this.illustContainer = factory.setId(this.className)
            .setClass(this.className)
            .setCSS(this.illustContainerCSS)
            .createDiv()
        innerContainer.appendChild(this.illustContainer );
        this.illustContainer.style.backgroundImage=`url(${json.body.urls.regular})`
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
    popup(hasClass:boolean) {
        this.innerContainer.style.backgroundColor= (hasClass) ? "rgb(255, 64, 96)" :"rgb(34, 34, 34)"
        this.illustContainer.style.display='block'
        //大きすぎる場合はリサイズする
    }

    resize(elem:HTMLElement,scale:number) {
        const oldWidth: number=this.pixivJson.body.width
        const oldHeight: number=this.pixivJson.body.height
        let newWidth:number=oldHeight
        let newHeight: number=oldWidth
        if (oldHeight> window.innerHeight * scale || oldWidth > window.innerWidth * scale) {
            const heightScale =oldHeight / Number(window.innerHeight * scale)
            const widthScale = oldWidth / Number(window.innerWidth * scale)
            if (heightScale > widthScale) {
                newHeight  /= heightScale
                newWidth /= heightScale
            } else {
                newHeight /= widthScale
                newWidth /=widthScale
            }
        }
        elem.style.width = `${Math.round(newWidth)}px`
        elem.style.height = `${Math.round(newHeight)}px`
    }

    setInnerContainer(innerContainer: HTMLElement) {
        this.innerContainer=innerContainer
    }

    getPageNum(pixivJson:PixivJson): number {
        return Number(pixivJson.body.pageCount)
    }
    setClassName(className:string){
        this.className=className
    }



}