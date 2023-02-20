import React, {useEffect, useState} from "react";
import {ParagraphCont} from "../components/ParagraphCont";
import {Token, TokenState} from "../classes/Token";
import {Random} from "../classes/Random";
import {ChoiceBtn} from "../components/ChoiceBtn";
import book from "../assets/books/arabian_nights.json";

const exampleTxt = 'There was an emperor of Persia named Kosrouschah, who, when he first came to his crown, in order to\n' +
    'obtain a knowledge of affairs, took great pleasure in night excursions, attended by a trusty minister.\n' +
    'He often walked in disguise through the city, and met with many adventures, one of the most remarkable\n' +
    'of which happened to him upon his first ramble, which was not long after his accession to the throne of\n' +
    'his father.';

const bookData = book.text.split('\n').filter(t => t !== '');
const lineKey = 'currentLine';

export default function Home() {

    /**
     * Whole text of data to be displayed at the current page.
     */
    const [paragraph, setParagraph] = useState<string>(exampleTxt);

    /**
     * Line number offset in the book.
     */
    const [line, setLine] = useState<number>(parseInt(localStorage.getItem(lineKey) || '0'));

    const endLineNumber = bookData?.length;

    /**
     * # of lines that will be displayed at a page at a time.
     */
    const linesPerPage = 3;

    /**
     * manual shuffle trigger
     */
    const [shuffleCnt, setShuffleCnt] = useState<number>(0);

    /**
     * if target characters per page is already satisfied,
     * no more lines will be read for the page
     * even if the linesPerPage is higher than actual lines that were read.
     */
    const targetCharactersPerPage = 250;

    /**
     * List of words and punctuations that make up the page in a book.
     */
    const [tokens, setTokens] = useState<Array<Token>>([]);

    /**
     * indices of blanked out words in tokens array.
     * they are in the same order as the words appear in the paragraph.
     * they are used to check if the guess is correct.
     *
     */
    const [blankIdxes, setBlankIdxes] = useState<Array<number>>([0]);

    /**
     * maintain a separate shuffled indices of the blanked out words
     * to generate word choices for guessing.
     */
    const [shuffledBlankIdxes, setShuffledBlankIdxes] = useState<Array<number>>([]);

    /**
     * The number of words to be displayed as a blank in the page.
     */
    const desiredBlanksCnt = 4;

    /**
     * Guess the blank word.
     * The state of the box will change depending on the correctness of the answer.
     *
     * @param word
     */
    const guessBlank = (word: string): boolean => {
        const idx = blankIdxes[0];

        // the button for this action should be hidden to prevent this case.
        // checking idx here removes warning for using it as an index in the next block.
        if (idx === undefined) {
            console.error('no more blanked words!')
            return false;
        }

        // if the guess is wrong, mark it.
        if (word !== tokens[idx].getWord()) {
            tokens[idx].setState(TokenState.WrongGuess);
            setTokens([...tokens]);
            return false;
        }

        // remove the already guessed answer from re-appearing in the choices
        blankIdxes.shift()
        setBlankIdxes([...blankIdxes]);
        setShuffledBlankIdxes(shuffledBlankIdxes.filter(shuIdx => shuIdx !== idx));

        tokens[idx].setState(TokenState.Correct);
        setTokens([...tokens]);
        return true;
    }


    /**
     * Turn paragraphs into tokens
     */
    useEffect(() => {
        // parse paragraphs into tokens
        const tempTokens = paragraph
            .split(/[\n\t ]/)
            .filter(t => t.trim() !== '')
            .map(t => new Token(t));

        // using unique words to avoid high frequency words
        const uniqueWords = new Set<string>(tempTokens
            .filter(t => t.isWord())
            .map(t => t.getWord()));

        const blanksCnt = Math.min(uniqueWords.size, desiredBlanksCnt);
        const blankedWords = Random.chooseManyFrom(uniqueWords, blanksCnt);
        const tokenIdxes: Array<number> = [];

        // blank out the token if it is a blanked word.
        const newTokens = tempTokens.map((t, idx) => {
            if (blankedWords.has(t.getWord())) {
                t.setState(TokenState.Blanked);
                tokenIdxes.push(idx);

                // ensure that we only blank out one (first) occurrence.
                blankedWords.delete(t.getWord());
                return t;
            }
            return t;
        })
        setBlankIdxes([...tokenIdxes]);
        setShuffledBlankIdxes(Random.shuffle([...tokenIdxes]));
        setTokens(newTokens);
    }, [desiredBlanksCnt, paragraph, shuffleCnt]);

    /**
     * When page is changed, read new lines into the paragraph
     */
    useEffect(() => {
        let newParagraph = '';
        for (let i = line; i < Math.min(line + linesPerPage, endLineNumber); i++) {
            newParagraph += bookData[i];
            if (newParagraph.length >= targetCharactersPerPage) {
                break;
            }
        }
        setParagraph(newParagraph);
    }, [line, endLineNumber])

    /**
     * When all blanks are filled, turn the page to the next.
     */
    useEffect(() => {
        if (blankIdxes.length === 0) {
            setBlankIdxes([0])
            setTimeout(() => {
                setLine(line => line + linesPerPage);
            }, 500)
        }
        localStorage.setItem(lineKey, String(line))
    }, [blankIdxes, line])

    return (
        <React.Fragment>
            <div className={'flex space-x-6 mb-2 h-8 items-center justify-center'}>
                <div>
                    Progress {(line * 100 / bookData?.length).toFixed(2)}%
                </div>
                <button className={'rounded-2xl bg-red-300 text-black h-6 w-14 text-xs'}
                        onClick={() => {
                            const confirmed = window.confirm('reset back to original lose progress?');
                            if (confirmed) {
                                setLine(0);
                            }
                        }}
                >
                    Reset
                </button>
                <button className={'rounded-2xl bg-green-300 text-black h-6 w-20 text-xs'}
                        onClick={() => {
                            setShuffleCnt(shuffleCnt + 1);
                        }}
                >
                    Shuffle
                </button>
            </div>
            <ParagraphCont words={tokens} nextBlankIdx={blankIdxes[0] || -1}/>
            <div className="mt-2 flex items-center justify-center space-x-2 flex-wrap min-h-[16vh]">
                {
                    shuffledBlankIdxes.map(idx => <ChoiceBtn
                        key={idx}
                        word={tokens[idx].getWord()}
                        guessBlank={guessBlank}
                    />)
                }
            </div>
        </React.Fragment>
    )
}

