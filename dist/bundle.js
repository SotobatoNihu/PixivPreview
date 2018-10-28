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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *  divやspan,imgなどのHTML要素を作るファクトリ
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerFactory {
    constructor() {
        this.id = '';
        this.classname = '';
        this.innerHtml = '';
        this.innerText = '';
        this.cssText = '';
    }
    setId(idString) {
        this.id = idString;
        return this;
    }
    setClass(classname) {
        this.classname = classname;
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
        elem.className = this.classname;
        elem.innerHTML = this.innerHtml;
        elem.style.cssText = this.cssText;
        this.init();
        return elem;
    }
    createImg() {
        const elem = document.createElement('img');
        elem.id = this.id;
        elem.className = this.classname;
        elem.style.cssText = this.cssText;
        this.init();
        return elem;
    }
    createSpan() {
        const elem = document.createElement('span');
        elem.id = this.id;
        elem.className = this.classname;
        elem.innerHTML = this.innerHtml;
        elem.style.cssText = this.cssText;
        this.init();
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
    init() {
        this.id = '';
        this.classname = '';
        this.innerHtml = '';
        this.innerText = '';
        this.cssText = '';
    }
}
exports.ContainerFactory = ContainerFactory;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ArtWork {
    constructor() {
        this.imgScale = 0.7;
    }
    adjustScreenSize(scale) {
        const oldWidth = this.pixivJson.body.width;
        const oldHeight = this.pixivJson.body.height;
        let newWidth = oldWidth;
        let newHeight = oldHeight;
        if (oldHeight > window.innerHeight * scale || oldWidth > window.innerWidth * scale) {
            const heightScale = Number(window.innerHeight * scale) / oldHeight;
            const widthScale = Number(window.innerWidth * scale) / oldWidth;
            //縦が長い
            if (heightScale < widthScale) {
                newHeight *= heightScale;
                newWidth *= heightScale;
                this.imgScale = heightScale;
            }
            else {
                //横が長い
                newHeight *= widthScale;
                newWidth *= widthScale;
                this.imgScale = widthScale;
            }
        }
        const innerScreen = this.innerScreen;
        innerScreen.style.width = `${Math.round(newWidth)}px`;
        innerScreen.style.height = `${Math.round(newHeight)}px`;
    }
    popup(hasClass) {
    }
    /**
     * 大きさがあるHTMLelementを引数に、それが画面の中央に表示されるようになるelementのtop・leftの値を返す
     * @param elem
     */
    getOffset(elem) {
        const w_height = $(window).height();
        const w_width = $(window).width();
        const el_height = $(elem).height();
        const el_width = $(elem).width();
        const scroll_height = $(window).scrollTop();
        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;
        return { top: Math.round(position_h), left: Math.round(position_w) };
    }
    set setScreenContainer(elem) {
        this.innerScreen = elem;
    }
    set setClassName(className) {
        this.className = className;
    }
    getClassName() {
        return this.className;
    }
    set setImgScale(scale) {
        this.imgScale = scale;
    }
    getInnerScreen() {
        return this.innerScreen;
    }
}
exports.ArtWork = ArtWork;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = __webpack_require__(4);
/**
 *　機能の有効/無効等の設定内容
 *
 */
class Setting {
    constructor() {
        this.changeIllustPageLayout = true;
        this.changeMemberPageLayout = true;
        this.openComment = true;
        this.usePopup = true;
        this.popupCaption = true;
        this.popupComment = true;
        this.popupScale = 0.7;
        this.uiComponent = [Enum_1.uiComponent.image, Enum_1.uiComponent.manga, Enum_1.uiComponent.ugoira, Enum_1.uiComponent.caption];
    }
    async init() {
        // @ts-ignore
        await GM.getValue("pixiv_viewutil_setting").then(jsonString => {
            if (jsonString !== undefined) {
                const jsonData = JSON.parse(jsonString);
                this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
                this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
                this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
                this.usePopup = (jsonData.usePopup == null) ? true : jsonData.usePopup;
                this.popupCaption = (jsonData.popupCaption == null) ? true : jsonData.popupCaption;
                this.popupComment = (jsonData.popupComment == null) ? true : jsonData.popupComment;
                this.popupScale = (jsonData.popupScale == null) ? 0.7 : jsonData.popupScale;
            }
        });
    }
    set setStringData(jsonString) {
        const jsonData = JSON.parse(jsonString);
        this.setData(jsonData);
    }
    set setData(jsonData) {
        this.changeIllustPageLayout = (jsonData.changeIllustPageLayout == null) ? true : jsonData.changeIllustPageLayout;
        this.changeMemberPageLayout = (jsonData.changeMemberPageLayout == null) ? true : jsonData.changeMemberPageLayout;
        this.openComment = (jsonData.openComment == null) ? true : jsonData.openComment;
        this.usePopup = (jsonData.usePopup == null) ? true : jsonData.usePopup;
        this.popupCaption = (jsonData.popupCaption == null) ? true : jsonData.popupCaption;
        this.popupComment = (jsonData.popupComment == null) ? true : jsonData.popupComment;
        this.popupScale = (jsonData.usePopup == null) ? 0.7 : jsonData.popupScale;
    }
    get getJsonString() {
        const obj = {
            changeIllustPageLayout: this.changeIllustPageLayout,
            changeMemberPageLayout: this.changeMemberPageLayout,
            openComment: this.openComment,
            usePopup: this.usePopup,
            popupCaption: this.popupCaption,
            popupComment: this.popupComment,
            popupScale: this.popupScale,
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = __webpack_require__(4);
const Setting_1 = __webpack_require__(3);
const ContainerFactory_1 = __webpack_require__(0);
const jsonInterface_1 = __webpack_require__(2);
const PopupScreen_1 = __webpack_require__(14);
/***
 * 各種ユーティリティ関数
 * ポップアップ機能に関するユーティリティ関数軍が長くなったため
 * popupUtilと外出しにしている
 */
class Util {
    constructor() {
        //private utilIcon: string = 'pixiv-view-util-gear'
        this.settingIconID = 'pixiv-view-util-gear';
        //あとで各要素やドキュメントに挿入するCSS文字列
        this._iconElem = null;
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
     * 設定ダイアログを用意する
     */
    async setConfigDialog() {
        const iconID = this.settingIconID;
        const iconElem = document.getElementById(this.settingIconID);
        if (iconElem === null) {
            await this.setIconElem(iconID);
            await this.setModal(iconID);
        }
    }
    /**
     * 最初に実行する
     * 今いるページのタイプと、設定内容に応じて、レイアウトの修正やポップアップの用意を行う
     * トップ画面の場合は設定ダイアログも用意する
     * @param setting
     * @param page
     */
    async initExecute(setting, page) {
        if (page.pagetype == Enum_1.pagetype.top && document.getElementById(this.settingIconID) === null) {
            this.setConfigDialog();
        }
        if (setting.usePopup && (page.isEnable(Enum_1.prop.popup_typeA)) || page.isEnable(Enum_1.prop.popup_typeB)) {
            this.setPopup(page, setting);
            /*
            const factory = new ContainerFactory()
            const outerContainer: HTMLElement = factory
                .setId(this.outerContainerID)
                .setClass(Util.popupClass)
                .setCSS(this.outerContainerCSS)
                .createDiv()
            this.setPopup(outerContainer, page, setting);
            console.log("set popup");
            */
        }
        //else {
        /*
        const outerContainer = document.getElementById(Util.outerContainerID)
        if (outerContainer) {
            outerContainer.style.display = 'none'
        }
        */
        // }
    }
    /**
     * 画面読み込み完了時に行うこと。initExecuteと同様
     * @param setting
     * @param page
     */
    onloadExecute(setting, page) {
        if (page.pagetype === Enum_1.pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigDialog();
        }
        if (setting.changeIllustPageLayout && page.isEnable(Enum_1.prop.changeIllustPageLayout)) {
            Util.changeIllustPageLayout();
            console.log("layout chainged");
        }
        if (setting.openComment && page.isEnable(Enum_1.prop.openComment)) {
            this.openComment(page);
            console.log("comment opend");
        }
        if (setting.changeMemberPageLayout && (page.pagetype === Enum_1.pagetype.member || page.pagetype === Enum_1.pagetype.member_illust)) {
            this.changeMemberPageLayout();
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
            return Enum_1.pagetype.bookmark_new_illust;
        if (url.match('https://www.pixiv.net/discovery?'))
            return Enum_1.pagetype.discovery;
        if (url.match('https://www.pixiv.net/member_illust.php?'))
            return Enum_1.pagetype.member_illust;
        if (url.match('https://www.pixiv.net/member.php?'))
            return Enum_1.pagetype.member;
        if (url.match('https://www.pixiv.net/bookmark_detail.php?'))
            return Enum_1.pagetype.bookmark_detail;
        if (url.match('https://www.pixiv.net/bookmark_add.php?'))
            return Enum_1.pagetype.bookmark_add;
        if (url.match('https://www.pixiv.net/ranking.php?'))
            return Enum_1.pagetype.ranking;
        if (url.match(/https:\/\/www\.pixiv\.net\/bookmark\.php\?id/))
            return Enum_1.pagetype.bookmark_id;
        if (url.match('https://www.pixiv.net/search.php'))
            return Enum_1.pagetype.search;
        if (url.match('https://www.pixiv.net/bookmark.php?'))
            return Enum_1.pagetype.bookmark;
        if (url.match('https://www.pixiv.net/'))
            return Enum_1.pagetype.top;
        else
            return Enum_1.pagetype.other;
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
            case Enum_1.pagetype.top:
                return [Enum_1.prop.popup_typeB];
            case Enum_1.pagetype.bookmark_new_illust:
                return [Enum_1.prop.popup_typeA];
            case Enum_1.pagetype.discovery:
                return [Enum_1.prop.popup_typeA];
            case Enum_1.pagetype.member_illust:
                return [Enum_1.prop.popup_typeB, Enum_1.prop.changeIllustPageLayout, Enum_1.prop.openComment];
            case Enum_1.pagetype.member:
                return [Enum_1.prop.popup_typeB, Enum_1.prop.changeMemberPageLayout];
            case Enum_1.pagetype.bookmark_detail:
                return [Enum_1.prop.popup_typeB];
            case Enum_1.pagetype.bookmark_add:
                return [Enum_1.prop.popup_typeB];
            case Enum_1.pagetype.bookmark_id:
                return [Enum_1.prop.popup_typeB];
            case Enum_1.pagetype.search:
                return [Enum_1.prop.popup_typeA];
            case Enum_1.pagetype.ranking:
                return [Enum_1.prop.popup_typeB];
            case Enum_1.pagetype.bookmark:
                return [Enum_1.prop.popup_typeB];
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
    //setPopup(outerContainer: HTMLElement, page: Page, setting: Setting): void {
    setPopup(page, setting) {
        const popupScreen = new PopupScreen_1.PopupScreen(page, setting);
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
            const url = this.getAttribute('href');
            //イラストIDを取得
            const matches = url.match(/(.)+illust_id=([0-9]+)(&.+)?/);
            const illustID = Number(matches[2]);
            //ポップアップを実行
            $(clickElem).on('click', async function (e) {
                //イラストIDを元にjsonを入手
                await fetch(`https://www.pixiv.net/ajax/illust/${illustID}`, {
                    method: 'GET',
                    mode: 'cors',
                    keepalive: true
                }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(async function (json) {
                    const pixivJson = new jsonInterface_1.PixivJson(json);
                    popupScreen.setPixivJson(pixivJson);
                    popupScreen.popupArtwork($(hrefElem).hasClass("on"));
                    if (setting.popupComment) {
                        popupScreen.popupComment();
                    }
                    if (setting.popupCaption) {
                        popupScreen.popupCaption();
                    }
                    if (popupScreen.isUgoira()) {
                        //うごイラのメタ情報のJSONを入手
                        await fetch(`https://www.pixiv.net/ajax/illust/${pixivJson.body.illustId}/ugoira_meta`)
                            .then(function (response) {
                            return response.json();
                        }).then(async (metajson) => {
                            await popupScreen.popupUgoira(new jsonInterface_1.PixivJson(metajson));
                        });
                    }
                }).then(() => {
                    popupScreen.adjustSize();
                    popupScreen.adjustOffset();
                    popupScreen.addMouseMove();
                });
                /*
               .then(()=>popupScreen.adjustOffset())
               .then(()=>popupScreen.addMouseMove())
          () => {
                   popupScreen.relocate()
                   popupScreen.adjustSize()
                   popupScreen.addMouseMove()
                   popupScreen.adjustOffset()
                   }
           */
            });
        });
    }
    /*
    adjustOffset(elem) {
        const offset = Util.getOffset(elem)
        elem.style.left = `${offset.left}px`
        elem.style.top = `${offset.top}px`
    }
    */
    /**
     * ダイアログ（モーダル）をセットする
     * @param iconID
     */
    setModal(iconID) {
        const setting = new Setting_1.Setting;
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
        <input type="radio"  name='pixivutil-setting1' id="pixivutil-setting1-no" value="0"  checked  />
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
    <div id="pixiv-set-MemberPageLayout">
     Modify the author page's layout
        <input type="radio"  name='pixivutil-setting2' id="pixivutil-setting2-yes" value="1"  />
        <label for="dummy_1" data-label="ON">ON</label>
        <input type="radio"  name='pixivutil-setting2' id="pixivutil-setting2-no" value="0" checked   />
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
    <div id="pixiv-set-Popup">
     Use popup function
        <input type="radio"  name='pixivutil-setting3' id="pixivutil-setting3-yes" value="1" />
        <label for="dummy_1" data-label="ON">ON</label>
        <input type="radio"  name='pixivutil-setting3' id="pixivutil-setting3-no" value="0"  checked   />
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
    <div id="pixiv-set-PopupCaption">
     Popup caption
        <input type="radio"  name='pixivutil-setting4' id="pixivutil-setting4-yes" value="1"/>
        <label for="dummy_1" data-label="ON">ON</label>
        <input type="radio"  name='pixivutil-setting4' id="pixivutil-setting4-no" value="0" checked  />
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
        <div id="pixiv-set-PopupComment">
     Popup Comment
        <input type="radio"  name='pixivutil-setting5' id="pixivutil-setting5-yes" value="1"/>
        <label for="dummy_1" data-label="ON">ON</label>
        <input type="radio"  name='pixivutil-setting5' id="pixivutil-setting5-no" value="0" checked  />
        <label for="dummy_0" data-label="OFF">OFF</label>
    </div>
    <div >
    Popup size (min <-> max)
      <input type="range" value="0.7" min="0.3" max="1.2" step="0.1" id="pixiv-set-Scale" />
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
        const elem4 = document.getElementsByName('pixivutil-setting4')[0];
        const elem5 = document.getElementsByName('pixivutil-setting5')[0];
        const scale = document.getElementById('pixiv-set-Scale');
        setting.init().then(() => {
            // @ts-ignore
            if (setting.changeIllustPageLayout && !elem1.checked)
                elem1.checked = true;
            // @ts-ignore
            if (setting.changeMemberPageLayout && !elem2.checked)
                elem2.checked = true;
            // @ts-ignore
            if (setting.usePopup && !elem3.checked)
                elem3.checked = true;
            // @ts-ignore
            if (setting.popupCaption && !elem4.checked)
                elem4.checked = true;
            // @ts-ignore
            if (setting.popupComment && !elem5.checked)
                elem5.checked = true;
            // @ts-ignore
            scale.value = String(setting.popupScale);
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
            setting.usePopup = elem3.checked;
            // @ts-ignore
            setting.popupCaption = elem4.checked;
            // @ts-ignore
            setting.popupComment = elem5.checked;
            // @ts-ignore
            setting.popupScale = scale.value;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = __webpack_require__(0);
class Screen {
    constructor(className, scale) {
        this.screenContinerID = 'popup-screen-container';
        this.screenContainer = new ContainerFactory_1.ContainerFactory()
            .setId(this.screenContinerID)
            .setClass(className)
            .setCSS(this.screenContainerCSS(scale))
            .createDiv();
    }
    screenContainerCSS(scale) {
        return `
        border: 5px solid black;
        background-color:#111;
        position:relative;
        width:auto;
        height:auto;
        float:left;
        max-width:${window.innerWidth}px;
        max-height:${window.innerHeight}px;
        `;
    }
    getContainer() {
        return this.screenContainer;
    }
    resetContainer() {
        this.screenContainer = document.getElementById(this.screenContinerID);
    }
}
exports.Screen = Screen;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = __webpack_require__(0);
class CommentClass {
    constructor(json) {
        this.commentContainerCSS = `
      background:#EEEEEE;
      margin: 5px;
    `;
        this.emoji = {
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
        };
        Object.assign(this, json);
    }
    toElem() {
        const commentbox = new ContainerFactory_1.ContainerFactory()
            .setCSS(this.commentContainerCSS)
            .createDiv();
        const mainComment = new ContainerFactory_1.ContainerFactory().createDiv();
        mainComment.appendChild(this.getMainComment());
        commentbox.appendChild(mainComment);
        commentbox.appendChild(this.getCommentInfo());
        return commentbox;
    }
    getMainComment() {
        const elem = document.createElement('div');
        if (this.stampId) {
            elem.style.backgroundImage = `url("https://s.pximg.net/common/images/stamp/generated-stamps/${this.stampId}_s.jpg?20180605")`;
            elem.style.width = '48px';
            elem.style.height = '48px';
            elem.style.backgroundRepeat = 'no-repeat';
            elem.style.backgroundSize = 'cover';
            elem.style.borderRadius = '2px';
            return elem;
        }
        else {
            elem.innerHTML = this.getEmoji(this.comment);
        }
        return elem;
    }
    getCommentInfo() {
        const elem = document.createElement('div');
        elem.innerHTML = `${this.userName}</br> ${this.commentDate}`;
        elem.style.fontSize = 'xx-small';
        elem.style.textAlign = 'left';
        elem.style.color = '#999999';
        return elem;
    }
    getEmoji(comment) {
        const emoji = this.emoji;
        if (comment.includes(')')) {
            let replaceComment = comment;
            Object.keys(emoji).forEach(function (key) {
                replaceComment = replaceComment.replace(key, `<span style="width: 12px; height: 12px; display: inline-block; background-image: url('https://s.pximg.net/common/images/emoji/${emoji[key]}.png'); background-size: contain;"></span>`);
            });
            return replaceComment;
        }
        else {
            return comment;
        }
    }
}
exports.CommentClass = CommentClass;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonInterface_1 = __webpack_require__(2);
const Comment_1 = __webpack_require__(7);
const ContainerFactory_1 = __webpack_require__(0);
class CommentList {
    constructor(className) {
        /*
        const factory = new ContainerFactory()

        this.commentListContainer = factory.setId(this.commentListContainerID)
            .setClass(this.className)
            .setCSS(this.commentListContainerCSS)
            .createDiv()
            */
        this.commentOffset = 0;
        this.commentLimit = 25;
        this.MAXWIDTH = 200;
        this.commentListContainerID = 'popup-commentlist-container';
        this.commentListContainerCSS = `
        white-space:pre-wrap;
        z-index:10001;
        width:auto;
        height:auto;
        display:none;
        overflow-y:scroll;
        background-color:white;
        border: 1px solid #000;
        max-width:${this.MAXWIDTH}px;
        max-height:${window.innerHeight}px;
        `;
        this.commentListContainer = new ContainerFactory_1.ContainerFactory()
            .setId(this.commentListContainerID)
            .setClass(className)
            .setCSS(this.commentListContainerCSS)
            .createDiv();
    }
    async init() {
        this.commentOffset = 0;
        this.commentListContainer.innerHTML = '';
        const commentList = [];
        // const commentListContainer=this.commentListContainer
        if (this.commentNum !== 0) {
            const url = `https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=${this.pixivJson.body.illustId}&offset=${this.commentOffset}&limit=${this.commentLimit}`;
            await fetch(url, {
                method: 'GET',
                mode: 'cors',
                keepalive: true
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            }).then(async function (json) {
                const commentJson = new jsonInterface_1.PixivJson(json);
                const comments = commentJson.body.comments;
                for (let commentJson of comments) {
                    const comment = new Comment_1.CommentClass(commentJson);
                    commentList.push(comment);
                }
            });
        }
        else {
            // commentList.push( new CommentClass())
        }
        this.commentList = commentList;
    }
    //async setScreenContainer(innerContainer: HTMLElement) {
    //    this.innerContainer = innerContainer
    //}
    setClassName(popupClass) {
        this.className = popupClass;
    }
    popup() {
        const commentListContainer = this.commentListContainer;
        const commentList = this.commentList;
        commentListContainer.innerHTML = '';
        commentListContainer.style.display = 'inline-block';
        commentListContainer.style.width = '100px';
        for (const comment of commentList) {
            commentListContainer.appendChild(comment.toElem());
        }
        const commentNum = this.commentNum;
        let offset = this.commentOffset;
        commentListContainer.onscroll = () => {
            //既存のスクロール量
            let scrollSize = commentListContainer.scrollTop + commentListContainer.clientHeight;
            //スクロールできる最大量
            let maxHeight = commentListContainer.scrollHeight;
            if (this.commentOffset < commentNum && scrollSize / maxHeight >= 0.8) {
                this.commentList = commentList;
                this.commentOffset += this.commentLimit;
                console.log(`comment reload ${this.commentOffset}`);
                this.appendComment();
            }
        };
    }
    async appendComment() {
        const commentListContainer = this.commentListContainer;
        const url = `https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=${this.pixivJson.body.illustId}&offset=${this.commentOffset}&limit=${this.commentLimit}`;
        await fetch(url, {
            method: 'GET',
            mode: 'cors',
            keepalive: true
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
        }).then(async function (json) {
            const commentJson = new jsonInterface_1.PixivJson(json);
            const comments = commentJson.body.comments;
            for (let commentJson of comments) {
                const comment = new Comment_1.CommentClass(commentJson);
                commentListContainer.appendChild(comment.toElem());
            }
        });
    }
    adjustSize(screen) {
        this.commentListContainer.style.height = `${screen.offsetHeight}px`;
    }
    /*
    private async setCommentList() {
        //const elemList:HTMLElement[]=[]
        if (this.commentNum !== 0) {
            const url = `https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=${this.pixivJson.body.illustId}&offset=0&limit=10`
            await fetch(url,
                {
                    method: 'GET',
                    mode: 'cors',
                    keepalive: true
                }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            }).then(async function (json) {
                const commentJson = new PixivJson(json)
                const comments = commentJson.body.comments
                for(let commentJson of comments){
                    const comment = new Comment()
                    comment.setComment(commentJson.comment)
                    this.commentElemList.push(comment.toElem())
                }
            })
        }else{
            this.commentElemList.push(new Comment().toElem())
        }
       // this.commentElemList=elemList
    }
    */
    setCommentListContainer(commentListContainer) {
        this.commentListContainer.innerText = '';
        this.commentListContainer = commentListContainer;
    }
    setJson(pixivJson) {
        this.pixivJson = pixivJson;
        this.commentNum = pixivJson.body.commentCount;
    }
    setOuterContainer(outerContainer) {
        this.outerContainer = outerContainer;
    }
    getContainer() {
        return this.commentListContainer;
    }
    resetContainer() {
        this.commentListContainer = document.getElementById(this.commentListContainerID);
    }
}
exports.CommentList = CommentList;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = __webpack_require__(0);
class Caption {
    constructor(className) {
        this.captionContainerID = 'popup-caption-container';
        this.captionDescriptionID = 'popup-caption-text';
        this.captionTagID = 'popup-caption-tag';
        this.captionDateID = 'popup-caption-date';
        this.captionLikeID = 'popup-caption-like';
        this.captionBookmarkID = 'popup-caption-bookmark';
        this.captionViewID = 'popup-caption-view';
        this.captionInfoID = 'popup-caption-infomation';
        this.likeIcon = `<img src="https://s.pximg.net/www/js/spa/260127df5fe9ade778ec4be463deaf01.svg" width="12" height="12">`;
        this.bookmarkIcon = `<svg viewBox="0 0 12 12" width="12" height="12" class="css-1hamw6p e1rs6xf14"><path fill="currentColor" d="
        M9,0.75 C10.6568542,0.75 12,2.09314575 12,3.75 C12,6.68851315 10.0811423,9.22726429 6.24342696,11.3662534
        L6.24342863,11.3662564 C6.09210392,11.4505987 5.90790324,11.4505988 5.75657851,11.3662565
        C1.9188595,9.22726671 0,6.68851455 0,3.75 C1.1324993e-16,2.09314575 1.34314575,0.75 3,0.75
        C4.12649824,0.75 5.33911281,1.60202454 6,2.66822994 C6.66088719,1.60202454 7.87350176,0.75 9,0.75 Z"></path></svg>`;
        this.viewIcon = `<img src="https://s.pximg.net/www/js/spa/af74d092363c09fd06441a4ab04c9331.svg" width="14" height="12">`;
        this.captionContainerCSS = `
        white-space:pre-wrap;
        z-index:10001;
        position:relative;
        width:auto;
        height:auto;
        border: 1px solid #000;
        max-width:${window.innerWidth}px;
        max-height:${window.innerHeight}px;
        background-color:white;
        word-wrap:break-word;
       word-break:break-all;
        
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
        this.descriptionContainerCSS = `font-size: normal; 
          width: auto; 
          height:auto;
          overflow-y:scroll;`;
        this.infoContainerCSS = `
        background-color:white;
        font-size:xx-small;
        width: auto;
        color:#999999; 
        line-height=1;`;
        this.captionContainer = new ContainerFactory_1.ContainerFactory()
            .setId(this.captionContainerID)
            .setClass(className)
            .setCSS(this.captionContainerCSS)
            .createDiv();
    }
    /**
     * キャプションをポップアップする
     * テキスト、タグ、その他情報(ブックマーク等)を,それぞれelementを用意しコンテナとして箱詰めし、innerContainerに付与する
     * @param innerContainer
     * @param json
     */
    popup() {
        const captionContainer = this.captionContainer;
        //const innerContainer = this.innerContainer
        const json = this.pixivJson;
        //既存のキャプションコンテナがあれば破棄
        captionContainer.innerText = '';
        //テキストコンテナを作成
        const factory = new ContainerFactory_1.ContainerFactory();
        const descriptionElem = factory.setId(this.captionDescriptionID)
            .setClass(this.className)
            .setCSS(this.descriptionContainerCSS)
            .setInnerHtml(json.body.description)
            .createDiv();
        const tagElem = factory.setId(this.captionTagID)
            .setClass(this.className)
            .createDiv();
        tagElem.appendChild(this.getTagHtml(json));
        //投稿日
        const date = new Date(json.body.createDate);
        const dateString = `upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        const dateElem = factory.setId(this.captionDateID).setInnerHtml(dateString).createDiv();
        //like数
        const likeString = `${this.likeIcon} ${json.body.likeCount} `;
        const likeElem = factory.setId(this.captionLikeID).setClass(this.className).setInnerHtml(likeString).createSpan();
        //ブックマーク数
        const bookmarkString = `${this.bookmarkIcon} ${json.body.bookmarkCount} `;
        const bookmarkElem = factory.setId(this.captionBookmarkID).setClass(this.className).setInnerHtml(bookmarkString).createSpan();
        //閲覧数
        const viewString = `${this.viewIcon}${json.body.viewCount}`;
        const viewElem = factory.setId(this.captionViewID).setClass(this.className).setInnerHtml(viewString).createSpan();
        //infoコンテナに各elementを詰める
        const infoElem = factory
            .setId(this.captionInfoID)
            .setClass(this.className)
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
        this.descriptionElem = descriptionElem;
        this.tagElem = tagElem;
        this.infoElem = infoElem;
        captionContainer.style.display = 'block';
    }
    /**
     * タグ情報を格納したHTMLelementを作成する
     */
    getTagHtml(json) {
        let outerTagElem = document.createElement('ul');
        // @ts-ignore
        outerTagElem.style.paddingInlineStart = '0px';
        //outerTagElem.setAttribute('align','left')
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
    setClassName(className) {
        this.className = className;
    }
    adjustSize(screen) {
        this.descriptionElem.style.height = this.descriptionElem.clientHeight > 100 ? `${100}px` : `${this.descriptionElem.clientHeight}px`;
        this.captionContainer.style.width = `${screen.offsetWidth}px`;
    }
    /**
     * 大きさがあるHTMLelementを引数に、それが画面の中央に表示されるようになるelementのtop・leftの値を返す
     * @param elem
     */
    /*
    getOffset(elem: HTMLElement): { top: number; left: number } {
        const w_height = $(window).height();
        const w_width = $(window).width();
        const el_height = $(elem).height();
        const el_width = $(elem).width();
        const scroll_height = $(window).scrollTop();
        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;
        return {top: Math.round(position_h), left: Math.round(position_w)};
    }
    */
    setJson(pixivJson) {
        this.pixivJson = pixivJson;
    }
    setCaptionContainer(captionContainer) {
        this.captionContainer = captionContainer;
    }
    getContainer() {
        return this.captionContainer;
    }
    addCSS() {
        //ドキュメントにCSSを登録
        const style = document.createElement('style');
        style.textContent = this.pixpediaItemCSS;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    resetContainer() {
        this.captionContainer = document.getElementById(this.captionContainerID);
        this.captionContainer.innerText = "";
    }
}
exports.Caption = Caption;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Frame {
    constructor() {
        //imageElement配列
        this.imgArray = [];
        //imageElementのsrc文字列の配列
        this._imgStringArray = [];
        //フレーム情報（ミリ秒単位の変更間隔）の配列
        this._frameArray = [];
    }
    pushDelay(delay) {
        this._frameArray.push(delay);
    }
    pushImgString(imgString) {
        this._imgStringArray.push(imgString);
    }
    get imgStringArray() {
        return this._imgStringArray;
    }
    set imgStringArray(value) {
        this._imgStringArray = value;
    }
    set frameArray(value) {
        this._frameArray = value;
    }
}
exports.Frame = Frame;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Frame_1 = __webpack_require__(10);
const ContainerFactory_1 = __webpack_require__(0);
/**
 * うごイラ管理用オブジェクト
 */
class Ugoira {
    constructor(pixivJson, ugoiraMetaJson) {
        this.ugoiraContainerID = 'popup-ugoira';
        this.pixivJson = pixivJson;
        this.ugoiraMetaJson = ugoiraMetaJson;
    }
    async init() {
        const innerContainer = this.innerContainer;
        let finished = false;
        const factory = new ContainerFactory_1.ContainerFactory();
        innerContainer.textContent = null;
        const canvas = document.createElement('canvas');
        canvas.id = this.ugoiraContainerID;
        canvas.className = this.className;
        this.ugoiraContainer = canvas;
        innerContainer.appendChild(canvas);
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
        //const ugoira = new Ugoira()
        const frames = this.ugoiraMetaJson.body.frames;
        // const ImgElem: HTMLImageElement = document.createElement('img')
        const frameData = new Frame_1.Frame();
        const zipData = await fetch(this.ugoiraMetaJson.body.src, {
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
        }).then(() => {
            for (let i = 0; i < frames.length; i++) {
                zip.file(frames[i].file)
                    .async("base64", function updateCallback(metadata) {
                    // console.log("progression: " + metadata.percent.toFixed(2) + " %");
                    if (metadata.percent === 100) {
                        finished = true;
                    }
                })
                    .then(function success(content) {
                    frameData.pushImgString(`data:image/jpeg;base64,${content}`);
                }, function error(e) {
                    console.log("download error.");
                });
            }
        }).then(() => {
            this.frameData = frameData;
        });
    }
    setScreenContainer(innerContainer) {
        this.innerContainer = innerContainer;
    }
    resize(elem, scale) {
        const oldWidth = this.pixivJson.body.width;
        const oldHeight = this.pixivJson.body.height;
        let newWidth = oldWidth;
        let newHeight = oldHeight;
        if (oldHeight > window.innerHeight * scale || oldWidth > window.innerWidth * scale) {
            const heightScale = oldHeight / Number(window.innerHeight * scale);
            const widthScale = oldWidth / Number(window.innerWidth * scale);
            if (heightScale > widthScale) {
                newHeight /= heightScale;
                newWidth /= heightScale;
            }
            else {
                newHeight /= widthScale;
                newWidth /= widthScale;
            }
        }
        this.ugoiraContainer.width = newWidth;
        this.ugoiraContainer.height = newHeight;
        elem.style.width = `${Math.round(newWidth)}px`;
        elem.style.height = `${Math.round(newHeight)}px`;
    }
    popup(outerContainer) {
        const frameArray = this.frameData.frameArray;
        const stringArray = this.frameData.imgStringArray;
        const img = new Image();
        let index = 0;
        const counter = () => {
            img.src = stringArray[index];
            const context = this.ugoiraContainer.getContext('2d');
            //座標(10, 10)の位置にイメージを表示
            context.drawImage(img, 0, 0, this.ugoiraContainer.clientWidth, this.ugoiraContainer.clientHeight);
            if (outerContainer.style.display !== 'none') {
                setTimeout(counter, this.ugoiraMetaJson.body.frames[index].delay);
                index += 1;
                index = index === stringArray.length ? 0 : index;
            }
        };
        counter();
    }
    setClassName(className) {
        this.className = className;
    }
}
//imageElement配列
Ugoira.imgArray = [];
//imageElementのsrc文字列の配列
Ugoira.imgStringArray = [];
exports.Ugoira = Ugoira;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = __webpack_require__(0);
const ArtWork_1 = __webpack_require__(1);
/**
 * html上のページごとのイラスト情報を管理する
 */
class Illust extends ArtWork_1.ArtWork {
    constructor(page, innerContainer, json) {
        super();
        this.illustContainerID = 'popup-img';
        this.illustContainerCSS = `width: 100%; 
          height:100%;
          display:none;
          left: 0;
          top: 0;
          background-size: contain;
          background-position:center; 
          background-repeat:no-repeat;
            `;
        this.pixivJson = json;
        this.innerContainer = innerContainer;
        //中身を綺麗にする
        this.innerContainer.innerHTML = '';
        const factory = new ContainerFactory_1.ContainerFactory();
        this.illustContainer = factory.setId(this.className)
            .setClass(this.className)
            .setCSS(this.illustContainerCSS)
            .createDiv();
        const screen = this.illustContainer;
        innerContainer.appendChild(screen);
        this.innerContainer.appendChild(screen);
        //screen.style.backgroundColor= (hasClass) ? "rgb(255, 64, 96)" :"rgb(34, 34, 34)"
        screen.style.display = 'none';
        screen.style.backgroundImage = `url(${this.pixivJson.body.urls.regular})`;
        screen.style.left = '0';
        screen.style.top = '0';
        screen.style.width = '100%';
        screen.style.height = '100%';
        screen.style.backgroundSize = 'contain';
        screen.style.backgroundPosition = 'center';
        screen.style.backgroundRepeat = 'no-repeat';
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
    popup(hasClass) {
        this.innerContainer.style.backgroundColor = (hasClass) ? "rgb(255, 64, 96)" : "rgb(34, 34, 34)";
        this.illustContainer.style.display = 'block';
    }
}
exports.Illust = Illust;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = __webpack_require__(0);
const ArtWork_1 = __webpack_require__(1);
/**
 * html上のページごとの漫画情報を管理する
 */
class Manga extends ArtWork_1.ArtWork {
    constructor(pixivJson) {
        super();
        this.mangaContainerID = 'popup-manga';
        this.pageNum = 0;
        //elementのcss
        this.mangaContainerCSS = ` background-color:black;
           overflow-x:auto;
           white-space:nowrap;
           width: 100%; 
           height:auto;
           top:0;
           left:0;
            `;
        this.pixivJson = pixivJson;
        this.pageNum = this.getPageNum(pixivJson);
        this.imgArray = new Array(this.pageNum);
        const factory = new ContainerFactory_1.ContainerFactory();
        this.mangaContainer = factory.setId(this.mangaContainerID)
            .setClass(this.className)
            .setCSS(this.mangaContainerCSS)
            .createDiv();
        this.DELTASCALE = ('mozInnerScreenX' in window) ? 70 : 4;
    }
    adjustScreenSize(scale) {
        const innerScreen = this.innerScreen;
        innerScreen.style.width = `${window.innerWidth * scale}px`;
        innerScreen.style.height = `${window.innerHeight * scale}px`;
    }
    /**
     * 漫画をポップアップする
     * @param innerContainer
     * @param hrefElem
     * @param json
     * @param count
     */
    popup(hasClass) {
        this.innerScreen.style.display = 'block';
        this.innerScreen.style.width = `${Number(this.innerScreen.style.maxWidth) * this.imgScale}px`;
        this.innerScreen.style.height = `${Number(this.innerScreen.style.maxHeight) * this.imgScale}px`;
        this.innerScreen.innerHTML = '';
        this.innerScreen.style.backgroundColor = (hasClass) ? "rgb(255, 64, 96)" : "rgb(34, 34, 34)";
        const firstPageURL = this.getImgUrl();
        //各ページをセット
        this.initImgArray(this.mangaContainer, firstPageURL);
        this.innerScreen.appendChild(this.mangaContainer);
        this.setScrool(this.mangaContainer, this.innerScreen, this.DELTASCALE);
    }
    /**
     * imgエレメントの配列を作成し漫画の各ページを格納
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     * @param primaryLink
     * @param pageNum
     */
    initImgArray(mangaContainer, firstPageURL) {
        for (let i = 0; i < this.pageNum; i++) {
            const imgElem = document.createElement('img');
            imgElem.src = firstPageURL.replace('p0', 'p' + i);
            imgElem.style.maxWidth = this.innerScreen.style.width;
            imgElem.style.maxHeight = this.innerScreen.style.height;
            imgElem.style.height = this.innerScreen.style.height;
            imgElem.style.width = 'auto';
            this.imgArray.push(imgElem);
            mangaContainer.appendChild(imgElem);
        }
    }
    /**
     * mangaコンテナ上でスクロール機能を実現
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     */
    setScrool(mangaContainer, innerContainer, deltaScale) {
        this.mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (innerContainer.getBoundingClientRect().top < 0)) {
                innerContainer.scrollIntoView({ block: "start", behavior: "smooth" }); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (innerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                innerContainer.scrollIntoView({ block: "end", behavior: "smooth" }); //aligning to bottom screen side on scrollDown if needed
            }
            let scrlLft = mangaContainer.scrollLeft;
            if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                e.preventDefault();
                mangaContainer.scrollLeft += e.deltaY * deltaScale; // TODO - find better value for opera/chrome
            }
        };
    }
    /**
     * 画像のURLを取得
     * @param json
     */
    getImgUrl() {
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return this.pixivJson.body.urls.regular.replace(/\/...x...\//, '/600x600/');
    }
    getPageNum(pixivJson) {
        return Number(pixivJson.body.pageCount);
    }
}
exports.Manga = Manga;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ContainerFactory_1 = __webpack_require__(0);
const Manga_1 = __webpack_require__(13);
const Illust_1 = __webpack_require__(12);
const Ugoira_1 = __webpack_require__(11);
const Caption_1 = __webpack_require__(9);
const CommentList_1 = __webpack_require__(8);
const Screen_1 = __webpack_require__(6);
class PopupScreen {
    constructor(page, setting) {
        this.outerContainerID = 'popup-outer-container';
        this.captionMaxHeight = 100;
        this.popupClass = 'popup-util';
        this.outerContainerCSS = `
        position:absolute;
        z-index:10000;
        `;
        this.page = page;
        this.setting = setting;
        //const screen=new Screen(this.popupClass,this.popupScale)
        //const caption=new Caption(this.popupClass)
        //const commentList=new CommentList(this.popupClass)
        if (document.getElementById(this.outerContainerID) === null) {
            //各コンテナを用意
            const factory = new ContainerFactory_1.ContainerFactory();
            this.outerContainer = factory
                .setId(this.outerContainerID)
                .setClass(this.popupClass)
                .setCSS(this.outerContainerCSS)
                .createDiv();
            this.screen = new Screen_1.Screen(this.popupClass, this.popupScale);
            this.caption = new Caption_1.Caption(this.popupClass);
            this.caption.addCSS();
            this.commentList = new CommentList_1.CommentList(this.popupClass);
            this.outerContainer.appendChild(this.caption.getContainer());
            this.outerContainer.appendChild(this.screen.getContainer());
            this.outerContainer.appendChild(this.commentList.getContainer());
            document.body.appendChild(this.outerContainer);
        }
        else {
            this.outerContainer = document.getElementById(this.outerContainerID);
            this.cleanOuterContainer();
            this.screen.resetContainer();
            this.caption.resetContainer();
            this.commentList.resetContainer();
        }
        /*
        else {

            this.outerContainer = document.getElementById(this.outerContainerID)
            this.screenContainer = document.getElementById(this.innerContainerID)
            this.captionContainer = document.getElementById(this.captionContainerID)
            this.commentListContainer = document.getElementById(this.commentListContainerID)
        }
         */
        this.outerContainer.style.display = 'none';
    }
    popupArtwork(hasClass) {
        this.outerContainer.style.display = 'block';
        const artwork = this.isManga() ? new Manga_1.Manga(this.pixivJson) : new Illust_1.Illust(this.page, this.screen.getContainer(), this.pixivJson);
        this.artwork = artwork;
        artwork.setScreenContainer = this.screen.getContainer();
        artwork.setClassName = this.popupClass;
        artwork.adjustScreenSize(this.setting.popupScale);
        artwork.popup(hasClass);
    }
    async popupUgoira(metajson) {
        //pixivJsonとメタ情報からうごイラオブジェクトを作成
        const ugoira = new Ugoira_1.Ugoira(this.pixivJson, metajson);
        // ugoira.setScreenContainer(this.screen.getContainer())
        ugoira.setClassName(this.popupClass);
        await ugoira.init().then(() => {
            ugoira.resize(this.outerContainer, this.setting.popupScale);
            ugoira.popup(this.outerContainer);
        });
    }
    async popupCaption() {
        // const caption = new Caption(this.popupClass)
        const caption = this.caption;
        caption.setJson(this.pixivJson);
        //caption.setCaptionContainer(this.captionContainer)
        //caption.setScreenContainer(this.screen.getContainer())
        await caption.popup();
        caption.adjustSize(this.screen.getContainer());
    }
    async popupComment() {
        const commentList = this.commentList;
        commentList.setJson(this.pixivJson);
        //commentList.setCommentListContainer(this.commentList.getContainer)
        commentList.setOuterContainer(this.outerContainer);
        // commentList.setScreenContainer(this.screen.getContainer())
        commentList.setClassName(this.popupClass);
        await commentList.init().then(() => {
            commentList.popup();
            commentList.adjustSize(this.screen.getContainer());
        });
    }
    setPixivJson(pixivJson) {
        this.pixivJson = pixivJson;
    }
    isIllust() {
        return this.pixivJson.body.illustType === 0;
    }
    isManga() {
        return this.pixivJson.body.illustType === 1 || (this.pixivJson.body.pageCount && Number(this.pixivJson.body.pageCount) > 1);
    }
    isUgoira() {
        return this.pixivJson.body.illustType === 2;
    }
    addMouseMove() {
        const elm = this.outerContainer;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let dragging = false;
        //let scroll = false
        const dragElement = (e) => {
            dragging = true;
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elm.style.top = (elm.offsetTop - pos2) + "px";
            elm.style.left = (elm.offsetLeft - pos1) + "px";
        };
        const closeDragElement = () => {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            if (!dragging) {
                this.cleanOuterContainer();
            }
            dragging = false;
        };
        const mouseDownEvent = (e) => {
            e = e || window.event;
            // スクロールバーより内側の場合
            if (e.offsetX <= e.target.clientWidth && e.offsetY <= e.target.clientHeight) {
                if (e.button === 0) {
                    //左ボタンクリック
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = dragElement;
                    elm.onmouseleave = () => {
                        this.cleanOuterContainer();
                    };
                }
                else {
                    //TBD
                }
            }
        };
        elm.onmousedown = mouseDownEvent;
        const setting = this.setting;
        const outerContainer = this.outerContainer;
        window.onresize = function () {
            //  outerContainer.style.width = `${window.innerWidth * setting.popupScale}px`;
        };
    }
    removePopup() {
        this.removeContainer(this.outerContainer);
    }
    cleanOuterContainer() {
        this.screen.getContainer().innerText = '';
        this.caption.getContainer().innerText = '';
        this.commentList.getContainer().innerText = '';
        this.outerContainer.style.display = 'none';
    }
    removeContainer(elem) {
        elem.innerText = '';
        elem.parentNode.removeChild(elem);
    }
    getOffset(elem) {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const elemHeight = elem.offsetHeight;
        const elemWidth = elem.offsetWidth;
        const scrollHeight = window.scrollY;
        const position_h = scrollHeight + (windowHeight - elemHeight) / 2;
        const position_w = (windowWidth - elemWidth) / 2;
        return { top: Math.round(position_h), left: Math.round(position_w) };
    }
    adjustOffset() {
        const elem = this.outerContainer;
        const offset = this.getOffset(elem);
        elem.style.left = `${offset.left}px`;
        elem.style.top = `${offset.top}px`;
    }
    adjustSize() {
        this.caption.getContainer().style.width = `${this.screen.getContainer().offsetWidth}px`;
        this.outerContainer.style.width = `${this.screen.getContainer().offsetWidth + this.commentList.MAXWIDTH}px`;
        this.outerContainer.style.height = `${this.caption.getContainer().offsetHeight + this.screen.getContainer().offsetHeight}px`;
    }
}
exports.PopupScreen = PopupScreen;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(5);
/**
 * 現在いるページを管理するページオブジェクト
 */
class Page {
    constructor(url) {
        this.URL = url;
        this.pagetype = Util_1.Util.checkPageType(url);
        this.siteImgMaxWidth = 500; //this.pagetype === prop.popup_typeA ? 200 : 150
        this.alloedFunclist = Util_1.Util.getAllowedFuncList(this.pagetype);
        this.imgSelector = 'a[href*="member_illust.php?mode=medium&illust_id="]';
        this.mangaSelector = 'a[href*="member_illust.php?mode=medium&illust_id="] > div:nth-child(2) ';
    }
    set setURL(url) {
        this.URL = url;
        this.pagetype = Util_1.Util.checkPageType(url);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __webpack_require__(15);
const Util_1 = __webpack_require__(5);
const Setting_1 = __webpack_require__(3);
'use strict';
/**
 * メイン関数
 */
const page = new Page_1.Page(document.URL);
const util = new Util_1.Util();
const setting = new Setting_1.Setting();
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
            util.onloadExecute(setting, new Page_1.Page(document.URL));
        });
    }
    setting.save();
};


/***/ })
/******/ ]);