// src/PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('authenticatedUser'); // Simple check

    return (
        <Route
            {...rest}
            element={isAuthenticated ? Component : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
