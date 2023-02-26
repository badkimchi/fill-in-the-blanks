import {useNavigate} from "react-router-dom";
import React from "react";
import {BookInfo} from "../classes/BookInfo";
import {UserState} from "../classes/UserState";

interface BookIntroProps {
    book: BookInfo
}

export const BookIntro: React.FC<BookIntroProps> = ({book}) => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className={'flex flex-col space-x-3 mb-2 h-50 items-center justify-center mt-10'}
                 onClick={() => navigate(`/books/${book.id}`)}>
                <div className={'w-28'}>
                    <img src={`/books/${book.imgUrl}`} alt={book.imgUrl}/>
                </div>
                <div className={'mt-2'}>{book.title}</div>
                <div>Progress: {UserState.GetBookProgressPercentage(book)}</div>
            </div>
        </React.Fragment>
    )
}
