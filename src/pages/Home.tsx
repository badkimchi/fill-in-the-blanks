import React, {useEffect, useState} from "react";
import {WordContainer} from "../components/WordContainer";
import {Token, TokenState} from "../classes/Token";
import {useNavigate} from "react-router-dom";

const fullSentence: Array<Token> = [new Token('There'), new Token('was'), new Token('an'),
    new Token('emperor'), new Token('of'), new Token('Persia'),
    new Token('named'), new Token('Kosrouschah,'), new Token('who,'),
    new Token('when'), new Token('he'), new Token('first'),
    new Token('came'), new Token('to'), new Token('his'),
    new Token('crown,', TokenState.Blanked), new Token('in'), new Token('order'),
    new Token('to'), new Token('gain'), new Token('knowledge'),
    new Token('of'), new Token('affairs,'), new Token('took'),
    new Token('great'), new Token('pleasure'), new Token('in'),
    new Token('night'), new Token('excursions.', TokenState.Blanked),
]

export default function Home() {
    const navigate = useNavigate();
    const [displayedSentence, setDisplayedSentence] = useState<Array<Token>>([
        new Token('There'), new Token('was')]);

    /**
     * Gradually reveal the full sentence by taking one word at a time.
     */
    useEffect(() => {
        const wordDisplayInterval = setInterval(() => {
            if (displayedSentence.length < fullSentence.length) {
                setDisplayedSentence(displayedSentence =>
                    [...displayedSentence, fullSentence[displayedSentence.length]])
            }
        }, 200);

        return () => {
            clearInterval(wordDisplayInterval);
        }
    }, [])

    return (
        <React.Fragment>
            <div className={'flex mt-20 flex-col space-x-3 mb-2 h-8 items-center justify-center'}>
                <div className={'mt-40'}>
                    {
                        displayedSentence.map((word, idx) =>
                            <WordContainer key={idx} word={word} inQuestion={false}/>)
                    }
                </div>
                {
                    <div className={'mt-20 bg-transparent hover:bg-blue-300 text-blue-300 font-semibold ' +
                        'hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded ' +
                        'transition ease-in-out duration-100'}
                    >
                        <button onClick={() => {
                            navigate('/list');
                        }}>
                            Get Started
                        </button>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

