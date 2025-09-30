import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Menu, Star, User, ShoppingBag, Search } from "react-feather";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";
import HeaderFavorite from "./HeaderFavorite";
import HeaderProfile from "./HeaderProfile";
import HeaderCart from "./HeaderCart";

function Header({ onSearch }) {
  return (
    <header className="border-bottom py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left Section */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn p-0 border-0 bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <Menu size={22} />
          </button>
          <button
            className="btn p-0 border-0 bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#searchOffcanvas"
            aria-controls="searchOffcanvas"
          >
            <Search size={20} />
          </button>
        </div>
        <h4 className="m-0 fw-bold text-start">THRIFTLY</h4>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn p-0 border-0 bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasFavorites"
            aria-controls="offcanvasFavorites"
          >
            <Star size={20} />
          </button>
          <button
            className="btn p-0 border-0 bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasProfile"
            aria-controls="offcanvasProfile"
          >
            <User size={20} />
          </button>
          <button
            className="btn p-0 border-0 bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasCart"
            aria-controls="offcanvasCart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
      <HeaderMenu />
      <HeaderSearch onSearch={onSearch} />
      <HeaderFavorite />
      <HeaderProfile />
      <HeaderCart />
    </header>
  );
}

export default Header;