export class BookInfo {
    public readonly title: string;
    public readonly id: string;
    public readonly imgUrl: string;
    public readonly imgAlt: string;
    public readonly lineCnt: number;

    constructor(title: string, id: string, imgUrl: string, imgAlt: string, lineCnt: number) {
        this.title = title;
        this.id = id;
        this.imgUrl = imgUrl;
        this.imgAlt = imgAlt;
        this.lineCnt = lineCnt;
    }
}

