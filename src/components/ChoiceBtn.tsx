import React from "react";
import hover from "../static/btn_hover.wav";
import click from "../static/btn-click.mp3";

interface choiceBtnProps {
    word: string
}

export const ChoiceBtn:React.FC<choiceBtnProps> = ({word}) => {
    const hoverSound = new Audio(hover);
    const clickSound = new Audio(click);
    const chcBtn = ["flex", "items-center", "p-4", "rounded-2xl", "border-solid", "border-2",
        "border-green-500", "hover:bg-green-400", "cursor-pointer", "active:bg-green-200", "transition",
        "duration-300", "hover:rotate-3", "active:skew-x-12", "active:scale-150"].join(' ');

    return <button className={chcBtn}
                   onMouseEnter={() => {
                       hoverSound.play();
                   }}
                   onClick={() => {
                       clickSound.play();
                   }}>
        {word}
    </button>
}