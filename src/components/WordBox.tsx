import React from "react";
import {Token, TokenState} from "../classes/Token";

interface wordBoxProps {
    word: Token;

    // the blank that needs to be solved next (now)
    inQuestion: boolean;
}

export const WordBox: React.FC<wordBoxProps> = ({word, inQuestion}) => {
    const baseStyle = 'inline-block ml-2.5 h-8 inline-flex items-center justify-center rounded-md py-3';
    const markNextInQuestion = (inQuestion ? ' border-solid border-4 border-red-500' : '');

    if (word.getState() === TokenState.Blanked) {
        return <div className={baseStyle + ' w-28 bg-white' + markNextInQuestion}>
            ???
        </div>
    }
    if (word.getState() === TokenState.WrongGuess) {
        return <div className={baseStyle + ' w-28 bg-red-300 border-solid border-2 border-red-200'}>
            ???
        </div>
    }
    if (word.getState() === TokenState.Correct) {
        return <div className={baseStyle + ' border-solid border-2 border-green-200'}>
            {word.getWord()}
        </div>
    }

    return <div className={baseStyle}>
        {word.getWord()}
    </div>
}