import {prop, pagetype, uiComponent} from "./enum";
import {Illust} from "./Illust";
import {Manga} from "./Manga";
import {Ugoira} from "./Ugoira";
import {Caption} from "./Caption";
import {Page} from "./page";
import {Setting} from "./setting";
import {ContainerFactory} from './ContainerFactory';
import {PixivJson} from './jsonInterface';


/***
 * 各種ユーティリティ関数
 * ポップアップ機能に関するユーティリティ関数軍が長くなったため
 * popupUtilと外出しにしている
 */
export class Util {
    private static innerContainerID: string='popup-inner-container'
    private static outerContainerID: string='popup-outer-container'
    private static captionContainerID: string = 'popup-caption-container'
    private static popupClass: string='popup-util'
    //あとで各要素やドキュメントに挿入するCSS文字列
    private outerContainerCSS: string = `
        position:absolute;
        z-index:10000;
        background-color:#FFF;
        border: 1px solid black;
        max-width:${window.innerWidth }px;
        max-height:${window.innerHeight }px;
        `

      innerContainerCSS(scale:number){
        return `
        border: 5px solid black;
        background-color:#111;
        position:relative;
        width:100%;
        height:100%;
        float:left;
        max-width:${window.innerWidth * scale}px;
        max-height:${window.innerHeight * scale}px;
        `
    }
    private captionContainerCSS: string =
        `
        white-space:pre-wrap;
        z-index:10001;
        position:relative;
        width:auto;
        height:auto;
        display:none;
        max-width:${window.innerWidth }px;
        max-height:${window.innerHeight}px;
        background-color:white;
        word-wrap:break-word;
        word-break:break-all;
        
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
    private pixpediaItemCSS: string
        = `.popup-pixpedia-icon{
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
     `

    private utilIcon: string = 'pixiv-view-util-gear'

    /**
     * 最初に実行する
     * 今いるページのタイプと、設定内容に応じて、レイアウトの修正やポップアップの用意を行う
     * トップ画面の場合は設定ダイアログも用意する
     * @param setting
     * @param page
     */
    async initExecute(setting: Setting, page: Page) {
        if (page.pagetype == pagetype.top && document.getElementById(this.utilIcon) === null) {
            this.setConfigDialog()
        }

        if (setting.popup && (page.isEnable(prop.popup_typeA))|| page.isEnable(prop.popup_typeB)){

            const factory=new ContainerFactory()
            const outerContainer: HTMLElement = factory
                .setId(Util.outerContainerID)
                .setClass(Util.popupClass)
                .setCSS(this.outerContainerCSS)
                .createDiv()
            this.setPopup(outerContainer,page, setting);
            console.log("set popup");
        }
    }

    /**
     * 画面読み込み完了時に行うこと。initExecuteと同様
     * @param setting
     * @param page
     */
    onloadExecute(setting: Setting, page: Page): void {
        if (page.pagetype === pagetype.top && document.getElementById('pixiv-view-util-gear') === null) {
            this.setConfigDialog()
        }
        if (setting.changeIllustPageLayout && page.isEnable(prop.changeIllustPageLayout)) {
            Util.changeIllustPageLayout();
            console.log("layout chainged");
        }
        if (setting.openComment && page.isEnable(prop.openComment)) {
            this.openComment(page);
            console.log("comment opend");
        }
        if (setting.changeMemberPageLayout && (page.pagetype === pagetype.member||page.pagetype===pagetype.member_illust)) {
            this.changeMemberPageLayout()
            for (let i = 0; i < 5; i++) {
                setTimeout(this.changeMemberPageLayout(), 1000 * i)
            }
        }

    }

    /**
     * URLに応じてpagetypeを返す
     * @param url
     */
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

    /**
     * イラスト閲覧ページのレイアウトを修正する
     */
    static changeIllustPageLayout(): void {
        $('figure').before($('figcaption'));
    }


    /**
     * そのページで可能な、本スクリプトが対象とする操作を返す
     * HTML要素に埋め込まれたURLの構造にはページに応じて2パターンあり、かつてはポップアップ機能はパターンごとに
     * 区別し実行していたためその名残でタイプA/Bが残っている
     * @param type
     */
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

    /**
     * コメントを開く
     * @param page
     */
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

    /**
     * ポップアップ機能の用意を行う
     * @param page
     * @param setting
     */
    setPopup(outerContainer:HTMLElement,page: Page, setting: Setting): void {
       // const popupUtil = new PopupUtil();
        //IDやCSSなどをセットしたHTML要素を作成
        const factory = new ContainerFactory()
        //ポップアップの外枠となるouterContainer


        const innerContainer: HTMLElement = factory
            .setId(Util.innerContainerID)
            .setClass(Util.popupClass)
            .setCSS(this.innerContainerCSS(setting.popupScale))
            .createDiv()

        const captionContainer: HTMLElement = factory
            .setId(Util.captionContainerID)
            .setClass(Util.popupClass)
            .setCSS(this.captionContainerCSS)
            .createDiv()

        outerContainer.appendChild(captionContainer)
        outerContainer.appendChild(innerContainer)
        document.body.appendChild(outerContainer)

        //ドキュメントにCSSを登録
        const style = document.createElement('style');
        style.textContent = this.pixpediaItemCSS
        document.getElementsByTagName('head')[0].appendChild(style);


        // イラスト＆漫画のクリックイベントを登録する
        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () {

            //クリック対象とhrefがある要素の入れ子関係は２パターン以上あるため注意
            const thumb = $(this).find('.non-trim-thumb')
            const clickElem = thumb.length > 0 ? thumb[0] : this

            //イラストの本来のクリックによる遷移を抑制
            $(this).attr('onclick', 'console.log();return false;');
            //漫画の本来のクリックによる遷移を抑制
            $(this).find('.non-trim-thumb').attr('onclick', 'console.log();return false;');
            const hrefElem: HTMLElement = this
            const url = this.getAttribute('href')

            //イラストIDを取得
            const matches = url.match(/(.)+illust_id=([0-9]+)(&.+)?/)
            const illustID: number = Number(matches[2])

            //ポップアップを実行
            $(clickElem).on('click', async function (e) {
               // outerContainer.style.display = 'block';
                //イラストIDを元にjsonを入手
                await fetch(`https://www.pixiv.net/ajax/illust/${illustID}`,
                    {
                        method: 'GET',
                        mode: 'cors',
                        keepalive: true
                    }
                ).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(async function (json) {
                    //jsonをpixivJsonオブジェクトに格納
                    const pixivJson = new PixivJson(json);


                    outerContainer.style.display='block'
                    if (Util.isManga(pixivJson)) {
                        //漫画オブジェクトを作成
                        const manga = new Manga(pixivJson)
                        manga.setInnerContainer(innerContainer)
                        manga.setClassName(Util.popupClass)
                        //漫画をポップアップ
                        manga.popup($(hrefElem).hasClass("on"))

                      //  popupUtil.popupManga(innerContainer,Util.popupClass);
                        outerContainer.style.width = innerContainer.style.maxWidth
                        outerContainer.style.height = innerContainer.style.maxHeight
                    }
                    else if (Util.isIllust(pixivJson)) {
                        //イラストオブジェクトを作成
                        const illust = new Illust(page,innerContainer,pixivJson,)
                        illust.setInnerContainer(innerContainer)
                        illust.setClassName(Util.popupClass)
                        //イラストをポップアップ
                        illust.popup($(hrefElem).hasClass("on"));
                        illust.resize(outerContainer,setting.popupScale)
                    } else {
                        //うごイラのメタ情報のJSONを入手
                        await fetch(`https://www.pixiv.net/ajax/illust/${pixivJson.body.illustId}/ugoira_meta`)
                            .then(function (response) {
                                return response.json();
                            }).then(async metajson => {
                                //pixivJsonとメタ情報からうごイラオブジェクトを作成
                                const ugoira = new Ugoira(pixivJson, new PixivJson(metajson))
                                ugoira.setInnerContainer(innerContainer)
                                ugoira.setClassName(Util.popupClass)
                                await ugoira.init().then(
                                    ()=>{
                                    ugoira.resize(outerContainer,setting.popupScale)
                                    ugoira.popup()
                                    }
                                )
                            })
                    }
                    //キャプションのポップアップを実行
                    const caption = new Caption(pixivJson)
                    caption.setCaptionContainer(captionContainer)
                    caption.setInnerContainer(innerContainer)
                    caption.setClassName(Util.popupClass)
                    //manga.set
                    await caption.popup()
                    caption.adjust(outerContainer)
                    Util.addMouseMove(outerContainer)
                });
            })
        })

        window.onresize = function () {
            outerContainer.style.maxWidth = `${window.innerWidth * setting.popupScale}px`;
        };
    }



    private isIllust(json:PixivJson) {
        return json.body.illustType === 0
    }

    private isManga(json:PixivJson) {
        return json.body.illustType === 1 || (json.body.pageCount && Number(json.body.pageCount) > 1);
    }

    private isUgoira(json:PixivJson) {
        return json.body.illustType === 2
    }


    private static getUserID(json: PixivJson): string {
        return json.body.tags.authorId
    }

    private static getPageNum(json: PixivJson): number {
        return Number(json.body.pageCount)
    }

    /**
     * 設定ダイアログを用意する
     */
    async setConfigDialog() {
        const iconID: string = this.utilIcon
        const iconElem: HTMLElement = document.getElementById(this.utilIcon)
        if (iconElem === null) {
            await this.setIconElem(iconID)
            await this.setModal(iconID)
        }
    }

    /**
     * 設定アイコンをトップページにセットする
     * @param iconID
     */
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

    /**
     * ダイアログ（モーダル）をセットする
     * @param iconID
     */
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
    <div >
    Popup size
      <input type="range" value="0.7" min="0.3" max="1.2" step="0.1" id="pixiv-set-Scale" />
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
        const elem4 = document.getElementById('pixiv-set-Scale')


        setting.init().then(() => {
                // @ts-ignore
                if (setting.changeIllustPageLayout && !elem1.checked) elem1.checked = true
                // @ts-ignore
                if (setting.changeMemberPageLayout && !elem2.checked) elem2.checked = true
                // @ts-ignore
                if (setting.popup && !elem3.checked) elem3.checked = true
                // @ts-ignore
            elem4.value = String(setting.popupScale)

            }
        )

        /**
         * モーダルを閉じたときに設定を保存
         */
        closeButton.onclick = () => {
            modal.style.display = 'none';
            // @ts-ignore
            setting.changeIllustPageLayout = elem1.checked
            // @ts-ignore
            setting.changeMemberPageLayout = elem2.checked
            // @ts-ignore
            setting.popup = elem3.checked
            // @ts-ignore
            setting.popupScale=elem4.value
            setting.save()
            /*
            const outerContainer=document.getElementById(Util.outerContainerID)
            const page=new Page(document.URL)
            const util=new Util()
            util.onloadExecute(setting, page);
            util.removePopup()
            util.setPopup(outerContainer,page,setting)
            */
        }
        //modal画面の余白をクリックした場合
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }

    private changeMemberPageLayout() {
        // TODO もっと良い方法
        const h2Elems=document.getElementsByTagName('h2')
        if(typeof h2Elems !== 'undefined') {
            for(const h2elem  of h2Elems){
                if(h2elem.innerText.startsWith('イラスト')){
                    const illustElem = h2elem.parentElement.parentElement
                    const header = document.getElementsByTagName('header')[0]
                    const parent = header.parentNode;
                    parent.insertBefore(illustElem, header.nextSibling)
                    break
                }
            }

        }

    }

    private static isIllust(pixivJson: PixivJson) {
        return pixivJson.body.illustType === 0
    }
    private static isManga(pixivJson: PixivJson) {
        return pixivJson.body.illustType === 1 || (pixivJson.body.pageCount && Number(pixivJson.body.pageCount) > 1);
    }
    private static isUgoira(pixivJson: PixivJson) {
        return pixivJson.body.illustType === 2
    }




    private static addMouseMove(elm: HTMLElement) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let dragging=false
        const elementDrag=(e)=> {
            dragging=true
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
        }


        const closeDragElement=()=> {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            if(!dragging){
                this.cleanContainer(elm)
            }
            dragging=false
        }
        const dragMouseDown=(e)=> {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        elm.onmousedown = dragMouseDown;
        elm.onmouseleave = () => {
            this.cleanContainer(elm)
        };
    }
    removePopup() {
        const outerContainer= document.getElementById(Util.outerContainerID)
        Util.removeContainer(outerContainer)
    }

    private static cleanContainer(outerContainer) {

            const innerContainer= document.getElementById(this.innerContainerID)
            const captionContainer= document.getElementById(this.captionContainerID)
            innerContainer.innerText=''
            captionContainer.innerText=''
            outerContainer.style.display = 'none';
        }

    private static removeContainer(elem: HTMLElement) {
        elem.innerText=''
        elem.parentNode.removeChild(elem);
    }
}
