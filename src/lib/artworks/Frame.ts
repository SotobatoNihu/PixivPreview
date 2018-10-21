export class Frame {


    //imageElement配列
    imgArray:HTMLImageElement[]=[]
    //imageElementのsrc文字列の配列
    private _imgStringArray:string[]=[]
    //フレーム情報（ミリ秒単位の変更間隔）の配列
    private _frameArray:number[]=[]


    pushDelay(delay: number){
        this._frameArray.push(delay)
    }
    pushImgString(imgString:string){
        this._imgStringArray.push(imgString)
    }

    get imgStringArray(): string[] {
        return this._imgStringArray;
    }

    set imgStringArray(value: string[]) {
        this._imgStringArray = value;
    }

    public set frameArray(value: number[]) {
        this._frameArray = value;
    }
}