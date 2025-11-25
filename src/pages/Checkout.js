import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/CartContext";

const formatRupiah = (value) =>
  value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

function Checkout() {
  const { cart, clearCart } = useCart();
  const [paid, setPaid] = useState(false);
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  const handlePay = () => {
    setPaid(true);
    clearCart();
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Checkout</h2>
        <p className="text-muted">Review pesanan dan isi detail pengiriman.</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Alamat Pengiriman</h5>
              <form className="row g-3">
                <div className="col-12">
                  <label className="form-label">Nama Lengkap</label>
                  <input type="text" className="form-control" placeholder="Nama penerima" />
                </div>
                <div className="col-12">
                  <label className="form-label">Alamat</label>
                  <input type="text" className="form-control" placeholder="Jalan, nomor rumah" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Kota</label>
                  <input type="text" className="form-control" placeholder="Kota" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Kode Pos</label>
                  <input type="text" className="form-control" placeholder="Kode pos" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Telepon</label>
                  <input type="text" className="form-control" placeholder="No. HP" />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Ringkasan Pesanan</h5>
              {cart.length === 0 && !paid ? (
                <p className="text-muted">Keranjang kosong.</p>
              ) : (
                <>
                  {paid ? (
                    <div className="alert alert-success" role="alert">
                      Pembayaran berhasil! Terima kasih telah berbelanja.
                    </div>
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
                      <div className="d-flex justify-content-between mb-3 fw-semibold">
                        <span>Total</span>
                        <span>{formatRupiah(total)}</span>
                      </div>
                      <button
                        className="btn btn-dark w-100"
                        disabled={cart.length === 0}
                        onClick={handlePay}
                      >
                        Bayar Sekarang
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
