import {Token, TokenState} from "./Token";

test('punctuation is not a word', () => {
    const token = new Token(',');
    expect(token.isWord()).toBe(false);
});

test('word is a word', () => {
    const token = new Token('some');
    expect(token.isWord()).toBe(true);
});

test('word is blanked out', () => {
    const token = new Token('some');
    token.setState(TokenState.Blanked);
    expect(token.getState()).toBe(TokenState.Blanked);
});

test.each([
    ['normal'],
    ['"some"'],
    ['"some,"'],
    ["sisters'"],
    ['"some!"'],
    ["Jake's"],
    ["magic-word"],
])('normal output word is same as the original', (letters) => {
    const token = new Token(letters);
    token.setState(TokenState.Normal);
    const fullWord = token.getStartingPunctuation() + token.getWord() + token.getEndingPunctuation();
    expect(fullWord).toBe(letters);
});

test.each([
    ['"some"', '"'],
])('starting punctuation is extracted correctly', (letters, punctuation) => {
    const token = new Token(letters);
    expect(token.getStartingPunctuation()).toBe(punctuation);
})

test.each([
    ['"some."', '."'],
    ['"some,"', ',"'],
    ['"some!', '!'],
])('ending punctuation is extracted correctly', (letters, punctuation) => {
    const token = new Token(letters);
    expect(token.getEndingPunctuation()).toBe(punctuation);
})