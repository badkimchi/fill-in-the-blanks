import React from "react";
import BookIntro from "../components/BookIntro";


export default function BookList() {
    return (
        <React.Fragment>
            <div className={'flex mt-20 flex-col space-x-3 mb-2 h-8 items-center justify-center'}>
                <div className={'mt-20'}>
                    <BookIntro/>
                </div>
            </div>
        </React.Fragment>
    )
}

