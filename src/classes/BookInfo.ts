const customJpg = 'custom.jpg';
const customAlt = 'Photo by Julia Kicova on Unsplash';

export class BookInfo {
    public readonly title: string;
    public readonly id: string;

    /**
     * set to true if it is a custom book by the user.
     */
    public readonly isLocal: boolean;
    public readonly lineCnt: number;
    private readonly _imgAlt: string;
    private readonly _imgUrl: string;

    constructor(title: string, id: string, isLocal: boolean, imgUrl: string, imgAlt: string, lineCnt: number) {
        this.title = title;
        this.id = id;
        this.isLocal = isLocal;
        this._imgUrl = imgUrl;
        this._imgAlt = imgAlt;
        this.lineCnt = lineCnt;
    }

    public get imgUrl(): string {
        return this.isLocal ? customJpg : this._imgUrl;
    }

    public get imgAlt(): string {
        return this.isLocal ? customAlt : this._imgAlt;
    }
}

