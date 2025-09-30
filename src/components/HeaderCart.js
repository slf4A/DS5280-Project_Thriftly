const cartItems = [
  {
    id: 1,
    name: 'Cappuccino "Oryx" blouson',
    price: 6900000,
    img: "https://placehold.co/80x100",
    qty: 1,
  },
  {
    id: 2,
    name: "Pale caramel classic shirt",
    price: 1025000,
    img: "https://placehold.co/80x100",
    qty: 2,
  },
];

const formatRupiah = (value) =>
  value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  });

function HeaderCart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

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
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-unstyled flex-grow-1">
              {cartItems.map((item) => (
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
                      {item.qty} × {formatRupiah(item.price)}
                    </small>
                  </div>
                  <span className="fw-bold">
                    {formatRupiah(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <button className="btn btn-dark w-100">Go to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderCart;