import React, { useEffect, useState } from "react";

function RiwayatPesanan() {
  const [pesanan, setPesanan] = useState([]);

  useEffect(() => {
    // Ambil data pesanan dari localStorage
    const data = JSON.parse(localStorage.getItem("pesanan")) || [];
    setPesanan(data);
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "40px",
        color: "#111827",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Riwayat Pesanan
        </h2>

        {pesanan.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Belum ada pesanan yang masuk.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {pesanan.map((p, index) => (
              <li
                key={index}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "15px 0",
                }}
              >
                <p>
                  <strong>Pembeli:</strong> {p.pembeli}
                </p>
                <p>
                  <strong>Produk:</strong> {p.produk}
                </p>
                <p>
                  <strong>Jumlah:</strong> {p.jumlah}
                </p>
                <p>
                  <strong>Total Harga:</strong> Rp {p.total}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  Tanggal: {p.tanggal}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RiwayatPesanan;
