// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  // get token and user from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // if not loggede in -> login page
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // requires admin role, but user isn't authorized
  if (requireAdmin && !user.role) { 
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
}
