import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken"); 
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/e-com/admin/auth" />;
  }
  return children;
};

export default ProtectedRoute;
