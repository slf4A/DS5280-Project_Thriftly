import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Email atau password salah!");
      return;
    }

    // login sukses > simpan user + role
    const userData = {
      email,
      role,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // arahkan sesuai role
    if (role === "seller") {
      navigate("/seller");
    } else {
      navigate("/buyer");
    }
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
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>
          Login and Let’s Thrift
        </h2>

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "0.95rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "0.95rem",
              }}
            />
          </div>

          {/* Pilih role */}
          <div style={{ marginBottom: "20px", fontSize: "0.95rem" }}>
            <label style={{ marginRight: "15px" }}>
              <input
                type="radio"
                value="buyer"
                checked={role === "buyer"}
                onChange={() => setRole("buyer")}
                style={{ marginRight: "6px" }}
              />
              Pembeli
            </label>
            <label>
              <input
                type="radio"
                value="seller"
                checked={role === "seller"}
                onChange={() => setRole("seller")}
                style={{ marginRight: "6px" }}
              />
              Penjual
            </label>
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
      </div>
    </div>
  );
}

export default Login;
