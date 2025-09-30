import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import Home from "./pages/Home";
import SellerDashboard from "./pages/penjualDashboard";
import BuyerDashboard from "./pages/pembeliDashboard";
import RoleBasedRoute from "./components/Rolebased";
import UploadProduk from "./pages/UploadProduk";
import DaftarProduk from "./pages/DaftarProduk";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard sesuai role */}
        <Route
          path="/seller"
          element={
            <RoleBasedRoute allowedRole="seller">
              <SellerDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/buyer"
          element={
            <RoleBasedRoute allowedRole="buyer">
              <BuyerDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Upload Produk */}
        <Route
          path="/upload"
          element={
            <RoleBasedRoute allowedRole="seller">
              <UploadProduk />
            </RoleBasedRoute>
          }
        />

        {/* Daftar Produk */}
        <Route
          path="/produk"
          element={
            <RoleBasedRoute allowedRole="seller">
              <DaftarProduk />
            </RoleBasedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
