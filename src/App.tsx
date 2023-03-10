import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import {BookReader} from "./pages/BookReader";
import {BookList} from "./pages/BookList";
import {BookInfo} from "./classes/BookInfo";
import {BookCreate} from "./pages/BookCreate";
import {BookRepository} from "./classes/BookRepository";

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [books, setBooks] = useState<Array<BookInfo>>([]);

    useEffect(() => {
        BookRepository
            .GetBookInfos()
            .then(books => setBooks(books))
    }, [location])

    return (
        <main className="w-full min-h-screen bg-gradient-to-l from-slate-700 to-slate-800">
            <div className={'font-mono text-white container mx-auto'}>
                <header>
                    <h1
                        className={'h-20 flex justify-center items-center text-xl font-bold ' +
                            'cursor-pointer hover:text-emerald-500'}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Fill In The Blanks
                    </h1>
                </header>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/books/:bookId' element={<BookReader books={books}/>}/>
                    <Route path='/books/list' element={<BookList books={books}/>}/>
                    <Route path='/books/create' element={<BookCreate/>}/>
                </Routes>
            </div>
        </main>
    );
}
