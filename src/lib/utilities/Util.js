"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = require("../others/Enum");
const Setting_1 = require("../others/Setting");
const ContainerFactory_1 = require("./ContainerFactory");
const jsonInterface_1 = require("../others/jsonInterface");
const PopupScreen_1 = require("./PopupScreen");
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
