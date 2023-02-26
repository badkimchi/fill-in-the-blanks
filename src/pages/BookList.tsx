import React from "react";
import {BookIntro} from "../components/BookIntro";
import {BookInfo} from "../classes/BookInfo";

interface props {
    books: Array<BookInfo>;
}

export const BookList: React.FC<props> = ({books}) => {
    return (
        <React.Fragment>
            <div className={'flex mt-20 flex-col space-x-3 mb-2 h-8 items-center justify-center cursor-pointer'}>
                <div className={'mt-20'}>
                    {
                        books?.map(book => <BookIntro key={book.id} book={book}/>)
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

