import React from 'react';
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import { Create } from './Components/Create';
import { Error } from './Components/Error';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { Products } from './Components/Products';

export const Root = () => {
    return (
        <div className="layout">
            <BrowserRouter>
                <Header/>
                <div id="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="*" element={<Error/>} />
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}
