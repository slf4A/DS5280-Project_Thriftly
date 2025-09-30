function HeaderMenu() {
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
            <a href="#home" className="text-decoration-none text-black d-block py-2">
              Home
            </a>
          </li>
          <li>
            <a href="#collection" className="text-decoration-none text-black d-block py-2">
              Collection
            </a>
          </li>
          <li>
            <a href="#about" className="text-decoration-none text-black d-block py-2">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="text-decoration-none text-black d-block py-2">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenu