import React, { useState } from "react";
import ClientMenu from "./ClientMenu";
import { useNavigate } from "react-router-dom";

const mockAppointments = [
  {
    id: 1,
    avatar: "/image/img_gbao_3.png",
    name: "Phan Bảo – Marketing",
    email: "bao.user@example.com",
    lastBooking: "June 6, 2025 – 10:00 AM",
    notes: "Prefers morning meetings.",
  },
  {
    id: 2,
    avatar: "/image/img_gbao_3.png",
    name: "Nguyễn Văn A – Sales",
    email: "vana.user@example.com",
    lastBooking: "June 4, 2025 – 2:30 PM",
    notes: "Requested bilingual session.",
  },
  {
    id: 3,
    avatar: "/image/img_gbao_3.png",
    name: "Lê Thị B – Developer",
    email: "lethi.user@example.com",
    lastBooking: "May 30, 2025 – 9:00 AM",
    notes: "New client; needs guidance.",
  }
];

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div className="logo-left" onClick={() => navigate("/client/homepage")} style={{ cursor: "pointer" }}>
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <ClientMenu />
      </div>

      {/* Dashboard */}
      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", fontFamily: "monospace" }}>
        <h2>Client Dashboard</h2>

        {mockAppointments.map((user) => (
          <div key={user.id} style={{
            backgroundColor: "#b0b3a8",
            borderRadius: "18px",
            marginBottom: "16px",
            padding: "16px"
          }}>
            {/* Header (clickable) */}
            <div
              onClick={() => toggleExpand(user.id)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img src={user.avatar} alt="avatar" width="40" height="40" style={{ borderRadius: "50%" }} />
                <span>{user.name}</span>
              </div>
            </div>

            {/* Expanded detail */}
            {expandedId === user.id && (
              <div style={{ marginTop: "16px" }}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Last Booking:</strong> {user.lastBooking}</p>
                <p><strong>Note:</strong> {user.notes}</p>

                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                  <button
                    className="confirm-btn"
                    style={{ backgroundColor: "#7a9cc6" }}
                    onClick={() => alert(`Messaging ${user.name}`)}
                  >
                    📨 Message
                  </button>
                  <button
                    className="confirm-btn"
                    style={{ backgroundColor: "#e06d6d" }}
                    onClick={() => alert(`Canceling booking with ${user.name}`)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
