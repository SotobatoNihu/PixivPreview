// ==UserScript==
// @name            Pixiv View Util
// @namespace       Pixiv View Util
// @description     change the layout of caption. open comments automatically. add popup tool.
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
// @version         0.2.4-20180929
// @homepageURL     https://github.com/SotobatoNihu/PixivViewUtil
// @license         MIT License
// @require         https://code.jquery.com/jquery-3.2.1.min.js
// @grant           GM.getValue
// @grant           GM.setValue
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
const popupUtil_1 = __webpack_require__(4);
const getImageIDfromHref = (hrefElement) => {
    //https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=70384088&page=0
    const pattern = /(.)+illust_id=([0-9]+)(&.+)?/;
    const matches = hrefElement.getAttribute('href').match(pattern);
    const idString = matches[2];
    return Number(idString);
};
class Util {
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
        const figure = document.getElementsByTagName("figure");
        $('figure').before($('figcaption'));
    }
    static changeMemberPageLayout() {
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
        // $('figure').before($('figcaption'));
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
        const captionContainer = popupUtil.getCaptionContainer();
        const outerContainer = popupUtil.getOuterContainer(document);
        document.body.appendChild(captionContainer);
        document.body.appendChild(outerContainer);
        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () {
            const thumb = $(this).find('.non-trim-thumb');
            const clickElem = thumb.length > 0 ? thumb[0] : this;
            $(this).attr('onclick', 'console.log();return false;');
            $(this).find('.non-trim-thumb').attr('onclick', 'console.log();return false;');
            const hrefElem = this;
            const url = this.getAttribute("href"); // .href //$(this).attr('href')
            const pattern = /(.)+illust_id=([0-9]+)(&.+)?/;
            const matches = url.match(pattern);
            const illustID = Number(matches[2]);
            // @ts-ignore
            $(clickElem).on('click', function (e) {
                fetch(`https://www.pixiv.net/ajax/illust/${illustID}`).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    const mouseX = e.pageX;
                    const mouseY = e.pageY;
                    if (!popupUtil.isManga(json)) {
                        popupUtil.popupImg(page, outerContainer, hrefElem, json);
                    }
                    else {
                        const pageNum = Util.getPageNum(json);
                        popupUtil.popupManga(outerContainer, hrefElem, json, Number(pageNum));
                    }
                    popupUtil.popupCaption(outerContainer, json);
                });
            });
        });
        const deleteAll = () => {
            const elem = document.getElementById('captionContainer');
            elem.innerText = null;
            elem.style.display = 'none';
            const children = outerContainer.children;
            for (const child of children) {
                child.style.display = 'none';
            }
            outerContainer.textContent = null;
            outerContainer.style.display = 'none';
        };
        outerContainer.onmouseleave = function () {
            if ($(captionContainer).find('a').length == 0) {
                deleteAll();
            }
            else {
                setTimeout(deleteAll(), 1000);
            }
        };
        captionContainer.onmouseleave = function () {
            captionContainer.innerText = null;
            captionContainer.style.display = 'none';
        };
        window.onresize = function () {
            outerContainer.style.maxWidth = document.body.clientWidth - 80;
        };
    }
    static getUserID(json) {
        // @ts-ignore
        return json.body.tags.authorId;
    }
    static getPageNum(json) {
        // @ts-ignore
        return Number(json.body.pageCount);
    }
}
exports.Util = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = __webpack_require__(0);
class Setting {
    constructor(jsonString) {
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
}
exports.Setting = Setting;


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const manga_1 = __webpack_require__(3);
const enum_1 = __webpack_require__(0);
class PopupUtil {
    constructor() {
        this.likeIcon = `<img src="https://s.pximg.net/www/js/spa/260127df5fe9ade778ec4be463deaf01.svg" width="12" height="12">`;
        this.bookmarkIcon = `<svg viewBox="0 0 12 12" width="12" height="12" class="css-1hamw6p e1rs6xf14"><path fill="currentColor" d="
        M9,0.75 C10.6568542,0.75 12,2.09314575 12,3.75 C12,6.68851315 10.0811423,9.22726429 6.24342696,11.3662534
        L6.24342863,11.3662564 C6.09210392,11.4505987 5.90790324,11.4505988 5.75657851,11.3662565
        C1.9188595,9.22726671 0,6.68851455 0,3.75 C1.1324993e-16,2.09314575 1.34314575,0.75 3,0.75
        C4.12649824,0.75 5.33911281,1.60202454 6,2.66822994 C6.66088719,1.60202454 7.87350176,0.75 9,0.75 Z"></path></svg>`;
        this.viewIcon = `<img src="https://s.pximg.net/www/js/spa/af74d092363c09fd06441a4ab04c9331.svg" width="14" height="12">`;
    }
    getImgContainer() {
        let imgContainer = document.createElement('div');
        imgContainer.id = 'imgContainer';
        //imgContainer.style.position='absolute'
        imgContainer.style.display = 'block';
        imgContainer.style.zIndex = '1000';
        imgContainer.style.backgroundColor = '#222';
        imgContainer.style.maxWidth = '1200px';
        imgContainer.style.whiteSpace = 'nowrap';
        imgContainer.style.padding = '5px';
        imgContainer.style.margin = '5px';
        imgContainer.style.maxWidth == window.innerHeight * 0.7 + 'px';
        imgContainer.style.width = 'auto';
        imgContainer.style.maxHeight = window.innerHeight * 0.7 + 'px';
        imgContainer.style.height = 'auto';
        return imgContainer;
    }
    getImageElement() {
        let popupImg = document.createElement('img');
        popupImg.id = 'popupImg';
        popupImg.style.maxWidth = window.innerWidth * 0.7 + 'px';
        popupImg.style.width = 'auto';
        popupImg.style.maxHeight = window.innerHeight * 0.7 + 'px';
        popupImg.style.height = 'auto';
        return popupImg;
    }
    getMangaContainer(document) {
        let mangaContainer = document.createElement('div');
        mangaContainer.id = 'mangaContainer';
        mangaContainer.style.display = 'block';
        mangaContainer.style.zIndex = '1500';
        mangaContainer.style.backgroundColor = '#111';
        mangaContainer.style.overflowX = 'auto';
        //mangaContainer.style.maxWidth = '1200px'
        mangaContainer.style.top = '0px';
        mangaContainer.style.left = '0px';
        mangaContainer.style.whiteSpace = 'nowrap';
        // mangaContainer.style.maxWidth = window.innerWidth * 0.5 + 'px';
        //mangaContainer.style.width = 'auto';
        //mangaContainer.style.maxHeight = window.innerHeight * 0.5 + 'px';
        //mangaContainer.style.height = 'auto';
        return mangaContainer;
    }
    getOuterContainer(document) {
        let tmp = document.createElement('div');
        document.body.appendChild(tmp);
        let outerContainer = document.createElement('div');
        outerContainer.id = 'outerContainer';
        tmp.appendChild(outerContainer);
        outerContainer.style.position = 'absolute';
        outerContainer.style.display = 'block';
        outerContainer.style.zIndex = '1000';
        outerContainer.style.padding = '5px';
        outerContainer.style.backgroundColor = '#111';
        outerContainer.style.left = '0px';
        outerContainer.style.left = '0px';
        outerContainer.style.maxWidth = window.innerWidth * 0.7 + 'px';
        outerContainer.style.maxHeight = window.innerHeight * 0.7 + 'px';
        // uterContainer.style.marginLeft
        // uterContainer.style.marginTop
        return outerContainer;
    }
    getCaptionContainer() {
        let captionContainer = document.createElement('div');
        captionContainer.id = 'captionContainer';
        captionContainer = document.createElement('div');
        captionContainer.style.whiteSpace = 'nowrap';
        captionContainer.style.display = 'block';
        captionContainer.style.zIndex = '1001';
        captionContainer.style.position = 'absolute';
        captionContainer.style.padding = '5px';
        captionContainer.style.maxWidth = window.innerWidth * 0.7 + 'px';
        captionContainer.style.top = '0px';
        captionContainer.style.left = '0px';
        captionContainer.style.backgroundColor = '#FFF';
        return captionContainer;
    }
    popupImg(page, outerContainer, elem, json) {
        const children = outerContainer.children;
        for (const child of children) {
            child.style.display = 'none';
        }
        outerContainer.textContent = null;
        const imgContainer = this.getImgContainer();
        outerContainer.appendChild(imgContainer);
        const imgElement = this.getImageElement();
        imgContainer.appendChild(imgElement);
        // @ts-ignore
        let imgHeight = Number(json.body.height);
        // @ts-ignore
        let imgWidth = Number(json.body.width);
        if (imgHeight > window.innerHeight * 0.6 || imgWidth > window.innerWidth * 0.6) {
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
        imgElement.src = this.getImgUrl(json);
        if ($(elem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        $(outerContainer).width(imgWidth + 'px');
        $(outerContainer).height(imgHeight + 'px');
        const offset = this.getOffset(outerContainer);
        outerContainer.style.top = offset.top + 'px';
        outerContainer.style.left = offset.left + 'px';
        imgContainer.style.display = 'block';
        outerContainer.style.display = 'block';
        //imgContainer.style.display = 'block';
        //outerContainer.style.display = 'block';
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
        // @ts-ignore
        //const likeIcon = await GM.getResourceUrl("likeIcon");
        let tmpElem = this.getCaptionContainer();
        const id = 'captionContainer';
        let captionContainer;
        if (document.getElementById(id) != null) {
            captionContainer = document.getElementById(id);
            captionContainer.innerText = null;
            captionContainer.style.display = 'none';
        }
        else {
            captionContainer = tmpElem;
            captionContainer.id = id;
            $(captionContainer).insertBefore(outerContainer);
        }
        captionContainer.style.left = outerContainer.style.left;
        let textElem = document.createElement('div');
        textElem.id = "popup-caption-text";
        // @ts-ignore
        textElem.innerHTML = json.body.description;
        captionContainer.appendChild(textElem);
        let dateElem = document.createElement('div');
        dateElem.id = "popup-caption-date";
        // @ts-ignore
        const date = new Date(json.body.createDate);
        dateElem.innerHTML = `upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        let infoElem = document.createElement('div');
        let likeElem = document.createElement('span');
        // @ts-ignore
        likeElem.innerHTML = `${this.likeIcon} ${json.body.likeCount} `;
        let bookmarkElem = document.createElement('span');
        // @ts-ignore
        bookmarkElem.innerHTML = `${this.bookmarkIcon} ${json.body.bookmarkCount} `;
        let viewElem = document.createElement('span');
        viewElem.id = "popup-caption-view";
        // @ts-ignore
        viewElem.innerHTML = `${this.viewIcon}${json.body.viewCount}`;
        infoElem.appendChild(dateElem);
        infoElem.appendChild(likeElem);
        infoElem.appendChild(bookmarkElem);
        infoElem.appendChild(viewElem);
        captionContainer.appendChild(infoElem);
        infoElem.style.fontSize = '12px';
        infoElem.style.color = 'rgb(173, 173, 173)';
        infoElem.style.lineHeight = '1';
        captionContainer.style.display = 'block';
        captionContainer.style.width = outerContainer.clientWidth + 'px';
        // @ts-ignore
        captionContainer.style.width = `${Number(json.body.width) / 2}px`;
        captionContainer.style.backgroundColor = 'white';
        captionContainer.style.wordWrap = 'break-word';
        captionContainer.style.wordBreak = 'break-all';
        captionContainer.style.whiteSpace = 'normal';
        const y = parseInt(outerContainer.style.top) - parseInt(captionContainer.getBoundingClientRect().height);
        captionContainer.style.top = y + 'px';
        //  });
    }
    popupManga(outerContainer, hrefElem, json, count) {
        const mangaContainer = this.getMangaContainer(document);
        outerContainer.appendChild(mangaContainer);
        const manga = new manga_1.Manga();
        const children = outerContainer.children;
        for (const child of children) {
            child.style.display = 'none';
        }
        if ($(hrefElem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        this.imgsArrInit(outerContainer, mangaContainer, manga, this.getImgUrl(json), count);
        $(outerContainer).width(outerContainer.style.maxWidth);
        $(outerContainer).height(outerContainer.style.maxHeight);
        const offset = this.getOffset(outerContainer);
        outerContainer.style.top = offset.top + 'px';
        outerContainer.style.left = offset.left + 'px';
        mangaContainer.style.display = 'block';
        outerContainer.style.display = 'block';
        this.setScrool(outerContainer, mangaContainer, manga);
    }
    getImgUrl(json) {
        // return json.body.urls.regular
        //// let url = $(elem).find('img').attr('src')
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        // @ts-ignore
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
    getImageIDfromString(str) {
        //example:https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=70384088&page=0
        const pattern = /(.)+illust_id=([0-9]+)(&.+)?/;
        const matches = str.match(pattern);
        const idString = matches[2];
        return Number(idString);
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
        // @ts-ignore
        return json.body.illustType === '1' || (json.body.pageCount && Number(json.body.pageCount) > 1);
    }
}
exports.PopupUtil = PopupUtil;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(1);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const page_js_1 = __webpack_require__(5);
const enum_1 = __webpack_require__(0);
const util_js_1 = __webpack_require__(1);
const setting_js_1 = __webpack_require__(2);
'use strict';
/*
設定画面やsave & load 機能を実装予定
 */
const init = async () => {
    const default_setting = {
        changeIllustPageLayout: true,
        changeMemberPageLayout: true,
        openComment: true,
        popup: true
    };
    // @ts-ignore
    return await GM.getValue("pixiv_viewutil_setting", JSON.stringify(default_setting));
};
/*
* main function
*/
let page = new page_js_1.Page(document.URL);
let util = new util_js_1.Util();
let setting;
init().then(result => {
    setting = new setting_js_1.Setting(result);
    //$(document).ready(function(){
    console.log("popup set");
    if (setting.popup && page.isEnable(enum_1.prop.popup_typeA)) {
        util.setPopup(page, setting);
        console.log("popup  A is enable");
    }
    else if (setting.popup && page.isEnable(enum_1.prop.popup_typeB)) {
        util.setPopup(page, setting);
        console.log("popup  B is enable");
    }
    if (setting.changeMemberPageLayout && page.isEnable(enum_1.prop.changeMemberPageLayout)) {
        const autherElem = document.getElementsByTagName('header')[0].nextElementSibling.children[0].children[0]; //$('header').next().children().children()
        document.getElementById("root").appendChild(autherElem);
        console.log("layout chainged");
    }
});
//})
window.onload = () => {
    console.log("pagetype:" + page.pagetype.toString());
    if (setting.changeIllustPageLayout && page.isEnable(enum_1.prop.changeIllustPageLayout)) {
        util_js_1.Util.changeIllustPageLayout();
        console.log("layout chainged");
    }
    if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
        util.openComment(page);
        console.log("comment opend");
    }
    if (setting.changeMemberPageLayout && page.pagetype === enum_1.pagetype.member_illust) {
        const autherElem = document.getElementsByTagName('header')[0].nextElementSibling.children[0].children[0]; //$('header').next().children().children()
        document.getElementById("root").appendChild(autherElem);
        console.log("layout chainged");
    }
    //change layout and open comment
    const links = document.getElementsByTagName("a");
    for (const link of links) {
        link.addEventListener("click", () => {
            let page = new page_js_1.Page(document.URL);
            console.log("pagetype:" + page.pagetype.toString());
            if (setting.changeIllustPageLayout && page.isEnable(enum_1.prop.changeIllustPageLayout)) {
                util_js_1.Util.changeIllustPageLayout();
                console.log("layout chainged.");
            }
            if (setting.changeMemberPageLayout && page.pagetype === enum_1.pagetype.member_illust) {
                const autherElem = document.getElementsByTagName('header')[0].nextElementSibling.children[0].children[0]; //$('header').next().children().children()
                document.getElementById("root").appendChild(autherElem);
            }
            if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
                util.openComment(page);
                console.log("comment opend.");
            }
        });
    }
    // })
};


/***/ })
/******/ ]);
}
)();