import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (isAuthenticated) {
    // Redirect logged-in users away from the login page to the home page or another route
    return <Navigate to="/e-com/admin" />;
  }

  return element;
};

export default PublicRoute;