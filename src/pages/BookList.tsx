import React from "react";
import {BookIntro} from "../components/BookIntro";
import {BookInfo} from "../classes/BookInfo";
import {useNavigate} from "react-router-dom";
import {Btn} from "../components/Btn";

interface props {
    books: Array<BookInfo>;
}

export const BookList: React.FC<props> = ({books}) => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div className={'flex flex-col space-x-3 mb-2 pb-20 items-center justify-center cursor-pointer'}>
                <div>
                    {
                        books?.map(book => <BookIntro key={book.id} book={book}/>)
                    }
                </div>
                <div className={'mt-20'}>
                    <Btn label={'Load from Text File'}
                         disabled={false}
                         onClick={() => {
                             navigate('/books/create');
                         }}/>
                </div>
            </div>
        </React.Fragment>
    )
}

