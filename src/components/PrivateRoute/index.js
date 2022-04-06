import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = (Component) => {
    const checkRoute = (props) => {
        const token = localStorage.getItem("tokenAdmin");
        return token ? <Component {...props} /> : <Navigate to="/admin/sign-in" />
    }
    return checkRoute();
};

export default PrivateRoutes;