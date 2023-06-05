import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ user, children }) {
    const isLogged = user.status;
    if (!isLogged) {
        return <Navigate to="/login" />
    }
    return children;
}