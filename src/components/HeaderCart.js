import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const formatRupiah = (value) =>
  value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  });

function HeaderCart() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasCart"
      aria-labelledby="offcanvasCartLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fw-bold" id="offcanvasCartLabel">
          Shopping Cart
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body d-flex flex-column">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-unstyled flex-grow-1">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="d-flex align-items-center mb-3 border-bottom pb-2"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="me-3 rounded"
                    style={{ width: "60px", height: "75px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="m-0">{item.name}</h6>
                    <small className="text-muted">
                      {item.qty} × {formatRupiah(item.price || 0)}
                    </small>
                  </div>
                  <span className="fw-bold">
                    {formatRupiah((item.price || 0) * (item.qty || 0))}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <button
                className="btn btn-dark w-100"
                onClick={() => navigate("/checkout")}
              >
                Go to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderCart;
