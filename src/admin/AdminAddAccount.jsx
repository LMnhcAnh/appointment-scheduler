import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";

const AdminAddAccount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Client"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating account:", form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      navigate("/admin/client");
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: "#aeb1a5", minHeight: "100vh" }}>
  <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div
          className="logo-left"
          onClick={() => navigate("/admin/homepage")}
          style={{ cursor: "pointer" }}
        >
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <AdminMenu />
      </div>
      </div>

      {/* Centered Form Box */}
      <div style={{
        backgroundColor: "#f3efe4",
        maxWidth: "700px",
        margin: "80px auto",
        padding: "40px",
        borderRadius: "28px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        fontFamily: "monospace"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Add New Client Account</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name*"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Mail*"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Username*"
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password*"
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Confirm Password*"
            required
            style={inputStyle}
          />

          {/* Role Selector */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              fontFamily: "monospace",
              appearance: "none",
              backgroundColor: "#fff"
            }}
          >
            <option value="Client">Client</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" style={buttonStyle}>Create Account</button>
          <button type="button" onClick={() => navigate("/admin/client")} style={backButtonStyle}>Back</button>

          {submitted && (
            <p style={{
              marginTop: "10px",
              color: "#4CAF50",
              textAlign: "center"
            }}>
              ✅ Client account created successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

// Style Definitions
const inputStyle = {
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontFamily: "monospace"
};

const buttonStyle = {
  backgroundColor: "#aeb1a5",
  color: "#333",
  fontWeight: "bold",
  padding: "12px",
  borderRadius: "24px",
  border: "none",
  cursor: "pointer",
  fontFamily: "monospace"
};

const backButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#d0d0c5"
};

export default AdminAddAccount;
