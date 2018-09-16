"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_js_1 = require("./lib/page.js");
const enum_1 = require("./lib/enum");
const util_js_1 = require("./lib/util.js");
const setting_js_1 = require("./lib/setting.js");
'use strict';
/*
設定画面やsave & load 機能を実装予定
 */
const init = async () => {
    const default_setting = {
        changeLayout: true,
        openComment: true,
        popup: true
    };
    // @ts-ignore
    return await GM.getValue("pixiv_viewutil_setting", JSON.stringify(default_setting));
};
/*
* main function
*/
let page = new page_js_1.Page(document.URL);
let util = new util_js_1.Util();
let setting;
init().then(result => setting = new setting_js_1.Setting(result));
window.onload = () => {
    //set popup function
    console.log("popup set");
    if (setting.popup && page.isEnable(enum_1.prop.popup_typeA)) {
        util.setPopup(page, setting);
        console.log("popup  A is enable");
    }
    else if (setting.popup && page.isEnable(enum_1.prop.popup_typeB)) {
        util.setPopup(page, setting);
        console.log("popup  B is enable");
    }
    console.log("pagetype:" + page.pagetype.toString());
    if (util_js_1.Util.changeLayout && page.isEnable(enum_1.prop.changeLayout)) {
        util_js_1.Util.changeLayout();
        console.log("layout chainged");
    }
    if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
        util.openComment();
        console.log("comment opend");
    }
    //change layout and open comment
    const links = document.getElementsByTagName("a");
    for (const link of links) {
        link.addEventListener("click", () => {
            let page = new page_js_1.Page(document.URL);
            console.log("pagetype:" + page.pagetype.toString());
            if (util_js_1.Util.changeLayout && page.isEnable(enum_1.prop.changeLayout)) {
                util_js_1.Util.changeLayout();
                console.log("layout chainged.");
            }
            if (setting.openComment && page.isEnable(enum_1.prop.openComment)) {
                util.openComment();
                console.log("comment opend.");
            }
        });
    }
    // })
};
