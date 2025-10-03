import React, { useEffect, useState } from "react";

function RiwayatPembayaran() {
  const [payments, setPayments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const savedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(savedPayments);
  }, []);
  
  const filteredPayments =
    user?.role === "seller"
      ? payments
      : payments.filter((p) => p.buyer === user?.email);

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
          Riwayat Pembayaran
        </h2>

        {filteredPayments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Tidak ada pembayaran.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={thStyle}>Produk</th>
                <th style={thStyle}>Jumlah</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Pembeli</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{pay.product}</td>
                  <td style={tdStyle}>{pay.quantity}</td>
                  <td style={tdStyle}>Rp {pay.total}</td>
                  <td style={tdStyle}>{pay.buyer}</td>
                  <td style={tdStyle}>{pay.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  border: "1px solid #e5e7eb",
  padding: "10px",
  fontWeight: "600",
  color: "#374151",
};

const tdStyle = {
  border: "1px solid #e5e7eb",
  padding: "10px",
  color: "#111827",
};

export default RiwayatPembayaran;
