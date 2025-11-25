import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";

const formatRupiah = (value) =>
  value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

function BuyerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useCart();
  const { favorites } = useFavorite();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <div>
                  <h4 className="mb-1">Halo, {user?.email || "Pembeli"}</h4>
                  <p className="text-muted mb-0">Kelola keranjang dan favorit kamu.</p>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
                  <button className="btn btn-dark" onClick={() => navigate("/home")}>
                    Belanja lagi
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => navigate("/collection")}>
                    Lihat Collection
                  </button>
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="card-title mb-0">Keranjang</h5>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/checkout")}>
                    Checkout
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-muted mb-0">Keranjang kosong. Ayo tambah produk!</p>
                ) : (
                  <>
                    <ul className="list-group mb-3">
                      {cart.map((item) => (
                        <li key={item.id} className="list-group-item d-flex">
                          <img
                            src={item.img || "/product/placeholder.jpg"}
                            alt={item.name}
                            className="me-3 rounded"
                            style={{ width: "60px", height: "75px", objectFit: "cover" }}
                          />
                          <div className="flex-grow-1">
                            <div className="fw-semibold">{item.name}</div>
                            <div className="text-muted small">
                              {item.qty} × {formatRupiah(item.price || 0)}
                            </div>
                          </div>
                          <div className="fw-bold">
                            {formatRupiah((item.price || 0) * (item.qty || 0))}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between fw-semibold">
                      <span>Total</span>
                      <span>{formatRupiah(total)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="card-title mb-0">Favorit</h5>
                  <span className="badge text-bg-dark">{favorites.length}</span>
                </div>
                {favorites.length === 0 ? (
                  <p className="text-muted mb-0">Belum ada produk favorit.</p>
                ) : (
                  <ul className="list-group">
                    {favorites.map((item) => (
                      <li key={item.id} className="list-group-item d-flex align-items-center">
                        <img
                          src={item.img || "/product/placeholder.jpg"}
                          alt={item.name}
                          className="me-3 rounded"
                          style={{ width: "50px", height: "60px", objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <div className="fw-semibold">{item.name}</div>
                          <div className="text-muted small">
                            {formatRupiah(item.price || item.harga || 0)}
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/home")}>
                          Beli
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
