"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manga_1 = require("./manga");
const enum_1 = require("./enum");
const ContainerFactory_1 = require("./ContainerFactory");
const ugoira_1 = require("./ugoira");
/**
 * ポップアップ機能用のユーティリティツール群
 *
 */
class PopupUtil {
    constructor() {
        //キャプションに表示するアイコン群
        this.likeIcon = `<img src="https://s.pximg.net/www/js/spa/260127df5fe9ade778ec4be463deaf01.svg" width="12" height="12">`;
        this.bookmarkIcon = `<svg viewBox="0 0 12 12" width="12" height="12" class="css-1hamw6p e1rs6xf14"><path fill="currentColor" d="
        M9,0.75 C10.6568542,0.75 12,2.09314575 12,3.75 C12,6.68851315 10.0811423,9.22726429 6.24342696,11.3662534
        L6.24342863,11.3662564 C6.09210392,11.4505987 5.90790324,11.4505988 5.75657851,11.3662565
        C1.9188595,9.22726671 0,6.68851455 0,3.75 C1.1324993e-16,2.09314575 1.34314575,0.75 3,0.75
        C4.12649824,0.75 5.33911281,1.60202454 6,2.66822994 C6.66088719,1.60202454 7.87350176,0.75 9,0.75 Z"></path></svg>`;
        this.viewIcon = `<img src="https://s.pximg.net/www/js/spa/af74d092363c09fd06441a4ab04c9331.svg" width="14" height="12">`;
        //各種elementに使用するID
        this.innerContainerID = 'popup-inner-container';
        this.outerContainerID = 'popup-outer-container';
        this.imgContainerID = 'popup-img';
        this.mangaContainerID = 'popup-manga';
        this.ugoiraContainerID = 'popup-ugoira';
        this.captionContainerID = 'popup-caption-container';
        this.captionDescriptionID = 'popup-caption-text';
        this.captionTagID = 'popup-caption-tag';
        this.captionDateID = 'popup-caption-date';
        this.captionLikeID = 'popup-caption-like';
        this.captionBookmarkID = 'popup-caption-bookmark';
        this.captionViewID = 'popup-caption-view';
        this.captionInfoID = 'popup-caption-infomation';
        this.popupClass = 'popup-util';
        //各種elementのcss
        this.mangaContainerCSS = ` background-color:black;
           overflow-x:auto;
           white-space:nowrap;
           width: auto; 
           height:auto;
           left: 0;
           top: 0;
            `;
        this.infoContainerCSS = `
        background-color:white;
        font-size:xx-small;
        width: auto;
        color:rgb(173, 173, 173); 
        line-height=1;`;
        this.imgContainerCSS = `width: 100%; 
          height:100%;
          left: 0;
          top: 0;
          background-size: contain;
          background-position:center; 
          background-repeat:no-repeat;
            `;
        this.descriptionContainerCSS = `font-size: normal; 
          width: auto; 
          height:auto;
          overflow-y:scroll;`;
    }
    pixpediaCSS(innerContainer) {
        return `
        white-space:pre-wrap;
        font-size:small; 
        z-index:10001;
        position:relative;
        border: 1px solid black;
        max-width:${innerContainer.clientWidth + 10}px;
        background-color:white;
        word-wrap:break-word;
        word-break:break-all;
        left:auto;
        width:auto;
        `;
    }
    /**
     * イラストをポップアップする
     * 外枠であるinnerContainerに、その他情報を元に画像elementをはめ込む
     *
     * @param page
     * @param innerContainer
     * @param elem
     * @param json
     */
    popupImg(page, outerContainer, elem, json, scale) {
        const innerContainer = document.getElementById(this.innerContainerID);
        //中身を綺麗にする
        innerContainer.innerHTML = '';
        const factory = new ContainerFactory_1.ContainerFactory();
        const imgElement = factory.setId(this.imgContainerID)
            .setClass(this.popupClass)
            .setCSS(this.imgContainerCSS)
            .createDiv();
        innerContainer.appendChild(imgElement);
        // imgElement.src = this.getImgUrl(json)
        imgElement.style.backgroundImage = `url(${json.body.urls.regular})`;
        if ($(elem).hasClass("on")) {
            innerContainer.style.border = '5px solid rgb(255, 64, 96)';
            // $(innerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            innerContainer.style.border = '5px solid rgb(34, 34, 34)';
            //$(innerContainer).css("background", "rgb(34, 34, 34)");
        }
        //大きすぎる場合はリサイズする
        const resize = this.resize(json.body.width, json.body.height, scale);
        let imgHeight = resize.height;
        let imgWidth = resize.width;
        outerContainer.style.width = `${imgWidth}px`;
        outerContainer.style.height = `${imgHeight}px`;
    }
    /**
     * 大きさがあるHTMLelementを引数に、それが画面の中央に表示されるようになるelementのtop・leftの値を返す
     * @param elem
     */
    getOffset(elem) {
        const w_height = $(window).height();
        const w_width = $(window).width();
        const el_height = $(elem).height();
        const el_width = $(elem).width();
        const scroll_height = $(window).scrollTop();
        const position_h = scroll_height + (w_height - el_height) / 2;
        const position_w = (w_width - el_width) / 2;
        return { top: Math.round(position_h), left: Math.round(position_w) };
    }
    /**
     * キャプションをポップアップする
     * テキスト、タグ、その他情報(ブックマーク等)を,それぞれelementを用意しコンテナとして箱詰めし、innerContainerに付与する
     * @param innerContainer
     * @param json
     */
    popupCaption(outerContainer, json) {
        const captionContainer = document.getElementById(this.captionContainerID);
        const innerContainer = document.getElementById(this.innerContainerID);
        //既存のキャプションコンテナがあれば破棄
        captionContainer.innerText = '';
        //テキストコンテナを作成
        const factory = new ContainerFactory_1.ContainerFactory();
        const descriptionElem = factory.setId(this.captionDescriptionID)
            .setClass(this.popupClass)
            .setCSS(this.descriptionContainerCSS)
            .setInnerHtml(json.body.description)
            .createDiv();
        const tagElem = factory.setId(this.captionTagID)
            .setClass(this.popupClass)
            .createDiv();
        tagElem.appendChild(this.getTagHtml(json));
        //投稿日
        const date = new Date(json.body.createDate);
        const dateString = `upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        const dateElem = factory.setId(this.captionDateID).setInnerHtml(dateString).createDiv();
        //like数
        const likeString = `${this.likeIcon} ${json.body.likeCount} `;
        const likeElem = factory.setId(this.captionLikeID).setClass(this.popupClass).setInnerHtml(likeString).createSpan();
        //ブックマーク数
        const bookmarkString = `${this.bookmarkIcon} ${json.body.bookmarkCount} `;
        const bookmarkElem = factory.setId(this.captionBookmarkID).setClass(this.popupClass).setInnerHtml(bookmarkString).createSpan();
        //閲覧数
        const viewString = `${this.viewIcon}${json.body.viewCount}`;
        const viewElem = factory.setId(this.captionViewID).setClass(this.popupClass).setInnerHtml(viewString).createSpan();
        //infoコンテナに各elementを詰める
        const infoElem = factory
            .setId(this.captionInfoID)
            .setClass(this.popupClass)
            .setCSS(this.infoContainerCSS)
            .createDiv();
        infoElem.appendChild(dateElem);
        infoElem.appendChild(likeElem);
        infoElem.appendChild(bookmarkElem);
        infoElem.appendChild(viewElem);
        //キャプション用コンテナにテキストコンテナとinfoコンテナを詰める
        captionContainer.appendChild(descriptionElem);
        captionContainer.appendChild(tagElem);
        captionContainer.appendChild(infoElem);
    }
    /**
     * タグ情報を格納したHTMLelementを作成する
     */
    getTagHtml(json) {
        let outerTagElem = document.createElement('ul');
        // @ts-ignore
        outerTagElem.style.paddingInlineStart = '0px';
        //outerTagElem.setAttribute('align','left')
        for (const tagJson of json.body.tags.tags) {
            let iconElem = document.createElement('a');
            iconElem.className = `${tagJson.romaji || tagJson.locked ? "popup-pixpedia-icon" : "popup-pixpedia-no-icon"}`;
            iconElem.setAttribute('href', `https://dic.pixiv.net/a/${tagJson.tag}`);
            let innerTagElem = document.createElement('li');
            innerTagElem.innerHTML = ` ${tagJson.locked ? "<span>＊<span>" : ""}${tagJson.tag}`;
            innerTagElem.style.cssText = 'display: inline-block;';
            innerTagElem.appendChild(iconElem);
            outerTagElem.appendChild(innerTagElem);
        }
        return outerTagElem;
    }
    /**
     * 漫画をポップアップする
     * @param innerContainer
     * @param hrefElem
     * @param json
     * @param count
     */
    popupManga(outerContainer, hrefElem, json, count) {
        const innerContainer = document.getElementById(this.innerContainerID);
        //中身を綺麗にする
        innerContainer.innerHTML = '';
        const factory = new ContainerFactory_1.ContainerFactory();
        const mangaContainer = factory.setId(this.mangaContainerID)
            .setClass(this.popupClass)
            .setCSS(this.mangaContainerCSS)
            .createDiv();
        innerContainer.appendChild(mangaContainer);
        const manga = new manga_1.Manga();
        if ($(hrefElem).hasClass("on")) {
            $(innerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(innerContainer).css("background", "rgb(34, 34, 34)");
        }
        //各ページをセット
        this.imgsArrInit(innerContainer, mangaContainer, manga, this.getImgUrl(json), count);
        outerContainer.style.width = innerContainer.style.maxWidth;
        outerContainer.style.height = innerContainer.style.maxHeight;
        /*
        outerContainer.style.width = innerContainer.style.maxWidth
        outerContainer.style.height = innerContainer.style.maxHeight
        innerContainer.style.width = innerContainer.style.maxWidth
        innerContainer.style.height = innerContainer.style.maxHeight

        mangaContainer.style.display = 'block';
        innerContainer.style.display = 'block';

*/
        //スクロールをセット
        this.setScrool(innerContainer, mangaContainer, manga);
    }
    /**
     * 画像のURLを取得
     * @param json
     */
    getImgUrl(json) {
        //url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return json.body.urls.regular.replace(/\/...x...\//, '/600x600/');
    }
    /**
     * imgエレメントの配列を作成し漫画の各ページを格納
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     * @param primaryLink
     * @param pageNum
     */
    imgsArrInit(innerContainer, mangaContainer, manga, primaryLink, pageNum) {
        manga.pageNum = pageNum;
        for (let i = 0; i < pageNum; i++) {
            manga.imgsArr.push(document.createElement('img'));
            mangaContainer.appendChild(manga.imgsArr[i]);
            manga.imgsArr[i].src = primaryLink.replace('p0', 'p' + i);
            manga.imgsArr[i].style.maxWidth = innerContainer.style.maxWidth;
            manga.imgsArr[i].style.maxHeight = innerContainer.style.maxHeight;
            manga.imgsArr[i].style.height = innerContainer.style.maxHeight;
            manga.imgsArr[i].style.width = 'auto';
        }
    }
    /**
     * mangaコンテナ上でスクロール機能を実現
     * @param innerContainer
     * @param mangaContainer
     * @param manga
     */
    setScrool(innerContainer, mangaContainer, manga) {
        mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (innerContainer.getBoundingClientRect().top < 0)) {
                innerContainer.scrollIntoView({ block: "start", behavior: "smooth" }); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (innerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                innerContainer.scrollIntoView({ block: "end", behavior: "smooth" }); //aligning to bottom screen side on scrollDown if needed
            }
            let scrlLft = mangaContainer.scrollLeft;
            if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                e.preventDefault();
                mangaContainer.scrollLeft += e.deltaY * manga.DELTASCALE; // TODO - find better value for opera/chrome
            }
        };
    }
    getHrefElement(page, ctype, elem) {
        if (page.pagetype === enum_1.pagetype.member_illust) {
            return $(elem).parent()[0];
        }
        return $(elem).parent().find('a')[0];
    }
    async popupUgoira(outerContainer, hrefElem, pixivJson, ugoiraMetaJson, scale) {
        const innerContainer = document.getElementById(this.innerContainerID);
        innerContainer.innerHTML = '';
        let finished = false;
        const factory = new ContainerFactory_1.ContainerFactory();
        innerContainer.textContent = null;
        const ugoiraContainer = factory
            .setId(this.ugoiraContainerID)
            .setClass(this.popupClass)
            .createDiv();
        innerContainer.appendChild(ugoiraContainer);
        let myHeaders = new Headers();
        myHeaders.append("Accept-Encoding", "gzip, deflate, br");
        myHeaders.append("Connection", 'keep-alive');
        myHeaders.append("HOST", "www.pixiv.net");
        const myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'same-origin',
            credentials: 'same-origin',
            cache: 'default'
        };
        // @ts-ignore
        let zip = new JSZip();
        const ugoira = new ugoira_1.Ugoira();
        const frames = ugoiraMetaJson.body.frames;
        // const ImgElem: HTMLImageElement = document.createElement('img')
        const zipData = await fetch(ugoiraMetaJson.body.src, {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            keepalive: true
        }).then(response => {
            if (response.ok) {
                return response.blob();
            }
        }).then(async (zipData) => {
            await zip.loadAsync(zipData, { base64: true });
        }).then(async () => {
            for (let frame of frames) {
                ugoira.pushFrame(frame.delay);
                await zip.file(frame.file)
                    .async("base64", function updateCallback(metadata) {
                    console.log("progression: " + metadata.percent.toFixed(2) + " %");
                    if (metadata.percent === 100) {
                        finished = true;
                    }
                })
                    .then(function success(content) {
                    ugoira.pushImgString(`data:image/jpeg;base64,${content}`);
                }, function error(e) {
                    console.log("download error.");
                });
            }
        }).then(() => {
            //innerContainer.appendChild(ImgElem);
            const canvas = document.createElement('canvas');
            const size = this.resize(pixivJson.body.width, pixivJson.body.height, scale);
            canvas.width = size.width;
            canvas.height = size.height;
            outerContainer.style.width = `${size.width}px`;
            outerContainer.style.height = `${size.height}px`;
            innerContainer.style.width = `${size.width}px`;
            innerContainer.style.height = `${size.height}px`;
            ugoiraContainer.appendChild(canvas);
            $(innerContainer).css("background", "rgb(34, 34, 34)");
            // ugoiraContainer.style.display = 'block';
            //innerContainer.style.display = 'block';
            //表示位置を調整
            //  const captionContainer=document.getElementById(this.captionContainerID)
            // captionContainer.style.width=`${size.width}px`
            // captionContainer.style.top = `${-captionContainer.getBoundingClientRect().height}px`;
            const frameArray = ugoira.getFrameArray;
            const stringArray = ugoira.getImgStringArray;
            let index = 0;
            const counter = () => {
                // ImgElem.src = stringArray[index]
                index += 1;
                index = index === stringArray.length ? 0 : index;
                const img = new Image();
                img.src = stringArray[index];
                const context = canvas.getContext('2d');
                //座標(10, 10)の位置にイメージを表示
                context.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
                setTimeout(counter, frameArray[index]);
            };
            counter();
        });
    }
    isIllust(json) {
        return json.body.illustType === 0;
    }
    isManga(json) {
        return json.body.illustType === 1 || (json.body.pageCount && Number(json.body.pageCount) > 1);
    }
    isUgoira(json) {
        return json.body.illustType === 2;
    }
    resize(width, height, scale) {
        let newHeight = height;
        let newWidth = width;
        if (height > window.innerHeight * scale || width > window.innerWidth * scale) {
            const heightScale = height / Number(window.innerHeight * scale);
            const widthScale = width / Number(window.innerWidth * scale);
            if (heightScale > widthScale) {
                newHeight /= heightScale;
                newWidth /= heightScale;
            }
            else {
                newHeight /= widthScale;
                newWidth /= widthScale;
            }
        }
        return { width: Math.round(newWidth), height: Math.round(newHeight) };
    }
    addMouseMove(elm) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let dragging = false;
        const elementDrag = (e) => {
            dragging = true;
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
        };
        const closeDragElement = () => {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            if (!dragging) {
                this.cleanContainer(elm);
            }
            dragging = false;
        };
        const dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        };
        elm.onmousedown = dragMouseDown;
        elm.onmouseleave = () => {
            this.cleanContainer(elm);
        };
    }
    cleanContainer(outerContainer) {
        const innerContainer = document.getElementById(this.innerContainerID);
        const captionContainer = document.getElementById(this.captionContainerID);
        innerContainer.innerText = '';
        captionContainer.innerText = '';
        outerContainer.style.display = 'none';
    }
    adjustCaption() {
        //画面の表示調節を行う
        const innerContainer = document.getElementById(this.innerContainerID);
        const outerContainer = document.getElementById(this.outerContainerID);
        const captionContainer = document.getElementById(this.captionContainerID);
        const descriptionContainer = document.getElementById(this.captionDescriptionID);
        const tagContainer = document.getElementById(this.captionTagID);
        const infoContainer = document.getElementById(this.captionInfoID);
        if (descriptionContainer.clientHeight > 100) {
            descriptionContainer.style.height = `${100}px`;
        }
        const offset = this.getOffset(outerContainer);
        outerContainer.style.left = `${offset.left}px`;
        outerContainer.style.top = `${offset.top}px`;
        captionContainer.style.width = `${outerContainer.offsetWidth + 10}px`;
    }
}
exports.PopupUtil = PopupUtil;
