import React from 'react';
import { useStore } from './layout/master';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { userStore } = useStore();

    const isLogin = !!userStore.currentUser.username;
    if (!isLogin) {
        return <Navigate to={'/login'} />;
    }
    return (
        <div>
            {children}
        </div>
    );
}

export default ProtectedRoute;
