import React from "react";
import hover from "../assets/sound/btnHover.wav";
import wrongBuzzer from "../assets/sound/wrongBuzzer.wav";
import correctChoice from "../assets/sound/correctChoice.wav";

interface choiceBtnProps {
    word: string;

    guessBlank(word: string): boolean;
}

export const ChoiceBtn: React.FC<choiceBtnProps> = ({word, guessBlank}) => {
    const hoverSound = new Audio(hover);
    const wrongSound = new Audio(wrongBuzzer);
    const correctSound = new Audio(correctChoice);
    const chcBtn = ["flex", "items-center", "p-4", "rounded-2xl", "border-solid", "border-2",
        "border-green-500", "hover:bg-green-400", "cursor-pointer", "active:bg-green-200", "transition",
        "duration-300", "hover:rotate-3", "active:skew-x-12", "active:scale-150"].join(' ');

    return <button className={chcBtn}
                   onMouseEnter={() => {
                       hoverSound.play();
                   }}
                   onClick={() => {
                       const correctGuess = guessBlank(word);
                       if (correctGuess) {
                           correctSound.play();
                       } else {
                           wrongSound.play();
                       }
                   }}>
        {word}
    </button>
}