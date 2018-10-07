import {Manga} from "./manga";
import {pagetype, uiComponent} from "./enum";
import {Page} from "./page";
import {ContainerFactory} from './ContainerFactory';
import {PixivJson} from './jsonInterface';

export class PopupUtil {
    // icon images
    likeIcon:string = `<img src="https://s.pximg.net/www/js/spa/260127df5fe9ade778ec4be463deaf01.svg" width="12" height="12">`
    bookmarkIcon:string = `<svg viewBox="0 0 12 12" width="12" height="12" class="css-1hamw6p e1rs6xf14"><path fill="currentColor" d="
        M9,0.75 C10.6568542,0.75 12,2.09314575 12,3.75 C12,6.68851315 10.0811423,9.22726429 6.24342696,11.3662534
        L6.24342863,11.3662564 C6.09210392,11.4505987 5.90790324,11.4505988 5.75657851,11.3662565
        C1.9188595,9.22726671 0,6.68851455 0,3.75 C1.1324993e-16,2.09314575 1.34314575,0.75 3,0.75
        C4.12649824,0.75 5.33911281,1.60202454 6,2.66822994 C6.66088719,1.60202454 7.87350176,0.75 9,0.75 Z"></path></svg>`
    viewIcon:string = `<img src="https://s.pximg.net/www/js/spa/af74d092363c09fd06441a4ab04c9331.svg" width="14" height="12">`



    //css strings
    mangaContainerCSS:string
        = `display:block;
            background-color:black;
            overflow-x:auto;
            white-space:nowrap;
            `

    imgContainerCSS:string
        = `width: auto; 
            height:auto;
            display:block;
            `

    infoContainerCSS:string
        = `font-size: 12px; 
            color:rgb(173, 173, 173); 
            line-height=1;`


    captionContainerCSS(outerContainer:HTMLElement):string{
        return  `
        white-space:pre-wrap;
        display:block;
        z-index:1001;
        position:absolute;
        border: 1px solid black;
        max-width:${outerContainer.clientWidth+10}px;
        background-color:white;
        word-wrap:break-word;
        word-break:break-all;
        left:${outerContainer.style.left}px;
        width:${outerContainer.clientWidth+10}px;
        `
    }
    constructor() {
    }


    popupImg(page:Page, outerContainer:HTMLElement, elem:HTMLElement, json: PixivJson) {
        outerContainer.textContent = null;

        const factory = new ContainerFactory()

        const imgElement =factory.setId('popupImg')
            .setVoidHtml()
            .setCSS(this.imgContainerCSS)
            .createImg()

        outerContainer.appendChild(imgElement);
        imgElement.src = this.getImgUrl(json)

        if ($(elem).hasClass("on")) {
            outerContainer.style.border='5px solid rgb(255, 64, 96)'
           // $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            outerContainer.style.border='5px solid rgb(34, 34, 34)'
            //$(outerContainer).css("background", "rgb(34, 34, 34)");
        }

        let imgHeight = Number(json.body.height)
        let imgWidth = Number(json.body.width)

        if (imgHeight > window.innerHeight * 0.8 || imgWidth > window.innerWidth * 0.8) {
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

        // display container
        imgElement.style.width=`${imgWidth}px`
        imgElement.style.height=`${imgHeight}px`
        outerContainer.style.width=`${imgWidth}px`
        outerContainer.style.height=`${imgHeight}px`
        outerContainer.style.display = 'block';

        //set container
        const offset = this.getOffset(outerContainer)
        outerContainer.style.top = offset.top + 'px'
        outerContainer.style.left = offset.left + 'px'

    }

    private getOffset(outerContainer: HTMLElement): { top: number; left: number } {

        const w_height = $(window).height();
        const w_width = $(window).width();

        const el_height = $(outerContainer).height();
        const el_width = $(outerContainer).width();

        const scroll_height = $(window).scrollTop();

        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;

        return {top: Math.round(position_h), left: Math.round(position_w)};
    }


    popupCaption(outerContainer:HTMLElement, json: PixivJson) {

        const factory = new ContainerFactory()

        const captionId = 'captionContainer'
        this.deleteElementById(captionId)


        const descriptionString: string = json.body.description
        const descriptionElem: HTMLElement = factory.setId('popup-caption-text')
            .setInnerHtml(descriptionString)
            .createDiv()


        const date = new Date(json.body.createDate);
        const dateString:string=  `upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        const dateElem: HTMLElement = factory.setId('popup-caption-date').setInnerHtml(dateString).createDiv()


        const likeString:string=   `${this.likeIcon} ${json.body.likeCount} `
        const likeElem : HTMLElement = factory.setId('popup-caption-like').setInnerHtml(likeString).createSpan()


        const bookmarkString:string=   `${this.bookmarkIcon} ${json.body.bookmarkCount} `
        const bookmarkElem: HTMLElement  = factory.setId('popup-caption-bookmark').setInnerHtml(bookmarkString).createSpan()


        const viewString:string= `${this.viewIcon}${json.body.viewCount}`
        const viewElem: HTMLElement  = factory.setId('popup-caption-view').setInnerHtml(viewString).createSpan()


        const infoElem: HTMLElement = factory
            .setId('popup-caption-infomation')
            .setVoidHtml()
            .setCSS(this.infoContainerCSS)
            .createDiv()

        infoElem.appendChild(dateElem)
        infoElem.appendChild(likeElem)
        infoElem.appendChild(bookmarkElem)
        infoElem.appendChild(viewElem)

        const captionContainer: HTMLElement = factory.setId(captionId)
            .setCSS(this.captionContainerCSS(outerContainer))
            .setVoidHtml()
            .createDiv()
        captionContainer.appendChild(descriptionElem)
        captionContainer.appendChild(infoElem)

        outerContainer.parentNode.insertBefore(captionContainer,outerContainer)

        const y = parseInt(outerContainer.style.top) -captionContainer.getBoundingClientRect().height;
        captionContainer.style.top = y + 'px';
        captionContainer.style.left = outerContainer.style.left;
    }

    private deleteElementById(id: string) {
        const elem = document.getElementById(id)
        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }
    }

    popupManga(outerContainer, hrefElem: HTMLElement, json: PixivJson, count: number) {

        const factory = new ContainerFactory()
        const mangaContainer=factory.setId('mangaContainer')
            .setVoidHtml()
            .setCSS(this.mangaContainerCSS)
            .createDiv()


            //this.getMangaContainer(document)
        outerContainer.appendChild(mangaContainer);

        const manga = new Manga()
       // outerContainer.children.forEach(child =>child.style.display = 'none')

        for (const child of outerContainer.children) {
            child.style.display = 'none'
        }


        if ($(hrefElem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        this.imgsArrInit(outerContainer, mangaContainer, manga, this.getImgUrl(json), count);

        outerContainer.style.width=outerContainer.style.maxWidth
        outerContainer.style.height=outerContainer.style.maxHeight

        const offset = this.getOffset(outerContainer)
        outerContainer.style.top = `${offset.top}px`
        outerContainer.style.left = `${offset.left}px`
        mangaContainer.style.display = 'block';
        outerContainer.style.display = 'block';
        this.setScrool(outerContainer, mangaContainer, manga)

    }

    private getImgUrl(json: PixivJson) {
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant

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


    isManga(json: PixivJson): boolean {
        return json.body.illustType === 1 || (json.body.pageCount && Number(json.body.pageCount) > 1)
    }


}