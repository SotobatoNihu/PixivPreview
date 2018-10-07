"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const popupUtil_1 = require("./popupUtil");
const setting_1 = require("./setting");
const ContainerFactory_1 = require("./ContainerFactory");
const jsonInterface_1 = require("./jsonInterface");
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
