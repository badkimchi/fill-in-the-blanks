import {Token} from "./Token";
import {Random} from "./Random";

export class BookPage {
    /**
     * List of words and punctuations that make up the page in a book.
     */
    private tokens: Array<Token> = [];

    /**
     * Currently selected set of blanked out words
     */
    private blankedWords: Set<String> = new Set<string>();

    /**
     * The number of words to be displayed as a blank in the page.
     */
    private desiredBlanksCnt: number = 3;

    constructor(paragraphs: string, blanksCnt?: number) {
        this.tokens = paragraphs
            .split(' ')
            .filter(t => t.trim() !== '')
            .map(t => new Token(t));
        if (blanksCnt) {
            this.setDesiredBlanksCnt(blanksCnt);
        }
        this.selectBlanks();
    }

    public getTokens(): Array<Token> {
        return this.tokens;
    }

    public setDesiredBlanksCnt(cnt: number) {
        this.desiredBlanksCnt = cnt;
    }

    public selectBlanks(): Set<any> {
        let words = this.getUniqueWords();
        let blanksCnt = Math.min(words.size, this.desiredBlanksCnt);
        this.blankedWords = Random.chooseManyFrom(words, blanksCnt);
        this.tokens = this.tokens.map(t => {
            if (this.blankedWords.has(t.getWord())) {
                t.setBlankedOut(true);
                return t;
            }
            return t;
        })
        return this.blankedWords;
    }

    private getUniqueWords(): Set<string> {
        return new Set<string>(this.tokens
            .filter(t => t.isWord())
            .map(t => t.getWord())
        );
    }
}