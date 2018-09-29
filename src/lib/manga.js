"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manga {
    constructor() {
        this.followedUsersId = []; //storing followed users pixiv ID
        this.BOOKMARK_URL = 'https://www.pixiv.net/bookmark.php';
        this.CheckedPublic = false;
        this.Checked = false;
        this.artsLoaded = 0;
        this.hits = 0;
        this.isRunning = false;
        this.lastImgId = " ";
        this.siteImgMaxWidth = 150; //for now it is used for pagetype==7
        this.mangaWidth = 1200;
        this.pageNum = 0;
        this.imgsArr = [];
        this.DELTASCALE = ('mozInnerScreenX' in window) ? 70 : 4;
    }
    set LastImgId(id) {
        this.lastImgId = id;
    }
    getLastImgId() {
        return this.lastImgId;
    }
}
exports.Manga = Manga;
