import React from "react";
import UserMenu from "./UserMenu";
import '../homepage.css';
import { Link } from "react-router-dom";
const UserHistory = () => {
  const history = [
    { date: "June 5, 2025", time: "14:00", with: "Dr. Smith" },
    { date: "May 27, 2025", time: "09:30", with: "CEO Nguyễn" },
    { date: "April 19, 2025", time: "11:00", with: "Dental Appointment" }
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
          <Link to="/" className="login-logo-link">
                    <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
                  </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "monospace" }}>
        <h2>User History</h2>
        {history.map((entry, index) => (
          <div key={index} style={blockStyle}>
            <strong>{entry.date}</strong> at <strong>{entry.time}</strong><br />
            With: {entry.with}
          </div>
        ))}
      </div>
    </div>
  );
};


export default UserHistory;
