"use strict";
/**
 *  divやspan,imgなどのHTML要素を作るファクトリ
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerFactory {
    constructor() {
        this.id = '';
        this.classname = '';
        this.innerHtml = '';
        this.innerText = '';
        this.cssText = '';
    }
    setId(idString) {
        this.id = idString;
        return this;
    }
    setClass(classname) {
        this.classname = classname;
        return this;
    }
    setLeft(x) {
    }
    setTop(y) {
    }
    setWitdh(w) {
        this.width = w;
        return this;
    }
    setInnerHtml(elem) {
        this.innerHtml = elem;
        return this;
    }
    setInnerText(elem) {
        this.innerText = elem;
        return this;
    }
    createDiv() {
        const elem = document.createElement('div');
        elem.id = this.id;
        elem.className = this.classname;
        elem.innerHTML = this.innerHtml;
        elem.style.cssText = this.cssText;
        this.init();
        return elem;
    }
    createImg() {
        const elem = document.createElement('img');
        elem.id = this.id;
        elem.className = this.classname;
        elem.style.cssText = this.cssText;
        this.init();
        return elem;
    }
    createSpan() {
        const elem = document.createElement('span');
        elem.id = this.id;
        elem.className = this.classname;
        elem.innerHTML = this.innerHtml;
        elem.style.cssText = this.cssText;
        this.init();
        return elem;
    }
    appendChild(infoElem) {
        this.appendChild(infoElem);
        return this;
    }
    setCSS(cssString) {
        this.cssText = cssString;
        return this;
    }
    init() {
        this.id = '';
        this.classname = '';
        this.innerHtml = '';
        this.innerText = '';
        this.cssText = '';
    }
}
exports.ContainerFactory = ContainerFactory;
