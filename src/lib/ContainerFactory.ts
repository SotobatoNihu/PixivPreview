interface ContainerFactoryInterface {
    id:String
    setId(id:string)
    setTop(y:number)
    setLeft(x:number)
    setWitdh(w:number)
    createDiv()
    createSpan()
}

export class  ContainerFactory implements  ContainerFactoryInterface{
    id:string=''
    private innerHtml:string=''
    private innerText:string=''
    private width: number;
    cssText: string='';

    setId(idString:string){
        this.id=idString
        return this
    }

    setLeft(x: number) {
    }

    setTop(y: number) {
    }

    setWitdh(w: number) {
        this.width=w
        return this
    }
    setInnerHtml(elem:string){
        this.innerHtml=elem
        return this
    }
    setInnerText(elem:string){
        this.innerText=elem
        return this
    }

    createDiv(): HTMLElement{
        const elem=document.createElement('div')
        elem.id=this.id
        elem.innerHTML=this.innerHtml
        elem.style.cssText=this.cssText
        return  elem
    }
    createImg(): HTMLImageElement{
        const elem=document.createElement('img')
        elem.id=this.id
        elem.style.cssText=this.cssText
        return  elem
    }

    setVoidHtml(){
        this.innerHtml=''
        return this
    }
    createSpan(): HTMLElement{
        const elem=document.createElement('span');
        elem.id=this.id
        elem.innerHTML=this.innerHtml
        elem.style.cssText=this.cssText
        return  elem
    }

    appendChild(infoElem: HTMLElement) {
        this.appendChild(infoElem)
        return this
    }

    setCSS(cssString:string) {
        this.cssText=cssString
        return this
    }

}


