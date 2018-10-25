import {PixivJson} from "../others/jsonInterface";
import {ContainerFactory} from "../utilities/ContainerFactory";
import {Util} from "../utilities/Util";


export class CommentList {


    private innerContainer: HTMLElement;
    private commentListContainer:HTMLElement
    private commentContainer:HTMLElement
    private className: string;
    private readonly pixivJson: PixivJson;
    private commentListContainerID: string = 'popup-commentlist-container'
    private commentListContainerCSS: string =
        `
        
        
        `

    constructor(pixivJson: PixivJson) {
        this.pixivJson = pixivJson
    }

    setCaptionContainer(captionContainer: HTMLElement) {
        
    }

    setInnerContainer(innerContainer: HTMLElement) {
        
    }

    setClassName(popupClass: string) {
        
    }

    popup() {
        
    }

    adjustSize(outerContainer: HTMLElement) {
        
    }
}