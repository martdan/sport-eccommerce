import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // If no user is logged in, redirect to login page
    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
