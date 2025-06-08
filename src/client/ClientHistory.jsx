import React from "react";
import ClientMenu from "./ClientMenu";
import { useNavigate } from "react-router-dom";

const history = [
  {
    id: 1,
    user: "Trần Gia Bảo",
    date: "June 5, 2025",
    time: "14:00",
    note: "Follow-up on branding strategy."
  },
  {
    id: 2,
    user: "Nguyễn Văn A",
    date: "May 27, 2025",
    time: "09:30",
    note: "Sales performance review."
  },
  {
    id: 3,
    user: "Lê Thị B",
    date: "April 19, 2025",
    time: "11:00",
    note: "Intro session with developer."
  }
];

const ClientHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div
          className="logo-left"
          onClick={() => navigate("/client/homepage")}
          style={{ cursor: "pointer" }}
        >
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <ClientMenu />
      </div>

      {/* History Content */}
      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", fontFamily: "monospace" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Appointment History</h2>

        {history.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#b0b3a8",
              borderRadius: "20px",
              padding: "24px 32px",
              marginBottom: "24px",
              fontSize: "1.2rem",
              lineHeight: "1.6",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Time:</strong> {item.time}</p>
            <p><strong>User:</strong> {item.user}</p>
            <p><strong>Note:</strong> {item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientHistory;
