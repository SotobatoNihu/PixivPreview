import {Util} from "./util";
import {prop} from "./enum";

/**
 * html上のページごとの漫画情報を管理する
 */
export class Manga {
    followedUsersId = [] //storing followed users pixiv ID
    BOOKMARK_URL = 'https://www.pixiv.net/bookmark.php'
    CheckedPublic = false
    Checked = false
    artsContainers
    artsLoaded = 0
    hits = 0
    isRunning = false
    lastImgId = " "
    siteImgMaxWidth = 150 //for now it is used for pagetype==7
    mangaWidth = 1200
    bookmarkObj
    pageNum=0
    imgsArr = []
    DELTASCALE = ('mozInnerScreenX' in window) ? 70 : 4


    set LastImgId(id: string) {
        this.lastImgId = id
    }

    getLastImgId() {
        return this.lastImgId
    }
}