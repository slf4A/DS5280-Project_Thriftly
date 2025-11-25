import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function HeaderProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = auth.currentUser?.email || storedUser?.email;
  const userRole = storedUser?.role;
  const dashboardLink = userRole === "seller" ? "/seller" : userRole === "buyer" ? "/buyer" : "/login";

  const handleLogout = () => {
    signOut(auth).finally(() => {
      localStorage.removeItem("user");
      navigate("/register");
    });
  };

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
        {userEmail ? (
          <>
            <div className="mb-3">
              <p className="mb-1 fw-semibold">Email</p>
              <p className="mb-2">{userEmail}</p>
              {userRole && (
                <>
                  <p className="mb-1 fw-semibold">Role</p>
                  <p className="mb-0 text-capitalize">{userRole}</p>
                </>
              )}
            </div>
            <div className="d-grid gap-2 mb-3">
              <button
                className="btn btn-dark"
                onClick={() => {
                  navigate(dashboardLink);
                }}
                data-bs-dismiss="offcanvas"
              >
                Buka Dashboard
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger w-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="text-muted">Please log in to view your account.</p>
            <div className="d-grid gap-2">
              <button
                className="btn btn-dark"
                onClick={() => navigate("/login")}
                data-bs-dismiss="offcanvas"
              >
                Login
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/register")}
                data-bs-dismiss="offcanvas"
              >
                Register
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderProfile;
