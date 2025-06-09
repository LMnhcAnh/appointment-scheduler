import React, { useState } from "react";
import UserMenu from "./UserMenu";
import "../homepage.css";
import { Link } from "react-router-dom";
import { FaUsers, FaCalendarCheck, FaHourglassHalf } from "react-icons/fa";


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
    avatar: "/image/DucAnh.png",
    name: "Tôm - Ăn Hại",
    status: "Denied"
  },
  {
    id: 5,
    avatar: "/image/DucAnh.png",
    name: "Tôm - Ăn Hại",
    status: "Denied"
  },
  {
    id: 6,
    avatar: "/image/DucAnh.png",
    name: "Tôm - Ăn Hại",
    status: "Denied"
  },
  {
    id: 7,
    avatar: "/image/DucAnh.png",
    name: "Tôm - Ăn Hại",
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
          <Link to="/user/dashboard" className="login-logo-link">
              <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
            </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>
<h2 style={{ textAlign: "left", marginBottom: "24px", marginLeft:"100px", size: "100px" }}>Dashboard</h2>
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "monospace"}}>
        

{/* Status Board */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap"
}}>
  <StatusCard label="Active Clients" value="0" color="#ecc1a7" icon={<FaUsers size={32} />} />
  <StatusCard label="Approved" value="1" color="#6fcc91" icon={<FaCalendarCheck size={32} />} />
  <StatusCard label="Pending" value="1" color="#aaaaaa" icon={<FaHourglassHalf size={32} />} />
</div>

        {/* Appointments List */}
        <h3 style={{ marginBottom: "16px", fontSize: "1.6rem" }}>Appointments</h3>
        <p style={{ fontSize: "1rem" }}>Click on an appointment to view details.</p>


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
                fontSize: "1rem",
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
                  
                  </div>
                </div>

                <div style={{
                  fontSize: "1rem",
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
const StatusCard = ({ label, value, color, icon }) => (
  <div style={{
    backgroundColor: color,
    padding: "24px 40px",
    borderRadius: "32px",
    flex: "1",
    minWidth: "180px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "monospace"
  }}>
    <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{icon}</div>
    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</div>
    <div>{label}</div>
  </div>
);


export default Dashboard;
