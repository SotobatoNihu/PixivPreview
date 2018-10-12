import {Util} from './util'
import {prop, pagetype} from "./enum";

/**
 * 現在いるページを管理するページオブジェクト
 */
export class Page {

    URL: string
    pagetype: pagetype
    alloedFunclist: Array<any>
    siteImgMaxWidth: Number
     imgSelector:String
    mangaSelector:String

    constructor(url) {
        this.URL = url;
        this.pagetype = Util.checkPageType(url);
        this.siteImgMaxWidth = 500 //this.pagetype === prop.popup_typeA ? 200 : 150
        this.alloedFunclist = Util.getAllowedFuncList(this.pagetype);
        this.imgSelector='a[href*="member_illust.php?mode=medium&illust_id="]'
        this.mangaSelector='a[href*="member_illust.php?mode=medium&illust_id="] > div:nth-child(2) '
    }

    set setURL(url) {
        this.URL = url;
        this.pagetype = Util.checkPageType(url);
    }

    get getURL() {
        return this.URL;
    }

    get getFunclist() {
        return this.alloedFunclist;
    }

    isEnable(elem): boolean {
        return this.alloedFunclist.indexOf(elem) > -1;
    }
    get getPagetype() {
        return this.pagetype;
    }

}
