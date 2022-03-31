import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import Banner from 'components/Banner';
import { useEffect } from 'react'
const Layout = ({ children }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            <Banner />
            {children}
            <Footer />
        </>
    );
};

export default Layout;