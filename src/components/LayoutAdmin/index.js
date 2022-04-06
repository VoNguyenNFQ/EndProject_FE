import HeaderAdmin from 'components/HeaderAdmin';
import Sidebar from 'components/Sidebar';
import React, { useEffect, useState } from 'react';
const LayoutAdmin = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState("-left-64");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <HeaderAdmin setShowSidebar={setShowSidebar}/>
            {children}
        </>
    );
};

export default LayoutAdmin;