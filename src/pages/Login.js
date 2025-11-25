import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const roleMap = JSON.parse(localStorage.getItem("userRoles")) || {};
        const role = roleMap[cred.user.email] || "buyer";
        localStorage.setItem("user", JSON.stringify({ email: cred.user.email, role }));
        if (role === "seller") {
          navigate("/seller");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Login gagal. Periksa email/password atau coba lagi.");
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
          Login to Thriftly
        </h2>

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
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

          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={authInputStyle}
            />
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
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#6b7280" }}>
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#111827",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Daftar di sini
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
