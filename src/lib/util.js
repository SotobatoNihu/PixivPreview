"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const popupUtil_1 = require("./popupUtil");
const manga_1 = require("./manga");
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
        let elem = $("article");
        elem.find("[aria-expanded='false']").click();
        var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
            elem.find("[aria-expanded='false']").click();
        });
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
        /*
        const elem = document.getElementsByTagName("article")[0];
        const comments = elem.querySelectorAll('a[aria-expanded="false"]')
        for(let comment of comments){
            comment.setAttribute("aria-expanded", 'true');
        }

        var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
            const comments = elem.querySelectorAll('a[aria-expanded="false"]')
            for(let comment of comments){
                comment.setAttribute("aria-expanded", 'true');
            }

        });
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
        */
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
