import React from "react";
import {BookIntro} from "../components/BookIntro";
import {BookInfo} from "../classes/BookInfo";

interface props {
    books: Array<BookInfo>;
}

export const BookList: React.FC<props> = ({books}) => {
    return (
        <React.Fragment>
            <div className={'flex flex-col space-x-3 mb-2 items-center justify-center cursor-pointer'}>
                <div>
                    {
                        books?.map(book => <BookIntro key={book.id} book={book}/>)
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

