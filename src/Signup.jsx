import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Signup = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="login-logo-link">
          <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
        </Link>
        <span className="navbar-title">Appointment Scheduler</span>
      </header>

      <div className="login-box">
        <input type="text" placeholder="Full Name*" className="login-input" />
        <input type="email" placeholder="Mail*" className="login-input" />
        <input type="text" placeholder="Username*" className="login-input" />
        <input type="password" placeholder="Password*" className="login-input" />
        <input type="confirmpassword" placeholder="Confirm Password*" className="login-input" />

        <Link to="/user/dashboard" className="login-btn" style={{ marginTop: "0.5px", width: "400px" }}>Create Account</Link>

        <Link to="/login" className="login-btn" style={{ marginTop: "10px", textAlign: "center" , width: "150px"}}>Back</Link>
      </div>
    </div>
  );
};

export default Signup;
