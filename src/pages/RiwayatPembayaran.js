import React, { useEffect, useState } from "react";

function RiwayatPembayaran() {
  const [payments, setPayments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const savedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(savedPayments);
  }, []);

  // kalau penjual -> bisa lihat semua pembayaran
  // kalau pembeli -> cuma lihat pembayaran dia sendiri
  const filteredPayments =
    user?.role === "seller"
      ? payments
      : payments.filter((p) => p.buyer === user?.email);

  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
        Riwayat Pembayaran
      </h1>

      {filteredPayments.length === 0 ? (
        <p>Tidak ada pembayaran.</p>
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
  );
}

const thStyle = {
  border: "1px solid #d1d5db",
  padding: "8px",
  fontWeight: "600",
};

const tdStyle = {
  border: "1px solid #d1d5db",
  padding: "8px",
};

export default RiwayatPembayaran;
