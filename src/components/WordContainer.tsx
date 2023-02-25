import React from "react";
import {Token, TokenState} from "../classes/Token";

interface wordBoxProps {
    word: Token;

    // the blank that needs to be solved next (now)
    inQuestion: boolean;
}

export const WordContainer: React.FC<wordBoxProps> = ({word, inQuestion}) => {
    const baseStyle = 'h-8 inline-flex items-center justify-center rounded-md ';
    const markNextInQuestion = (inQuestion ? ' border-solid border-4 border-red-500' : '');

    if (word.getState() === TokenState.Blanked) {
        return <PunctuationsWrapper word={word}>
            <div className={baseStyle + ' w-40 bg-white' + markNextInQuestion}>
                ???
            </div>
        </PunctuationsWrapper>
    }
    if (word.getState() === TokenState.WrongGuess) {
        return <PunctuationsWrapper word={word}>
            <div className={baseStyle + ' w-40 bg-red-300 border-solid border-2 border-red-200'}>
                ???
            </div>
        </PunctuationsWrapper>
    }
    if (word.getState() === TokenState.Correct) {
        return <PunctuationsWrapper word={word}>
            <div className={baseStyle + ' w-40 bg-white text-black border-solid border-2 border-green-200'}>
                {word.getWord()}
            </div>
        </PunctuationsWrapper>
    }

    return <PunctuationsWrapper word={word}>
        <div className={baseStyle}>
            {word.getWord()}
        </div>
    </PunctuationsWrapper>
}

interface PunctuationsProps {
    word: Token;
    children: React.ReactNode
}

const PunctuationsWrapper: React.FC<PunctuationsProps> = ({word, children}) => {
    const styl = 'inline-block ml-2.5 mb-1 inline-flex items-center ';
    return <div className={styl}>
        {word.getStartingPunctuation()}
        {children}
        {word.getEndingPunctuation()}
    </div>
}