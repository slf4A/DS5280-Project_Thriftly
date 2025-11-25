import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatPopup from "./components/ChatPopup";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Collection from "./pages/Collection";

import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import RoleBasedRoute from "./components/RoleBasedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadProduk from "./pages/UploadProduk";
import DaftarProduk from "./pages/DaftarProduk";
import RiwayatPesanan from "./pages/RiwayatPesanan";
import RiwayatPembayaran from "./pages/RiwayatPembayaran";
import Checkout from "./pages/Checkout";
import { auth } from "./firebase";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const roleMap = JSON.parse(localStorage.getItem("userRoles")) || {};
        const role = roleMap[user.email] || "buyer";
        localStorage.setItem("user", JSON.stringify({ email: user.email, role }));
      } else {
        localStorage.removeItem("user");
      }
      setIsReady(true);
    });
    return unsub;
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = Boolean(currentUser);

  if (!isReady) {
    return null;
  }

  return (
    <Router>
      <CartProvider>
        <FavoriteProvider>
          <AppLayout isLoggedIn={isLoggedIn} />
        </FavoriteProvider>
      </CartProvider>
    </Router>
  );
}

function AppLayout({ isLoggedIn }) {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const hideChrome = path === "/login" || path === "/register";

  return (
    <>
      {!hideChrome && <Header />}
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Home page - accessible without login */}
        <Route path="/home" element={<Home />} />

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
        <Route
          path="/riwayat-pembayaran"
          element={
            <ProtectedRoute>
              <RiwayatPembayaran />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!hideChrome && <Footer />}
      {!hideChrome && <ChatPopup />}
    </>
  );
}

export default App;
