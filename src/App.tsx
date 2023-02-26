import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import {BookReader} from "./pages/BookReader";
import {BookList} from "./pages/BookList";
import {BookInfo} from "./classes/BookInfo";

export default function App() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Array<BookInfo>>([]);
    useEffect(() => {
        fetch('/books/list.json')
            .then(res => res.json())
            .then(data => setBooks(data.books))
    }, [])

    return (
        <main className="w-full h-screen bg-gradient-to-l from-slate-700 to-slate-800">
            <div className={'font-mono text-white container mx-auto'}>
                <header
                    className={'h-20 flex justify-center items-center text-xl font-bold ' +
                        'cursor-pointer hover:text-emerald-500'}
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Fill In The Blanks
                </header>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/list' element={<BookList books={books}/>}/>
                    <Route path='/books/:bookId' element={<BookReader books={books}/>}/>
                </Routes>
            </div>
        </main>
    );
}
