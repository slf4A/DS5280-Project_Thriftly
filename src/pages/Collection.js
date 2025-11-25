import React, { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { Heart, ShoppingCart } from "react-feather";
import { db } from "../firebase";
import { useFavorite } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";

const filterOptions = [
  { label: "Material Cotton", value: "Cotton" },
  { label: "Material Leather", value: "Leather" },
  { label: "Color White", value: "White" },
  { label: "Color Black", value: "Black" },
  { label: "Size M", value: "M" },
  { label: "Size L", value: "L" },
];

function Collection() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(initialQuery);
  const [filter, setFilter] = useState(null);
  const [page] = useState(1);
  const pageSize = 6;
  const { favorites, toggleFavorite } = useFavorite();
  const { addToCart } = useCart();

  useEffect(() => {
    setSearch(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const snap = await getDocs(collection(db, "products"));
        const data = snap.docs.map((doc) => {
          const item = { id: doc.id, ...doc.data() };
          const imagePath = item.imagePath || item.img || item.image || "";
          const localImage = imagePath ? (imagePath.startsWith("/") ? imagePath : `/${imagePath}`) : "";
          return { ...item, img: localImage };
        });
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat koleksi. Periksa koneksi atau konfigurasi Firestore.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((item) => {
      const matchText =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.desc?.toLowerCase().includes(q) ||
        item.deskripsi?.toLowerCase().includes(q);
      const matchFilter =
        !filter ||
        item.material === filter ||
        item.color === filter ||
        item.size === filter;
      return matchText && matchFilter;
    });
  }, [products, search, filter]);

  const visible = filtered;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Collections</h2>
        <p className="text-muted">
          Telusuri kurasi koleksi pilihan untuk melengkapi gaya kamu.
        </p>
      </div>

      <div className="border-top border-bottom py-3 mb-4">
        <div className="container d-flex align-items-center flex-wrap gap-3 px-0">
          <form
            className="d-flex flex-wrap align-items-center gap-2 w-100"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Cari produk..."
              style={{ maxWidth: "280px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="fw-bold ms-2">Filter by</span>
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`filter-link ${filter === option.value ? "active" : ""}`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
            <button
              type="button"
              className="filter-link text-danger"
              onClick={() => setFilter(null)}
            >
              Clear
            </button>
            <span className="ms-auto text-muted small">
              {filtered.length} products
            </span>
          </form>
        </div>
      </div>

      {loading && <p className="text-center text-muted">Memuat koleksi...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row g-4">
        {visible.map((item) => (
          <div className="col-12 col-md-4" key={item.id}>
            <div className="card h-100 shadow-sm border-0">
              <button
                className="btn-like"
                onClick={() => toggleFavorite(item)}
              >
                <Heart
                  size={18}
                  fill={favorites.some((f) => f.id === item.id) ? "red" : "none"}
                  color={favorites.some((f) => f.id === item.id) ? "red" : "black"}
                />
              </button>
              <img
                src={item.img || "/product/placeholder.jpg"}
                alt={item.name}
                className="card-img-top"
                style={{ height: "240px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">
                  {item.desc || item.deskripsi}
                </p>
                <p className="fw-bold">
                  {(item.price || item.harga || 0).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </p>
                <p className="text-muted small">
                  {item.material} • {item.color} • {item.size}
                </p>
                <button
                  className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {!loading && visible.length === 0 && (
          <div className="col-12">
            <p className="text-center text-muted">Tidak ada produk ditemukan.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Collection;
