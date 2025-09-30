import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadProduk() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState(null);
  const navigate = useNavigate();

  // Fungsi untuk handle upload file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGambar(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const produkBaru = {
      id: Date.now(),
      nama,
      deskripsi,
      harga,
      gambar: gambar || "https://via.placeholder.com/300x400",
    };

    // Simpan produk ke localStorage
    const produkList = JSON.parse(localStorage.getItem("produk")) || [];
    produkList.push(produkBaru);
    localStorage.setItem("produk", JSON.stringify(produkList));

    alert("Produk berhasil ditambahkan!");
    navigate("/seller");
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
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Tambah Produk Baru
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            placeholder="Nama Produk"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
          />
          <textarea
            placeholder="Deskripsi Produk"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
          />
          <input
            type="number"
            placeholder="Harga Produk"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
          />

          {/* Preview Gambar */}
          {gambar && (
            <img
              src={gambar}
              alt="Preview Produk"
              style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
            />
          )}

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#111827",
              color: "white",
              cursor: "pointer",
            }}
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadProduk;
