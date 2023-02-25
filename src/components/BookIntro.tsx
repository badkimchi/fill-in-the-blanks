import {useNavigate} from "react-router-dom";
import React from "react";


export default function BookIntro() {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className={'flex flex-col space-x-3 mb-2 h-8 items-center justify-center'}>
                <img src="/books/1.jpg" alt="Girl in a jacket" width={"200"} height={"200"}/>
                <button onClick={() => {
                    navigate('/book/1')
                }}>
                    Start
                </button>
            </div>
        </React.Fragment>
    )
}
