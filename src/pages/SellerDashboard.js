import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase";

const initialForm = {
  name: "",
  desc: "",
  price: "",
  material: "",
  color: "",
  size: "",
  imagePath: "",
};

function SellerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const snap = await getDocs(collection(db, "products"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name,
        desc: form.desc,
        price: Number(form.price) || 0,
        material: form.material,
        color: form.color,
        size: form.size,
        imagePath: form.imagePath,
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
      } else {
        await addDoc(collection(db, "products"), payload);
      }
      setForm(initialForm);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan produk.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      desc: item.desc || item.deskripsi || "",
      price: item.price || item.harga || "",
      material: item.material || "",
      color: item.color || "",
      size: item.size || "",
      imagePath: item.imagePath || item.img || "",
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Hapus produk ini?");
    if (!confirm) return;
    setSaving(true);
    setError("");
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus produk.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="seller-dashboard bg-light min-vh-100">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2">
                  {editingId ? "Edit Produk" : "Tambah Produk"}
                </h5>
                <p className="text-muted small mb-3">
                  Halo, {user?.email || "Penjual"} — kelola produkmu di sini.
                </p>
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <input
                    name="name"
                    placeholder="Nama produk"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  <textarea
                    name="desc"
                    placeholder="Deskripsi"
                    value={form.desc}
                    onChange={handleChange}
                    required
                    className="form-control"
                    rows={3}
                  />
                  <input
                    name="price"
                    type="number"
                    placeholder="Harga"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  <div className="row g-2">
                    <div className="col-12 col-sm-4">
                      <input
                        name="material"
                        placeholder="Material"
                        value={form.material}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-sm-4">
                      <input
                        name="color"
                        placeholder="Warna"
                        value={form.color}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-sm-4">
                      <input
                        name="size"
                        placeholder="Ukuran"
                        value={form.size}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <input
                    name="imagePath"
                    placeholder="Path gambar (contoh: /product/product1.jpeg)"
                    value={form.imagePath}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-dark"
                  >
                    {saving ? "Menyimpan..." : editingId ? "Update Produk" : "Simpan Produk"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setForm(initialForm);
                        setEditingId(null);
                      }}
                      className="btn btn-outline-secondary"
                    >
                      Batal edit
                    </button>
                  )}
                  {error && <p className="text-danger small m-0">{error}</p>}
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-3 gap-2">
                  <h5 className="card-title m-0">Daftar Produk</h5>
                  <button
                    onClick={fetchProducts}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Refresh
                  </button>
                </div>
                {loading ? (
                  <p className="text-muted small mb-0">Memuat produk...</p>
                ) : products.length === 0 ? (
                  <p className="text-muted small mb-0">Belum ada produk.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Gambar</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Harga</th>
                          <th scope="col">Stok</th>
                          <th scope="col">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                src={item.imagePath || item.img || "/product/placeholder.jpg"}
                                alt={item.name}
                                className="rounded"
                                style={{ width: "60px", height: "75px", objectFit: "cover" }}
                              />
                            </td>
                            <td>
                              <div className="fw-semibold">{item.name}</div>
                              <div className="text-muted small">
                                {item.material} • {item.color} • {item.size}
                              </div>
                            </td>
                            <td>
                              {(item.price || item.harga || 0).toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                            <td>{item.size || "-"}</td>
                            <td>
                              <div className="d-flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="btn btn-outline-danger btn-sm"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {error && <p className="text-danger small mt-2 mb-0">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
