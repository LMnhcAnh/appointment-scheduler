import React, { useEffect, useState } from "react";
import ClientMenu from "./ClientMenu";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams(); // get user ID from route
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data based on ID
    const fetchUser = async () => {
      const data = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            name: "Phan Lê Quốc Bảo",
            email: "bao.user@example.com",
            phone: "0902320206",
            note: "Prefers morning meetings.",
            lastAppointment: "June 3, 2025 - 9:00 AM"
          });
        }, 300)
      );
      setUser(data);
    };

    fetchUser();
  }, [id]);

  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div
          className="logo-left"
          onClick={() => navigate("/client/homepage")}
          style={{ cursor: "pointer" }}
        >
          <Link to="/client/homepage" className="logo-link">
          <img src="/image/img_logo.svg" alt="Logo" />
          </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <ClientMenu />
      </div>

      {/* Content */}
      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h2>User Detail</h2>

        {user ? (
          <div className="client-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Last Appointment:</strong> {user.lastAppointment}</p>
            <p><strong>Note:</strong> {user.note}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}>
      <button
  onClick={() => navigate("/client/users")}
  style={{
    backgroundColor: "#aeb1a5",
    color: "#333",
    border: "none",
    borderRadius: "24px",
    width: "fit-content",
    padding: "10px 18px",
    fontWeight: "bold",
    fontFamily: "monospace",
    cursor: "pointer",
    marginTop: "32px",
    transition: "filter 0.2s",
    filter: "brightness(1)"
  }}
  onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1.05)"}
  onMouseLeave={(e) => e.currentTarget.style.filter = "brightness(1)"}
>
  ← Back to User List
</button>

    </div>
    </div>
  );
};

export default UserDetail;
