import {BookPage} from "./BookPage";

test('bookPage has blanked out tokens', () => {
    const page = new BookPage('abc')
    expect(page.getTokens().length).toBeGreaterThan(0);
});

test('bookPage without text has 0 tokens', () => {
    const page = new BookPage('')
    expect(page.getTokens().length).toBeLessThan(1);
});

test('bookPage with blank text has 0 tokens', () => {
    const page = new BookPage('     ')
    expect(page.getTokens().length).toBeLessThan(1);
});

test('bookPage with newline and tabs has 0 tokens', () => {
    const page = new BookPage('    \n \t ')
    expect(page.getTokens().length).toBeLessThan(1);
});