import {PixivJson, Comment} from "../others/jsonInterface";
import {ContainerFactory} from "./ContainerFactory";


export class CommentClass implements Comment {

    userId: number;
    userName: string;
    img: string;
    id: string;
    comment: string;
    stampId: string;
    stampLink?: any;
    commentDate: string;
    commentRootId?: any;
    commentParentId?: any;
    commentUserId: string;
    replyToUserId?: any;
    replyToUserName?: any;
    editable: boolean;
    hasReplies: boolean;
    private commentContainerCSS: string = `
      background:#EEEEEE;
      margin: 5px;
    `
    emoji = {
        "(normal)": 101,
        "(surprise)": 102,
        "(serious)": 103,
        "(heaven)": 104,
        "(happy)": 105,
        "(excited)": 106,
        "(sing)": 107,
        "(cry)": 108,
        "(normal2)": 201,
        "(shame2)": 202,
        "(love2)": 203,
        "(interesting2)": 204,
        "(blush2)": 205,
        "(fire2)": 206,
        "(angry2)": 207,
        "(shine2)": 208,
        "(panic2)": 209,
        "(normal3)": 301,
        "(satisfaction3)": 302,
        "(surprise3)": 303,
        "(smile3)": 304,
        "(shock3)": 305,
        "(gaze3)": 306,
        "(wink3)": 307,
        "(happy3)": 308,
        "(excited3)": 309,
        "(love3)": 310,
        "(normal4)": 401,
        "(surprise4)": 402,
        "(serious4)": 403,
        "(love4)": 404,
        "(shine4)": 405,
        "(sweat4)": 406,
        "(shame4)": 407,
        "(sleep4)": 408,
        "(heart)": 501,
        "(teardrop)": 502,
        "(star)": 503
    }

    constructor(json: any) {
        Object.assign(this, json)
    }

    toElem() {
        const commentbox = new ContainerFactory()
            .setCSS(this.commentContainerCSS)
            .createDiv()
        const mainComment = new ContainerFactory().createDiv()
        mainComment.appendChild(this.getMainComment())
        commentbox.appendChild(mainComment)
        commentbox.appendChild(this.getCommentInfo())
        return commentbox
    }

    private getMainComment(): HTMLElement {
        const elem = document.createElement('div')
        if (this.stampId) {
            elem.style.backgroundImage = `url("https://s.pximg.net/common/images/stamp/generated-stamps/${this.stampId}_s.jpg?20180605")`
            elem.style.width = '48px'
            elem.style.height = '48px'
            elem.style.backgroundRepeat = 'no-repeat'
            elem.style.backgroundSize = 'cover'
            elem.style.borderRadius = '2px'
            return elem
        } else {
            elem.innerHTML = this.getEmoji(this.comment)
        }
        return elem
    }

    private getCommentInfo() {
        const elem = document.createElement('div')
        elem.innerHTML = `${this.userName}</br> ${this.commentDate}`
        elem.style.fontSize = 'xx-small'
        elem.style.textAlign = 'left'
        elem.style.color = '#999999'
        return elem
    }

    private getEmoji(comment: string) {
        const emoji=this.emoji
        if (comment.includes(')')) {
            let replaceComment=comment
            Object.keys(emoji).forEach(function (key) {
                replaceComment=  replaceComment.replace(key, `<span style="width: 12px; height: 12px; display: inline-block; background-image: url('https://s.pximg.net/common/images/emoji/${emoji[key]}.png'); background-size: contain;"></span>`)
            });
            return replaceComment
        } else {
            return comment
        }
    }
}