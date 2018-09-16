"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const enum_1 = require("./enum");
class Page {
    constructor(url) {
        this.util = new util_1.Util();
        this.URL = url;
        this.pagetype = util_1.Util.checkPageType(url);
        this.siteImgMaxWidth = this.pagetype === enum_1.prop.popup_typeA ? 200 : 150;
        this.alloedFunclist = util_1.Util.getAllowedFuncList(this.pagetype);
    }
    set setURL(url) {
        this.URL = url;
        this.pagetype = util_1.Util.checkPageType(url);
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
    isEnable(elem) {
        return this.alloedFunclist.indexOf(elem) > -1;
    }
}
exports.Page = Page;
