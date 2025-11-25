import { useFavorite } from "../context/FavoriteContext";

const formatRupiah = (value) =>
    value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    });

function HeaderFavorite() {
  const { favorites, toggleFavorite } = useFavorite();

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasFavorites"
      aria-labelledby="offcanvasFavoritesLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fw-bold" id="offcanvasFavoritesLabel">
          My Favorites
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        {favorites.length === 0 ? (
          <p>You have no favorite products yet.</p>
        ) : (
          <ul className="list-unstyled">
            {favorites.map((item) => (
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
                <div>
                  <h6 className="m-0">{item.name}</h6>
                  <small className="text-muted">{formatRupiah(item.price)}</small>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger ms-auto"
                  onClick={() => toggleFavorite(item)}
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HeaderFavorite;
