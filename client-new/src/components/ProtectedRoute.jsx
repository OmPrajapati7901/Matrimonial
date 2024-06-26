import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    // console.log("user",user)
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
      }
      return children;
}

export default ProtectedRoute