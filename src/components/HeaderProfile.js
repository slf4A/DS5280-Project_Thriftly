function HeaderProfile() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasProfile"
      aria-labelledby="offcanvasProfileLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fw-bold" id="offcanvasProfileLabel">
          My Profile
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        {/* Jika belum login */}
        <p className="text-muted">Please log in to view your account.</p>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" placeholder="********" />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
        <hr />
        <p className="small text-center">
          Don’t have an account? <a href="#register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default HeaderProfile;