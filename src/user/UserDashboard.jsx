import React, { useState } from "react";
import UserMenu from "./UserMenu";
import "../homepage.css";
import { Link } from "react-router-dom";

// Mock appointments
const appointments = [
  {
    id: 1,
    avatar: "/image/img_gbao_1.png",
    name: "Bảo Nghiện – Học cách nuôi cá",
    status: "Pending",
    time: "10:00 AM",
    date: "June 10, 2025",
    description: "Discussing aquarium setup and maintenance."
  },
  {
    id: 2,
    avatar: "/image/img_gbao_2.png",
    name: "Name - Doctor",
    status: "Denied"
  },
  {
    id: 3,
    avatar: "/image/img_gbao_3.png",
    name: "Name - Teacher",
    status: "Confirm"
  },
  {
    id: 4,
    avatar: "/image/img_gbao_4.png",
    name: "Name - Jobs",
    status: "Denied"
  }
];

const Dashboard = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
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

      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", fontFamily: "monospace" }}>
        <h2>User Dashboard</h2>

        {appointments.map((item) => (
          <div key={item.id} style={{
            backgroundColor: "#b0b3a8",
            borderRadius: "18px",
            marginBottom: "16px",
            padding: "16px"
          }}>
            {/* Header (clickable) */}
            <div
              onClick={() => handleToggle(item.id)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img src={item.avatar} alt="avatar" width="40" height="40" style={{ borderRadius: "50%" }} />
                <span>{item.name}</span>
              </div>
              <StatusBadge status={item.status} />
            </div>

            {/* Expanded view */}
            {expandedId === item.id && (
              <div style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p><strong>Time:</strong> {item.time}</p>
                    <p><strong>Date:</strong> {item.date}</p>
                  </div>
                  <div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>

                <div style={{
                  backgroundColor: "#f4f1e8",
                  borderRadius: "12px",
                  padding: "16px",
                  margin: "12px 0"
                }}>
                  <strong>Description:</strong><br />
                  {item.description}
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button style={btnStyle("#fdbd88")}>Edit</button>
                  <button style={btnStyle("#f87b6b")}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const color = {
    Pending: "#ccc",
    Confirm: "#5cb85c",
    Denied: "#d9534f"
  }[status];

  return (
    <span style={{
      backgroundColor: color,
      color: "white",
      padding: "6px 12px",
      borderRadius: "12px",
      fontSize: "0.9rem",
      minWidth: "70px",
      textAlign: "center"
    }}>
      {status}
    </span>
  );
};

const btnStyle = (bg) => ({
  backgroundColor: bg,
  color: "#333",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  fontWeight: "bold",
  cursor: "pointer"
});

export default Dashboard;
