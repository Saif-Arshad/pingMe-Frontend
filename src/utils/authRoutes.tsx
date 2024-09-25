// utils/protectedRoutes.tsx or a similar file
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoute: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('pingMe_token');
    return isAuthenticated ? <Outlet /> : <Navigate to="/account" />;
};

export default AuthRoute;
