import { Link } from "react-router-dom";

function HeaderMenu() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dashboardLink = user?.role === "seller" ? "/seller" : user?.role === "buyer" ? "/buyer" : "/login";

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasMenu"
      aria-labelledby="offcanvasMenuLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fw-bold" id="offcanvasMenuLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <ul className="list-unstyled">
          <li>
            <Link to="/home" className="text-decoration-none text-black d-block py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/collection" className="text-decoration-none text-black d-block py-2">
              Collection
            </Link>
          </li>
          <li>
            <Link to={dashboardLink} className="text-decoration-none text-black d-block py-2">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenu
