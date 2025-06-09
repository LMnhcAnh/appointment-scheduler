import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const ProfileCard = ({ role, name, id, likes, quote, image }) => (
  <div className="card">
    <div className="badge">{role}</div>
    <img className="avatar" src={image} alt={name} />
    <div className="info">
      <div className="name">Name: {name}</div>
      <div className="id">ID: {id}</div>
      <div className="likes">{likes}</div>
      <div className="quote">"{quote}"</div>
    </div>
  </div>
);

const AboutUs = () => {
return (
  <>
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/user/userhomepage" className="login-logo-link">
        <img src="/image/img_logo.svg" alt="Logo" className="logo" />
        </Link> 
        <span className="navbar-title">Appointment Scheduler</span>
      </div>
      <UserMenu />
    </div>
    <div className="pape-wrapper">
      <div className="about-page">
        <h1>About us</h1>
        <div className="card-grid">
          <ProfileCard role="Manager" name="Phan Thái Nam" id="16184" likes="Cổ đông Massage Melisa" quote="Đời không massage đời không nể." image="/image/nam.png" />
          <ProfileCard role="DEV" name="Trần Gia Bảo" id="10421069" likes="Like Cocain and Fish" quote="Code is life, not me..." image="/image/giabao.png" />
          <ProfileCard role="DEV" name="Phan Lê Quốc Bảo" id="10421125" likes="Like Monster energy" quote="Monster Energy: fuel for bad decisions." image="/image/phanbao.png" />
          <ProfileCard role="DEV" name="Lê Mạnh Đức Anh" id="10421003" likes="Simp Lỏ" quote="Meow ís the best" image="/image/DucAnh.png" />
          <ProfileCard role="Dog" name="Lê Văn Vĩnh Bảo" id="10422012" likes="Like Treats" quote="WOOF" image="/image/vinhbao.png" />
        </div>
      </div>
    </div>
 <div style={{ position: "relative", width: "300vw", height: "2px" }}>
  <hr className="footer-line" />
</div>
<footer className="footer">
  <div className="footer-grid">
    <div className="footer-section">
      <h3>Contact</h3>
      <ul>
        <li>
            <FaFacebookF className="fb-icon" />
            <a href="https://www.facebook.com/nam.phan.280704" target="_blank">Nam</a>
        </li>
        <li>
            <FaFacebookF className="fb-icon" />
            <a href="https://www.facebook.com/tgb.1107" target="_blank">Gia Bảo</a>
        </li>
        <li>
            <FaFacebookF className="fb-icon" />
            <a href="https://www.facebook.com/phan.bao.633083" target="_blank">Quốc Bảo</a>
        </li>
        <li>
            <FaFacebookF className="fb-icon" />
            <a href="https://www.facebook.com/le.ucanh.23592/" target="_blank">Đức Anh</a>
        </li>
        <li>
            <FaFacebookF className="fb-icon" />
            <a href="https://www.facebook.com/le.bao.653926" target="_blank">Vĩnh Bảo</a>
        </li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>About us</h3>
    </div>
    <div className="footer-section">
      <h3>Term of Use</h3>
    </div>
    <div className="footer-section">
      <h3>Account</h3>
      <Link to="/user/userprofile" className="footer-link">Profile</Link>
    </div>
  </div>
</footer>
 </>
);

};
const Homepage = () => (
  <div className="main-homepage">
    <h1>Welcome to the Appointment Scheduler Homepage</h1>
    <nav>
      <Link to="/user/userhomepage">Home</Link> | <Link to="/about">Homepage</Link>
    </nav>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  </Router>
);

export default AboutUs;
