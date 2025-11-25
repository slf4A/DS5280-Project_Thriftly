import React from "react";
import { Navigate } from "react-router-dom";

function RoleBasedRoute({ allowedRole, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // kalau belum login → balikin ke login
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    // kalau role salah → balikin ke landing page
    return <Navigate to="/" />;
  }

  // kalau sesuai → render halaman
  return children;
}

export default RoleBasedRoute;
