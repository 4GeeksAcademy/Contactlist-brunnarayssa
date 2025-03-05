import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home"; 
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Demo />} />
                    <Route path="/add" element={<Home />} />
                    <Route path="/edit/:id" element={<Home />} />  {/* ✅ Se agregó esta línea */}
                    <Route path="/contact/:id" element={<Single />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default injectContext(Layout);
