import {ContainerFactory} from "./ContainerFactory";

export class Screen {
    private screenContainer:HTMLElement
    private screenContinerID: string = 'popup-screen-container'
    screenContainerCSS(scale: number) {
        return `
        border: 5px solid black;
        background-color:#111;
        position:relative;
        width:auto;
        height:auto;
        float:left;
        max-width:${window.innerWidth }px;
        max-height:${window.innerHeight}px;
        `
    }
    constructor(className:string,scale:number){
        this.screenContainer= new ContainerFactory()
            .setId(this.screenContinerID)
            .setClass(className)
            .setCSS(this.screenContainerCSS(scale))
            .createDiv()
    }

    getContainer() {
        return this.screenContainer
    }

    resetContainer() {
        this.screenContainer=document.getElementById(this.screenContinerID)
    }
}