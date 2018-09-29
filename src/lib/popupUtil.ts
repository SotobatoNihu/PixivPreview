import {Manga} from "./manga";
import {prop, pagetype, uiComponent} from "./enum";
import {Page} from "./page";
import {Setting} from "./setting";
import {Util} from "./util";


export class PopupUtil {

    likeIcon = `<img src="https://s.pximg.net/www/js/spa/260127df5fe9ade778ec4be463deaf01.svg" width="12" height="12">`
    bookmarkIcon = `<svg viewBox="0 0 12 12" width="12" height="12" class="css-1hamw6p e1rs6xf14"><path fill="currentColor" d="
        M9,0.75 C10.6568542,0.75 12,2.09314575 12,3.75 C12,6.68851315 10.0811423,9.22726429 6.24342696,11.3662534
        L6.24342863,11.3662564 C6.09210392,11.4505987 5.90790324,11.4505988 5.75657851,11.3662565
        C1.9188595,9.22726671 0,6.68851455 0,3.75 C1.1324993e-16,2.09314575 1.34314575,0.75 3,0.75
        C4.12649824,0.75 5.33911281,1.60202454 6,2.66822994 C6.66088719,1.60202454 7.87350176,0.75 9,0.75 Z"></path></svg>`
    viewIcon = `<img src="https://s.pximg.net/www/js/spa/af74d092363c09fd06441a4ab04c9331.svg" width="14" height="12">`


    constructor() {
   }

    getImgContainer() {
        let imgContainer = document.createElement('div');
        imgContainer.id = 'imgContainer';
        //imgContainer.style.position='absolute'
        imgContainer.style.display = 'block'
        imgContainer.style.zIndex = '1000'
        imgContainer.style.backgroundColor = '#222'
        imgContainer.style.maxWidth = '1200px'

        imgContainer.style.whiteSpace = 'nowrap'
        imgContainer.style.padding = '5px'
        imgContainer.style.margin = '5px'


        imgContainer.style.maxWidth == window.innerHeight * 0.7 + 'px'
        imgContainer.style.width = 'auto'
        imgContainer.style.maxHeight = window.innerHeight * 0.7 + 'px'
        imgContainer.style.height = 'auto'

        return imgContainer
    }

    getImageElement() {
        let popupImg = document.createElement('img');
        popupImg.id = 'popupImg';
        popupImg.style.maxWidth = window.innerWidth * 0.7 + 'px'
        popupImg.style.width = 'auto'
        popupImg.style.maxHeight = window.innerHeight * 0.7 + 'px'
        popupImg.style.height = 'auto'

        return popupImg
    }

    getMangaContainer(document) {
        let mangaContainer = document.createElement('div');
        mangaContainer.id = 'mangaContainer';
        mangaContainer.style.display = 'block'
        mangaContainer.style.zIndex = '1500'
        mangaContainer.style.backgroundColor = '#111'
        mangaContainer.style.overflowX = 'auto'
        //mangaContainer.style.maxWidth = '1200px'
        mangaContainer.style.top = '0px'
        mangaContainer.style.left = '0px'
        mangaContainer.style.whiteSpace = 'nowrap'
        // mangaContainer.style.maxWidth = window.innerWidth * 0.5 + 'px';
        //mangaContainer.style.width = 'auto';
        //mangaContainer.style.maxHeight = window.innerHeight * 0.5 + 'px';
        //mangaContainer.style.height = 'auto';

        return mangaContainer
    }

    getOuterContainer(document) {
        let tmp = document.createElement('div');
        document.body.appendChild(tmp);
        let outerContainer = document.createElement('div');
        outerContainer.id = 'outerContainer';
        tmp.appendChild(outerContainer);
        outerContainer.style.position = 'absolute'
        outerContainer.style.display = 'block'
        outerContainer.style.zIndex = '1000'
        outerContainer.style.padding = '5px'
        outerContainer.style.backgroundColor = '#111'
        outerContainer.style.left = '0px';
        outerContainer.style.left = '0px';
        outerContainer.style.maxWidth = window.innerWidth * 0.7 + 'px';
        outerContainer.style.maxHeight = window.innerHeight * 0.7 + 'px';
        // uterContainer.style.marginLeft
        // uterContainer.style.marginTop

        return outerContainer
    }

    getCaptionContainer() {
        let captionContainer = document.createElement('div');
        captionContainer.id = 'captionContainer';
        captionContainer = document.createElement('div');
        captionContainer.style.whiteSpace = 'nowrap';
        captionContainer.style.display = 'block'
        captionContainer.style.zIndex = '1001'
        captionContainer.style.position = 'absolute'
        captionContainer.style.padding = '5px'
        captionContainer.style.maxWidth = window.innerWidth * 0.7 + 'px';
        captionContainer.style.top = '0px'
        captionContainer.style.left = '0px'
        captionContainer.style.backgroundColor = '#FFF'

        return captionContainer
    }


    popupImg(page, outerContainer, elem, json: JSON) {
        const children = outerContainer.children
        for (const child of children) {
            child.style.display = 'none'
        }
        outerContainer.textContent = null;

        const imgContainer = this.getImgContainer()
        outerContainer.appendChild(imgContainer);
        const imgElement = this.getImageElement()
        imgContainer.appendChild(imgElement);

        // @ts-ignore
        let imgHeight = Number(json.body.height)
        // @ts-ignore
        let imgWidth = Number(json.body.width)

        if (imgHeight > window.innerHeight * 0.6 || imgWidth > window.innerWidth * 0.6) {
            const heightScale = imgHeight / (window.innerHeight * 0.8)
            const widthScale = imgWidth / (window.innerWidth * 0.8)
            if (heightScale > widthScale) {
                imgHeight = (imgHeight / heightScale)
                imgWidth = (imgWidth / heightScale)
            } else {
                imgHeight = (imgHeight / widthScale)
                imgWidth = (imgWidth / widthScale)
            }
        }


        imgElement.src = this.getImgUrl(json)


        if ($(elem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }


        $(outerContainer).width(imgWidth+'px')
        $(outerContainer).height(imgHeight+'px')

        const offset=this.getOffset(outerContainer)
        outerContainer.style.top = offset.top + 'px'
        outerContainer.style.left = offset.left+ 'px'

         imgContainer.style.display = 'block';
        outerContainer.style.display = 'block';



        //imgContainer.style.display = 'block';
        //outerContainer.style.display = 'block';

    }

    private getOffset(outerContainer: HTMLElement): { top: number; left: number } {

        const w_height = $(window).height();
        const w_width = $(window).width();

        const el_height = $(outerContainer).height();
        const el_width = $(outerContainer).width();

        const scroll_height = $(window).scrollTop();

        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;

        return {top: Math.round( position_h), left: Math.round(position_w)};
    }


    popupCaption(outerContainer, json: JSON) {
        // @ts-ignore
        //const likeIcon = await GM.getResourceUrl("likeIcon");
        let tmpElem = this.getCaptionContainer()
        const id = 'captionContainer'
        let captionContainer
        if (document.getElementById(id) != null) {
            captionContainer = document.getElementById(id)
            captionContainer.innerText = null
            captionContainer.style.display = 'none';
        } else {
            captionContainer = tmpElem
            captionContainer.id = id
            $(captionContainer).insertBefore(outerContainer);
        }
        captionContainer.style.left = outerContainer.style.left


        let textElem=document.createElement('div')
        textElem.id= "popup-caption-text"
        // @ts-ignore
        textElem.innerHTML =json.body.description
        captionContainer.appendChild(textElem)

        let dateElem=document.createElement('div')
        dateElem.id="popup-caption-date"
        // @ts-ignore
        const date = new Date(json.body.createDate);
        dateElem.innerHTML =`upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        let infoElem=document.createElement('div')

        let likeElem=document.createElement('span');
        // @ts-ignore
        likeElem.innerHTML=`${this.likeIcon} ${json.body.likeCount} `
        let bookmarkElem=document.createElement('span');
        // @ts-ignore
        bookmarkElem.innerHTML =`${this.bookmarkIcon} ${json.body.bookmarkCount} `

        let viewElem=document.createElement('span');
        viewElem.id="popup-caption-view"
        // @ts-ignore
        viewElem.innerHTML =`${this.viewIcon}${json.body.viewCount}`

        infoElem.appendChild(dateElem)
        infoElem.appendChild(likeElem)
        infoElem.appendChild(bookmarkElem)
        infoElem.appendChild(viewElem)
        captionContainer.appendChild(infoElem)
        infoElem.style.fontSize='12px'
        infoElem.style.color='rgb(173, 173, 173)'
        infoElem.style.lineHeight='1'


        captionContainer.style.display = 'block';

        captionContainer.style.width = outerContainer.clientWidth + 'px'
        // @ts-ignore
        captionContainer.style.width = `${Number(json.body.width) / 2}px`
        captionContainer.style.backgroundColor = 'white'
        captionContainer.style.wordWrap = 'break-word'
        captionContainer.style.wordBreak = 'break-all'
        captionContainer.style.whiteSpace = 'normal'



        const y = parseInt(outerContainer.style.top) - parseInt(captionContainer.getBoundingClientRect().height);
        captionContainer.style.top = y + 'px';

        //  });
    }

    popupManga(outerContainer, hrefElem: HTMLElement, json: JSON, count: number) {

        const mangaContainer = this.getMangaContainer(document)
        outerContainer.appendChild(mangaContainer);

        const manga = new Manga()
        const children = outerContainer.children
        for (const child of children) {
            child.style.display = 'none'
        }

        if ($(hrefElem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        this.imgsArrInit(outerContainer, mangaContainer, manga, this.getImgUrl(json), count);
        $(outerContainer).width(outerContainer.style.maxWidth)
        $(outerContainer).height(outerContainer.style.maxHeight)

        const offset=this.getOffset(outerContainer)
        outerContainer.style.top = offset.top + 'px'
        outerContainer.style.left = offset.left+ 'px'
        mangaContainer.style.display = 'block';
        outerContainer.style.display = 'block';
        this.setScrool(outerContainer, mangaContainer, manga)

    }

    private getImgUrl(json: JSON) {
        // return json.body.urls.regular
        //// let url = $(elem).find('img').attr('src')
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        // @ts-ignore
        return json.body.urls.regular.replace(/\/...x...\//, '/600x600/')
    }


    private imgsArrInit(outerContainer, mangaContainer, manga, primaryLink: string, pageNum: number) {
        manga.pageNum = pageNum;
        for (let i = 0; i < pageNum; i++) {
            manga.imgsArr.push(document.createElement('img'))
            mangaContainer.appendChild(manga.imgsArr[i]);
            manga.imgsArr[i].src = primaryLink.replace('p0', 'p' + i);
            manga.imgsArr[i].style.maxWidth = outerContainer.style.maxWidth
            manga.imgsArr[i].style.maxHeight = outerContainer.style.maxHeight
            manga.imgsArr[i].style.height = outerContainer.style.maxHeight
            manga.imgsArr[i].style.width = 'auto'

        }

    }

    private getImageIDfromString(str: string) {
        //example:https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=70384088&page=0
        const pattern = /(.)+illust_id=([0-9]+)(&.+)?/
        const matches = str.match(pattern)
        const idString = matches[2]
        return Number(idString)
    }

    private setScrool(outerContainer: any, mangaContainer: any, manga) {
        mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (outerContainer.getBoundingClientRect().top < 0)) {
                outerContainer.scrollIntoView({block: "start", behavior: "smooth"}); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (outerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                outerContainer.scrollIntoView({block: "end", behavior: "smooth"}); //aligning to bottom screen side on scrollDown if needed
            }

            let scrlLft = mangaContainer.scrollLeft;
            if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                e.preventDefault();
                mangaContainer.scrollLeft += e.deltaY * manga.DELTASCALE; // TODO - find better value for opera/chrome
            }
        };
    }


    getHrefElement(page: Page, ctype: uiComponent, elem: HTMLElement) {
        if (page.pagetype === pagetype.member_illust) {
            return $(elem).parent()[0]
        }
        return $(elem).parent().find('a')[0]
    }


    isManga(json: JSON) {

        // @ts-ignore
        return json.body.illustType === '1' || (json.body.pageCount && Number(json.body.pageCount) > 1)
    }



}