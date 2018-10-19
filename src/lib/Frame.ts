export class Frame {
    //imageElement配列
    imgArray:HTMLImageElement[]=[]
    //imageElementのsrc文字列の配列
    imgStringArray:string[]=[]
    //フレーム情報（ミリ秒単位の変更間隔）の配列
    frameArray:number[]=[]


    pushDelay(delay: number){
        this.frameArray.push(delay)
    }
    pushImgString(imgString:string){
        this.imgStringArray.push(imgString)
    }
}