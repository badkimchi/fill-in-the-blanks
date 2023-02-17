import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
    return (
        <main className={'font-mono text-white container mx-auto'}>
            <header className={'h-20 flex justify-center items-center text-3xl font-bold'}>
                Fill In The Blanks Generator
            </header>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </main>
    );
}
