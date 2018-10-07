import {Page} from './lib/page'
import {prop, pagetype} from "./lib/enum";
import {Util,} from './lib/util'
import {Setting} from './lib/setting'

'use strict';
/*
設定画面やsave & load 機能を実装予定
 */


/*
* main function
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
    const onloadExecute = util.onloadExecute(setting, page);

    const links = document.getElementsByTagName('a')
    for (const link of links) {
        link.addEventListener('click', () => {
            const newPageExecute = util.onloadExecute(setting, new Page(document.URL));
        })
    }
    setting.save()
}
