import {useNavigate} from "react-router-dom";
import React from "react";

export default function CompletedMessage() {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className={'flex space-x-3 mb-2 h-8 items-center justify-center' +
                ''}>
                <div>
                    Congratulations, You have completed the book!
                </div>
                <button className={'rounded-2xl bg-red-300 text-black h-6 w-14 text-xs'}
                        onClick={() => {
                            navigate('/')
                        }}
                >
                    Go Back
                </button>
            </div>
        </React.Fragment>
    )
}
