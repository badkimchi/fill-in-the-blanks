import React, {useEffect, useState} from "react";
import {ParagraphCont} from "../components/ParagraphCont";
import {Token, TokenState} from "../classes/Token";
import {Random} from "../classes/Random";
import {ChoiceBtn} from "../components/ChoiceBtn";
import CompletedMessage from "../components/CompletedMessage";
import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";
import {useParams} from "react-router-dom";
import {UserState} from "../classes/UserState";
import {BookInfo} from "../classes/BookInfo";
import {BookRepository} from "../classes/BookRepository";
import {Btn} from "../components/Btn";

interface props {
    books: Array<BookInfo>
}

export const BookReader: React.FC<props> = ({books}) => {
    /**
     * name of the current book loaded on in the reader
     */
    const {bookId} = useParams();

    /**
     * book with the given book id
     */
    const [book, setBook] = useState<BookInfo>(
        new BookInfo('default', 'defaultId', true,
            'defaultImg', 'defaultAlt', 0));

    /**
     * book is ready to be rendered to the screen.
     */
    const [bookLoaded, setBookLoaded] = useState<boolean>(false);

    /**
     * Unable to display book due to an error.
     */
    const [hasError, setHasError] = useState<boolean>(false);

    /**
     * book's text
     */
    const [bookData, setBookData] = useState<Array<string>>([]);

    /**
     * Whole text of data to be displayed at the current page.
     */
    const [paragraph, setParagraph] = useState<string>('');

    /**
     * Line number offset in the book.
     */
    const [line, setLine] = useState<number>(UserState.GetBookProgressLineNo(bookId));

    const endLineNumber = bookData?.length - 1;

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
     * set to true when the end of the book is reached and there are no remaining blanks.
     */
    const [completed, setCompleted] = useState<boolean>(false);

    /**
     * maintain a separate shuffled indices of the blanked out words
     * to generate word choices for guessing.
     */
    const [shuffledBlankIdxes, setShuffledBlankIdxes] = useState<Array<number>>([]);

    /**
     * The number of words to be displayed as a blank in the page.
     */
    const [desiredBlanksCnt, setDesiredBlanksCnt] = useState<number>(UserState.GetBlanksCnt());


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

    const turnPage = (): void => {
        const newLine = line + linesPerPage;
        setLine(newLine);
        UserState.SaveBookProgress(bookId, newLine);
    }

    /**
     * Load the book from the server.
     */
    useEffect(() => {
        const filteredBooks = books.filter(b => b.id === bookId);
        if (books.length < 0 || !bookId) {
            console.error('unable to find a matching book with the book id!')
            setHasError(true);
            return;
        } else {
            setBook(filteredBooks[0]);
        }

        BookRepository
            .GetBookData(bookId)
            .then(data => {
                setBookData(data);
                setBookLoaded(true);
            })
            .catch(err => {
                console.error(err)
                setHasError(true);
            })
    }, [bookId, books])

    /**
     * Once book is loaded or when the page is turned, read new lines into the paragraph.
     */
    useEffect(() => {
        if (!bookLoaded) {
            return;
        }
        let newParagraph = '';
        for (let i = line; i < Math.min(line + linesPerPage, endLineNumber + 1); i++) {
            newParagraph += bookData[i];
            if (newParagraph.length >= targetCharactersPerPage) {
                break;
            }
        }
        setParagraph(newParagraph);
    }, [bookLoaded, bookData, line, endLineNumber])

    /**
     * Once a new paragraph is loaded, generate new word tokens.
     */
    useEffect(() => {
        if (!bookLoaded || paragraph.length === 0) {
            return;
        }

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
    }, [bookLoaded, desiredBlanksCnt, paragraph, shuffleCnt]);


    /**
     * check for completion of the game.
     */
    useEffect(() => {
        if (!bookLoaded) {
            return;
        }
        if (line > endLineNumber) {
            setCompleted(true);
            return;
        }
    }, [bookLoaded, bookId, blankIdxes, line, endLineNumber])

    if (hasError) {
        return <ErrorMessage/>
    }

    if (!bookLoaded) {
        return <LoadingMessage/>
    }

    if (completed) {
        return <CompletedMessage/>
    }

    return (
        <React.Fragment>
            <div className={'flex space-x-3 mb-2 h-8 items-center justify-center' +
                ''}>
                <div>
                    Progress {UserState.GetBookProgressPercentage(book)}
                </div>
                <button className={'rounded-2xl bg-red-300 text-black h-6 w-14 text-xs'}
                        onClick={() => {
                            const confirmed = window.confirm('do you want to reset your progress?');
                            if (confirmed) {
                                setLine(0);
                                UserState.ResetBookProgress(bookId)
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
                <select value={desiredBlanksCnt} className={'rounded-2xl h-6 w-30 bg-slate-300 text-black text-xs'}
                        onChange={(e) => {
                            const cnt = parseInt(e.currentTarget.value);
                            setDesiredBlanksCnt(cnt);
                            UserState.SaveBlanksCnt(cnt)
                        }}
                >
                    {
                        [3, 4, 5, 6, 7, 8, 9, 10].map((num, idx) =>
                            <option value={num} key={idx}>{num} blanks</option>)
                    }
                </select>
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
                {
                    blankIdxes.length === 0 &&
                    <Btn label={'Next'} disabled={false} onClick={turnPage}/>
                }
            </div>
        </React.Fragment>
    )
}