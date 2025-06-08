import React, { useState } from "react";
import ClientMenu from "./ClientMenu";
import { useNavigate } from "react-router-dom";

const ClientProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Trần Gia Bảo",
    email: "bao.client@example.com",
    phone: "0909876543",
    role: "Employee",
    joined: "Jan 1, 2024"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    if (isEditing) alert("Profile saved!");
    setIsEditing(!isEditing);
  };

  return (
    <div className="main-homepage">
      <div className="logo-box">
        <div className="logo-left" onClick={() => navigate("/client/hompage")} style={{ cursor: "pointer" }}>
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <ClientMenu />
      </div>

      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "right" }}>
          <button className="confirm-btn" onClick={toggleEdit}>
            {isEditing ? "💾 Save" : "✏️ Edit"}
          </button>
        </div>

        <div className="client-card">
          {["name", "email", "phone"].map((field) => (
            <div key={field} style={{ marginBottom: "16px" }}>
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong><br />
              {isEditing ? (
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "8px" }}
                />
              ) : (
                <span>{form[field]}</span>
              )}
            </div>
          ))}
          <p><strong>Role:</strong> {form.role}</p>
          <p><strong>Joined:</strong> {form.joined}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
