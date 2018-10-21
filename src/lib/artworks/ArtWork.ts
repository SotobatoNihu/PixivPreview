import {PixivJson} from "../others/jsonInterface";

    export class ArtWork {
        public className: string;
        public innerScreen: HTMLElement;
        public pixivJson: PixivJson;
        public imgScale:number=0.7
        constructor(){

        }
        public  adjustScreenSize(scale: number) {
            const oldWidth: number = this.pixivJson.body.width
            const oldHeight: number = this.pixivJson.body.height
            let newWidth: number = oldWidth
            let newHeight: number = oldHeight
            if (oldHeight > window.innerHeight * scale || oldWidth > window.innerWidth * scale) {
                const heightScale =   Number(window.innerHeight * scale)/oldHeight
                const widthScale =   Number(window.innerWidth * scale)/oldWidth
                //縦が長い
                if (heightScale < widthScale) {
                    newHeight *= heightScale
                    newWidth *= heightScale
                    this.imgScale=heightScale
                } else {
                    //横が長い
                    newHeight *= widthScale
                    newWidth *= widthScale
                    this.imgScale=widthScale
                }
            }
            const innerScreen=this.innerScreen
            innerScreen.style.width = `${Math.round(newWidth)}px`
            innerScreen.style.height = `${Math.round(newHeight)}px`
        }


        popup(hasClass:boolean) {
        }

        /**
         * 大きさがあるHTMLelementを引数に、それが画面の中央に表示されるようになるelementのtop・leftの値を返す
         * @param elem
         */
        getOffset(elem) {
            const w_height = $(window).height();
            const w_width = $(window).width();
            const el_height = $(elem).height();
            const el_width = $(elem).width();
            const scroll_height = $(window).scrollTop();
            const position_h = scroll_height + (w_height - el_height) / 2;
            const position_w = (w_width - el_width) / 2;
            return { top: Math.round(position_h), left: Math.round(position_w) };
        }

        public set setInnerScreen(elem: HTMLElement){
            this.innerScreen = elem;
        }

        public set setClassName(className: string) {
            this.className = className
        }
        public getClassName(): string {
            return this.className;
        }
        public set setImgScale(scale:number){
            this.imgScale=scale
        }

        public  getInnerScreen(): HTMLElement {
            return this.innerScreen;
        }
    }
