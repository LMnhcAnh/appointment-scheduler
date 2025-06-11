import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="login-logo-link">
          <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
        </Link>
        <span className="navbar-title">Appointment Scheduler</span>
      </header>

      <div className="login-box">
        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />

        <div className="login-buttons">
          <Link to="/user/usercalendar" className="login-btn">Login</Link>
          <Link to="/user/usercalendar" className="login-btn">Sign up</Link>
        </div>

        <div className="divider">
          <hr /> <span>or</span> <hr />
        </div>

        <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-btn">
          <FaFacebookF style={{ fontSize: "30px" }} className="social-icon" /> Login with Facebook
        </a>

        <a href="https://accounts.google.com/Login" target="_blank" rel="noreferrer" className="social-btn">
          <MdEmail style={{ fontSize: "30px" }} className="social-icon" /> Login with Mail
        </a>
      </div>
    </div>
  );
};

export default Login;
