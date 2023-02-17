import React from "react";
import {useState} from "react";


export default function Home() {

    const choiceBtn = ["flex", "items-center", "p-4", "rounded-2xl", "border-solid", "border-2",
        "border-green-500", "hover:bg-slate-400", "cursor-pointer"].join(' ')

    return (
        <React.Fragment>
            <div className="text-2xl bg-yellow-700 rounded-2xl p-4">
                There was an emperor of Persia named Kosrouschah, who, when he first came to his crown, in order to
                obtain a knowledge of affairs, took great pleasure in night excursions, attended by a trusty minister.
                He often walked in disguise through the city, and met with many adventures, one of the most remarkable
                of which happened to him upon his first ramble, which was not long after his accession to the throne of
                his father.
            </div>
            <div className="flex items-center place-content-evenly h-40 bg-slate-600">
                <div className={choiceBtn}>emperor</div>
                <div className={choiceBtn}>crown</div>
            </div>
        </React.Fragment>
    )
}

