import React, {useEffect, useState} from "react";
import {PageBox} from "../components/PageBox";
import {Token, TokenState} from "../classes/Token";
import {Random} from "../classes/Random";
import {ChoiceBtn} from "../components/ChoiceBtn";

export default function Home() {
    const temp = 'There was an emperor of Persia named Kosrouschah, who, when he first came to his crown, in order to\n' +
        'obtain a knowledge of affairs, took great pleasure in night excursions, attended by a trusty minister.\n' +
        'He often walked in disguise through the city, and met with many adventures, one of the most remarkable\n' +
        'of which happened to him upon his first ramble, which was not long after his accession to the throne of\n' +
        'his father.';

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
    const [blankIdxes, setBlankIdxes] = useState<Array<number>>([]);

    /**
     * maintain a separate shuffled indices of the blanked out words
     * to generate word choices for guessing.
     */
    const [shuffledBlankIdxes, setShuffledBlankIdxes] = useState<Array<number>>([]);


    /**
     * The number of words to be displayed as a blank in the page.
     */
    const [desiredBlanksCnt, setDesiredBlanksCnt] = useState<number>(5);

    /**
     * Turn paragraphs into tokens
     */
    useEffect(() => {
        // parse paragraphs into tokens
        const tempTokens = temp
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
    }, [desiredBlanksCnt, temp])

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

    return (
        <React.Fragment>
            <PageBox words={tokens} nextBlankIdx={blankIdxes[0] || -1}/>
            <div className="flex items-center place-content-evenly h-40">
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

