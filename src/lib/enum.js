"use strict";
/**
 * 本プロジェクトで使用する各種列挙型
 */
Object.defineProperty(exports, "__esModule", { value: true });
var prop;
(function (prop) {
    prop[prop["changeIllustPageLayout"] = 0] = "changeIllustPageLayout";
    prop[prop["changeMemberPageLayout"] = 1] = "changeMemberPageLayout";
    prop[prop["popup_typeA"] = 2] = "popup_typeA";
    prop[prop["popup_typeB"] = 3] = "popup_typeB";
    prop[prop["openComment"] = 4] = "openComment";
})(prop = exports.prop || (exports.prop = {}));
var uiComponent;
(function (uiComponent) {
    uiComponent[uiComponent["image"] = 0] = "image";
    uiComponent[uiComponent["manga"] = 1] = "manga";
    uiComponent[uiComponent["ugoira"] = 2] = "ugoira";
    uiComponent[uiComponent["caption"] = 3] = "caption";
})(uiComponent = exports.uiComponent || (exports.uiComponent = {}));
var pagetype;
(function (pagetype) {
    // my top page
    pagetype[pagetype["top"] = 0] = "top";
    //Works from favourite artists
    pagetype[pagetype["bookmark_new_illust"] = 1] = "bookmark_new_illust";
    //Discovery page
    pagetype[pagetype["discovery"] = 2] = "discovery";
    //Artist works page
    pagetype[pagetype["member_illust"] = 3] = "member_illust";
    //Artist's "top" page
    pagetype[pagetype["member"] = 4] = "member";
    //Bookmark information
    pagetype[pagetype["bookmark_detail"] = 5] = "bookmark_detail";
    //Added new bookmarks
    pagetype[pagetype["bookmark_add"] = 6] = "bookmark_add";
    //Daily rankings
    pagetype[pagetype["ranking"] = 7] = "ranking";
    //Someone's bookmarks page
    pagetype[pagetype["bookmark_id"] = 8] = "bookmark_id";
    //Search page
    pagetype[pagetype["search"] = 9] = "search";
    //Your bookmarks page
    pagetype[pagetype["bookmark"] = 10] = "bookmark";
    pagetype[pagetype["other"] = 11] = "other";
})(pagetype = exports.pagetype || (exports.pagetype = {}));
;
