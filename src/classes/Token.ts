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

export class Token {
    private readonly type: TokenType = TokenType.Word;
    private readonly letters: string = '';
    private state: TokenState = TokenState.Normal;

    constructor(token: string) {
        this.letters = token;
        if (token.length === 1 && Token.isSpecialCharacter(token)) {
            this.type = TokenType.Punctuation;
        } else {
            this.type = TokenType.Word;
        }
    }

    private static isSpecialCharacter(char: string): boolean {
        if (!char || char.length === 0) {
            // return false;
        }
        return char.match(/^[^a-zA-Z0-9]+$/) !== null;
    }

    public isWord(): boolean {
        return this.type === TokenType.Word;
    }

    public getWord(): string {
        return this.letters.replace(/[^a-zA-Z0-9 ]/g, '');
    }

    public endsWithPunctuation(): boolean {
        return Token.isSpecialCharacter(this.letters[this.letters.length - 1]);
    }

    public startsWithPunctuation(): boolean {
        return Token.isSpecialCharacter(this.letters[0]);
    }

    public getLastLetters(): string {
        let lastLetters = '';
        for (let i = this.letters.length - 1; i > 0; i--) {
            if (Token.isSpecialCharacter(this.letters[i])) {
                lastLetters = this.letters[i] + lastLetters;
            } else {
                break;
            }
        }
        return lastLetters;
    }

    public getFirstLetter(): string {
        return this.letters[0];
    }

    public getState(): TokenState {
        return this.state;
    }

    public setState(state: TokenState): void {
        this.state = state;
    }
}