"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("./lib/page");
const util_1 = require("./lib/util");
const setting_1 = require("./lib/setting");
'use strict';
/*
設定画面やsave & load 機能を実装予定
 */
/*
* main function
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
    const onloadExecute = util.onloadExecute(setting, page);
    const links = document.getElementsByTagName('a');
    for (const link of links) {
        link.addEventListener('click', () => {
            const newPageExecute = util.onloadExecute(setting, new page_1.Page(document.URL));
        });
    }
    setting.save();
};
