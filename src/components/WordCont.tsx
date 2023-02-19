import React from "react";
import {Token, TokenState} from "../classes/Token";

interface wordBoxProps {
    word: Token;

    // the blank that needs to be solved next (now)
    inQuestion: boolean;
}

export const WordCont: React.FC<wordBoxProps> = ({word, inQuestion}) => {
    const baseStyle = 'inline-block ml-2.5 mb-1 h-6 inline-flex items-center justify-center rounded-md py-3 ';
    const markNextInQuestion = (inQuestion ? ' border-solid border-4 border-red-500' : '');

    if (word.getState() === TokenState.Blanked) {
        return <React.Fragment>
            <div className={baseStyle + ' w-40 bg-white' + markNextInQuestion}>
                ???
            </div>
            {word.endsWithPunctuation() ? word.getLastLetter() : ''}
        </React.Fragment>
    }
    if (word.getState() === TokenState.WrongGuess) {
        return <React.Fragment>
            <div className={baseStyle + ' w-40 bg-red-300 border-solid border-2 border-red-200'}>
                ???
            </div>
            {word.endsWithPunctuation() ? word.getLastLetter() : ''}
        </React.Fragment>
    }
    if (word.getState() === TokenState.Correct) {
        return <React.Fragment>
            <div className={baseStyle + ' w-40 bg-white text-black border-solid border-2 border-green-200'}>
                {word.getWord()}
            </div>
            {word.endsWithPunctuation() ? word.getLastLetter() : ''}
        </React.Fragment>
    }

    return <React.Fragment>
        <div className={baseStyle}>
            {word.getWord()}
        </div>
        {word.endsWithPunctuation() ? word.getLastLetter() : ''}
    </React.Fragment>
}