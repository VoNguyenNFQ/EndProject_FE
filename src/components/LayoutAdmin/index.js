import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import Banner from 'components/Banner';
import { useEffect } from 'react'
import Sidebar from 'components/Sidebar';
const LayoutAdmin = ({ children }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Sidebar />
            {children}
        </>
    );
};

export default LayoutAdmin;