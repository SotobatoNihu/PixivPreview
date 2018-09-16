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
// @version         0.0.3.20180908
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
    prop[prop["changeLayout"] = 0] = "changeLayout";
    prop[prop["popup_typeA"] = 1] = "popup_typeA";
    prop[prop["popup_typeB"] = 2] = "popup_typeB";
    prop[prop["openComment"] = 3] = "openComment";
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = __webpack_require__(0);
const popupUtil_1 = __webpack_require__(4);
const manga_1 = __webpack_require__(1);
class Util {
    static changeLayout() {
        const figure = document.getElementsByTagName("figure");
        $('figure').before($('figcaption'));
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
    static getAllowedFuncList(type) {
        switch (type) {
            case enum_1.pagetype.top:
                return [enum_1.prop.popup_typeB];
            case enum_1.pagetype.bookmark_new_illust:
                return [enum_1.prop.popup_typeA];
            case enum_1.pagetype.discovery:
                return [enum_1.prop.popup_typeA];
            case enum_1.pagetype.member_illust:
                return [enum_1.prop.popup_typeB, enum_1.prop.changeLayout, enum_1.prop.openComment];
            case enum_1.pagetype.member:
                return [enum_1.prop.popup_typeB];
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
    openComment() {
        const elem = document.getElementsByTagName("article")[0];
        const comments = elem.querySelectorAll('a[aria-expanded="false"]');
        Object.keys(comments).forEach((i) => {
            comments[i].click();
        });
        var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
            const comments = elem.querySelectorAll('a[aria-expanded="false"]');
            Object.keys(comments).forEach((i) => {
                comments[i].click();
            });
        });
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
    }
    setPopup(page, setting) {
        const popupUtil = new popupUtil_1.PopupUtil();
        const captionContainer = popupUtil.getCaptionContainer();
        const outerContainer = popupUtil.getOuterContainer(document);
        document.body.appendChild(captionContainer);
        document.body.appendChild(outerContainer);
        //add action
        if (page.isEnable(enum_1.prop.popup_typeA)) {
            // click single art in the typeA page
            $('body').on('mouseenter', popupUtil.getImgeSelector(enum_1.prop.popup_typeA), function () {
                let elem = this;
                $(this).attr('onclick', 'console.log();return false;');
                $(this).on('click', function () {
                    popupUtil.popupImg(page, outerContainer, elem);
                    const href = $(this).parent().parent().find('a').attr('href');
                    const imageID = href.substring(href.indexOf('illust_id=') + 'illust_id='.length);
                    console.log("id:" + imageID);
                    popupUtil.popupCaption(outerContainer, imageID);
                });
            });
            //click manga in the typeA page
            $('body').on('mouseenter', popupUtil.getMangaSelector(enum_1.prop.popup_typeA), function () {
                if (this.parentNode.firstChild.childNodes.length) {
                    $(this).attr('onclick', 'console.log();return false;');
                    var elem1 = this;
                    var elem2 = this.parentNode.firstChild.firstChild.textContent;
                    $(this).on('click', function () {
                        popupUtil.popupManga(outerContainer, elem1, elem2);
                        const href = $(this).parent().parent().find('a').attr('href');
                        // @ts-ignore
                        const imageID = href.slice(href.substring('illust_id=') + 'illust_id='.length);
                        console.log("id:" + imageID);
                        popupUtil.popupCaption(outerContainer, imageID);
                    });
                }
            });
        }
        else if (page.isEnable(enum_1.prop.popup_typeB)) {
            $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () {
                if (this.childNodes.length == 1 && this.childNodes[0].nodeName == "DIV") {
                    //single art
                    var elem = this.firstChild.firstChild;
                    var parent = this;
                    $(this).attr('onclick', 'console.log();return false;');
                    $(this).on('click', function () {
                        popupUtil.popupImg(page, outerContainer, elem);
                        // @ts-ignore
                        const imageID = elem.getAttribute('data-id');
                        popupUtil.popupCaption(outerContainer, imageID);
                    });
                }
                else if (this.children[1] && this.children[1].className == 'page-count') {
                    //manga
                    const manga = new manga_1.Manga();
                    var elem1 = this.firstChild.firstChild;
                    var elem2 = this.children[1].children[1].textContent;
                    $(this).attr('onclick', 'console.log();return false;');
                    $(this).on('click', function () {
                        popupUtil.popupManga(outerContainer, elem1, elem2);
                        var x = parseInt($(outerContainer).css('top'));
                        var y = parseInt($(outerContainer).css('left'));
                        // @ts-ignore
                        const imageID = elem1.getAttribute('data-id');
                        popupUtil.popupCaption(outerContainer, imageID);
                    });
                }
            });
        }
        const deleteAll = () => {
            const elem = document.getElementById('captionContainer');
            elem.innerText = null;
            elem.style.display = 'none';
            const children = outerContainer.children;
            for (const child of children) {
                child.style.display = 'none';
            }
            outerContainer.style.display = 'none';
            outerContainer.textContent = null;
            outerContainer.style.display = 'none';
            //return
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
}
exports.Util = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = __webpack_require__(0);
class Setting {
    constructor(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.changeLayout = (jsonData.changeLayout == null) ? true : jsonData.changeLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
        this.uiComponent = [enum_1.uiComponent.image, enum_1.uiComponent.manga, enum_1.uiComponent.caption];
    }
    set setData(jsonData) {
        this.changeLayout = (jsonData.changeLayout == null) ? true : jsonData.changeLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.popup = (jsonData.popup == null) ? true : jsonData.popup;
    }
}
exports.Setting = Setting;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = __webpack_require__(0);
const manga_1 = __webpack_require__(1);
class PopupUtil {
    constructor() {
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
        return imgContainer;
    }
    getImageElement() {
        let popupImg = document.createElement('img');
        popupImg.id = 'popupImg';
        return popupImg;
    }
    getMangaContainer(document) {
        let mangaContainer = document.createElement('div');
        mangaContainer.id = 'mangaContainer';
        mangaContainer.style.display = 'block';
        mangaContainer.style.zIndex = '1500';
        mangaContainer.style.backgroundColor = '#111';
        mangaContainer.style.overflowX = 'auto';
        mangaContainer.style.maxWidth = '1200px';
        mangaContainer.style.top = '0px';
        mangaContainer.style.left = '0px';
        mangaContainer.style.whiteSpace = 'nowrap';
        let mangaWidth = document.body.clientWidth - 80;
        mangaContainer.style.maxWidth = mangaWidth + 'px';
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
        outerContainer.style.maxWidth = '1200px';
        outerContainer.style.left = '0px';
        outerContainer.style.left = '0px';
        let mangaWidth = document.body.clientWidth - 80;
        outerContainer.style.maxWidth = mangaWidth + 'px';
        // uterContainer.style.marginLeft
        // uterContainer.style.marginTop
        return outerContainer;
    }
    getCaptionContainer() {
        let captionContainer = document.createElement('div');
        captionContainer.id = 'captionContainer';
        captionContainer = document.createElement('div');
        //captionContainer.style.position='absolute'
        captionContainer.style.whiteSpace = 'nowrap';
        captionContainer.style.display = 'block';
        captionContainer.style.zIndex = '1001';
        captionContainer.style.position = 'absolute';
        captionContainer.style.padding = '5px';
        captionContainer.style.maxWidth = '1200px';
        captionContainer.style.top = '0px';
        captionContainer.style.left = '0px';
        captionContainer.style.backgroundColor = '#FFF';
        return captionContainer;
    }
    getImgeSelector(popup_typeA) {
        return 'a[href*="member_illust.php?mode=medium&illust_id="] > div:only-child';
    }
    getMangaSelector(popup_typeA) {
        return 'a[href*="member_illust.php?mode=medium&illust_id="] > div:nth-child(2) ';
    }
    popupImg(page, outerContainer, elem) {
        const children = outerContainer.children;
        for (const child of children) {
            child.style.display = 'none';
        }
        outerContainer.textContent = null;
        const imgContainer = this.getImgContainer();
        outerContainer.appendChild(imgContainer);
        const imgElement = this.getImageElement();
        imgContainer.appendChild(imgElement);
        outerContainer.style.top = this.getOffsetRect(elem.parentNode.parentNode).top + 'px';
        imgContainer.style.top = outerContainer.style.top;
        imgElement.src = this.parseImgUrl(elem);
        const offset = this.getOffsetRect(elem.parentNode.parentNode);
        imgContainer.style.top = (this.getOffsetRect(elem.parentNode)).top + 'px';
        outerContainer.style.top = imgContainer.style.top; //+window.pageYOffset;
        let l = offset.left;
        let w = 600 * (((page.pageType === enum_1.pagetype.ranking) ? elem.clientWidth : elem.parentNode.parentNode.clientWidth) / page.siteImgMaxWidth) + 5;
        imgContainer.style.left = (document.body.clientWidth - l < w) ? document.body.clientWidth - w + 'px' : l + 'px';
        outerContainer.style.left = imgContainer.style.left;
        if ($(elem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        imgContainer.style.display = 'block';
        outerContainer.style.display = 'block';
    }
    popupCaption(outerContainer, imageID) {
        let tmpElem = this.getCaptionContainer();
        const id = 'captionContainer';
        let captionContainer;
        // if(document.getElementById(tmpElem.id)!=null){
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
        captionContainer.style.display = 'block';
        captionContainer.style.left = outerContainer.style.left;
        if (imageID === undefined || imageID.length === 0)
            return; //just in case
        const url = "https://www.pixiv.net/ajax/illust/" + imageID;
        console.log("url:" + url);
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            const date = new Date(json.body.createDate);
            const dateString = `<p><i>upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}</i></p>`;
            const infoString = `<p><i>like :${json.body.likeCount}, bookmark:${json.body.bookmarkCount}, view: ${json.body.viewCount}</i></p>`;
            captionContainer.innerHTML = json.body.description + dateString + infoString;
            const y = parseInt(outerContainer.style.top) - parseInt(captionContainer.getBoundingClientRect().height);
            captionContainer.style.top = y + 'px';
        });
    }
    popupManga(outerContainer, elem, count) {
        const mangaContainer = this.getMangaContainer(document);
        outerContainer.appendChild(mangaContainer);
        const manga = new manga_1.Manga();
        const children = outerContainer.children;
        for (const child of children) {
            child.style.display = 'none';
        }
        outerContainer.style.top = this.getOffsetRect(elem.parentNode.parentNode).top + 'px';
        mangaContainer.style.top = outerContainer.style.top;
        if ($(elem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        this.imgsArrInit(outerContainer, mangaContainer, manga, this.parseImgUrl(elem), +count);
        mangaContainer.style.display = 'block';
        outerContainer.style.display = 'block';
        this.setScrool(outerContainer, mangaContainer, manga);
    }
    parseImgUrl(elem) {
        let url = (elem.src) ? elem.src : elem.style.backgroundImage.slice(5, -2); //pixiv changes layout randomly
        url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return url;
    }
    getOffsetRect(elem) {
        // (1)
        let box = elem.getBoundingClientRect();
        // (2)
        let body = document.body;
        let docElem = document.documentElement;
        // (3)
        let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        // (4)
        let clientTop = docElem.clientTop || body.clientTop || 0;
        let clientLeft = docElem.clientLeft || body.clientLeft || 0;
        // (5)
        let top = box.top + scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    }
    imgsArrInit(outerContainer, mangaContainer, manga, primaryLink, l) {
        let margins = document.body.clientWidth - l * 600; //some blind frame adjusting
        if (margins > 0)
            outerContainer.style.left = margins / 2 - 10 + 'px';
        let currentImgId = this.getImgId(primaryLink);
        //---------------------------------------------------------------------------------
        if (currentImgId !== manga.getLastImgId()) {
            manga.imgsArr.forEach((item) => {
                item.src = '';
            });
            manga.lastImgId = currentImgId;
            for (let i = 0; i < l; i++) {
                if (!(!!manga.imgsArr[i])) //if [i] img element doesn't exist
                 {
                    manga.imgsArr[i] = document.createElement('img');
                    mangaContainer.appendChild(manga.imgsArr[i]);
                }
                ;
                manga.imgsArr[i].src = primaryLink.replace('p0', 'p' + i);
            }
        }
        //---------------------------------------------------------------------------------
    }
    getImgId(primaryLink) {
        return primaryLink.substring(primaryLink.lastIndexOf("/") + 1, primaryLink.indexOf("_"));
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
}
exports.PopupUtil = PopupUtil;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(2);
const enum_1 = __webpack_require__(0);
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const page_js_1 = __webpack_require__(5);
const enum_1 = __webpack_require__(0);
const util_js_1 = __webpack_require__(2);
const setting_js_1 = __webpack_require__(3);
'use strict';
/*
設定画面やsave & load 機能を実装予定
 */
const init = async () => {
    const default_setting = {
        changeLayout: true,
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
init().then(result => setting = new setting_js_1.Setting(result));
window.onload = () => {
    //set popup function
    console.log("popup set");
    if (setting.popup && page.isEnable(enum_1.prop.popup_typeA)) {
        util.setPopup(page, setting);
        console.log("popup  A is enable");
    }
    else if (setting.popup && page.isEnable(enum_1.prop.popup_typeB)) {
        util.setPopup(page, setting);
        console.log("popup  B is enable");
    }
    if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
        util.openComment();
        console.log("comment opend");
    }
    console.log("pagetype:" + page.pagetype.toString());
    if (util_js_1.Util.changeLayout && page.isEnable(enum_1.prop.changeLayout)) {
        util_js_1.Util.changeLayout();
        console.log("layout chainged");
    }
    //change layout and open comment
    const links = document.getElementsByTagName("a");
    for (const link of links) {
        link.addEventListener("click", () => {
            // $('a').on('click', () => {
            let page = new page_js_1.Page(document.URL);
            if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
                util.openComment();
                console.log("comment opend.");
            }
            console.log("pagetype:" + page.pagetype.toString());
            if (util_js_1.Util.changeLayout && page.isEnable(enum_1.prop.changeLayout)) {
                util_js_1.Util.changeLayout();
                console.log("layout chainged.");
            }
        });
    }
    // })
};


/***/ })
/******/ ]);
}
)();