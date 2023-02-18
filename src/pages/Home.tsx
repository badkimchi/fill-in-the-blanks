import React from "react";
import hover from '../static/btn_hover.wav';
import click from '../static/btn-click.mp3';

export default function Home() {
    const hoverSound = new Audio(hover);
    const clickSound = new Audio(click);

    const txtBox = ["text-2xl", "rounded-2xl", "p-4 max-h-[50vh]", "overflow-y-scroll",
        "bg-gradient-to-l", "from-cyan-800", "to-blue-800"].join(' ');
    const chcBtn = ["flex", "items-center", "p-4", "rounded-2xl", "border-solid", "border-2",
        "border-green-500", "hover:bg-green-400", "cursor-pointer", "active:bg-green-200", "transition",
        "duration-300", "hover:rotate-3", "active:skew-x-12", "active:scale-150"].join(' ');

    return (
        <React.Fragment>
            <div className={txtBox}>
                There was an emperor of Persia named Kosrouschah, who, when he first came to his crown, in order to
                obtain a knowledge of affairs, took great pleasure in night excursions, attended by a trusty minister.
                He often walked in disguise through the city, and met with many adventures, one of the most remarkable
                of which happened to him upon his first ramble, which was not long after his accession to the throne of
                his father.
            </div>
            <div className="flex items-center place-content-evenly h-40">
                <button className={chcBtn}
                        onMouseEnter={() => {
                            hoverSound.play();
                        }}
                        onClick={() => {
                            clickSound.play();
                        }}
                >emperor
                </button>
                <button className={chcBtn}
                        onMouseEnter={() => {
                            hoverSound.play();
                        }}
                        onClick={() => {
                            clickSound.play();
                        }}
                >crown
                </button>
            </div>
        </React.Fragment>
    )
}

