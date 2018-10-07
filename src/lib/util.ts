import {prop, pagetype, uiComponent} from "./enum";
import {PopupUtil} from "./popupUtil";
import {Manga} from "./manga";
import {Page} from "./page";
import {Setting} from "./setting";
import {ContainerFactory} from './ContainerFactory';
import {PixivJson} from './jsonInterface';


export class Util {
    private outerContainerCSS: string = `
        position:absolute;
        display:block;
        z-index:1000;
        border: 5px solid black;
        max-width:${window.innerWidth * 0.8}px;
        background-color:#111;
        max-width:${window.innerWidth * 0.8}px;
        max-height:${window.innerHeight * 0.8}px;
        `
    private gearCSS: string =
        `width: 25px; 
         height: 25px;
         color:rgb(173, 173, 173);
         `
    private modalCSS: string =
        `.pixiv-modal {
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
        `

    async initExecute(setting: Setting, page: Page) {
        if (page.pagetype == pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigScreen()
        }


        if (setting.popup && page.isEnable(prop.popup_typeA)) {
            this.setPopup(page, setting);
            console.log("set popup typeA");
        }
        else if (setting.popup && page.isEnable(prop.popup_typeB)) {
            this.setPopup(page, setting);
            console.log("set popup typeB");
        }

        if (setting.changeMemberPageLayout && page.isEnable(prop.changeMemberPageLayout)) {
            const autherElem: Element = document.getElementsByTagName('header')[0].nextElementSibling.children[0].children[0]//$('header').next().children().children()
            document.getElementById("root").appendChild(autherElem);
            console.log("layout chainged");
        }


    }

    onloadExecute(setting: Setting, page: Page): void {
        if (page.pagetype === pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigScreen()
        }

        if (setting.changeIllustPageLayout && page.isEnable(prop.changeIllustPageLayout)) {
            Util.changeIllustPageLayout();
            console.log("layout chainged");
        }

        if (setting.openComment && page.isEnable(prop.openComment)) {
            this.openComment(page);
            console.log("comment opend");
        }

        if (setting.changeMemberPageLayout && page.pagetype === pagetype.member_illust) {
            const autherElem = document.getElementsByTagName('header')[0].nextElementSibling.children[0].children[0]//$('header').next().children().children()
            document.getElementById("root").appendChild(autherElem);
            console.log("layout chainged");
        }
    }

    //   function checkPageType(url) {
    static checkPageType(url: string): pagetype {
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

    static changeIllustPageLayout(): void {
        $('figure').before($('figcaption'));
    }

    static changeMemberPageLayout(): void {
        // TODO もっと良い方法
        //const tagElem=$('.gm-profile-work-list-tag-list-click')
        //const illustElem=tagElem.parent().parent().parent().parent()
        //$('header').next().prepend(illustElem)
        // $('nav').parent().parent().prepend(illustElem)
        const h2Elems = $('h2')
        for (const h2elem of h2Elems) {
            if (h2elem.innerText.startsWith("イラスト")) {
                const illustElem = $(h2elem).parent().parent()

                //$('nav').parent().parent().prepend(illustElem)
                $('header').next().prepend(illustElem)
                break
            }
        }
    }

    static getAllowedFuncList(type: pagetype): prop[] {
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
                return [prop.popup_typeB, prop.changeMemberPageLayout];
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

    openComment(page: Page): void {
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

    setPopup(page: Page, setting: Setting): void {
        const popupUtil = new PopupUtil();
        const factory = new ContainerFactory()
        const outerContainer: HTMLElement = factory.setId('outerContainer')
            .setCSS(this.outerContainerCSS)
            .setVoidHtml()
            .createDiv()
        document.body.appendChild(outerContainer);

        // イラスト＆漫画のクリックイベントを登録する
        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () {

            const thumb = $(this).find('.non-trim-thumb')
            const clickElem = thumb.length > 0 ? thumb[0] : this
            //イラストのクリックを抑制
            $(this).attr('onclick', 'console.log();return false;');
            //漫画のクリックを抑制
            $(this).find('.non-trim-thumb').attr('onclick', 'console.log();return false;');
            const hrefElem: HTMLElement = this
            const url = this.getAttribute("href")

            const matches = url.match(/(.)+illust_id=([0-9]+)(&.+)?/)
            const illustID: number = Number(matches[2])

            $(clickElem).on('click', function (e) {
                fetch(`https://www.pixiv.net/ajax/illust/${illustID}`).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    const pixivJson = new PixivJson(json)
                    // const mouseX=e.pageX
                    //const mouseY=e.pageY

                    if (!popupUtil.isManga(pixivJson)) {
                        popupUtil.popupImg(page, outerContainer, hrefElem, pixivJson);
                    } else {
                        const pageNum = Util.getPageNum(pixivJson)
                        popupUtil.popupManga(outerContainer, hrefElem, pixivJson, Number(pageNum));
                    }
                    popupUtil.popupCaption(outerContainer, pixivJson);
                })
            })


        })


        const deleteAll = () => {
            const elem = document.getElementById('captionContainer')
            if (elem !== null) {
                elem.parentNode.removeChild(elem);
            }
            outerContainer.textContent = null;
            outerContainer.style.display = 'none';
        }

        outerContainer.onmouseleave = function () {
            const elem = document.getElementById('captionContainer').innerHTML

            if ($(elem).find('a').length == 0) {
                deleteAll()
            } else {
                setTimeout(deleteAll(), 1000);
            }

        };

        window.onresize = function () {
            outerContainer.style.maxWidth = `${window.innerWidth * 0.8}px`;
        };
    }


    private static getUserID(json: PixivJson): string {
        return json.body.tags.authorId
    }

    private static getPageNum(json: PixivJson): number {
        return Number(json.body.pageCount)
    }

    async setConfigScreen() {
        const iconID: string = 'pixiv-view-util-icon'
        const iconElem: HTMLElement = document.getElementById(iconID)
        if (iconElem === null) {
            await this.setIconElem(iconID)
            await this.setModal(iconID)
        }
    }

    private async setIconElem(iconID: string) {
        // @ts-ignore
        const gearIcon: string = await GM_getResourceText('gearIcon')
        const factory = new ContainerFactory()

        const gearElem = factory
            .setId(iconID)
            .setCSS(this.gearCSS)
            .setInnerHtml(gearIcon)
            .createDiv()
        gearElem.className = 'trigger'
        const svgTag = gearElem.getElementsByTagName('svg')[0]
        const gTag = gearElem.getElementsByTagName('g')[0]
        svgTag.setAttribute('width', '25')
        svgTag.setAttribute('height', '25')
        gTag.setAttribute('fill', '#BECAD8')
        const liElem = document.createElement('li');
        liElem.className = 'viewUtil'

        liElem.appendChild(gearElem)
        document.body.getElementsByClassName('notifications')[0].appendChild(liElem)
    }

    private setModal(iconID: string) {

        const setting = new Setting


        const iconElem: HTMLElement = document.getElementById(iconID)
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
	`
        document.body.appendChild(modal1)


        // 各modalクラスのcssを追加
        const style = document.createElement('style');
        style.textContent = this.modalCSS
        document.getElementsByTagName('head')[0].appendChild(style);

        //各種クリックイベントを追加
        const modal: HTMLElement = document.getElementById('myModal')
        const closeButton: HTMLElement = document.getElementById('pixiv-modal-close')
        iconElem.onclick = () => modal.style.display = 'block';

        const elem1 = document.getElementsByName('pixivutil-setting1')[0]
        const elem2 = document.getElementsByName('pixivutil-setting2')[0]
        const elem3 = document.getElementsByName('pixivutil-setting3')[0]


        setting.init().then(() => {
                // @ts-ignore
                if (setting.changeIllustPageLayout && !elem1.checked) elem1.checked = true
                // @ts-ignore
                if (setting.changeMemberPageLayout && !elem2.checked) elem2.checked = true
                // @ts-ignore
                if (setting.popup && !elem3.checked) elem3.checked = true
            }
        )

        closeButton.onclick = () => {
            modal.style.display = 'none';
            // @ts-ignore
            setting.changeIllustPageLayout = elem1.checked
            // @ts-ignore
            setting.changeMemberPageLayout = elem2.checked
            // @ts-ignore
            setting.popup = elem3.checked

            setting.save()
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        // .addEventListener("click", windowOnClick);
    }

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
