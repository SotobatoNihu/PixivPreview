import {Util} from './util'
import {prop, pagetype} from "./enum";

export class Page {
    URL: string
    pagetype: any
    alloedFunclist: Array<any>
    siteImgMaxWidth: Number
    private util: Util;

    constructor(url) {
        this.util = new Util();
        this.URL = url;
        this.pagetype = Util.checkPageType(url);
        this.siteImgMaxWidth = this.pagetype === prop.popup_typeA ? 200 : 150
        this.alloedFunclist = Util.getAllowedFuncList(this.pagetype);
    }

    set setURL(url) {
        this.URL = url;
        this.pagetype = Util.checkPageType(url);
    }

    get getPagetype() {
        return this.pagetype;
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
}
