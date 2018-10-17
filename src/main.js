"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("./lib/page");
const util_1 = require("./lib/util");
const setting_1 = require("./lib/setting");
'use strict';
/**
 * メイン関数
 */
const page = new page_1.Page(document.URL);
const util = new util_1.Util();
const setting = new setting_1.Setting();
setting.init().then(() => {
    util.initExecute(setting, page);
});
window.onload = () => {
    console.log("pagetype:" + page.pagetype.toString());
    //レイアウトを変更しコメントを開く
    util.onloadExecute(setting, page);
    const links = document.getElementsByTagName('a');
    for (const link of links) {
        link.addEventListener('click', () => {
            util.onloadExecute(setting, new page_1.Page(document.URL));
        });
    }
    setting.save();
};
