import {useNavigate} from "react-router-dom";
import React from "react";
import {BookInfo} from "../classes/BookInfo";
import {UserState} from "../classes/UserState";
import {Btn} from "./Btn";

interface BookIntroProps {
    book: BookInfo
}

export const BookIntro: React.FC<BookIntroProps> = ({book}) => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className={'flex flex-col space-x-3 mb-2 h-50 items-center justify-center mt-10 ' +
                'hover:skew-y-3 hover:scale-150 hover:text-green-300 cursor-pointer'}
                 onClick={() => navigate(`/books/${book.id}`)}>
                <div className={'w-28'}>
                    <img src={`/books/${book.imgUrl}`}
                         alt={book.imgAlt}/>
                </div>
                <div className={'mt-2'}>{book.title}</div>
                <div>Progress: {UserState.GetBookProgressPercentage(book)}</div>
            </div>
            {
                UserState.GetBookStarted(book) &&
                <Btn label={'restart'} disabled={false} onClick={() => {
                    const confirm = window.confirm('do you want to reset progress and restart this book?')
                    if (confirm) {
                        UserState.ResetBookProgress(book.id);
                        navigate(`/books/${book.id}`);
                    }
                }}/>
            }
        </React.Fragment>
    )
}
