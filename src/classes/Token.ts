enum TokenType {
    Word,
    Punctuation,
}

export enum TokenState {
    Normal,
    Blanked,
    WrongGuess,
    Correct,
}

const punctuations = [',', '.', ';', ':', '?']

export class Token {
    private readonly type: TokenType = TokenType.Word;
    private readonly letters: string = '';
    private state: TokenState = TokenState.Normal;

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
        if (this.endsWithPunctuation()) {
            return this.letters.slice(0, this.letters.length - 1)
        }
        return this.letters;
    }

    public endsWithPunctuation(): boolean {
        return punctuations.includes(this.letters[this.letters.length - 1]);
    }

    public getLastLetter(): string {
        return this.letters[this.letters.length - 1];
    }

    public getState(): TokenState {
        return this.state;
    }

    public setState(state: TokenState): void {
        this.state = state;
    }
}