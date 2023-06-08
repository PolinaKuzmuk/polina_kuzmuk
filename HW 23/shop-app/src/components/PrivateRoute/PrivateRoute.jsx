import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
    let user = useSelector(store => store.user) || {};
    const isLogged = user.status;
    if (!isLogged) {
        return <Navigate to="/login" />
    }
    return children;
}