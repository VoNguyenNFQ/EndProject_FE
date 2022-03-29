import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import Banner from 'components/Banner';
const Layout = ({ children }) => {
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