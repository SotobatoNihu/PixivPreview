// ==UserScript==
// @name            Pixiv View Util
// @namespace       Pixiv View Util
// @description     閲覧専用のユーティリティです。(1)各イラストの閲覧ページや作者ごとの画像一覧ページのレイアウトを変更します。(2)pixivサイト内でポップアップ機能を有効化します。this is  some  utility funcitions for pixiv.(1)change the layout of illust pages and auther's pages. (2)add popup tool.
// @author          sotoba
// @match           https://www.pixiv.net/bookmark_new_illust.php*
// @match           https://www.pixiv.net/discovery*
// @match           https://www.pixiv.net/bookmark_detail.php?illust_id=*
// @match           https://www.pixiv.net/bookmark_add.php?id=*
// @match           https://www.pixiv.net/member_illust.php*
// @match           https://www.pixiv.net/ranking.php?mode=*
// @match           https://www.pixiv.net/member.php?id=*
// @match           https://www.pixiv.net/bookmark.php*
// @match           https://www.pixiv.net/search.php*
// @match           https://www.pixiv.net*
// @version         0.5.3-20181013
// @homepageURL     https://github.com/SotobatoNihu/PixivViewUtil
// @license         MIT License
// @require         https://code.jquery.com/jquery-3.2.1.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js
// @resource        gearIcon https://svgsilh.com/svg/24277.svg
// @grant           GM.getValue
// @grant           GM.setValue
// @grant           GM.getResourceUrl
// @grant           GM_getResourceText
// ==/UserScript==
(() => {
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * 本プロジェクトで使用する各種列挙型
 */
Object.defineProperty(exports, "__esModule", { value: true });
var prop;
(function (prop) {
    prop[prop["changeIllustPageLayout"] = 0] = "changeIllustPageLayout";
    prop[prop["changeMemberPageLayout"] = 1] = "changeMemberPageLayout";
    prop[prop["popup_typeA"] = 2] = "popup_typeA";
    prop[prop["popup_typeB"] = 3] = "popup_typeB";
    prop[prop["openComment"] = 4] = "openComment";
})(prop = exports.prop || (exports.prop = {}));
var uiComponent;
(function (uiComponent) {
    uiComponent[uiComponent["image"] = 0] = "image";
    uiComponent[uiComponent["manga"] = 1] = "manga";
    uiComponent[uiComponent["ugoira"] = 2] = "ugoira";
    uiComponent[uiComponent["caption"] = 3] = "caption";
})(uiComponent = exports.uiComponent || (exports.uiComponent = {}));
var pagetype;
(function (pagetype) {
    // my top page
    pagetype[pagetype["top"] = 0] = "top";
    //Works from favourite artists
    pagetype[pagetype["bookmark_new_illust"] = 1] = "bookmark_new_illust";
    //Discovery page
    pagetype[pagetype["discovery"] = 2] = "discovery";
    //Artist works page
    pagetype[pagetype["member_illust"] = 3] = "member_illust";
    //Artist's "top" page
    pagetype[pagetype["member"] = 4] = "member";
    //Bookmark information
    pagetype[pagetype["bookmark_detail"] = 5] = "bookmark_detail";
    //Added new bookmarks
    pagetype[pagetype["bookmark_add"] = 6] = "bookmark_add";
    //Daily rankings
    pagetype[pagetype["ranking"] = 7] = "ranking";
    //Someone's bookmarks page
    pagetype[pagetype["bookmark_id"] = 8] = "bookmark_id";
    //Search page
    pagetype[pagetype["search"] = 9] = "search";
    //Your bookmarks page
    pagetype[pagetype["bookmark"] = 10] = "bookmark";
    pagetype[pagetype["other"] = 11] = "other";
})(pagetype = exports.pagetype || (exports.pagetype = {}));
;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = __webpack_require__(0);
/**
 *　機能の有効/無効等の設定内容
 *
 */
class Setting {
    constructor() {
        this.changeIllustPageLayout = true;
        this.changeMemberPageLayout = true;
        this.openComment = true;
        this.popup = true;
    }
    async init() {
        // @ts-ignore
        await GM.getValue("pixiv_viewutil_setting").then(jsonString => {
            if (jsonString !== undefined) {
                const jsonData = JSON.parse(jsonString);
                this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
                this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
                this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
                this.popup = (jsonData.popup == null) ? true : jsonData.popup;
            }
        });
    }
    set setStringData(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.uiComponent = [enum_1.uiComponent.image, enum_1.uiComponent.manga, enum_1.uiComponent.ugoira, enum_1.uiComponent.caption];
    }
    set setData(jsonData) {
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
    }
    get getJsonString() {
        const obj = {
            changeIllustPageLayout: this.changeIllustPageLayout,
            changeMemberPageLayout: this.changeMemberPageLayout,
            openComment: this.openComment,
            popup: this.popup,
        };
        return JSON.stringify(obj);
    }
    save() {
        // @ts-ignore
        GM.setValue("pixiv_viewutil_setting", this.getJsonString);
    }
}
exports.Setting = Setting;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *  divやspan,imgなどのHTML要素を作るファクトリ
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerFactory {
    constructor() {
        this.id = '';
        this.innerHtml = '';
        this.innerText = '';
        this.cssText = '';
    }
    setId(idString) {
        this.id = idString;
        return this;
    }
    setLeft(x) {
    }
    setTop(y) {
    }
    setWitdh(w) {
        this.width = w;
        return this;
    }
    setInnerHtml(elem) {
        this.innerHtml = elem;
        return this;
    }
    setInnerText(elem) {
        this.innerText = elem;
        return this;
    }
    createDiv() {
        const elem = document.createElement('div');
        elem.id = this.id;
        elem.innerHTML = this.innerHtml;
        elem.style.cssText = this.cssText;
        return elem;
    }
    createImg() {
        const elem = document.createElement('img');
        elem.id = this.id;
        elem.style.cssText = this.cssText;
        return elem;
    }
    initHtml() {
        this.innerHtml = '';
        return this;
    }
    createSpan() {
        const elem = document.createElement('span');
        elem.id = this.id;
        elem.innerHTML = this.innerHtml;
        elem.style.cssText = this.cssText;
        return elem;
    }
    appendChild(infoElem) {
        this.appendChild(infoElem);
        return this;
    }
    setCSS(cssString) {
        this.cssText = cssString;
        return this;
    }
}
exports.ContainerFactory = ContainerFactory;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = __webpack_require__(0);
const popupUtil_1 = __webpack_require__(7);
const setting_1 = __webpack_require__(1);
const ContainerFactory_1 = __webpack_require__(2);
const jsonInterface_1 = __webpack_require__(4);
/***
 * 各種ユーティリティ関数
 * ポップアップ機能に関するユーティリティ関数軍が長くなったため
 * popupUtilと外出しにしている
 */
class Util {
    constructor() {
        this.innerContainerID = 'popup-inner-container';
        this.outerContainerID = 'popup-outer-container';
        this.captionContainerID = 'popup-caption-container';
        //あとで各要素やドキュメントに挿入するCSS文字列
        this.innerContainerCSS = `
        position:absolute;
        display:block;
        z-index:1000;
        border: 5px solid black;
        background-color:#111;
        max-width:${window.innerWidth * 0.8}px;
        max-height:${window.innerHeight * 0.8}px;
        `;
        this.gearCSS = `width: 25px; 
         height: 25px;
         color:rgb(173, 173, 173);
         `;
        this.modalCSS = `.pixiv-modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index:10000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
#pixiv-modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    z-index:10001;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
#pixiv-modal-close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

#pixiv-modal-close :hover,
#pixiv-modal-close :focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
`;
        this.pixpediaItemCSS = `.popup-pixpedia-icon{
    display: inline-block;
    margin-left: 2px;
    width: 15px;
    height: 14px;
    vertical-align: -2px;
    text-decoration: none;
    background: url(https://s.pximg.net/www/images/inline/pixpedia.png) no-repeat;
    }
.popup-pixpedia-no-icon{
    display: inline-block;
    margin-left: 2px;
    width: 15px;
    height: 14px;
    vertical-align: -2px;
    text-decoration: none;
     background: url(https://s.pximg.net/www/images/inline/pixpedia-no-item.png) no-repeat;
}
     `;
        this.captionContainerCSS = `
        white-space:pre-wrap;
        display:block;
        z-index:1001;
        position:absolute;
        border: 1px solid black;
         max-width:${window.innerWidth * 0.8}px;
        background-color:white;
        word-wrap:break-word;
        word-break:break-all;
        `;
        this.utilIcon = 'pixiv-view-util-icon';
    }
    /**
     * とりあえずやっておくこと。
     * 今いるページのタイプと、設定内容に応じて、レイアウトの修正やポップアップの用意を行う
     * トップ画面の場合は設定ダイアログも用意する
     * @param setting
     * @param page
     */
    async initExecute(setting, page) {
        if (page.pagetype == enum_1.pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigDialog();
        }
        if (setting.popup && page.isEnable(enum_1.prop.popup_typeA)) {
            this.setPopup(page, setting);
            console.log("set popup typeA");
        }
        else if (setting.popup && page.isEnable(enum_1.prop.popup_typeB)) {
            this.setPopup(page, setting);
            console.log("set popup typeB");
        }
    }
    /**
     * 画面読み込み完了時に行うこと。initExecuteと同様
     * @param setting
     * @param page
     */
    onloadExecute(setting, page) {
        if (page.pagetype === enum_1.pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigDialog();
        }
        if (setting.changeIllustPageLayout && page.isEnable(enum_1.prop.changeIllustPageLayout)) {
            Util.changeIllustPageLayout();
            console.log("layout chainged");
        }
        if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
            this.openComment(page);
            console.log("comment opend");
        }
        if (setting.changeMemberPageLayout && (page.pagetype === enum_1.pagetype.member)) {
            this.changeMemberPageLayout();
            //読み込みに時間がかかるようなので時差を付ける
            for (let i = 0; i < 5; i++) {
                setTimeout(this.changeMemberPageLayout(), 1000 * i);
            }
        }
    }
    /**
     * URLに応じてpagetypeを返す
     * @param url
     */
    static checkPageType(url) {
        if (url.match('https://www.pixiv.net/bookmark_new_illust.php?'))
            return enum_1.pagetype.bookmark_new_illust;
        if (url.match('https://www.pixiv.net/discovery?'))
            return enum_1.pagetype.discovery;
        if (url.match('https://www.pixiv.net/member_illust.php?'))
            return enum_1.pagetype.member_illust;
        if (url.match('https://www.pixiv.net/member.php?'))
            return enum_1.pagetype.member;
        if (url.match('https://www.pixiv.net/bookmark_detail.php?'))
            return enum_1.pagetype.bookmark_detail;
        if (url.match('https://www.pixiv.net/bookmark_add.php?'))
            return enum_1.pagetype.bookmark_add;
        if (url.match('https://www.pixiv.net/ranking.php?'))
            return enum_1.pagetype.ranking;
        if (url.match(/https:\/\/www\.pixiv\.net\/bookmark\.php\?id/))
            return enum_1.pagetype.bookmark_id;
        if (url.match('https://www.pixiv.net/search.php'))
            return enum_1.pagetype.search;
        if (url.match('https://www.pixiv.net/bookmark.php?'))
            return enum_1.pagetype.bookmark;
        if (url.match('https://www.pixiv.net/'))
            return enum_1.pagetype.top;
        else
            return enum_1.pagetype.other;
    }
    ;
    /**
     * イラスト閲覧ページのレイアウトを修正する
     */
    static changeIllustPageLayout() {
        $('figure').before($('figcaption'));
    }
    /**
     * そのページで可能な、本スクリプトが対象とする操作を返す
     * HTML要素に埋め込まれたURLの構造にはページに応じて2パターンあり、かつてはポップアップ機能はパターンごとに
     * 区別し実行していたためその名残でタイプA/Bが残っている
     * @param type
     */
    static getAllowedFuncList(type) {
        switch (type) {
            case enum_1.pagetype.top:
                return [enum_1.prop.popup_typeB];
            case enum_1.pagetype.bookmark_new_illust:
                return [enum_1.prop.popup_typeA];
            case enum_1.pagetype.discovery:
                return [enum_1.prop.popup_typeA];
            case enum_1.pagetype.member_illust:
                return [enum_1.prop.popup_typeB, enum_1.prop.changeIllustPageLayout, enum_1.prop.openComment];
            case enum_1.pagetype.member:
                return [enum_1.prop.popup_typeB, enum_1.prop.changeMemberPageLayout];
            case enum_1.pagetype.bookmark_detail:
                return [enum_1.prop.popup_typeB];
            case enum_1.pagetype.bookmark_add:
                return [enum_1.prop.popup_typeB];
            case enum_1.pagetype.bookmark_id:
                return [enum_1.prop.popup_typeB];
            case enum_1.pagetype.search:
                return [enum_1.prop.popup_typeA];
            case enum_1.pagetype.ranking:
                return [enum_1.prop.popup_typeB];
            case enum_1.pagetype.bookmark:
                return [enum_1.prop.popup_typeB];
            default:
                return [];
        }
    }
    /**
     * コメントを開く
     * @param page
     */
    openComment(page) {
        if (page.getURL.indexOf('mode=medium') > 0) {
            let elem = $("article");
            elem.find("[aria-expanded='false']").click();
            var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
                elem.find("[aria-expanded='false']").click();
            });
            observer.observe(document, {
                childList: true,
                subtree: true,
            });
        }
    }
    /**
     * ポップアップ機能の用意を行う
     * @param page
     * @param setting
     */
    setPopup(page, setting) {
        const popupUtil = new popupUtil_1.PopupUtil();
        //IDやCSSなどをセットしたHTML要素を作成
        const factory = new ContainerFactory_1.ContainerFactory();
        //ポップアップの外枠となるouterContainer
        const outerContainer = factory.setId(this.outerContainerID)
            .initHtml()
            .createDiv();
        const innerContainer = factory.setId(this.innerContainerID)
            .setCSS(this.innerContainerCSS)
            .initHtml()
            .createDiv();
        const captionContainer = factory.setId(this.captionContainerID)
            .setCSS(this.captionContainerCSS)
            .initHtml()
            .createDiv();
        outerContainer.appendChild(captionContainer);
        outerContainer.appendChild(innerContainer);
        document.body.appendChild(outerContainer);
        //ドキュメントにCSSを登録
        const style = document.createElement('style');
        style.textContent = this.pixpediaItemCSS;
        document.getElementsByTagName('head')[0].appendChild(style);
        // イラスト＆漫画のクリックイベントを登録する
        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () {
            //クリック対象とhrefがある要素の入れ子関係は２パターン以上あるため注意
            const thumb = $(this).find('.non-trim-thumb');
            const clickElem = thumb.length > 0 ? thumb[0] : this;
            //イラストの本来のクリックによる遷移を抑制
            $(this).attr('onclick', 'console.log();return false;');
            //漫画の本来のクリックによる遷移を抑制
            $(this).find('.non-trim-thumb').attr('onclick', 'console.log();return false;');
            const hrefElem = this;
            const url = this.getAttribute("href");
            //イラストIDを取得
            const matches = url.match(/(.)+illust_id=([0-9]+)(&.+)?/);
            const illustID = Number(matches[2]);
            //ポップアップを実行
            $(clickElem).on('click', async function (e) {
                outerContainer.style.display = 'block';
                //イラストIDを元にJSONを入手
                await fetch(`https://www.pixiv.net/ajax/illust/${illustID}`, {
                    method: 'GET',
                    mode: 'cors',
                    keepalive: true
                }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(async function (json) {
                    //pixivJsonオブジェクトに格納
                    const pixivJson = new jsonInterface_1.PixivJson(json);
                    // const mouseX=e.pageX
                    //const mouseY=e.pageY
                    //漫画のポップアップを実行
                    if (popupUtil.isManga(pixivJson)) {
                        const pageNum = Util.getPageNum(pixivJson);
                        popupUtil.popupManga(outerContainer, hrefElem, pixivJson, Number(pageNum));
                    }
                    else if (popupUtil.isIllust(pixivJson)) {
                        //イラストのポップアップを実行
                        popupUtil.popupImg(page, outerContainer, hrefElem, pixivJson);
                    }
                    else {
                        //うごイラのポップアップを実行
                        //うごイラは通常のイラストのポップアップ手順でも正常動作する
                        popupUtil.popupImg(page, outerContainer, hrefElem, pixivJson);
                        //うごイラのメタ情報のJSONを入手
                        await fetch(`https://www.pixiv.net/ajax/illust/${pixivJson.body.illustId}/ugoira_meta`)
                            .then(function (response) {
                            return response.json();
                        }).then(json => {
                            popupUtil.popupUgoira(outerContainer, hrefElem, pixivJson, new jsonInterface_1.PixivJson(json)).then(result => console.log(result));
                        });
                    }
                    //キャプションのポップアップを実行
                    popupUtil.popupCaption(outerContainer, pixivJson);
                });
            });
        });
        outerContainer.onmouseleave = () => {
            this.cleanContainer(outerContainer);
        };
        outerContainer.onclick = () => {
            this.cleanContainer(outerContainer);
        };
        window.onresize = function () {
            outerContainer.style.maxWidth = `${window.innerWidth * 0.8}px`;
        };
    }
    cleanContainer(outerContainer) {
        const innerContainer = document.getElementById(this.innerContainerID);
        const captionContainer = document.getElementById(this.captionContainerID);
        innerContainer.innerText = '';
        captionContainer.innerText = '';
        outerContainer.style.display = 'none';
        /*
        const childContainer=outerContainer.childNodes
        for(let container of childContainer){
            container.innerText=''
        }


       document.getElementById(this.innerContainerID).innerText=''
        document.getElementById(this.captionContainerID).innerText=''
        document.getElementById(this.outerContainerID).style.display = 'none';
*/
    }
    static getUserID(json) {
        return json.body.tags.authorId;
    }
    static getPageNum(json) {
        return Number(json.body.pageCount);
    }
    /**
     * 設定ダイアログを用意する
     */
    async setConfigDialog() {
        const iconID = this.utilIcon;
        const iconElem = document.getElementById(this.utilIcon);
        if (iconElem === null) {
            await this.setIconElem(iconID);
            await this.setModal(iconID);
        }
    }
    /**
     * 設定アイコンをトップページにセットする
     * @param iconID
     */
    async setIconElem(iconID) {
        // @ts-ignore
        const gearIcon = await GM_getResourceText('gearIcon');
        const factory = new ContainerFactory_1.ContainerFactory();
        const gearElem = factory
            .setId(iconID)
            .setCSS(this.gearCSS)
            .setInnerHtml(gearIcon)
            .createDiv();
        gearElem.className = 'trigger';
        const svgTag = gearElem.getElementsByTagName('svg')[0];
        const gTag = gearElem.getElementsByTagName('g')[0];
        svgTag.setAttribute('width', '25');
        svgTag.setAttribute('height', '25');
        gTag.setAttribute('fill', '#BECAD8');
        const liElem = document.createElement('li');
        liElem.className = 'viewUtil';
        liElem.appendChild(gearElem);
        document.body.getElementsByClassName('notifications')[0].appendChild(liElem);
    }
    /**
     * ダイアログ（モーダル）をセットする
     * @param iconID
     */
    setModal(iconID) {
        const setting = new setting_1.Setting;
        const iconElem = document.getElementById(iconID);
        const modal1 = document.createElement('div');
        modal1.innerHTML =
            `  
<div id="myModal" class="pixiv-modal">
  <div id="pixiv-modal-content" >
    <span id="pixiv-modal-close" >OK</span>
    <p>Setting:</p>
    <div id="pixiv-set-IllustPageLayout">
    Modify the illust page's layout
        <input type="radio"  name='pixivutil-setting1' id="pixivutil-setting1-yes" value="1"  />
        <label for="dummy_1" data-label="ON">ON</label>
        <input type="radio"  name='pixivutil-setting1' id="pixivutil-setting1-no" value="0" checked />
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
    <div id="pixiv-set-MemberPageLayout">
     Modify the author page's layout
        <input type="radio"  name='pixivutil-setting2' id="pixivutil-setting2-yes" value="1"  />
        <label for="dummy_1" data-label="ON">ON</label>
        <input type="radio"  name='pixivutil-setting2' id="pixivutil-setting2-no" value="0" checked/>
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
    <div id="pixiv-set-Popup">
     Use popup function
        <input type="radio"  name='pixivutil-setting3' id="pixivutil-setting3-yes" value="1" />
        <label for="dummy_1" data-label="ON">ON</label>
        <input type="radio"  name='pixivutil-setting3' id="pixivutil-setting3-no" value="0" checked />
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
  </div>
</div>
	`;
        document.body.appendChild(modal1);
        // 各modalクラスのcssを追加
        const style = document.createElement('style');
        style.textContent = this.modalCSS;
        document.getElementsByTagName('head')[0].appendChild(style);
        //各種クリックイベントを追加
        const modal = document.getElementById('myModal');
        const closeButton = document.getElementById('pixiv-modal-close');
        iconElem.onclick = () => modal.style.display = 'block';
        const elem1 = document.getElementsByName('pixivutil-setting1')[0];
        const elem2 = document.getElementsByName('pixivutil-setting2')[0];
        const elem3 = document.getElementsByName('pixivutil-setting3')[0];
        setting.init().then(() => {
            // @ts-ignore
            if (setting.changeIllustPageLayout && !elem1.checked)
                elem1.checked = true;
            // @ts-ignore
            if (setting.changeMemberPageLayout && !elem2.checked)
                elem2.checked = true;
            // @ts-ignore
            if (setting.popup && !elem3.checked)
                elem3.checked = true;
        });
        /**
         * モーダルを閉じたときに設定を保存
         */
        closeButton.onclick = () => {
            modal.style.display = 'none';
            // @ts-ignore
            setting.changeIllustPageLayout = elem1.checked;
            // @ts-ignore
            setting.changeMemberPageLayout = elem2.checked;
            // @ts-ignore
            setting.popup = elem3.checked;
            setting.save();
        };
        //modal画面の余白をクリックした場合
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }
    changeMemberPageLayout() {
        // TODO もっと良い方法
        const h2Elems = document.getElementsByTagName('h2');
        if (typeof h2Elems !== 'undefined') {
            for (const h2elem of h2Elems) {
                if (h2elem.innerText.startsWith('イラスト')) {
                    const illustElem = h2elem.parentElement.parentElement;
                    const header = document.getElementsByTagName('header')[0];
                    const parent = header.parentNode;
                    parent.insertBefore(illustElem, header.nextSibling);
                    break;
                }
            }
        }
    }
}
exports.Util = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Jsonをパースするときに使用する各種Json用クラス
 * http://json2ts.com/で自動生成
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
class PixivJson {
    constructor(json) {
        Object.assign(this, json);
    }
}
exports.PixivJson = PixivJson;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * うごイラ管理用オブジェクト
 */
class Ugoira {
    constructor() {
        //imageElement配列
        this.imgArray = [];
        //imageElementのsrc文字列の配列
        this.imgStringArray = [];
        //フレーム情報（ミリ秒単位の変更間隔）の配列
        this.frameArray = [];
    }
    pushImgElem(elem) {
        this.imgArray.push(elem);
    }
    pushImgString(s) {
        this.imgStringArray.push(s);
    }
    pushFrame(num) {
        this.frameArray.push(num);
    }
    get getImgArray() {
        return this.imgArray;
    }
    get getImgStringArray() {
        return this.imgStringArray;
    }
    get getFrameArray() {
        return this.frameArray;
    }
    get getFrameNum() {
        return this.imgArray.length;
    }
    //フレーム情報の合計
    get getIntervalSum() {
        return this.frameArray.length > 1 ? this.frameArray.reduce((x, y) => x + y) : 0;
    }
}
exports.Ugoira = Ugoira;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * html上のページごとの漫画情報を管理する
 */
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const manga_1 = __webpack_require__(6);
const enum_1 = __webpack_require__(0);
const ContainerFactory_1 = __webpack_require__(2);
const ugoira_1 = __webpack_require__(5);
/**
 * ポップアップ機能用のユーティリティツール群
 *
 */
class PopupUtil {
    constructor() {
        //キャプションに表示するアイコン群
        this.likeIcon = `<img src="https://s.pximg.net/www/js/spa/260127df5fe9ade778ec4be463deaf01.svg" width="12" height="12">`;
        this.bookmarkIcon = `<svg viewBox="0 0 12 12" width="12" height="12" class="css-1hamw6p e1rs6xf14"><path fill="currentColor" d="
        M9,0.75 C10.6568542,0.75 12,2.09314575 12,3.75 C12,6.68851315 10.0811423,9.22726429 6.24342696,11.3662534
        L6.24342863,11.3662564 C6.09210392,11.4505987 5.90790324,11.4505988 5.75657851,11.3662565
        C1.9188595,9.22726671 0,6.68851455 0,3.75 C1.1324993e-16,2.09314575 1.34314575,0.75 3,0.75
        C4.12649824,0.75 5.33911281,1.60202454 6,2.66822994 C6.66088719,1.60202454 7.87350176,0.75 9,0.75 Z"></path></svg>`;
        this.viewIcon = `<img src="https://s.pximg.net/www/js/spa/af74d092363c09fd06441a4ab04c9331.svg" width="14" height="12">`;
        //各種elementに使用するID
        this.innerContainerID = 'popup-inner-container';
        this.outerContainerID = 'popup-outer-container';
        this.imgContainerID = 'popup-img';
        this.mangaContainerID = 'popup-manga';
        this.captionContainerID = 'popup-caption-container';
        this.captionTextID = 'popup-caption-text';
        this.captionTagID = 'popup-caption-tag';
        this.captionDateID = 'popup-caption-date';
        this.captionLikeID = 'popup-caption-like';
        this.captionBookmarkID = 'popup-caption-bookmark';
        this.captionViewID = 'popup-caption-view';
        this.captionInfoID = 'popup-caption-infomation';
        //各種elementのcss
        this.mangaContainerCSS = `display:block;
            background-color:black;
            overflow-x:auto;
            white-space:nowrap;
            `;
        this.imgContainerCSS = `width: auto; 
            height:auto;
            display:block;
            `;
        this.infoContainerCSS = `font-size: 12px; 
            color:rgb(173, 173, 173); 
            line-height=1;`;
    }
    pixpediaCSS(innerContainer) {
        return `
        white-space:pre-wrap;
        display:block;
        z-index:1001;
        position:absolute;
        border: 1px solid black;
        max-width:${innerContainer.clientWidth + 10}px;
        background-color:white;
        word-wrap:break-word;
        word-break:break-all;
        left:${innerContainer.style.left}px;
        width:${innerContainer.clientWidth + 10}px;
        `;
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
    popupImg(page, outerContainer, elem, json) {
        const innerContainer = document.getElementById(this.innerContainerID);
        //中身を綺麗にする
        innerContainer.innerHTML = '';
        const factory = new ContainerFactory_1.ContainerFactory();
        const imgElement = factory.setId(this.imgContainerID)
            .initHtml()
            .setCSS(this.imgContainerCSS)
            .createImg();
        innerContainer.appendChild(imgElement);
        imgElement.src = this.getImgUrl(json);
        if ($(elem).hasClass("on")) {
            innerContainer.style.border = '5px solid rgb(255, 64, 96)';
            // $(innerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            innerContainer.style.border = '5px solid rgb(34, 34, 34)';
            //$(innerContainer).css("background", "rgb(34, 34, 34)");
        }
        //大きすぎる場合はリサイズする
        const resize = this.resize(json.body.width, json.body.height);
        let imgHeight = resize.height;
        let imgWidth = resize.width;
        imgElement.style.width = `${imgWidth}px`;
        imgElement.style.height = `${imgHeight}px`;
        innerContainer.style.width = `${imgWidth}px`;
        innerContainer.style.height = `${imgHeight}px`;
        innerContainer.style.display = 'block';
        //表示位置を調整
        const offset = this.getOffset(innerContainer);
        innerContainer.style.top = offset.top + 'px';
        innerContainer.style.left = offset.left + 'px';
    }
    /**
     * 大きさがあるHTMLelementを引数に、それが画面の中央に表示されるようになるelementのtop・leftの値を返す
     * @param innerContainer
     */
    getOffset(innerContainer) {
        const w_height = $(window).height();
        const w_width = $(window).width();
        const el_height = $(innerContainer).height();
        const el_width = $(innerContainer).width();
        const scroll_height = $(window).scrollTop();
        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;
        return { top: Math.round(position_h), left: Math.round(position_w) };
    }
    /**
     * キャプションをポップアップする
     * テキスト、タグ、その他情報(ブックマーク等)を,それぞれelementを用意しコンテナとして箱詰めし、innerContainerに付与する
     * @param innerContainer
     * @param json
     */
    popupCaption(outerContainer, json) {
        const captionContainer = document.getElementById(this.captionContainerID);
        const innerContainer = document.getElementById(this.innerContainerID);
        //既存のキャプションコンテナがあれば破棄
        captionContainer.innerText = '';
        // this.cleanElementById(this.captionContainerID)
        //テキストコンテナを作成
        const factory = new ContainerFactory_1.ContainerFactory();
        const descriptionElem = factory.setId(this.captionTextID)
            .setInnerHtml(json.body.description)
            .createDiv();
        const tagElem = factory.setId(this.captionTagID)
            .initHtml()
            .createDiv();
        tagElem.appendChild(this.getTagHtml(json));
        //投稿日
        const date = new Date(json.body.createDate);
        const dateString = `upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        const dateElem = factory.setId(this.captionDateID).setInnerHtml(dateString).createDiv();
        //like数
        const likeString = `${this.likeIcon} ${json.body.likeCount} `;
        const likeElem = factory.setId(this.captionLikeID).setInnerHtml(likeString).createSpan();
        //ブックマーク数
        const bookmarkString = `${this.bookmarkIcon} ${json.body.bookmarkCount} `;
        const bookmarkElem = factory.setId(this.captionBookmarkID).setInnerHtml(bookmarkString).createSpan();
        //閲覧数
        const viewString = `${this.viewIcon}${json.body.viewCount}`;
        const viewElem = factory.setId(this.captionViewID).setInnerHtml(viewString).createSpan();
        //infoコンテナに各elementを詰める
        const infoElem = factory
            .setId(this.captionInfoID)
            .initHtml()
            .setCSS(this.infoContainerCSS)
            .createDiv();
        infoElem.appendChild(dateElem);
        infoElem.appendChild(likeElem);
        infoElem.appendChild(bookmarkElem);
        infoElem.appendChild(viewElem);
        //キャプション用コンテナにテキストコンテナとinfoコンテナを詰める
        captionContainer.appendChild(descriptionElem);
        captionContainer.appendChild(tagElem);
        captionContainer.appendChild(infoElem);
        //innerContainer.parentNode.insertBefore(captionContainer, innerContainer)
        //表示位置を調整
        const y = parseInt(innerContainer.style.top) - captionContainer.getBoundingClientRect().height;
        captionContainer.style.top = `${y}px`;
        captionContainer.style.left = innerContainer.style.left;
        captionContainer.style.width = innerContainer.style.width;
    }
    /**
     * タグ情報を格納したHTMLelementを作成する
     */
    getTagHtml(json) {
        let outerTagElem = document.createElement('ul');
        for (const tagJson of json.body.tags.tags) {
            let iconElem = document.createElement('a');
            iconElem.className = `${tagJson.romaji || tagJson.locked ? "popup-pixpedia-icon" : "popup-pixpedia-no-icon"}`;
            iconElem.setAttribute('href', `https://dic.pixiv.net/a/${tagJson.tag}`);
            let innerTagElem = document.createElement('li');
            innerTagElem.innerHTML = ` ${tagJson.locked ? "<span>＊<span>" : ""}${tagJson.tag}`;
            innerTagElem.style.cssText = 'display: inline-block;';
            innerTagElem.appendChild(iconElem);
            outerTagElem.appendChild(innerTagElem);
        }
        return outerTagElem;
    }
    /**
     * elementを削除する
     * @param id
     */
    deleteElementById(id) {
        const elem = document.getElementById(id);
        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }
    }
    /**
     * 漫画をポップアップする
     * @param innerContainer
     * @param hrefElem
     * @param json
     * @param count
     */
    popupManga(outerContainer, hrefElem, json, count) {
        const innerContainer = document.getElementById(this.innerContainerID);
        //中身を綺麗にする
        innerContainer.innerHTML = '';
        const factory = new ContainerFactory_1.ContainerFactory();
        const mangaContainer = factory.setId(this.mangaContainerID)
            .initHtml()
            .setCSS(this.mangaContainerCSS)
            .createDiv();
        innerContainer.appendChild(mangaContainer);
        const manga = new manga_1.Manga();
        if ($(hrefElem).hasClass("on")) {
            $(innerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(innerContainer).css("background", "rgb(34, 34, 34)");
        }
        //各ページをセット
        this.imgsArrInit(innerContainer, mangaContainer, manga, this.getImgUrl(json), count);
        innerContainer.style.width = innerContainer.style.maxWidth;
        innerContainer.style.height = innerContainer.style.maxHeight;
        const offset = this.getOffset(innerContainer);
        innerContainer.style.top = `${offset.top}px`;
        innerContainer.style.left = `${offset.left}px`;
        mangaContainer.style.display = 'block';
        innerContainer.style.display = 'block';
        //スクロールをセット
        this.setScrool(innerContainer, mangaContainer, manga);
    }
    /**
     * 画像のURLを取得
     * @param json
     */
    getImgUrl(json) {
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return json.body.urls.regular.replace(/\/...x...\//, '/600x600/');
    }
    /**
     * imgエレメントの配列を作成し漫画の各ページを格納
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     * @param primaryLink
     * @param pageNum
     */
    imgsArrInit(innerContainer, mangaContainer, manga, primaryLink, pageNum) {
        manga.pageNum = pageNum;
        for (let i = 0; i < pageNum; i++) {
            manga.imgsArr.push(document.createElement('img'));
            mangaContainer.appendChild(manga.imgsArr[i]);
            manga.imgsArr[i].src = primaryLink.replace('p0', 'p' + i);
            manga.imgsArr[i].style.maxWidth = innerContainer.style.maxWidth;
            manga.imgsArr[i].style.maxHeight = innerContainer.style.maxHeight;
            manga.imgsArr[i].style.height = innerContainer.style.maxHeight;
            manga.imgsArr[i].style.width = 'auto';
        }
    }
    /**
     * mangaコンテナ上でスクロール機能を実現
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     */
    setScrool(innerContainer, mangaContainer, manga) {
        mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (innerContainer.getBoundingClientRect().top < 0)) {
                innerContainer.scrollIntoView({ block: "start", behavior: "smooth" }); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (innerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                innerContainer.scrollIntoView({ block: "end", behavior: "smooth" }); //aligning to bottom screen side on scrollDown if needed
            }
            let scrlLft = mangaContainer.scrollLeft;
            if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                e.preventDefault();
                mangaContainer.scrollLeft += e.deltaY * manga.DELTASCALE; // TODO - find better value for opera/chrome
            }
        };
    }
    getHrefElement(page, ctype, elem) {
        if (page.pagetype === enum_1.pagetype.member_illust) {
            return $(elem).parent()[0];
        }
        return $(elem).parent().find('a')[0];
    }
    async popupUgoira(outerContainer, hrefElem, pixivJson, ugoiraMetaJson) {
        const innerContainer = document.getElementById(this.innerContainerID);
        innerContainer.innerHTML = '';
        let finished = false;
        const factory = new ContainerFactory_1.ContainerFactory();
        innerContainer.textContent = null;
        const ugoiraContainer = factory.setId('ugoiraContainer')
            .initHtml()
            .createDiv();
        innerContainer.appendChild(ugoiraContainer);
        let myHeaders = new Headers();
        myHeaders.append("Accept-Encoding", "gzip, deflate, br");
        myHeaders.append("Connection", 'keep-alive');
        myHeaders.append("HOST", "www.pixiv.net");
        const myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'same-origin',
            credentials: 'same-origin',
            cache: 'default'
        };
        // @ts-ignore
        let zip = new JSZip();
        const ugoira = new ugoira_1.Ugoira();
        const frames = ugoiraMetaJson.body.frames;
        // const ImgElem: HTMLImageElement = document.createElement('img')
        const zipData = await fetch(ugoiraMetaJson.body.src, {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            keepalive: true
        }).then(response => {
            if (response.ok) {
                return response.blob();
            }
        }).then(async (zipData) => {
            await zip.loadAsync(zipData, { base64: true });
        }).then(async () => {
            for (let frame of frames) {
                ugoira.pushFrame(frame.delay);
                await zip.file(frame.file)
                    .async("base64", function updateCallback(metadata) {
                    console.log("progression: " + metadata.percent.toFixed(2) + " %");
                    if (metadata.percent === 100) {
                        finished = true;
                    }
                })
                    .then(function success(content) {
                    ugoira.pushImgString(`data:image/jpeg;base64,${content}`);
                }, function error(e) {
                    console.log("download error.");
                });
            }
        }).then(() => {
            //innerContainer.appendChild(ImgElem);
            const canvas = document.createElement('canvas');
            const size = this.resize(pixivJson.body.width, pixivJson.body.height);
            canvas.width = size.width;
            canvas.height = size.height;
            innerContainer.style.width = `${size.width}px`;
            innerContainer.style.height = `${size.height}px`;
            ugoiraContainer.appendChild(canvas);
            $(innerContainer).css("background", "rgb(34, 34, 34)");
            const offset = this.getOffset(innerContainer);
            innerContainer.style.top = `${offset.top}px`;
            innerContainer.style.left = `${offset.left}px`;
            ugoiraContainer.style.display = 'block';
            innerContainer.style.display = 'block';
            //表示位置を調整
            const captionContainer = document.getElementById(this.captionContainerID);
            captionContainer.style.width = `${pixivJson.body.width}px`;
            const y = parseInt(innerContainer.style.top) - captionContainer.getBoundingClientRect().height;
            captionContainer.style.top = `${y}px`;
            captionContainer.style.left = innerContainer.style.left;
            const frameArray = ugoira.getFrameArray;
            const stringArray = ugoira.getImgStringArray;
            let index = 0;
            const counter = () => {
                // ImgElem.src = stringArray[index]
                index += 1;
                index = index === stringArray.length ? 0 : index;
                const img = new Image();
                img.src = stringArray[index];
                const context = canvas.getContext('2d');
                //座標(10, 10)の位置にイメージを表示
                context.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
                setTimeout(counter, frameArray[index]);
            };
            counter();
        });
    }
    isIllust(json) {
        return json.body.illustType === 0;
    }
    isManga(json) {
        return json.body.illustType === 1 || (json.body.pageCount && Number(json.body.pageCount) > 1);
    }
    isUgoira(json) {
        return json.body.illustType === 2;
    }
    resize(width, height) {
        let newHeight = height;
        let newWidth = width;
        if (height > window.innerHeight * 0.8 || width > window.innerWidth * 0.8) {
            const heightScale = height / Number(window.innerHeight * 0.8);
            const widthScale = width / Number(window.innerWidth * 0.8);
            if (heightScale > widthScale) {
                newHeight /= heightScale;
                newWidth /= heightScale;
            }
            else {
                newHeight /= widthScale;
                newWidth /= widthScale;
            }
        }
        return { width: Math.round(newWidth), height: Math.round(newHeight) };
    }
}
exports.PopupUtil = PopupUtil;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(3);
/**
 * 現在いるページを管理するページオブジェクト
 */
class Page {
    constructor(url) {
        this.URL = url;
        this.pagetype = util_1.Util.checkPageType(url);
        this.siteImgMaxWidth = 500; //this.pagetype === prop.popup_typeA ? 200 : 150
        this.alloedFunclist = util_1.Util.getAllowedFuncList(this.pagetype);
        this.imgSelector = 'a[href*="member_illust.php?mode=medium&illust_id="]';
        this.mangaSelector = 'a[href*="member_illust.php?mode=medium&illust_id="] > div:nth-child(2) ';
    }
    set setURL(url) {
        this.URL = url;
        this.pagetype = util_1.Util.checkPageType(url);
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
    get getPagetype() {
        return this.pagetype;
    }
}
exports.Page = Page;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __webpack_require__(8);
const util_1 = __webpack_require__(3);
const setting_1 = __webpack_require__(1);
'use strict';
/**
 * メイン関数
 */
const page = new page_1.Page(document.URL);
const util = new util_1.Util();
const setting = new setting_1.Setting();
setting.init().then(() => {
    util.initExecute(setting, page);
});
window.onload = () => {
    console.log("pagetype:" + page.pagetype.toString());
    //レイアウトを変更しコメントを開く
    util.onloadExecute(setting, page);
    const links = document.getElementsByTagName('a');
    for (const link of links) {
        link.addEventListener('click', () => {
            const newPageExecute = util.onloadExecute(setting, new page_1.Page(document.URL));
        });
    }
    setting.save();
};


/***/ })
/******/ ]);
}
)();