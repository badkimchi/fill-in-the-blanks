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
        return this.letters;
    }

    public getState(): TokenState {
        return this.state;
    }

    public setState(state: TokenState): void {
        this.state = state;
    }
}