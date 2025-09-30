import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container text-center">
        {/* Logo */}
        <h3 className="fw-bold mb-4">THRIFTLY</h3>

        {/* Links */}
        <div className="d-flex justify-content-center gap-4 flex-wrap mb-3">
          <a href="#terms" className="text-light text-decoration-none small">
            Terms & Conditions
          </a>
          <a href="#privacy" className="text-light text-decoration-none small">
            Privacy Policy
          </a>
          <a href="#contact" className="text-light text-decoration-none small">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="small text-muted mb-0">
          © {new Date().getFullYear()} BRAND. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;