import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Btn} from "../components/Btn";
import {BookRepository} from "../classes/BookRepository";

export const BookCreate: React.FC = () => {
    const [content, setContent] = useState<string | ArrayBuffer | null>(null);
    const [bookName, setBookName] = useState<string>('');
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div className={'flex flex-col space-x-3 mb-2 items-center justify-center cursor-pointer'}>
                <div className={'flex mt-10'}>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg
                        cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        accept={'.txt'}
                        width={'auto'}
                        onChange={(e) => {
                            const f = e.target?.files && e.target.files[0];
                            if (!f) {
                                return;
                            }

                            //"accept" restrictions are not enforced in some browsers
                            if (f.name.split('.').pop() !== 'txt') {
                                alert('only txt file is accepted!');
                                return;
                            }
                            
                            const fr = new FileReader();
                            fr.onload = function () {
                                setContent(fr.result)
                            }
                            fr.readAsText(f);
                        }}
                    />
                </div>
                {
                    content !== null &&
                    <div className={'mt-20 '}>
                        Book Name
                        <input type={'text'}
                               className={'text-blue-800 bg-gray-200 appearance-none border-2 border-gray-200 ' +
                                   'rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none ' +
                                   'focus:bg-white focus:border-purple-500'}
                               value={bookName}
                               onChange={e => {
                                   setBookName(e.target.value)
                               }}/>
                        {
                            bookName.length > 0 &&
                            <Btn label={'Create'}
                                 disabled={false}
                                 onClick={() => {
                                     BookRepository.CreateLocalBook(bookName, String(content))
                                     navigate('/books/list')
                                 }}/>
                        }
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

