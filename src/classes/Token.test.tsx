import {Token} from "./Token";

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
  token.setBlankedOut(true);
  expect(token.isBlankedOut()).toBe(true);
});
