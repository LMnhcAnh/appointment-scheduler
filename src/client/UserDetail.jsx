import React, { useEffect, useState } from "react";
import ClientMenu from "./ClientMenu";
import { useNavigate, useParams } from "react-router-dom";

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
          <img src="/image/img_logo.svg" alt="Logo" />
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
    </div>
  );
};

export default UserDetail;
