import React, { useEffect, useState } from "react";

function DaftarProduk() {
  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("produk")) || [];
    setProdukList(data);
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "30px",
        color: "#111827",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Daftar Produk</h1>

      {produkList.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Belum ada produk yang ditambahkan.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {produkList.map((produk) => (
            <div
              key={produk.id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
            <img
                src={produk.gambar}
                alt={produk.nama}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",   // atau "cover"
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              />
              <h3 style={{ marginBottom: "5px" }}>{produk.nama}</h3>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>{produk.deskripsi}</p>
              <p style={{ fontWeight: "600", marginTop: "8px" }}>Rp {produk.harga}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DaftarProduk;
