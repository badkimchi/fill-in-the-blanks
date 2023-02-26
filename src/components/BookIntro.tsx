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
            <div className={'flex flex-col space-x-3 mb-2 h-8 items-center justify-center mt-20'}
                 onClick={() => navigate(`/books/${book.id}`)}>
                <img src={`/books/${book.imgUrl}`} alt={book.imgUrl} width={"200"} height={"200"}/>
                <div>{book.title}</div>
                <div>Progress: {UserState.GetBookProgressPercentage(book)}</div>
            </div>
        </React.Fragment>
    )
}
