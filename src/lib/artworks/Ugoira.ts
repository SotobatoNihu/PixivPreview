import {Util} from "../utilities/Util";
import {prop} from "../others/Enum";
import {PixivJson} from "../others/jsonInterface";
import {Frame} from "./Frame";
import {ContainerFactory} from "../utilities/ContainerFactory";
import {ArtWork} from "./ArtWork";

/**
 * うごイラ管理用オブジェクト
 */
export class Ugoira {

    private innerContainer: HTMLElement;
    private ugoiraContainer: HTMLCanvasElement
    private ugoiraContainerID: string = 'popup-ugoira'
    private className: string;
    private readonly pixivJson: PixivJson;
    private readonly ugoiraMetaJson: PixivJson;

    //imageElement配列
    private static imgArray: HTMLImageElement[] = []
    //imageElementのsrc文字列の配列
    private static imgStringArray: string[] = []
    //フレーム情報（ミリ秒単位の変更間隔）の配列
    private static frameArray: number[]
    private frameData: Frame;

    constructor(pixivJson: PixivJson, ugoiraMetaJson: PixivJson) {
        this.pixivJson = pixivJson
        this.ugoiraMetaJson = ugoiraMetaJson


    }

    async init() {
        const innerContainer = this.innerContainer


        let finished: boolean = false
        const factory = new ContainerFactory()
        innerContainer.textContent = null;
        const canvas = document.createElement('canvas')
        canvas.id=this.ugoiraContainerID
        canvas.className=this.className
        this.ugoiraContainer = canvas
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
        let zip = new JSZip()
        //const ugoira = new Ugoira()
        const frames = this.ugoiraMetaJson.body.frames
        // const ImgElem: HTMLImageElement = document.createElement('img')

        const frameData=new Frame()
        const zipData = await fetch(this.ugoiraMetaJson.body.src,
            {
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                keepalive: true
            }
        ).then(
            response => {
                if (response.ok) {
                    return response.blob();
                }
            }).then(async (zipData) => {
                await zip.loadAsync(zipData, {base64: true})
            }
        ).then(
             () => {
                 for(let i=0;i<frames.length;i++){
                     zip.file(frames[i].file)
                         .async("base64",
                             function updateCallback(metadata) {
                                // console.log("progression: " + metadata.percent.toFixed(2) + " %");
                                 if (metadata.percent === 100) {
                                     finished = true
                                 }
                             }
                         )
                         .then(function success(content) {
                             frameData.pushImgString(`data:image/jpeg;base64,${content}`)
                         }, function error(e) {
                             console.log("download error.")
                         })

                 }
            }
        ).then(() => {
            this.frameData=frameData
        })
    }


    setScreenContainer(innerContainer: HTMLElement) {
        this.innerContainer = innerContainer
    }

    resize(elem: HTMLElement, scale: number) {
        const oldWidth: number=this.pixivJson.body.width
        const oldHeight: number=this.pixivJson.body.height
        let newWidth:number=oldWidth
        let newHeight: number=oldHeight
        if (oldHeight > window.innerHeight * scale || oldWidth > window.innerWidth * scale) {
            const heightScale = oldHeight / Number(window.innerHeight * scale)
            const widthScale = oldWidth / Number(window.innerWidth * scale)
            if (heightScale > widthScale) {
                newHeight /= heightScale
                newWidth /= heightScale
            } else {
                newHeight /= widthScale
                newWidth /= widthScale
            }
        }
        this.ugoiraContainer.width = newWidth
        this.ugoiraContainer.height = newHeight
        elem.style.width = `${Math.round(newWidth)}px`
        elem.style.height = `${Math.round(newHeight)}px`
    }

    popup(outerContainer:HTMLElement) {
        const frameArray =this.frameData.frameArray
        const stringArray = this.frameData.imgStringArray
        const img = new Image();
        let index = 0;
        const counter = () => {
            img.src = stringArray[index]
            const context = this.ugoiraContainer.getContext('2d');
            //座標(10, 10)の位置にイメージを表示
            context.drawImage(img, 0, 0, this.ugoiraContainer.clientWidth, this.ugoiraContainer.clientHeight);
            if(outerContainer.style.display!=='none'){
                setTimeout(counter, this.ugoiraMetaJson.body.frames[index].delay);
                index += 1;
                index = index === stringArray.length ? 0 : index
            }
        }
        counter();
    }

    setClassName(className: string) {
        this.className=className
    }
}