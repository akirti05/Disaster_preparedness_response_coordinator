import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated ? element : <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
