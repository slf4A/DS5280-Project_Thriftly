import React from "react";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#111827",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "10px" }}>
          Dashboard Penjual
        </h1>
        <p style={{ marginBottom: "25px", color: "#6b7280" }}>
          Halo, {user?.email || "Penjual"} Kelola produkmu di Thriftly!
        </p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          {/* Tombol Tambah Produk */}
          <button
            onClick={() => navigate("/upload")}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#111827",
              color: "white",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Tambah Produk
          </button>

          {/* Tombol Lihat Pesanan */}
          <button
            onClick={() => navigate("/riwayat-pesanan")}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "white",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Lihat Pesanan
          </button>

          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "white",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
