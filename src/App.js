import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatPopup from "./components/ChatPopup";

import Home from "./pages/Home";

import SellerDashboard from "./pages/penjualDashboard";
import BuyerDashboard from "./pages/pembeliDashboard";
import RoleBasedRoute from "./components/Rolebased";
import UploadProduk from "./pages/UploadProduk";
import DaftarProduk from "./pages/DaftarProduk";
import RiwayatPesanan from "./pages/RiwayatPesanan";
import RiwayatPembayaran from "./pages/RiwayatPembayaran";



function App() {
  return (
    <Router>
      <Header />
      <Routes>
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

        <Route
          path="/riwayat-pesanan"
          element={
            <RoleBasedRoute allowedRole="seller">
              <RiwayatPesanan />
            </RoleBasedRoute>
          }
        />    

        <Route 
        path="/riwayat-pembayaran" 
        element={<RiwayatPembayaran />} />

        

        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      </Routes>
      <Footer />
      <ChatPopup />

    </Router>
  );
}

export default App;