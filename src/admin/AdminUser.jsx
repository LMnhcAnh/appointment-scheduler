import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";

const mockUsers = [
  {
    id: 1,
    avatar: "/image/img_gbao_3.png",
    name: "Phan Bảo – Marketing",
    email: "bao.user@example.com",
    time: "10:00 AM",
    date: "June 6, 2025",
    note: "Prefers morning meetings."
  },
  {
    id: 2,
    avatar: "/image/img_gbao_3.png",
    name: "Nguyễn Văn A – Sales",
    email: "vana.user@example.com",
    time: "2:30 PM",
    date: "June 5, 2025",
    note: "Requested bilingual meeting."
  },
  {
    id: 3,
    avatar: "/image/img_gbao_3.png",
    name: "Lê Thị B – Developer",
    email: "lethi.b@example.com",
    time: "9:00 AM",
    date: "June 3, 2025",
    note: "Needs urgent support for tech setup."
  }
];

const AdminUserDashboard = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div className="logo-left" onClick={() => navigate("/admin/homepage")} style={{ cursor: "pointer" }}>
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <AdminMenu />
      </div>

      {/* Page Content */}
      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", fontFamily: "monospace" }}>
        <h2>All User Bookings</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "24px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "#b0b3a8",
              borderRadius: "18px",
              marginBottom: "16px",
              padding: "16px"
            }}
          >
            {/* Collapsed Row */}
            <div
              onClick={() => toggleExpand(user.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                cursor: "pointer"
              }}
            >
              <img src={user.avatar} alt="avatar" width="40" height="40" style={{ borderRadius: "50%" }} />
              <span>{user.name}</span>
            </div>

            {/* Expanded View */}
            {expandedId === user.id && (
              <div style={{ marginTop: "16px" }}>
                <p><strong>Date:</strong> {user.date}</p>
                <p><strong>Time:</strong> {user.time}</p>

                <div style={{
                  backgroundColor: "#f4f1e8",
                  borderRadius: "12px",
                  padding: "16px",
                  margin: "12px 0"
                }}>
                  <strong>Note:</strong><br />
                  {user.note}
                </div>

                {/* <div style={{ display: "flex", gap: "12px" }}>
                  <button style={btnStyle("#7a9cc6")}>📨 Message</button>
                  <button style={btnStyle("#e06d6d")}>❌ Cancel</button>
                </div> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
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

export default AdminUserDashboard;
