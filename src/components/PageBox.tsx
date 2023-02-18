import React from "react";
import {Token} from "../classes/Token";
import {WordBox} from "./WordBox";

interface choiceBtnProps {
    words: Array<Token>;
}

export const PageBox: React.FC<choiceBtnProps> = ({words}) => {
    const txtBox = ["text-2xl", "rounded-2xl", "p-4 max-h-[50vh]", "overflow-y-scroll",
        "bg-gradient-to-l", "from-cyan-800", "to-blue-800"].join(' ');

    return <div className={txtBox}>
        {
            words.map((word, idx) => <WordBox key={idx} word={word}/>)
        }
    </div>
}