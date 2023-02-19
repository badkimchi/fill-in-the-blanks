import React from "react";
import {Token} from "../classes/Token";
import {WordBox} from "./WordBox";

interface choiceBtnProps {
    words: Array<Token>;

    // idx of the blank in question.
    nextBlankIdx: number;
}

export const PageBox: React.FC<choiceBtnProps> = ({words, nextBlankIdx}) => {
    const txtBox = ["text-2xl", "rounded-2xl", "p-4 max-h-[50vh]", "overflow-y-scroll",
        "bg-gradient-to-l", "from-cyan-800", "to-blue-800"].join(' ');

    return <div className={txtBox}>
        {
            words.map((word, idx) =>
                <WordBox key={idx} word={word} inQuestion={idx === nextBlankIdx}/>)
        }
    </div>
}