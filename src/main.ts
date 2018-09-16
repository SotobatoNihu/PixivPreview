import {Page} from './lib/page.js'
import {prop, pagetype} from "./lib/enum";
import {Util, } from './lib/util.js'
import {Setting} from './lib/setting.js'

'use strict';
/*
設定画面やsave & load 機能を実装予定
 */
const init = async () => {
    const default_setting = {
        changeLayout: true,
        openComment: true,
        popup: true
    }
    // @ts-ignore
    return await GM.getValue("pixiv_viewutil_setting", JSON.stringify(default_setting));
}


/*
* main function
*/
let page = new Page(document.URL);
let util = new Util();

let setting;
init().then(result => setting = new Setting(result));

window.onload = () => {
    //set popup function
    console.log("popup set")
    if (setting.popup && page.isEnable(prop.popup_typeA)) {
        util.setPopup(page,setting);
        console.log("popup  A is enable");
    } else if (setting.popup && page.isEnable(prop.popup_typeB)) {
        util.setPopup(page,setting);
        console.log("popup  B is enable");
    }

    console.log("pagetype:" + page.pagetype.toString());
    if (Util.changeLayout && page.isEnable(prop.changeLayout)) {
        Util.changeLayout();
        console.log("layout chainged");
    }
    if (setting.openComment && page.isEnable(prop.openComment)) {
        util.openComment();
        console.log("comment opend");
    }

    //change layout and open comment
    const links = document.getElementsByTagName("a")
    for (const link of links) {
        link.addEventListener("click", () => {
            let page = new Page(document.URL);
            console.log("pagetype:" + page.pagetype.toString());
            if (Util.changeLayout && page.isEnable(prop.changeLayout)) {
                Util.changeLayout();
                console.log("layout chainged.");
            }
            if (setting.openComment && page.isEnable(prop.openComment)) {
                util.openComment();
                console.log("comment opend.");
            }

        })
    }
    // })
}
