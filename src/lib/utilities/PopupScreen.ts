import {ContainerFactory} from "./ContainerFactory";
import {PixivJson} from "../others/jsonInterface";
import {ArtWork} from "../artworks/ArtWork";
import {Manga} from "../artworks/Manga";
import {Illust} from "../artworks/Illust";
import {Ugoira} from "../artworks/Ugoira";
import {Caption} from "../caption/Caption";
import {Util} from "Util";
import {Page} from "../others/Page";
import {Setting} from "../others/Setting";
import {CommentList} from "./CommentList";
import {Screen} from "./Screen";
export class PopupScreen {

    private outerContainer: HTMLElement
    private outerContainerID: string = 'popup-outer-container'


    private screen:Screen
    private artwork: ArtWork;
    private caption:Caption
    private captionMaxHeight=100
    private commentList:CommentList

    private popupClass: string = 'popup-util'
    private popupScale: number;
    private pixivJson: PixivJson;
    private page: Page;
    private setting: Setting;

    private outerContainerCSS: string = `
        position:absolute;
        z-index:10000;
        `
    constructor(page: Page, setting: Setting) {
        this.page = page
        this.setting = setting
        //const screen=new Screen(this.popupClass,this.popupScale)
        //const caption=new Caption(this.popupClass)
        //const commentList=new CommentList(this.popupClass)

        if (document.getElementById(this.outerContainerID) === null) {
            //各コンテナを用意
            const factory = new ContainerFactory()
            this.outerContainer = factory
                .setId(this.outerContainerID)
                .setClass(this.popupClass)
                .setCSS(this.outerContainerCSS)
                .createDiv()
            this.screen=new Screen(this.popupClass,this.popupScale)
            this.caption=new Caption(this.popupClass)
            this.caption.addCSS()
            this.commentList=new CommentList(this.popupClass)

            this.outerContainer.appendChild(this.caption.getContainer())
            this.outerContainer.appendChild(this.screen.getContainer())
            this.outerContainer.appendChild(this.commentList.getContainer())

            document.body.appendChild(this.outerContainer)
        }else{
            this.outerContainer = document.getElementById(this.outerContainerID)
            this.cleanOuterContainer()
            this.screen.resetContainer()
            this.caption.resetContainer()
            this.commentList.resetContainer()
        }
        /*
        else {

            this.outerContainer = document.getElementById(this.outerContainerID)
            this.screenContainer = document.getElementById(this.innerContainerID)
            this.captionContainer = document.getElementById(this.captionContainerID)
            this.commentListContainer = document.getElementById(this.commentListContainerID)
        }
         */
        this.outerContainer.style.display = 'none'
    }


    popupArtwork(hasClass: boolean) {
        this.outerContainer.style.display = 'block'
        const artwork = this.isManga() ? new Manga(this.pixivJson) : new Illust(this.page, this.screen.getContainer(), this.pixivJson)
        this.artwork = artwork
        artwork.setScreenContainer = this.screen.getContainer()
        artwork.setClassName = this.popupClass
        artwork.adjustScreenSize(this.setting.popupScale)
        artwork.popup(hasClass)
    }

    async popupUgoira(metajson: PixivJson) {
        //pixivJsonとメタ情報からうごイラオブジェクトを作成
        const ugoira = new Ugoira(this.pixivJson, metajson)
       // ugoira.setScreenContainer(this.screen.getContainer())
        ugoira.setClassName(this.popupClass)
        await ugoira.init().then(
            () => {
                ugoira.resize(this.outerContainer, this.setting.popupScale)
                ugoira.popup(this.outerContainer)
            }
        )
    }

    async popupCaption() {
       // const caption = new Caption(this.popupClass)
        const caption = this.caption
        caption.setJson(this.pixivJson)
        //caption.setCaptionContainer(this.captionContainer)
        //caption.setScreenContainer(this.screen.getContainer())
        await caption.popup()
        caption.adjustSize(this.screen.getContainer())
    }

    async popupComment() {
        const commentList = this.commentList
        commentList.setJson(this.pixivJson)
        //commentList.setCommentListContainer(this.commentList.getContainer)
        commentList.setOuterContainer(this.outerContainer)
       // commentList.setScreenContainer(this.screen.getContainer())
        commentList.setClassName(this.popupClass)
        await commentList.init().then(
            () => {
                commentList.popup()
                commentList.adjustSize(this.screen.getContainer())
            }
        )
    }

    setPixivJson(pixivJson: PixivJson) {
        this.pixivJson = pixivJson
    }

    isIllust() {
        return this.pixivJson.body.illustType === 0
    }

    isManga() {
        return this.pixivJson.body.illustType === 1 || (this.pixivJson.body.pageCount && Number(this.pixivJson.body.pageCount) > 1);
    }

    isUgoira() {
        return this.pixivJson.body.illustType === 2
    }


    addMouseMove() {
        const elm=this.outerContainer
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let dragging = false
        //let scroll = false
        const dragElement = (e) => {
            dragging = true
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elm.style.top = (elm.offsetTop - pos2) + "px";
            elm.style.left = (elm.offsetLeft - pos1) + "px";
        }

        const closeDragElement = () => {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            if (!dragging) {
                this.cleanOuterContainer()
            }
            dragging = false
        }
        const mouseDownEvent = (e) => {
            e = e || window.event;
            // スクロールバーより内側の場合
            if (e.offsetX <= e.target.clientWidth && e.offsetY <= e.target.clientHeight) {
                if (e.button === 0) {
                    //左ボタンクリック
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = dragElement;
                    elm.onmouseleave = () => {
                        this.cleanOuterContainer()
                    };
                } else {
                    //TBD
                }
            }
        }
        elm.onmousedown = mouseDownEvent;
        const setting = this.setting
        const outerContainer = this.outerContainer
        window.onresize = function () {
            //  outerContainer.style.width = `${window.innerWidth * setting.popupScale}px`;
        };
    }

    removePopup() {
        this.removeContainer(this.outerContainer)
    }

    cleanOuterContainer() {
        this.screen.getContainer().innerText = ''
        this.caption.getContainer().innerText = ''
        this.commentList.getContainer().innerText = ''
        this.outerContainer.style.display = 'none';
    }


    removeContainer(elem: HTMLElement) {
        elem.innerText = ''
        elem.parentNode.removeChild(elem);
    }


    private getOffset(elem: HTMLElement) {
        const windowHeight=window.innerHeight
        const windowWidth=window.innerWidth
        const elemHeight=elem.offsetHeight
        const elemWidth=elem.offsetWidth
        const scrollHeight = window.scrollY
        const position_h =scrollHeight + (windowHeight -elemHeight) / 2;
        const position_w = ( windowWidth -elemWidth) / 2;
        return {top: Math.round(position_h), left: Math.round(position_w)};
    }
    adjustOffset() {
        const elem=this.outerContainer
        const offset = this.getOffset(elem)
        elem.style.left = `${offset.left}px`
        elem.style.top = `${offset.top}px`
    }

    adjustSize() {
        this.caption.getContainer().style.width=`${this.screen.getContainer().offsetWidth}px`
        this.outerContainer.style.width=`${this.screen.getContainer().offsetWidth+this.commentList.MAXWIDTH}px`
        this.outerContainer.style.height=`${this.caption.getContainer().offsetHeight + this.screen.getContainer().offsetHeight}px`
    }


}