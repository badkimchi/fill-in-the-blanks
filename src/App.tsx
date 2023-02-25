import React from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import BookList from "./pages/BookList";

export default function App() {
    const navigate = useNavigate();
    return (
        <main className={'font-mono text-white container mx-auto'}>
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
                <Route path='/list' element={<BookList/>}/>
                <Route path='/book/:id' element={<Book/>}/>
            </Routes>
        </main>
    );
}
