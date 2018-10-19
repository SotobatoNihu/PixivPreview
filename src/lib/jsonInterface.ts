/**
 * Jsonをパースするときに使用する各種Json用クラス
 * http://json2ts.com/で自動生成
 *
 */

export class PixivJson implements PixivJsonInterface{
    error: boolean;
    message: string;
    body: Body;
    constructor(json:any) {
        Object.assign(this, json)
    }
}

export interface PixivJsonInterface {
    error: boolean;
    message: string;
    body: Body;
}

export interface Urls {
    mini: string;
    thumb: string;
    small: string;
    regular: string;
    original: string;
}

export interface Body {
    illustId: string;
    illustTitle: string;
    illustComment: string;
    id: string;
    title: string;
    description: string;
    illustType: number;
    createDate: Date;
    uploadDate: Date;
    restrict: number;
    xRestrict: number;
    urls: Urls;
    tags: Tags;
    storableTags: string[];
    userId: string;
    userName: string;
    userAccount: string;
    //userIllusts: UserIllusts;
    likeData: boolean;
    width: number;
    height: number;
    pageCount: number;
    bookmarkCount: number;
    likeCount: number;
    commentCount: number;
    responseCount: number;
    viewCount: number;
    isHowto: boolean;
    isOriginal: boolean;
    imageResponseOutData: any[];
    imageResponseData: any[];
    imageResponseCount: number;
    pollData?: any;
    seriesNavData?: any;
    descriptionBoothId?: any;
    comicPromotion?: any;
    contestBanners: any[];
    //factoryGoods: FactoryGoods;
    isBookmarkable: boolean;
    bookmarkData?: any;
    //zoneConfig: ZoneConfig;
}

export interface Tags {
    authorId: string;
    isLocked: boolean;
    tags: Tag[];
    writable: boolean;
}
export interface Tag {
    tag: string;
    locked: boolean;
    deletable: boolean;
    userId: string;
    romaji: string;
    translation: Translation;
    userName: string;
}

export interface Translation {
    en: string;
}

export interface Frame {
    file: string;
    delay: number;


}

export interface Body {
    src: string;
    originalSrc: string;
    mime_type: string;
    frames: Frame[];
}

export interface RootObject {
    error: boolean;
    message: string;
    body: Body;
}
