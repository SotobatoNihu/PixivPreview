"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Frame_1 = require("./Frame");
const ContainerFactory_1 = require("../utilities/ContainerFactory");
/**
 * うごイラ管理用オブジェクト
 */
class Ugoira {
    constructor(pixivJson, ugoiraMetaJson) {
        this.ugoiraContainerID = 'popup-ugoira';
        this.pixivJson = pixivJson;
        this.ugoiraMetaJson = ugoiraMetaJson;
    }
    async init() {
        const innerContainer = this.innerContainer;
        let finished = false;
        const factory = new ContainerFactory_1.ContainerFactory();
        innerContainer.textContent = null;
        const canvas = document.createElement('canvas');
        canvas.id = this.ugoiraContainerID;
        canvas.className = this.className;
        this.ugoiraContainer = canvas;
        innerContainer.appendChild(canvas);
        let myHeaders = new Headers();
        myHeaders.append("Accept-Encoding", "gzip, deflate, br");
        myHeaders.append("Connection", 'keep-alive');
        myHeaders.append("HOST", "www.pixiv.net");
        const myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'same-origin',
            credentials: 'same-origin',
            cache: 'default'
        };
        // @ts-ignore
        let zip = new JSZip();
        //const ugoira = new Ugoira()
        const frames = this.ugoiraMetaJson.body.frames;
        // const ImgElem: HTMLImageElement = document.createElement('img')
        const frameData = new Frame_1.Frame();
        const zipData = await fetch(this.ugoiraMetaJson.body.src, {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            keepalive: true
        }).then(response => {
            if (response.ok) {
                return response.blob();
            }
        }).then(async (zipData) => {
            await zip.loadAsync(zipData, { base64: true });
        }).then(() => {
            for (let i = 0; i < frames.length; i++) {
                zip.file(frames[i].file)
                    .async("base64", function updateCallback(metadata) {
                    console.log("progression: " + metadata.percent.toFixed(2) + " %");
                    if (metadata.percent === 100) {
                        finished = true;
                    }
                })
                    .then(function success(content) {
                    frameData.pushImgString(`data:image/jpeg;base64,${content}`);
                }, function error(e) {
                    console.log("download error.");
                });
            }
        }).then(() => {
            this.frameData = frameData;
        });
    }
    /*
        static pushImgElem(elem: HTMLImageElement) {
            Util.imgArray.push(elem)
        }
    */
    /*
        static pushImgString(s: string) {
            this.imgStringArray.push(s)

        }

        static pushFrame(num: number) {
            this.frameArray.push(num)
        }

        get getImgArray() {
            return this.imgArray
        }

        static  getImgStringArray() {
            return this.imgStringArray
        }

        get getFrameArray() {
            return Ugoira.frameArray
        }

        get getFrameNum(): number {
            return Ugoira.imgArray.length
        }

        //フレーム情報の合計
        get getIntervalSum(): number {
            return Ugoira.frameArray.length > 1 ? Ugoira.frameArray.reduce((x, y) => x + y) : 0
        }
    */
    setInnerContainer(innerContainer) {
        this.innerContainer = innerContainer;
    }
    /*
    setClassName(className: string) {
        this.ugoiraContainer.className = className
    }
    */
    /*
        private resize(width: number, height: number,scale:number) {
            let newHeight:number = height
            let newWidth:number = width
            if (height > window.innerHeight * scale || width > window.innerWidth * scale) {
                const heightScale =height / Number(window.innerHeight * scale)
                const widthScale = width / Number(window.innerWidth * scale)
                if (heightScale > widthScale) {
                    newHeight  /= heightScale
                    newWidth /= heightScale
                } else {
                    newHeight /= widthScale
                    newWidth /=widthScale
                }
            }
            return {width: Math.round(newWidth), height: Math.round(newHeight)}
        }
    */
    resize(elem, scale) {
        const oldWidth = this.pixivJson.body.width;
        const oldHeight = this.pixivJson.body.height;
        let newWidth = oldWidth;
        let newHeight = oldHeight;
        if (oldHeight > window.innerHeight * scale || oldWidth > window.innerWidth * scale) {
            const heightScale = oldHeight / Number(window.innerHeight * scale);
            const widthScale = oldWidth / Number(window.innerWidth * scale);
            if (heightScale > widthScale) {
                newHeight /= heightScale;
                newWidth /= heightScale;
            }
            else {
                newHeight /= widthScale;
                newWidth /= widthScale;
            }
        }
        this.ugoiraContainer.width = newWidth;
        this.ugoiraContainer.height = newHeight;
        elem.style.width = `${Math.round(newWidth)}px`;
        elem.style.height = `${Math.round(newHeight)}px`;
    }
    popup(outerContainer) {
        const frameArray = this.frameData.frameArray;
        const stringArray = this.frameData.imgStringArray;
        const img = new Image();
        let index = 0;
        const counter = () => {
            img.src = stringArray[index];
            const context = this.ugoiraContainer.getContext('2d');
            //座標(10, 10)の位置にイメージを表示
            context.drawImage(img, 0, 0, this.ugoiraContainer.clientWidth, this.ugoiraContainer.clientHeight);
            if (outerContainer.style.display !== 'none') {
                setTimeout(counter, this.ugoiraMetaJson.body.frames[index].delay);
                index += 1;
                index = index === stringArray.length ? 0 : index;
            }
        };
        counter();
    }
    setClassName(className) {
        this.className = className;
    }
}
//imageElement配列
Ugoira.imgArray = [];
//imageElementのsrc文字列の配列
Ugoira.imgStringArray = [];
exports.Ugoira = Ugoira;
