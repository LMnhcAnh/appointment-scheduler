import React from "react";
import UserMenu from "./UserMenu";
import '../homepage.css';
import { Link } from "react-router-dom";

const UserNotification = () => {
  const notifications = [
    { message: "Your appointment with Dr. Linh was moved to June 9, 10:00 AM", time: "1h ago" },
    { message: "New message from CEO Nguyễn", time: "3d ago" },
    { message: "Appointment with Bảo confirmed", time: "1 week ago" }
  ];
  const blockStyle = {
  backgroundColor: "#b0b3a8",
  borderRadius: "20px",
  padding: "24px 32px",
  marginBottom: "24px",
  fontSize: "1.2rem",
  lineHeight: "1.8",
  fontFamily: "Roboto Mono, monospace",
};


  return (
    <div className="main-homepage">
      <div className="logo-box">
        <div className="logo-left">
          <Link to="/user/dashboard" className="login-logo-link">
                        <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
                      </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "monospace" }}>
        <h2>Notifications</h2>
        {notifications.map((n, index) => (
          <div key={index} style={blockStyle}>
            {n.message}<br />
            <span style={{ fontSize: "1rem", opacity: 0.5 }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotification;
