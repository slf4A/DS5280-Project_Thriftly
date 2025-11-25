import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const authCardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "420px",
  textAlign: "center",
};

const authInputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "0.95rem",
};

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const roleMap = JSON.parse(localStorage.getItem("userRoles")) || {};
        roleMap[cred.user.email] = role;
        localStorage.setItem("userRoles", JSON.stringify(roleMap));
        localStorage.setItem("user", JSON.stringify({ email: cred.user.email, role }));
        alert("Registrasi berhasil!");
        if (role === "seller") {
          navigate("/seller");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/configuration-not-found") {
          alert("Firebase Auth belum dikonfigurasi untuk Email/Password. Pastikan metode Email/Password di-enable di Firebase Console dan env .env sudah terisi konfigurasi project.");
        } else {
          alert("Registrasi gagal. Pastikan email valid, password kuat, dan konfigurasi Firebase sudah benar.");
        }
      });
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
        color: "#111827",
      }}
    >
      <div
        style={authCardStyle}
      >
        <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>
          Get Your New Thriftly!
        </h2>

        <form onSubmit={handleRegister} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={authInputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={authInputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem",
              }}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Daftar
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#6b7280" }}>
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#111827",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
