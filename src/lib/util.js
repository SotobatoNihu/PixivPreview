"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const popupUtil_1 = require("./popupUtil");
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
