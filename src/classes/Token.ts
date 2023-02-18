enum TokenType {
    Word,
    Punctuation,
}

const punctuations = [',', '.', ';', ':', '?']

export class Token {
    private readonly type: TokenType = TokenType.Word;
    private readonly letters: string = '';
    private blankedOut: boolean = false;

    constructor(token: string) {
        this.letters = token;
        if (punctuations.includes(token)) {
            this.type = TokenType.Punctuation;
        } else {
            this.type = TokenType.Word;
        }
    }

    public isWord(): boolean {
        return this.type === TokenType.Word;
    }

    public getWord(): string {
        return this.letters;
    }

    public isBlankedOut(): boolean {
        return this.blankedOut;
    }

    public setBlankedOut(blankedOut: boolean): void {
        this.blankedOut = blankedOut;
    }
}