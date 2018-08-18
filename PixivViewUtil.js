// ==UserScript==
// @name            Pixiv View Util
// @namespace       Pixiv View Util
// @description     change the layout of caption. open comments automatically. add popup tool.
// @author          sotoba
// @match           https://www.pixiv.net/bookmark_new_illust.php*
// @match           https://www.pixiv.net/discovery*
// @match           https://www.pixiv.net/bookmark_detail.php?illust_id=*
// @match           https://www.pixiv.net/bookmark_add.php?id=*
// @match           https://www.pixiv.net/member_illust.php*
// @match           https://www.pixiv.net/ranking.php?mode=*
// @match           https://www.pixiv.net/member.php?id=*
// @match           https://www.pixiv.net/bookmark.php*
// @match           https://www.pixiv.net/search.php*
// @match           https://www.pixiv.net*
// @version         0.0.1.20180819
// @homepageURL     https://github.com/SotobatoNihu/PixivViewUtil
// @license         MIT License
// @require         https://code.jquery.com/jquery-3.2.1.min.js
// @grant           GM.getValue
// @grant           GM.setValue
// ==/UserScript==

/*
this script is based on "Pixiv Arts Preview & Followed Atrists Coloring"(MIT license).
for more details,please visit folows:
https://greasyfork.org/ja/scripts/39387-pixiv-arts-preview-followed-atrists-coloring
https://github.com/NightLancer/PixivPreview
*/

(function () {
    'use strict';
    /*
    設定画面やsave & load 機能を実装予定
     */
    async function init() {
        const default_setting = {
            changeLayout: true,
            openComment: true,
            popup: true
        }
        return await GM.getValue("pixiv_viewutil_setting", JSON.stringify(default_setting));
    }

    const prop = {
        changeLayout: Symbol("changeLayout"),
        popup_typeA: Symbol("popup_typeA"),
        popup_typeB: Symbol("popup_typeB"),
        openComment: Symbol("openComment")
    }


    if (window.top == window.self && window.jQuery) {
        jQuery(function ($) {
            class Setting {
                constructor(jsonString) {
                    this.changeLayout = true;
                    this.openComment = true;
                    this.popup = true;
                }

                set setData(value) {
                    /*
                    const jsonData = JSON.parse(value);
                    this.isChangeLayout = (jsonData.this.isChangeLayout == null) ? true : jsonData.this.isChangeLayout;
                    this.isOpenComment = (jsonData.this.isOpenComment == null) ? true : jsonData.this.isOpenComment;
                    */
                    this.changeLayout = true;
                    this.openComment = true;
                    this.popup = true;
                }
            }

            const pagetype = {
                top: Symbol("top"),                    // my top page
                bookmark_new_illust: Symbol("bookmark_new_illust"), //Works from favourite artists
                discovery: Symbol("discovery"),              //Discovery page
                member_illust: Symbol("member_illust"),          //Artist works page
                member: Symbol("member"),                //Artist "top" page
                bookmark_detail: Symbol("bookmark_detail"),         //Bookmark information
                bookmark_add: Symbol("bookmark_add"),           //Added new bookmarks
                ranking: Symbol("ranking"),                 //Daily rankings
                bookmark_id: Symbol("bookmark_id"),             //Someone's bookmarks page
                search: Symbol("search"),                 //Search page
                bookmark: Symbol("bookmark"),                //Your bookmarks page
                other: Symbol("other"),
            };


            //   function checkPageType(url) {
            const checkPageType = (url) => {
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
            }

            const getAllowedFuncList = (type) => {
                switch (type) {
                    case pagetype.top:
                        return [prop.popup_typeB];
                        break;
                    case pagetype.bookmark_new_illust:
                        return [prop.popup_typeA];
                        break;
                    case pagetype.discovery:
                        return [prop.popup_typeA];
                        break;
                    case pagetype.member_illust:
                        return [prop.popup_typeB, prop.changeLayout, prop.openComment];
                        break;
                    case pagetype.member:
                        return [prop.popup_typeB];
                        break;
                    case pagetype.bookmark_detail:
                        return [prop.popup_typeB];
                        break;
                    case pagetype.bookmark_add:
                        return [prop.popup_typeB];
                        break;
                    case pagetype.bookmark_id:
                        return [prop.popup_typeB];
                        break;
                    case pagetype.search:
                        return [prop.popup_typeA];
                        break;
                    case pagetype.ranking:
                        return [prop.popup_typeB];
                        break;
                    case pagetype.bookmark:
                        return [prop.popup_typeB];
                        break;
                        return [];
                }
            }

            class Util {
                changeLayout() {
                    const figure = document.getElementsByTagName("figure");
                    $('figure').before($('figcaption'));
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
                }

                setPopup(type) {
                    let imgContainer = document.createElement('div');
                    imgContainer.id = 'imgContainer';
                    imgContainer.style = 'position:absolute; display:block; z-index:1000; background:#222; padding:5px; margin:-5px;';

                    let popupImg = document.createElement('img');
                    popupImg.id = 'popupImg';
                    imgContainer.appendChild(popupImg);
                    let captionContainer = document.createElement('div');
                    captionContainer.id = 'captionContainer';

                    let mangaContainer = document.createElement('div');
                    mangaContainer.id = 'mangaContainer';
                    mangaContainer.style = 'display:block; z-index:1500; background:#111; overflow-x:auto; maxWidth:1200px; white-space:nowrap;';

                    let mangaOuterContainer = document.createElement('div');
                    mangaOuterContainer.style = 'position:absolute; display:block; z-index:1000; padding:5px; background:#111; maxWidth:1200px; marginY:-5px; marginX: auto;';
                    mangaOuterContainer.appendChild(mangaContainer);

                    let imgsArr = [], //for manga-style image packs...
                        followedUsersId = [], //storing followed users pixiv ID
                        BOOKMARK_URL = 'https://www.pixiv.net/bookmark.php',
                        CheckedPublic = false,
                        Checked = false,
                        artsContainers,
                        artsLoaded = 0,
                        hits = 0,
                        isRunning = false,
                        lastImgId = " ",
                        siteImgMaxWidth = 150, //for now it is used for pagetype==7
                        mangaWidth = 1200,
                        bookmarkObj,
                        DELTASCALE = ('mozInnerScreenX' in window) ? 70 : 4,
                        PAGETYPE = checkPageType(document.URL);

                    mangaWidth = document.body.clientWidth - 80;
                    mangaContainer.style.maxWidth = mangaOuterContainer.style.maxWidth = mangaWidth + 'px';
                    document.body.appendChild(imgContainer);
                    document.body.appendChild(captionContainer);
                    document.body.appendChild(mangaOuterContainer);

                    function setCaption(imageID, x, y) {
                        if (imageID === undefined || imageID.length === 0) return; //just in case
                        const url = "https://www.pixiv.net/ajax/illust/" + imageID;
                        console.log("url:" + url);

                        fetch(url).then(function (response) {

                            return response.json();
                        }).then(function (json) {

                            //captionContainer.style="position: absolute; display: block; z-index: 1001; background: rgb(255, 255, 255);  top: 0px; left: 0px; color:black "
                            captionContainer.innerHTML = json.body.description;
                            x = x - parseInt($(captionContainer).height());
                            captionContainer.style = "position: absolute; display: block; z-index: 1001; background: rgb(255, 255, 255); padding: 5px; margin: -5px; top: " + x + "px; left: " + y + "px; color:black "
                        });
                    }

                    function hoverImg(thisObj) {
                        mangaOuterContainer.style.display = 'none';
                        popupImg.src = parseImgUrl(thisObj);
                        imgContainer.style.top = getOffsetRect(thisObj.parentNode.parentNode).top + 'px';
                        //adjusting preview position considering expected image width
                        let l = getOffsetRect(thisObj.parentNode.parentNode).left;
                        let w = 600 * (((PAGETYPE == pagetype.ranking) ? thisObj.clientWidth : thisObj.parentNode.parentNode.clientWidth) / siteImgMaxWidth) + 5;
                        imgContainer.style.left = (document.body.clientWidth - l < w) ? document.body.clientWidth - w + 'px' : l + 'px';

                        if ($(bookmarkObj).hasClass("on")) {
                            $(imgContainer).css("background", "rgb(255, 64, 96)");
                        }
                        else {
                            $(imgContainer).css("background", "rgb(34, 34, 34)");
                        }
                        imgContainer.style.display = 'block';
                    }

                    function hoverManga(thisObj, count) {

                        imgContainer.style.display = 'none'; //just in case
                        mangaOuterContainer.style.top = getOffsetRect(thisObj.parentNode.parentNode).top + 'px';
                        mangaOuterContainer.style.left = '30px';
                        if ($(bookmarkObj).hasClass("on")) {
                            $(mangaOuterContainer).css("background", "rgb(255, 64, 96)");
                        }
                        else {
                            $(mangaOuterContainer).css("background", "rgb(34, 34, 34)");
                        }
                        imgsArrInit(parseImgUrl(thisObj), +count);
                        //  const imageId = thisObj.getAttribute('data-id');
                        //   setCaption(imageId,parseInt($(mangaOuterContainer).css('top')),parseInt($(mangaOuterContainer).css('left')));
                    }

                    function getOffsetRect(elem) {
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
                        return {top: Math.round(top), left: Math.round(left)};
                    };

                    //-----------------------------------------------------------------------------------
                    function imgsArrInit(primaryLink, l) {
                        let margins = document.body.clientWidth - l * 600; //some blind frame adjusting
                        if (margins > 0) mangaOuterContainer.style.left = margins / 2 - 10 + 'px';

                        let currentImgId = getImgId(primaryLink);
                        //---------------------------------------------------------------------------------
                        if (currentImgId != lastImgId) {
                            for (let j = 0; j < imgsArr.length; j++) {
                                imgsArr[j].src = '';
                            }
                            mangaOuterContainer.style.display = 'block';
                            lastImgId = currentImgId;

                            for (let i = 0; i < l; i++) {
                                if (!(!!imgsArr[i])) //if [i] img element doesn't exist
                                {
                                    imgsArr[i] = document.createElement('img');
                                    mangaContainer.appendChild(imgsArr[i]);
                                }
                                ;
                                imgsArr[i].src = primaryLink.replace('p0', 'p' + i);
                            }
                        }
                        //---------------------------------------------------------------------------------
                        else mangaOuterContainer.style.display = 'block';
                    };

                    //-----------------------------------------------------------------------------------
                    function parseImgUrl(thisObj) {
                        let url = (thisObj.src) ? thisObj.src : thisObj.style.backgroundImage.slice(5, -2); //pixiv changes layout randomly
                        url = url.replace(/\/...x...\//, '/600x600/'); //both feed and artist works case | TODO: '1200x1200' variant
                        return url;
                    };

                    //-----------------------------------------------------------------------------------
                    function getImgId(str) {
                        return str.substring(str.lastIndexOf("/") + 1, str.indexOf("_"));
                    }


                    //-----------------------------------------------------------------------------------
                    //**************************************Hide*****************************************
                    //-----------------------------------------------------------------------------------
                    imgContainer.onmouseleave = function () {

                            // if caption don't have URL, simply erase caption
                            if ($(captionContainer).find('a').length == 0) {
                                captionContainer.style.display = 'none';
                                imgContainer.style.display = 'none';
                                popupImg.src = '';
                            }else {
                                setTimeout(function(){
                                    captionContainer.style.display = 'none';
                                    imgContainer.style.display = 'none';
                                    popupImg.src = '';
                                },1000);
                            }

                    };
                    //-----------------------------------------------------------------------------------
                    mangaOuterContainer.onmouseleave = function () {

                        if ($(captionContainer).find('a').length == 0) {
                            captionContainer.style.display = 'none';
                            mangaOuterContainer.style.display = 'none';
                        }else{
                            setTimeout(function(){
                            captionContainer.style.display = 'none';
                            mangaOuterContainer.style.display = 'none';
                            },500);
                        }
                    };
                    captionContainer.onmouseleave = function () {
                        captionContainer.style.display = 'none';
                    };
                    //-----------------------------------------------------------------------------------
                    //*************************************Clicks****************************************
                    //-----------------------------------------------------------------------------------
                    popupImg.onmouseup = function (event) //single arts onclick actions
                    {
                        onClickActions(this, event, false);
                    };
                    //-----------------------------------------------------------------------------------
                    $('body').on('mouseup', 'div#mangaContainer > img', function (event) //manga arts onclick actions
                    {
                        onClickActions(this, event, true);
                    });

                    //-----------------------------------------------------------------------------------
                    async function onClickActions(imgContainerObj, event, isManga) {
                        event.preventDefault();
                        let strId = getImgId(imgContainerObj.src);
                        let illustPageUrl = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + strId;

                        //----------------------------Middle Mouse Button click----------------------------
                        if (event.button == 1) {
                            window.open(illustPageUrl, '_blank'); //open illust page in new tab(in background — with FF pref "browser.tabs.loadDivertedInBackground" set to "true")
                        }
                        //----------------------------Left Mouse Button clicks...--------------------------
                        else if (event.button == 0) {
                            //----------------------------Single LMB-click-----------------------------------
                            if (!event.altKey) {
                                let toSave = event.ctrlKey;// Ctrl + LMB-click - saving image
                                if (!isManga) //single art original
                                {
                                    getOriginalUrl(illustPageUrl, event, false, toSave);
                                }
                                else //manga art original
                                {
                                    let src = imgContainerObj.src;
                                    let pageNum = src.substring(src.indexOf("_") + 2, src.lastIndexOf("_"));
                                    let singleIllustPageUrl = 'https://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=' + strId + '&page=' + pageNum;
                                    getOriginalUrl(singleIllustPageUrl, event, true, toSave);
                                }
                            }
                            //-----------------------------Alt + LMB-click-----------------------------------
                            else if (event.altKey) {
                                $(bookmarkObj).click();
                                if (!isManga) $(imgContainerObj).parent().css("background", "rgb(255, 64, 96)");
                                else $(mangaOuterContainer).css("background", "rgb(255, 64, 96)");
                            }
                            //-------------------------------------------------------------------------------
                        }
                        //---------------------------------------------------------------------------------
                    };

                    //-----------------------------------------------------------------------------------
                    async function getOriginalUrl(illustPageUrl, event, isManga, toSave) {
                        let xhr = new XMLHttpRequest();
                        xhr.open("GET", illustPageUrl, true);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                let originalArtUrl = "";
                                if (!isManga) {
                                    let scripts = xhr.responseXML.head.getElementsByTagName("script");
                                    for (let i = 0; i < scripts.length; i++) {
                                        let originalURL = scripts[i].textContent.match(/"original":"(http[^"]+)"/); //thanks to Mango
                                        if (originalURL) originalArtUrl = originalURL[1].replace(/\\\//g, '/');
                                    }
                                }
                                else {
                                    originalArtUrl = xhr.responseXML.querySelectorAll('img')[0].src;
                                }
                                if (toSave) window.open(originalArtUrl + '?s=1', '_blank');
                                else window.open(originalArtUrl, '_blank');
                            }
                        };
                        xhr.responseType = "document";
                        xhr.send();
                    }

                    //-----------------------------------------------------------------------------------
                    //**************************************Other****************************************
                    //-----------------------------------------------------------------------------------
                    mangaContainer.onwheel = function (e) {
                        if (e.deltaY < 0 && (mangaOuterContainer.getBoundingClientRect().top < 0)) {
                            mangaOuterContainer.scrollIntoView({block: "start", behavior: "smooth"}); //aligning to top screen side on scrollUp if needed
                        }
                        else if (e.deltaY > 0 && (mangaOuterContainer.getBoundingClientRect().bottom > document.documentElement.clientHeight)) {
                            mangaOuterContainer.scrollIntoView({block: "end", behavior: "smooth"}); //aligning to bottom screen side on scrollDown if needed
                        }

                        let scrlLft = mangaContainer.scrollLeft;
                        if ((scrlLft > 0 && e.deltaY < 0) || ((scrlLft < (mangaContainer.scrollWidth - mangaContainer.clientWidth)) && e.deltaY > 0)) {
                            e.preventDefault();
                            mangaContainer.scrollLeft += e.deltaY * DELTASCALE; // TODO - find better value for opera/chrome
                        }
                    };
                    //-----------------------------------------------------------------------------------
                    window.onresize = function () {
                        mangaWidth = document.body.clientWidth - 80;
                        mangaContainer.style.maxWidth = mangaOuterContainer.style.maxWidth = mangaWidth + 'px';
                    };

                    //-----------------------------------------------------------------------------------
                    //**************************************Hover****************************************
                    //-----------------------------------------------------------------------------------
                    //feed, discovery and search-------------------------------------------------------
                    if (type === prop.popup_typeA) {
                        //single art hover
                        siteImgMaxWidth = 200;
                        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="] > div:only-child', function () {
                            bookmarkObj = $(this).parent().parent().children(".thumbnail-menu").children("._one-click-bookmark");
                            var elem = this;
                            $(this).attr('onclick', 'console.log();return false;');
                            $(this).on('click', function () {
                                hoverImg(elem);
                                var x = parseInt($(imgContainer).css('top'));
                                var y = parseInt($(imgContainer).css('left'));
                                const href = $(this).parent().parent().find('a').attr('href');
                                const imageID = href.substring(href.indexOf('illust_id=') + 'illust_id='.length);
                                console.log("id:" + imageID)
                                setCaption(imageID, x, y);
                            });
                        });

                        //manga-style arts hover
                        $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="] > div:nth-child(2) ', function () {
                            bookmarkObj = $(this).parent().parent().children(".thumbnail-menu").children("._one-click-bookmark");
                            if (this.parentNode.firstChild.childNodes.length) {
                                $(this).attr('onclick', 'console.log();return false;');
                                var elem1 = this;
                                var elem2 = this.parentNode.firstChild.firstChild.textContent;
                                $(this).on('click', function () {
                                    hoverManga(elem1, elem2);
                                    var x = parseInt($(mangaOuterContainer).css('top'));
                                    var y = parseInt($(mangaOuterContainer).css('left'));
                                    const href = $(this).parent().parent().find('a').attr('href');
                                    const imageID = href.slice(href.substring('illust_id=') + 'illust_id='.length);
                                    console.log("id:" + imageID)
                                    setCaption(imageID, x, y);
                                });
                            }
                        });

                        //clearing loaded arts count when switching on tabs
                        if (PAGETYPE === pagetype.discovery) $('body').on('mouseup', 'a[href="/discovery/users"]', function () //todo:make into single event handler
                        {
                            console.log('leaving works page...');
                            artsLoaded = hits = 0;
                        });
                    }
                    //artist works page and daily rankings & rest of pages-----------------------------
                    if (type === prop.popup_typeB) {
                        {
                            $('body').on('mouseenter', 'a[href*="member_illust.php?mode=medium&illust_id="]', function () //direct div selector works badly with "::before"
                            {
                                if (this.childNodes.length == 1 && this.childNodes[0].nodeName == "DIV") //single art
                                {
                                    bookmarkObj = $(this.firstChild.firstChild).parent().children("._one-click-bookmark");
                                    //setHover(this.firstChild.firstChild);
                                    var elem = this.firstChild.firstChild;
                                    var parent = this;
                                    $(this).attr('onclick', 'console.log();return false;');
                                    $(captionContainer).insertBefore(imgContainer);
                                    $(this).on('click', function () {
                                        hoverImg(elem);
                                        var x = parseInt($(imgContainer).css('top'));
                                        var y = parseInt($(imgContainer).css('left'));
                                        const imageId = elem.getAttribute('data-id');
                                        setCaption(imageId, x, y);
                                    });
                                }
                                else if (this.children[1] && this.children[1].className == 'page-count') //manga
                                {
                                    bookmarkObj = $(this.firstChild.firstChild).parent().children("._one-click-bookmark");
                                    //setMangaHover(this.firstChild.firstChild, this.children[1].children[1].textContent);
                                    var elem1 = this.firstChild.firstChild;
                                    var elem2 = this.children[1].children[1].textContent;
                                    $(this).attr('onclick', 'console.log();return false;');

                                    $(this).on('click', function () {
                                        hoverManga(elem1, elem2);
                                        var x = parseInt($(mangaOuterContainer).css('top'));
                                        var y = parseInt($(mangaOuterContainer).css('left'));
                                        const imageId = elem1.getAttribute('data-id');
                                        setCaption(imageId, x, y);
                                    });
                                }
                                ;
                            });
                        }
                    }
                }
            }

            class Page {
                constructor(url) {
                    this.URL = url;
                    this.pagetype = checkPageType(url);
                    this.alloedFunclist = getAllowedFuncList(this.pagetype);
                }

                set setURL(url) {
                    this.URL = url;
                    this.pagetype = checkPageType(url);
                }

                get getPagetype() {
                    return this.pagetype;
                }

                get getURL() {
                    return this.URL;
                }

                get getFunclist() {
                    return this.alloedFunclist;
                }

                isEnable(symbol) {
                    return this.alloedFunclist.includes(symbol);
                }
            }

            /*
            * main function
            */
            let page = new Page(document.URL);
            let util = new Util();

            let setting;
            init().then(result => setting = new Setting(result));

            $(document).ready(function(){
                if (setting.openComment && page.isEnable(prop.openComment)) {
                    util.openComment();
                    console.log("comment opend");
                }
                if (setting.popup && page.isEnable(prop.popup_typeA)) {
                    util.setPopup(prop.popup_typeA);
                    console.log("popup  A is enable");
                } else if (setting.popup && page.isEnable(prop.popup_typeB)) {
                    util.setPopup(prop.popup_typeB);
                    console.log("popup  B is enable");
                }
            });

            window.onload = function () {
                console.log("pagetype:" + page.pagetype.toString());
                if (setting.changeLayout && page.isEnable(prop.changeLayout)) {
                    util.changeLayout();
                    console.log("layout chainged");
                }
            };
        })
    }
})();
