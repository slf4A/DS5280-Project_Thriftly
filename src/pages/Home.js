import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        color: "#111827",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Header */}
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", fontWeight: "600" }}>
        Thriftly
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "40px", color: "#6b7280" }}>
        Jual beli pakaian thrift dengan cara yang simpel dan cepat
      </p>

      {/* Tombol */}
      <div>
        <Link to="/register">
          <button
            style={{
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              marginRight: "15px",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Daftar
          </button>
        </Link>

        <Link to="/login">
          <button
            style={{
              backgroundColor: "transparent",
              color: "#111827",
              border: "1.5px solid #111827",
              padding: "12px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#111827";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#111827";
            }}
          >
            Login
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "70px", fontSize: "0.9rem", color: "#9ca3af" }}>
        © {new Date().getFullYear()} Thriftly
      </footer>
    </div>
  );
}

export default Home;
