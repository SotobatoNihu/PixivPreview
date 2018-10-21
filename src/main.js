"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = require("./lib/others/Page");
const Util_1 = require("./lib/utilities/Util");
const Setting_1 = require("./lib/others/Setting");
'use strict';
/**
 * メイン関数
 */
const page = new Page_1.Page(document.URL);
const util = new Util_1.Util();
const setting = new Setting_1.Setting();
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
            util.onloadExecute(setting, new Page_1.Page(document.URL));
        });
    }
    setting.save();
};
