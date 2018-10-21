/**
 *  divやspan,imgなどのHTML要素を作るファクトリ
 */


interface ContainerFactoryInterface {
    id: String
    classname: String
    setId(id: string)
    setClass(classname:string)

    setTop(y: number)

    setLeft(x: number)

    setWitdh(w: number)

    createDiv()

    createSpan()
}

export class ContainerFactory implements ContainerFactoryInterface {

    id: string = ''
    classname: string = ''
    private innerHtml: string = ''
    private innerText: string = ''

    cssText: string = ''
    private width: number;

    setId(idString: string) {
        this.id = idString
        return this
    }
    setClass(classname: string) {
        this.classname=classname
        return this
    }

    setLeft(x: number) {
    }

    setTop(y: number) {
    }

    setWitdh(w: number) {
        this.width = w
        return this
    }

    setInnerHtml(elem: string) {
        this.innerHtml = elem
        return this
    }

    setInnerText(elem: string) {
        this.innerText = elem
        return this
    }

    createDiv(): HTMLElement {
        const elem = document.createElement('div')
        elem.id = this.id
        elem.className=this.classname
        elem.innerHTML = this.innerHtml
        elem.style.cssText = this.cssText
        this.init()
        return elem
    }

    createImg(): HTMLImageElement {
        const elem = document.createElement('img')
        elem.id = this.id
        elem.className=this.classname
        elem.style.cssText = this.cssText
        this.init()
        return elem
    }


    createSpan(): HTMLElement {
        const elem = document.createElement('span');
        elem.id = this.id
        elem.className=this.classname
        elem.innerHTML = this.innerHtml
        elem.style.cssText = this.cssText
        this.init()
        return elem
    }

    appendChild(infoElem: HTMLElement) {
        this.appendChild(infoElem)
        return this
    }

    setCSS(cssString: string) {
        this.cssText = cssString
        return this
    }


    init() {
        this.id = ''
        this.classname = ''
        this.innerHtml = ''
        this.innerText = ''
        this.cssText = ''
    }
}


