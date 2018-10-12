import {Util} from "./util";
import {prop} from "./enum";

/**
 * うごイラ管理用オブジェクト
 */
export class Ugoira {

    //imageElement配列
    imgArray:HTMLImageElement[]=[]
    //imageElementのsrc文字列の配列
    imgStringArray:string[]=[]
    //フレーム情報（ミリ秒単位の変更間隔）の配列
    frameArray:number[]=[]

     pushImgElem(elem:HTMLImageElement){
        this.imgArray.push(elem)
    }
    pushImgString(s: string) {
        this.imgStringArray.push(s)

    }
     pushFrame(num:number){
        this.frameArray.push(num)
    }

    get getImgArray(){
        return this.imgArray
    }
    get getImgStringArray(){
        return this.imgStringArray
    }
    get getFrameArray(){
        return this.frameArray
    }
    get getFrameNum():number{
        return this.imgArray.length
    }
    //フレーム情報の合計
    get getIntervalSum():number{
        return  this.frameArray.length > 1 ? this.frameArray.reduce((x, y) => x + y) :0
    }


}