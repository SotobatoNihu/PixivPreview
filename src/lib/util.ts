import {prop, pagetype} from "./enum";
import {PopupUtil} from "./popupUtil";
import {Manga} from "./manga";

export class Util {
    static changeLayout() {
        const figure = document.getElementsByTagName("figure");
        $('figure').before($('figcaption'));
    }

    //   function checkPageType(url) {
    static checkPageType(url) {
        if (url.match('https://www.pixiv.net/bookmark_new_illust.php?')) return pagetype.bookmark_new_illust;
        if (url.match('https://www.pixiv.net/discovery?')) return pagetype.discovery;
        if (url.match('https://www.pixiv.net/member_illust.php?')) return pagetype.member_illust;
        if (url.match('https://www.pixiv.net/member.php?')) return pagetype.member;
        if (url.match('https://www.pixiv.net/bookmark_detail.php?')) return pagetype.bookmark_detail;
        if (url.match('https://www.pixiv.net/bookmark_add.php?')) return pagetype.bookmark_add;
        if (url.match('https://www.pixiv.net/ranking.php?')) return pagetype.ranking;
        if (url.match(/https:\/\/www\.pixiv\.net\/bookmark\.php\?id/)) return pagetype.bookmark_id;
        if (url.match('https://www.pixiv.net/search.php')) return pagetype.search;
        if (url.match('https://www.pixiv.net/bookmark.php?')) return pagetype.bookmark;
        if (url.match('https://www.pixiv.net/')) return pagetype.top;
        else return pagetype.other;
    };

    static getAllowedFuncList(type) {
        switch (type) {
            case pagetype.top:
                return [prop.popup_typeB];
            case pagetype.bookmark_new_illust:
                return [prop.popup_typeA];
            case pagetype.discovery:
                return [prop.popup_typeA];
            case pagetype.member_illust:
                return [prop.popup_typeB, prop.changeLayout, prop.openComment];
            case pagetype.member:
                return [prop.popup_typeB];
            case pagetype.bookmark_detail:
                return [prop.popup_typeB];
            case pagetype.bookmark_add:
                return [prop.popup_typeB];
            case pagetype.bookmark_id:
                return [prop.popup_typeB];
            case pagetype.search:
                return [prop.popup_typeA];
            case pagetype.ranking:
                return [prop.popup_typeB];
            case pagetype.bookmark:
                return [prop.popup_typeB];
            default:
                return [];
        }
    }

    openComment() {
        const elem = document.getElementsByTagName("article")[0];
        const comments = elem.querySelectorAll('a[aria-expanded="false"]')
        for(let comment of comments){
            comment.setAttribute("aria-expanded", 'true');
        }
        /*
        Object.keys(comments).forEach((i) => {
            comments[i].click()
        });
        */
        var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
            const comments = elem.querySelectorAll('a[aria-expanded="false"]')
            for(let comment of comments){
                comment.setAttribute("aria-expanded", 'true');
            }
            /*
            Object.keys(comments).forEach((i) => {
                comments[i].click()
            });
            */
        });
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
    }

    setPopup(page, setting) {
        const popupUtil = new PopupUtil();
        const captionContainer = popupUtil.getCaptionContainer()
        const outerContainer = popupUtil.getOuterContainer(document)


        document.body.appendChild(captionContainer);
        document.body.appendChild(outerContainer);

        //add action
        if (page.isEnable(prop.popup_typeA)) {
            // click single art in the typeA page
            $('body').on('mouseenter', popupUtil.getImgeSelector(prop.popup_typeA), function () {
                let elem = this;
                $(this).attr('onclick', 'console.log();return false;');
                $(this).on('click', function () {
                    popupUtil.popupImg(page, outerContainer, elem);

                    const href = $(this).parent().parent().find('a').attr('href');
                    const imageID = href.substring(href.indexOf('illust_id=') + 'illust_id='.length);
                    console.log("id:" + imageID)
                    popupUtil.popupCaption(outerContainer, imageID);
                });
            })
            //click manga in the typeA page
            $('body').on('mouseenter', popupUtil.getMangaSelector(prop.popup_typeA), function () {

                if (this.parentNode.firstChild.childNodes.length) {
                    $(this).attr('onclick', 'console.log();return false;');
                    var elem1 = this;
                    var elem2 = this.parentNode.firstChild.firstChild.textContent;
                    $(this).on('click', function () {
                        popupUtil.popupManga(outerContainer, elem1, elem2);
                        const href = $(this).parent().parent().find('a').attr('href');
                        // @ts-ignore
                        const imageID = href.slice(href.substring('illust_id=') + 'illust_id='.length);
                        console.log("id:" + imageID)
                        popupUtil.popupCaption(outerContainer, imageID);
                    })
                }
            })

        } else if (page.isEnable(prop.popup_typeB)) {
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
                    const manga = new Manga();

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

            })
        }
        const deleteAll = () => {
            const elem = document.getElementById('captionContainer')
            elem.innerText = null
            elem.style.display = 'none';
            const children = outerContainer.children
            for (const child of children) {
                child.style.display = 'none'
            }
            outerContainer.style.display = 'none';

            outerContainer.textContent = null;
            outerContainer.style.display = 'none';


            //return
        }

        outerContainer.onmouseleave = function () {

            if ($(captionContainer).find('a').length == 0) {
                deleteAll()
            } else {
                setTimeout(deleteAll(), 1000);
            }

        };
        captionContainer.onmouseleave = function () {
            captionContainer.innerText = null
            captionContainer.style.display = 'none';
        };
        window.onresize = function () {
            outerContainer.style.maxWidth = document.body.clientWidth - 80;
        };
    }
}
