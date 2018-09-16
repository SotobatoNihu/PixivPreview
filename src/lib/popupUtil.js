"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const manga_1 = require("./manga");
class PopupUtil {
    constructor() {
    }
    getImgContainer() {
        let imgContainer = document.createElement('div');
        imgContainer.id = 'imgContainer';
        //imgContainer.style.position='absolute'
        imgContainer.style.display = 'block';
        imgContainer.style.zIndex = '1000';
        imgContainer.style.backgroundColor = '#222';
        imgContainer.style.maxWidth = '1200px';
        imgContainer.style.whiteSpace = 'nowrap';
        imgContainer.style.padding = '5px';
        imgContainer.style.margin = '5px';
        return imgContainer;
    }
    getImageElement() {
        let popupImg = document.createElement('img');
        popupImg.id = 'popupImg';
        return popupImg;
    }
    getMangaContainer(document) {
        let mangaContainer = document.createElement('div');
        mangaContainer.id = 'mangaContainer';
        mangaContainer.style.display = 'block';
        mangaContainer.style.zIndex = '1500';
        mangaContainer.style.backgroundColor = '#111';
        mangaContainer.style.overflowX = 'auto';
        mangaContainer.style.maxWidth = '1200px';
        mangaContainer.style.top = '0px';
        mangaContainer.style.left = '0px';
        mangaContainer.style.whiteSpace = 'nowrap';
        let mangaWidth = document.body.clientWidth - 80;
        mangaContainer.style.maxWidth = mangaWidth + 'px';
        return mangaContainer;
    }
    getOuterContainer(document) {
        let tmp = document.createElement('div');
        document.body.appendChild(tmp);
        let outerContainer = document.createElement('div');
        outerContainer.id = 'outerContainer';
        tmp.appendChild(outerContainer);
        outerContainer.style.position = 'absolute';
        outerContainer.style.display = 'block';
        outerContainer.style.zIndex = '1000';
        outerContainer.style.padding = '5px';
        outerContainer.style.backgroundColor = '#111';
        outerContainer.style.maxWidth = '1200px';
        outerContainer.style.left = '0px';
        outerContainer.style.left = '0px';
        let mangaWidth = document.body.clientWidth - 80;
        outerContainer.style.maxWidth = mangaWidth + 'px';
        // uterContainer.style.marginLeft
        // uterContainer.style.marginTop
        return outerContainer;
    }
    getCaptionContainer() {
        let captionContainer = document.createElement('div');
        captionContainer.id = 'captionContainer';
        captionContainer = document.createElement('div');
        //captionContainer.style.position='absolute'
        captionContainer.style.whiteSpace = 'nowrap';
        captionContainer.style.display = 'block';
        captionContainer.style.zIndex = '1001';
        captionContainer.style.position = 'absolute';
        captionContainer.style.padding = '5px';
        captionContainer.style.maxWidth = '1200px';
        captionContainer.style.top = '0px';
        captionContainer.style.left = '0px';
        captionContainer.style.backgroundColor = '#FFF';
        return captionContainer;
    }
    getImgeSelector(popup_typeA) {
        return 'a[href*="member_illust.php?mode=medium&illust_id="] > div:only-child';
    }
    getMangaSelector(popup_typeA) {
        return 'a[href*="member_illust.php?mode=medium&illust_id="] > div:nth-child(2) ';
    }
    popupImg(page, outerContainer, elem) {
        const children = outerContainer.children;
        for (const child of children) {
            child.style.display = 'none';
        }
        outerContainer.textContent = null;
        const imgContainer = this.getImgContainer();
        outerContainer.appendChild(imgContainer);
        const imgElement = this.getImageElement();
        imgContainer.appendChild(imgElement);
        outerContainer.style.top = this.getOffsetRect(elem.parentNode.parentNode).top + 'px';
        imgContainer.style.top = outerContainer.style.top;
        imgElement.src = this.parseImgUrl(elem);
        const offset = this.getOffsetRect(elem.parentNode.parentNode);
        imgContainer.style.top = (this.getOffsetRect(elem.parentNode)).top + 'px';
        outerContainer.style.top = imgContainer.style.top; //+window.pageYOffset;
        let l = offset.left;
        let w = 600 * (((page.pageType === enum_1.pagetype.ranking) ? elem.clientWidth : elem.parentNode.parentNode.clientWidth) / page.siteImgMaxWidth) + 5;
        imgContainer.style.left = (document.body.clientWidth - l < w) ? document.body.clientWidth - w + 'px' : l + 'px';
        outerContainer.style.left = imgContainer.style.left;
        if ($(elem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        imgContainer.style.display = 'block';
        outerContainer.style.display = 'block';
    }
    popupCaption(outerContainer, imageID) {
        let tmpElem = this.getCaptionContainer();
        const id = 'captionContainer';
        let captionContainer;
        // if(document.getElementById(tmpElem.id)!=null){
        if (document.getElementById(id) != null) {
            captionContainer = document.getElementById(id);
            captionContainer.innerText = null;
            captionContainer.style.display = 'none';
        }
        else {
            captionContainer = tmpElem;
            captionContainer.id = id;
            $(captionContainer).insertBefore(outerContainer);
        }
        captionContainer.style.display = 'block';
        captionContainer.style.left = outerContainer.style.left;
        if (imageID === undefined || imageID.length === 0)
            return; //just in case
        const url = "https://www.pixiv.net/ajax/illust/" + imageID;
        console.log("url:" + url);
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            const date = new Date(json.body.createDate);
            const dateString = `<p><i>upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}</i></p>`;
            const infoString = `<p><i>like :${json.body.likeCount}, bookmark:${json.body.bookmarkCount}, view: ${json.body.viewCount}</i></p>`;
            captionContainer.innerHTML = json.body.description + dateString + infoString;
            const y = parseInt(outerContainer.style.top) - parseInt(captionContainer.getBoundingClientRect().height);
            captionContainer.style.top = y + 'px';
        });
    }
    popupManga(outerContainer, elem, count) {
        const mangaContainer = this.getMangaContainer(document);
        outerContainer.appendChild(mangaContainer);
        const manga = new manga_1.Manga();
        const children = outerContainer.children;
        for (const child of children) {
            child.style.display = 'none';
        }
        outerContainer.style.top = this.getOffsetRect(elem.parentNode.parentNode).top + 'px';
        mangaContainer.style.top = outerContainer.style.top;
        if ($(elem).hasClass("on")) {
            $(outerContainer).css("background", "rgb(255, 64, 96)");
        }
        else {
            $(outerContainer).css("background", "rgb(34, 34, 34)");
        }
        this.imgsArrInit(outerContainer, mangaContainer, manga, this.parseImgUrl(elem), +count);
        mangaContainer.style.display = 'block';
        outerContainer.style.display = 'block';
        this.setScrool(outerContainer, mangaContainer, manga);
    }
    parseImgUrl(elem) {
        let url = (elem.src) ? elem.src : elem.style.backgroundImage.slice(5, -2); //pixiv changes layout randomly
        url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
        return url;
    }
    getOffsetRect(elem) {
        // (1)
        let box = elem.getBoundingClientRect();
        // (2)
        let body = document.body;
        let docElem = document.documentElement;
        // (3)
        let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        // (4)
        let clientTop = docElem.clientTop || body.clientTop || 0;
        let clientLeft = docElem.clientLeft || body.clientLeft || 0;
        // (5)
        let top = box.top + scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    }
    imgsArrInit(outerContainer, mangaContainer, manga, primaryLink, l) {
        let margins = document.body.clientWidth - l * 600; //some blind frame adjusting
        if (margins > 0)
            outerContainer.style.left = margins / 2 - 10 + 'px';
        let currentImgId = this.getImgId(primaryLink);
        //---------------------------------------------------------------------------------
        if (currentImgId !== manga.getLastImgId()) {
            manga.imgsArr.forEach((item) => {
                item.src = '';
            });
            manga.lastImgId = currentImgId;
            for (let i = 0; i < l; i++) {
                if (!(!!manga.imgsArr[i])) //if [i] img element doesn't exist
                 {
                    manga.imgsArr[i] = document.createElement('img');
                    mangaContainer.appendChild(manga.imgsArr[i]);
                }
                ;
                manga.imgsArr[i].src = primaryLink.replace('p0', 'p' + i);
            }
        }
        //---------------------------------------------------------------------------------
    }
    getImgId(primaryLink) {
        return primaryLink.substring(primaryLink.lastIndexOf("/") + 1, primaryLink.indexOf("_"));
    }
    setScrool(outerContainer, mangaContainer, manga) {
        mangaContainer.onwheel = function (e) {
            if (e.deltaY < 0 && (outerContainer.getBoundingClientRect().top < 0)) {
                outerContainer.scrollIntoView({ block: "start", behavior: "smooth" }); //aligning to top screen side on scrollUp if needed
            }
            else if (e.deltaY > 0 && (outerContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                outerContainer.scrollIntoView({ block: "end", behavior: "smooth" }); //aligning to bottom screen side on scrollDown if needed
            }
            let scrlLft = mangaContainer.scrollLeft;
            if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                e.preventDefault();
                mangaContainer.scrollLeft += e.deltaY * manga.DELTASCALE; // TODO - find better value for opera/chrome
            }
        };
    }
}
exports.PopupUtil = PopupUtil;
