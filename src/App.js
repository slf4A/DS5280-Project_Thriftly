import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatPopup from "./components/ChatPopup";

import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/Login";

import SellerDashboard from "./pages/penjualDashboard";
import BuyerDashboard from "./pages/pembeliDashboard";
import RoleBasedRoute from "./components/Rolebased";
import ProtectedRoute from "./components/Protectroute";
import UploadProduk from "./pages/UploadProduk";
import DaftarProduk from "./pages/DaftarProduk";
import RiwayatPesanan from "./pages/RiwayatPesanan";
import RiwayatPembayaran from "./pages/RiwayatPembayaran";

function App() {
  const isLoggedIn = localStorage.getItem("currentUser"); // simpan saat login

  return (
    <Router>
      <Header />
      <Routes>
        {/* Register sebagai halaman awal */}
        <Route path="/" element={<Register />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />

        {/* Home page - semua user setelah login diarahkan ke sini */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Dashboard khusus role */}
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

        <Route
          path="/riwayat-pesanan"
          element={
            <RoleBasedRoute allowedRole="seller">
              <RiwayatPesanan />
            </RoleBasedRoute>
          }
        />

        {/* Riwayat Pembayaran */}
        <Route path="/riwayat-pembayaran" element={<RiwayatPembayaran />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <ChatPopup />
    </Router>
  );
}

export default App;
