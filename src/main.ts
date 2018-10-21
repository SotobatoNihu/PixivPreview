import {Page} from './lib/others/Page'
import {prop, pagetype} from "./lib/others/Enum";
import {Util,} from './lib/utilities/Util'
import {Setting} from './lib/others/Setting'

'use strict';


/**
 * メイン関数
 */
const page = new Page(document.URL);
const util = new Util();

const setting = new Setting()
setting.init().then(() => {
        util.initExecute(setting, page)
    }
)

window.onload = () => {
    console.log("pagetype:" + page.pagetype.toString());
    //レイアウトを変更しコメントを開く
    util.onloadExecute(setting, page);

    const links = document.getElementsByTagName('a')
    for (const link of links) {
        link.addEventListener('click', () => {
            util.onloadExecute(setting, new Page(document.URL));
        })
    }
    setting.save()
}
