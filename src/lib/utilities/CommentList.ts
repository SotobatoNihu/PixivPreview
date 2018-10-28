import {PixivJson} from "../others/jsonInterface";
import {CommentClass} from "./Comment";
import {ContainerFactory} from "../utilities/ContainerFactory";
import {Util} from "../utilities/Util";


export class CommentList {

    //private innerContainer: HTMLElement;
    private commentListContainer: HTMLElement
   // private commentListContainerID:string='popup-commentlist'
    private className: string;
    private pixivJson: PixivJson;
    private commentElemList: HTMLElement[]
    private outerContainer: HTMLElement;
    private commentNum:number
    private commentOffset:number=0
    private commentLimit:number=25
    public MAXWIDTH:number=200;
    private commentListContainerID: string = 'popup-commentlist-container'
    private commentListContainerCSS: string =
        `
        white-space:pre-wrap;
        z-index:10001;
        width:auto;
        height:auto;
        display:none;
        overflow-y:scroll;
        background-color:white;
        border: 1px solid #000;
        max-width:${this.MAXWIDTH}px;
        max-height:${window.innerHeight}px;
        `
    private commentList: CommentClass[];

    constructor(className:string) {


        /*
        const factory = new ContainerFactory()

        this.commentListContainer = factory.setId(this.commentListContainerID)
            .setClass(this.className)
            .setCSS(this.commentListContainerCSS)
            .createDiv()
            */

        this.commentListContainer=new ContainerFactory()
            .setId(this.commentListContainerID)
            .setClass(className)
            .setCSS(this.commentListContainerCSS)
            .createDiv()
    }

    async init() {
        this.commentOffset=0
        this.commentListContainer.innerHTML=''
        const commentList:CommentClass[]=[]
       // const commentListContainer=this.commentListContainer
        if (this.commentNum !== 0) {
                const url = `https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=${this.pixivJson.body.illustId}&offset=${this.commentOffset}&limit=${this.commentLimit}`
                await fetch(url,
                    {
                        method: 'GET',
                        mode: 'cors',
                        keepalive: true
                    }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(async function (json) {
                    const commentJson = new PixivJson(json)
                    const comments = commentJson.body.comments
                    for(let commentJson of comments){
                        const comment:CommentClass= new CommentClass(commentJson)
                        commentList.push(comment)
                    }
                })
        }else{
           // commentList.push( new CommentClass())
        }
        this.commentList=commentList
    }

    //async setScreenContainer(innerContainer: HTMLElement) {
    //    this.innerContainer = innerContainer
    //}

    setClassName(popupClass: string) {
        this.className = popupClass
    }

    popup() {
        const commentListContainer=this.commentListContainer
        const commentList=this.commentList
        commentListContainer.innerHTML=''
        commentListContainer.style.display='inline-block'
        commentListContainer.style.width='100px'
        for( const comment of commentList){
            commentListContainer.appendChild(comment.toElem())
        }

        const commentNum= this.commentNum
       let offset= this.commentOffset
        commentListContainer.onscroll = () =>{
            //既存のスクロール量
            let scrollSize= commentListContainer.scrollTop + commentListContainer.clientHeight;
            //スクロールできる最大量
            let maxHeight=commentListContainer.scrollHeight
            if( this.commentOffset<commentNum &&  scrollSize/maxHeight >=0.8) {

                this.commentList=commentList
                this.commentOffset+=this.commentLimit
                console.log(`comment reload ${this.commentOffset}`)
               this.appendComment()
            }
        }
    }

    private async appendComment() {
        const commentListContainer=this.commentListContainer


        const url = `https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=${this.pixivJson.body.illustId}&offset=${this.commentOffset}&limit=${this.commentLimit}`
        await fetch(url,
            {
                method: 'GET',
                mode: 'cors',
                keepalive: true
            }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then(async function (json) {
            const commentJson = new PixivJson(json)
            const comments = commentJson.body.comments
            for(let commentJson of comments){
                const comment:CommentClass= new CommentClass(commentJson)
                commentListContainer.appendChild(comment.toElem())
            }
        })
    }

    adjustSize(screen:HTMLElement) {
        this.commentListContainer.style.height=`${screen.offsetHeight}px`
    }

    /*
    private async setCommentList() {
        //const elemList:HTMLElement[]=[]
        if (this.commentNum !== 0) {
            const url = `https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=${this.pixivJson.body.illustId}&offset=0&limit=10`
            await fetch(url,
                {
                    method: 'GET',
                    mode: 'cors',
                    keepalive: true
                }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            }).then(async function (json) {
                const commentJson = new PixivJson(json)
                const comments = commentJson.body.comments
                for(let commentJson of comments){
                    const comment = new Comment()
                    comment.setComment(commentJson.comment)
                    this.commentElemList.push(comment.toElem())
                }
            })
        }else{
            this.commentElemList.push(new Comment().toElem())
        }
       // this.commentElemList=elemList
    }
    */

    setCommentListContainer(commentListContainer: HTMLElement) {
        this.commentListContainer.innerText=''
        this.commentListContainer=commentListContainer
    }
    setJson(pixivJson){
        this.pixivJson = pixivJson
        this.commentNum = pixivJson.body.commentCount
    }

    setOuterContainer(outerContainer: HTMLElement) {
        this.outerContainer=outerContainer
    }

    getContainer() {
        return this.commentListContainer
    }

    resetContainer() {
        this.commentListContainer=document.getElementById(this.commentListContainerID)
    }
}