import {PixivJson} from "../others/jsonInterface";
import {ContainerFactory} from "../utilities/ContainerFactory";
import {Page} from "../others/Page";
import {ArtWork} from "./ArtWork";
/**
 * html上のページごとのイラスト情報を管理する
 */
export class Illust extends ArtWork{

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

    private innerContainer: HTMLElement;

    constructor(page: Page, innerContainer: HTMLElement,  json: PixivJson){
        super();
        this.pixivJson=json
        this.innerContainer=innerContainer
        //中身を綺麗にする
        this.innerContainer.innerHTML= ''


        const factory = new ContainerFactory()
        this.illustContainer = factory.setId(this.className)
            .setClass(this.className)
            .setCSS(this.illustContainerCSS)
            .createDiv()

        const screen=this.illustContainer
        innerContainer.appendChild(screen );
        this.innerContainer.appendChild(screen );
        //screen.style.backgroundColor= (hasClass) ? "rgb(255, 64, 96)" :"rgb(34, 34, 34)"
        screen.style.display='none'
        screen.style.backgroundImage=`url(${this.pixivJson.body.urls.regular})`
        screen.style.left='0'
        screen.style.top='0'
        screen.style.width='100%'
        screen.style.height='100%'
        screen.style.backgroundSize='contain'
        screen.style.backgroundPosition='center'
        screen.style.backgroundRepeat='no-repeat'
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
    }
}