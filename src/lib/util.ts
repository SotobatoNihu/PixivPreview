import {prop, pagetype, uiComponent} from "./enum";
import {PopupUtil} from "./popupUtil";
import {Manga} from "./manga";
import {Page} from "./page";
import {Setting} from "./setting";


const getImageIDfromHref = (hrefElement: HTMLElement) => {
    //https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=70384088&page=0
    const pattern = /(.)+illust_id=([0-9]+)(&.+)?/
    const matches = hrefElement.getAttribute('href').match(pattern)
    const idString = matches[2]
    return Number(idString)

}



export class Util {


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

    static changeIllustPageLayout() {
        const figure = document.getElementsByTagName("figure");
        $('figure').before($('figcaption'));
    }
    static changeMemberPageLayout() {
        //const tagElem=$('.gm-profile-work-list-tag-list-click')
        //const illustElem=tagElem.parent().parent().parent().parent()
        //$('header').next().prepend(illustElem)
       // $('nav').parent().parent().prepend(illustElem)
        const h2Elems =$('h2')
        for(const h2elem of h2Elems){
            if(h2elem.innerText.startsWith("イラスト")){
                const illustElem=$(h2elem).parent().parent()

                //$('nav').parent().parent().prepend(illustElem)
                $('header').next().prepend(illustElem)
                break
            }
        }

       // $('figure').before($('figcaption'));
    }

    static getAllowedFuncList(type) {
        switch (type) {
            case pagetype.top:
                return [prop.popup_typeB];
            case pagetype.bookmark_new_illust:
                return [prop.popup_typeA];
            case pagetype.discovery:
                return [prop.popup_typeA];
            case pagetype.member_illust:
                return [prop.popup_typeB, prop.changeIllustPageLayout, prop.openComment];
            case pagetype.member:
                return [prop.popup_typeB,prop.changeMemberPageLayout];
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

    openComment(page: Page) {
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

    setPopup(page: Page, setting: Setting) {
        const popupUtil = new PopupUtil();
        const captionContainer = popupUtil.getCaptionContainer()
        const outerContainer = popupUtil.getOuterContainer(document)

        document.body.appendChild(captionContainer);
        document.body.appendChild(outerContainer);

        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () {

            const thumb = $(this).find('.non-trim-thumb')

            const clickElem = thumb.length > 0 ? thumb[0] : this

            $(this).attr('onclick', 'console.log();return false;');
            $(this).find('.non-trim-thumb').attr('onclick', 'console.log();return false;');
            const hrefElem: HTMLElement = this
            const url = this.getAttribute("href")// .href //$(this).attr('href')

            const pattern = /(.)+illust_id=([0-9]+)(&.+)?/
            const matches = url.match(pattern)

            const illustID = Number(matches[2])
            // @ts-ignore
            $(clickElem).on('click', function (e) {

                fetch(`https://www.pixiv.net/ajax/illust/${illustID}`).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    const mouseX=e.pageX
                    const mouseY=e.pageY

                    if (!popupUtil.isManga(json)) {
                        popupUtil.popupImg(page, outerContainer, hrefElem, json);
                    } else {
                        const pageNum = Util.getPageNum(json)
                        popupUtil.popupManga(outerContainer, hrefElem, json, Number(pageNum));
                    }
                    popupUtil.popupCaption(outerContainer, json);
                })
            })


        })


        const deleteAll = () => {
            const elem = document.getElementById('captionContainer')
            elem.innerText = null
            elem.style.display = 'none';
            const children = outerContainer.children
            for (const child of children) {
                child.style.display = 'none'
            }
            outerContainer.textContent = null;
            outerContainer.style.display = 'none';

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



    private static getUserID(json: JSON) {
        // @ts-ignore
        return json.body.tags.authorId

    }

    private static getPageNum(json: JSON) {
        // @ts-ignore
        return Number(json.body.pageCount)
    }
}
