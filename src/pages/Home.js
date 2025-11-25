import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "react-feather";
import { collection, getDocs } from "firebase/firestore";
import Hero from "../components/Hero";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";

const filterOptions = [
  { label: "Material Cotton", value: "Cotton" },
  { label: "Material Leather", value: "Leather" },
  { label: "Color White", value: "White" },
  { label: "Color Black", value: "Black" },
];

function Home() {
  const [filter, setFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorite();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => {
          const item = { id: doc.id, ...doc.data() };
          const imagePath = item.imagePath || item.img || item.image || "";
          const localImage = imagePath ? (imagePath.startsWith("/") ? imagePath : `/${imagePath}`) : "";
          return { ...item, img: localImage };
        });

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat produk. Periksa koneksi atau konfigurasi Firestore/Storage.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = filter
    ? products.filter(
        (item) =>
          item.material === filter ||
          item.color === filter ||
          item.size === filter
      )
    : products;

  return (
    <>
      <Hero />

      <div className="border-top border-bottom py-3 mb-5">
        <div className="container d-flex align-items-center flex-wrap gap-3">
          <span className="fw-bold me-3">Filter by</span>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`filter-link ${filter === option.value ? "active" : ""}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}

          <button
            className="filter-link text-danger"
            onClick={() => setFilter(null)}
          >
            Clear Filter
          </button>

          <span className="ms-auto text-muted small">
            {filteredProducts.length} products
          </span>
        </div>
      </div>

      <div className="container">
        {loading && <p className="text-center text-muted">Memuat produk...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        <div className="row g-5">
          {!loading &&
            filteredProducts.map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="position-relative text-center">
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
                    src={item.img || item.image || "/product/placeholder.jpg"}
                    alt={item.name}
                    className="img-fluid mb-3"
                    style={{ minHeight: "280px", objectFit: "cover" }}
                  />
                  <div className="tag">NEW IN</div>
                  <h6 className="fw-bold">{item.name}</h6>
                  <p className="text-muted small">{item.desc || item.deskripsi}</p>
                  <p className="fw-bold">
                    {(item.price || item.harga || 0).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-muted small">
                    {item.material} | {item.color} | {item.size}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
