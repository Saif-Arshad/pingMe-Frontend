import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoutes: React.FC = () => {
    const token = localStorage.getItem('pingMe_token')

    return token ? <Outlet /> : <Navigate to="/account" />;
};
