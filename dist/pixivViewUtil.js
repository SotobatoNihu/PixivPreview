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
// @version         0.3.7-20181007
// @homepageURL     https://github.com/SotobatoNihu/PixivViewUtil
// @license         MIT License
// @require         https://code.jquery.com/jquery-3.2.1.min.js
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
    uiComponent[uiComponent["caption"] = 2] = "caption";
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
        this.uiComponent = [enum_1.uiComponent.image, enum_1.uiComponent.manga, enum_1.uiComponent.caption];
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
    setVoidHtml() {
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
const popupUtil_1 = __webpack_require__(6);
const setting_1 = __webpack_require__(1);
const ContainerFactory_1 = __webpack_require__(2);
const jsonInterface_1 = __webpack_require__(4);
class Util {
    constructor() {
        this.outerContainerCSS = `
        position:absolute;
        display:block;
        z-index:1000;
        border: 5px solid black;
        max-width:${window.innerWidth * 0.8}px;
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
        /*
         async loadSettingData(){
            const default_setting = {
                changeIllustPageLayout: true,
                changeMemberPageLayout: true,
                openComment: true,
                popup: true
            }
            // @ts-ignore
            return await GM.getValue("pixiv_viewutil_setting", JSON.stringify(default_setting));
        }
    
        async saveSettingData(setting: Setting) {
            // @ts-ignore
            await GM.setValue("pixiv_viewutil_setting", setting);
        }
        */
    }
    async initExecute(setting, page) {
        if (page.pagetype == enum_1.pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigScreen();
        }
        if (setting.popup && page.isEnable(enum_1.prop.popup_typeA)) {
            this.setPopup(page, setting);
            console.log("set popup typeA");
        }
        else if (setting.popup && page.isEnable(enum_1.prop.popup_typeB)) {
            this.setPopup(page, setting);
            console.log("set popup typeB");
        }
        if (setting.changeMemberPageLayout && page.isEnable(enum_1.prop.changeMemberPageLayout)) {
            const autherElem = document.getElementsByTagName('header')[0].nextElementSibling.children[0].children[0]; //$('header').next().children().children()
            document.getElementById("root").appendChild(autherElem);
            console.log("layout chainged");
        }
    }
    onloadExecute(setting, page) {
        if (page.pagetype === enum_1.pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigScreen();
        }
        if (setting.changeIllustPageLayout && page.isEnable(enum_1.prop.changeIllustPageLayout)) {
            Util.changeIllustPageLayout();
            console.log("layout chainged");
        }
        if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
            this.openComment(page);
            console.log("comment opend");
        }
        if (setting.changeMemberPageLayout && page.pagetype === enum_1.pagetype.member_illust) {
            const autherElem = document.getElementsByTagName('header')[0].nextElementSibling.children[0].children[0]; //$('header').next().children().children()
            document.getElementById("root").appendChild(autherElem);
            console.log("layout chainged");
        }
    }
    //   function checkPageType(url) {
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
    static changeIllustPageLayout() {
        $('figure').before($('figcaption'));
    }
    static changeMemberPageLayout() {
        // TODO もっと良い方法
        //const tagElem=$('.gm-profile-work-list-tag-list-click')
        //const illustElem=tagElem.parent().parent().parent().parent()
        //$('header').next().prepend(illustElem)
        // $('nav').parent().parent().prepend(illustElem)
        const h2Elems = $('h2');
        for (const h2elem of h2Elems) {
            if (h2elem.innerText.startsWith("イラスト")) {
                const illustElem = $(h2elem).parent().parent();
                //$('nav').parent().parent().prepend(illustElem)
                $('header').next().prepend(illustElem);
                break;
            }
        }
    }
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
    setPopup(page, setting) {
        const popupUtil = new popupUtil_1.PopupUtil();
        const factory = new ContainerFactory_1.ContainerFactory();
        const outerContainer = factory.setId('outerContainer')
            .setCSS(this.outerContainerCSS)
            .setVoidHtml()
            .createDiv();
        document.body.appendChild(outerContainer);
        // イラスト＆漫画のクリックイベントを登録する
        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () {
            const thumb = $(this).find('.non-trim-thumb');
            const clickElem = thumb.length > 0 ? thumb[0] : this;
            //イラストのクリックを抑制
            $(this).attr('onclick', 'console.log();return false;');
            //漫画のクリックを抑制
            $(this).find('.non-trim-thumb').attr('onclick', 'console.log();return false;');
            const hrefElem = this;
            const url = this.getAttribute("href");
            const matches = url.match(/(.)+illust_id=([0-9]+)(&.+)?/);
            const illustID = Number(matches[2]);
            $(clickElem).on('click', function (e) {
                fetch(`https://www.pixiv.net/ajax/illust/${illustID}`).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    const pixivJson = new jsonInterface_1.PixivJson(json);
                    // const mouseX=e.pageX
                    //const mouseY=e.pageY
                    if (!popupUtil.isManga(pixivJson)) {
                        popupUtil.popupImg(page, outerContainer, hrefElem, pixivJson);
                    }
                    else {
                        const pageNum = Util.getPageNum(pixivJson);
                        popupUtil.popupManga(outerContainer, hrefElem, pixivJson, Number(pageNum));
                    }
                    popupUtil.popupCaption(outerContainer, pixivJson);
                });
            });
        });
        const deleteAll = () => {
            const elem = document.getElementById('captionContainer');
            if (elem !== null) {
                elem.parentNode.removeChild(elem);
            }
            outerContainer.textContent = null;
            outerContainer.style.display = 'none';
        };
        outerContainer.onmouseleave = function () {
            const elem = document.getElementById('captionContainer').innerHTML;
            if ($(elem).find('a').length == 0) {
                deleteAll();
            }
            else {
                setTimeout(deleteAll(), 1000);
            }
        };
        window.onresize = function () {
            outerContainer.style.maxWidth = `${window.innerWidth * 0.8}px`;
        };
    }
    static getUserID(json) {
        return json.body.tags.authorId;
    }
    static getPageNum(json) {
        return Number(json.body.pageCount);
    }
    async setConfigScreen() {
        const iconID = 'pixiv-view-util-icon';
        const iconElem = document.getElementById(iconID);
        if (iconElem === null) {
            await this.setIconElem(iconID);
            await this.setModal(iconID);
        }
    }
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
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        // .addEventListener("click", windowOnClick);
    }
}
exports.Util = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// http://json2ts.com/
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const manga_1 = __webpack_require__(5);
const enum_1 = __webpack_require__(0);
const ContainerFactory_1 = __webpack_require__(2);
class PopupUtil {
    constructor() {
        // icon images
        this.likeIcon = `<img src="https://s.pximg.net/www/js/spa/260127df5fe9ade778ec4be463deaf01.svg" width="12" height="12">`;
        this.bookmarkIcon = `<svg viewBox="0 0 12 12" width="12" height="12" class="css-1hamw6p e1rs6xf14"><path fill="currentColor" d="
        M9,0.75 C10.6568542,0.75 12,2.09314575 12,3.75 C12,6.68851315 10.0811423,9.22726429 6.24342696,11.3662534
        L6.24342863,11.3662564 C6.09210392,11.4505987 5.90790324,11.4505988 5.75657851,11.3662565
        C1.9188595,9.22726671 0,6.68851455 0,3.75 C1.1324993e-16,2.09314575 1.34314575,0.75 3,0.75
        C4.12649824,0.75 5.33911281,1.60202454 6,2.66822994 C6.66088719,1.60202454 7.87350176,0.75 9,0.75 Z"></path></svg>`;
        this.viewIcon = `<img src="https://s.pximg.net/www/js/spa/af74d092363c09fd06441a4ab04c9331.svg" width="14" height="12">`;
        //css strings
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
    captionContainerCSS(outerContainer) {
        return `
        white-space:pre-wrap;
        display:block;
        z-index:1001;
        position:absolute;
        border: 1px solid black;
        max-width:${outerContainer.clientWidth + 10}px;
        background-color:white;
        word-wrap:break-word;
        word-break:break-all;
        left:${outerContainer.style.left}px;
        width:${outerContainer.clientWidth + 10}px;
        `;
    }
    popupImg(page, outerContainer, elem, json) {
        outerContainer.textContent = null;
        const factory = new ContainerFactory_1.ContainerFactory();
        const imgElement = factory.setId('popupImg')
            .setVoidHtml()
            .setCSS(this.imgContainerCSS)
            .createImg();
        outerContainer.appendChild(imgElement);
        imgElement.src = this.getImgUrl(json);
        if ($(elem).hasClass("on")) {
            outerContainer.style.border = '5px solid rgb(255, 64, 96)';
            // $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            outerContainer.style.border = '5px solid rgb(34, 34, 34)';
            //$(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        let imgHeight = Number(json.body.height);
        let imgWidth = Number(json.body.width);
        if (imgHeight > window.innerHeight * 0.8 || imgWidth > window.innerWidth * 0.8) {
            const heightScale = imgHeight / (window.innerHeight * 0.8);
            const widthScale = imgWidth / (window.innerWidth * 0.8);
            if (heightScale > widthScale) {
                imgHeight = (imgHeight / heightScale);
                imgWidth = (imgWidth / heightScale);
            }
            else {
                imgHeight = (imgHeight / widthScale);
                imgWidth = (imgWidth / widthScale);
            }
        }
        // display container
        imgElement.style.width = `${imgWidth}px`;
        imgElement.style.height = `${imgHeight}px`;
        outerContainer.style.width = `${imgWidth}px`;
        outerContainer.style.height = `${imgHeight}px`;
        outerContainer.style.display = 'block';
        //set container
        const offset = this.getOffset(outerContainer);
        outerContainer.style.top = offset.top + 'px';
        outerContainer.style.left = offset.left + 'px';
    }
    getOffset(outerContainer) {
        const w_height = $(window).height();
        const w_width = $(window).width();
        const el_height = $(outerContainer).height();
        const el_width = $(outerContainer).width();
        const scroll_height = $(window).scrollTop();
        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;
        return { top: Math.round(position_h), left: Math.round(position_w) };
    }
    popupCaption(outerContainer, json) {
        const factory = new ContainerFactory_1.ContainerFactory();
        const captionId = 'captionContainer';
        this.deleteElementById(captionId);
        const descriptionString = json.body.description;
        const descriptionElem = factory.setId('popup-caption-text')
            .setInnerHtml(descriptionString)
            .createDiv();
        const date = new Date(json.body.createDate);
        const dateString = `upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        const dateElem = factory.setId('popup-caption-date').setInnerHtml(dateString).createDiv();
        const likeString = `${this.likeIcon} ${json.body.likeCount} `;
        const likeElem = factory.setId('popup-caption-like').setInnerHtml(likeString).createSpan();
        const bookmarkString = `${this.bookmarkIcon} ${json.body.bookmarkCount} `;
        const bookmarkElem = factory.setId('popup-caption-bookmark').setInnerHtml(bookmarkString).createSpan();
        const viewString = `${this.viewIcon}${json.body.viewCount}`;
        const viewElem = factory.setId('popup-caption-view').setInnerHtml(viewString).createSpan();
        const infoElem = factory
            .setId('popup-caption-infomation')
            .setVoidHtml()
            .setCSS(this.infoContainerCSS)
            .createDiv();
        infoElem.appendChild(dateElem);
        infoElem.appendChild(likeElem);
        infoElem.appendChild(bookmarkElem);
        infoElem.appendChild(viewElem);
        const captionContainer = factory.setId(captionId)
            .setCSS(this.captionContainerCSS(outerContainer))
            .setVoidHtml()
            .createDiv();
        captionContainer.appendChild(descriptionElem);
        captionContainer.appendChild(infoElem);
        outerContainer.parentNode.insertBefore(captionContainer, outerContainer);
        const y = parseInt(outerContainer.style.top) - captionContainer.getBoundingClientRect().height;
        captionContainer.style.top = y + 'px';
        captionContainer.style.left = outerContainer.style.left;
    }
    deleteElementById(id) {
        const elem = document.getElementById(id);
        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }
    }
    popupManga(outerContainer, hrefElem, json, count) {
        const factory = new ContainerFactory_1.ContainerFactory();
        const mangaContainer = factory.setId('mangaContainer')
            .setVoidHtml()
            .setCSS(this.mangaContainerCSS)
            .createDiv();
        //this.getMangaContainer(document)
        outerContainer.appendChild(mangaContainer);
        const manga = new manga_1.Manga();
        // outerContainer.children.forEach(child =>child.style.display = 'none')
        for (const child of outerContainer.children) {
            child.style.display = 'none';
        }
        if ($(hrefElem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        this.imgsArrInit(outerContainer, mangaContainer, manga, this.getImgUrl(json), count);
        outerContainer.style.width = outerContainer.style.maxWidth;
        outerContainer.style.height = outerContainer.style.maxHeight;
        const offset = this.getOffset(outerContainer);
        outerContainer.style.top = `${offset.top}px`;
        outerContainer.style.left = `${offset.left}px`;
        mangaContainer.style.display = 'block';
        outerContainer.style.display = 'block';
        this.setScrool(outerContainer, mangaContainer, manga);
    }
    getImgUrl(json) {
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return json.body.urls.regular.replace(/\/...x...\//, '/600x600/');
    }
    imgsArrInit(outerContainer, mangaContainer, manga, primaryLink, pageNum) {
        manga.pageNum = pageNum;
        for (let i = 0; i < pageNum; i++) {
            manga.imgsArr.push(document.createElement('img'));
            mangaContainer.appendChild(manga.imgsArr[i]);
            manga.imgsArr[i].src = primaryLink.replace('p0', 'p' + i);
            manga.imgsArr[i].style.maxWidth = outerContainer.style.maxWidth;
            manga.imgsArr[i].style.maxHeight = outerContainer.style.maxHeight;
            manga.imgsArr[i].style.height = outerContainer.style.maxHeight;
            manga.imgsArr[i].style.width = 'auto';
        }
    }
    setScrool(outerContainer, mangaContainer, manga) {
        mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (outerContainer.getBoundingClientRect().top < 0)) {
                outerContainer.scrollIntoView({ block: "start", behavior: "smooth" }); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (outerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                outerContainer.scrollIntoView({ block: "end", behavior: "smooth" }); //aligning to bottom screen side on scrollDown if needed
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
    isManga(json) {
        return json.body.illustType === 1 || (json.body.pageCount && Number(json.body.pageCount) > 1);
    }
}
exports.PopupUtil = PopupUtil;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(3);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __webpack_require__(7);
const util_1 = __webpack_require__(3);
const setting_1 = __webpack_require__(1);
'use strict';
/*
設定画面やsave & load 機能を実装予定
 */
/*
* main function
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
    const onloadExecute = util.onloadExecute(setting, page);
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