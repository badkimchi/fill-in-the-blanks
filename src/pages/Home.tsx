import React, {useEffect, useState} from "react";
import {ChoiceBtn} from "../components/ChoiceBtn";
import {PageBox} from "../components/PageBox";
import {BookPage} from "../classes/BookPage";

export default function Home() {
    const temp = 'There was an emperor of Persia named Kosrouschah, who, when he first came to his crown, in order to\n' +
        'obtain a knowledge of affairs, took great pleasure in night excursions, attended by a trusty minister.\n' +
        'He often walked in disguise through the city, and met with many adventures, one of the most remarkable\n' +
        'of which happened to him upon his first ramble, which was not long after his accession to the throne of\n' +
        'his father.';
    const [bookPage, setBookPage] = useState<BookPage>(new BookPage(temp));

    useEffect(() => {
        setTimeout(() => {
            bookPage.setDesiredBlanksCnt(2);
            bookPage.selectBlanks();
            setBookPage(bookPage);
            
        }, 3000)
    }, [])

    return (
        <React.Fragment>
            <PageBox words={bookPage.getTokens()}/>
            <div className="flex items-center place-content-evenly h-40">
                <ChoiceBtn word={'emperor'}/>
                <ChoiceBtn word={'choice'}/>
            </div>
        </React.Fragment>
    )
}

