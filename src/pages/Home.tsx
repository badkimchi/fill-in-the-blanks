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
     */
    const [blankIdxes, setBlankIdxes] = useState<Array<number>>([]);

    /**
     * The number of words to be displayed as a blank in the page.
     */
    const [desiredBlanksCnt, setDesiredBlanksCnt] = useState<number>(3);

    /**
     * Turn paragraphs into tokens
     */
    useEffect(() => {
        const tempTokens = temp
            .split(/\n|\t| /)
            .filter(t => t.trim() !== '')
            .map(t => new Token(t));

        const uniqueWords = new Set<string>(tempTokens
            .filter(t => t.isWord())
            .map(t => t.getWord()));
        const blanksCnt = Math.min(uniqueWords.size, desiredBlanksCnt);
        const blankedWords = Random.chooseManyFrom(uniqueWords, blanksCnt);
        const idxes: Array<number> = [];
        const newTokens = tempTokens.map((t, idx) => {
            if (blankedWords.has(t.getWord())) {
                t.setState(TokenState.Blanked);
                idxes.push(idx);
                blankedWords.delete(t.getWord());
                return t;
            }
            return t;
        })
        setBlankIdxes(idxes);
        setTokens(newTokens);
    }, [temp])

    /**
     * Guess the blank word.
     * The state of the box will change depending on the correctness of the answer.
     *
     * @param word
     */
    const guessBlank = (word: string): boolean => {
        const idx = blankIdxes[0];
        if (idx === undefined) {
            console.error('no more blanked words!')
            return false;
        }
        if (word !== tokens[idx].getWord()) {
            tokens[idx].setState(TokenState.WrongGuess);
            setTokens([...tokens]);
            return false;
        }
        blankIdxes.shift()
        setBlankIdxes([...blankIdxes]);
        tokens[idx].setState(TokenState.Correct);
        setTokens([...tokens]);
        return true;
    }

    return (
        <React.Fragment>
            <PageBox words={tokens}/>
            <div className="flex items-center place-content-evenly h-40">
                {
                    blankIdxes.map(idx => <ChoiceBtn
                        key={idx}
                        word={tokens[idx].getWord()}
                        guessBlank={guessBlank}
                    />)
                }
            </div>
        </React.Fragment>
    )
}

