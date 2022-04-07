import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const token = localStorage.getItem("tokenAdmin");
    return token 
    ? children ? children : <Outlet /> 
    : <Navigate to="/admin/sign-in" replace />
};

export default PrivateRoutes;