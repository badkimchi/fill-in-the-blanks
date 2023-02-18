import React from "react";
import {Token} from "../classes/Token";

interface wordBoxProps {
    word: Token;
}

export const WordBox: React.FC<wordBoxProps> = ({word}) => {
    if (word.isBlankedOut()) {
        return <div className={'inline-block ml-2.5 text-zinc-800'}>
            {word.getWord()}
        </div>
    }

    return <div className={'inline-block ml-2.5'}>
        {word.getWord()}
    </div>
}