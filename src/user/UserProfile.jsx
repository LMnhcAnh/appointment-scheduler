import React, { useState } from "react";
import UserMenu from "./UserMenu";
import '../homepage.css';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Trần Gia Bảo",
    email: "bao@example.com",
    phone: "0901234567",
    userType: "Member",
    objectId: "abc1234-5678-9012-defg-345678901234",
    createdAt: "Sep 3, 2024, 10:56 AM"
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      alert("Profile saved!");
      // Optional: persist data
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="main-homepage">
      <div className="logo-box">
        <div className="logo-left">
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      <div style={{ padding: "40px", maxWidth: "850px", margin: "0 auto" }}>
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            className="confirm-btn"
            onClick={handleToggleEdit}
            style={{ padding: "8px 16px" }}
          >
            {isEditing ? "💾 Save" : "✏️ Edit properties"}
          </button>
        </div>

        <div style={{
          backgroundColor: "#b0b3a8",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          alignItems: "center",
          gap: "40px",
          fontFamily: "Roboto Mono, monospace"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#5f5f5f",
              color: "white",
              fontSize: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px"
            }}>
              {getInitials(form.name)}
            </div>
            <h2 style={{ margin: 0 }}>{form.name}</h2>
            <p style={{ margin: 0 }}>{form.email}</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.6 }}>{form.userType}</p>
          </div>

          <div style={{ flex: 1 }}>
            <EditableRow
              label="Name"
              name="name"
              value={form.name}
              editable={isEditing}
              onChange={handleChange}
            />
            <EditableRow
              label="Email"
              name="email"
              value={form.email}
              editable={isEditing}
              onChange={handleChange}
            />
            <ProfileRow label="Object ID" value={form.objectId} />
            <ProfileRow label="Created date time" value={form.createdAt} />
            <EditableRow
              label="Phone number"
              name="phone"
              value={form.phone}
              editable={isEditing}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Static row
const ProfileRow = ({ label, value }) => (
  <div style={{ marginBottom: "16px" }}>
    <strong>{label}:</strong><br />
    <span>{value}</span>
  </div>
);

// Editable input row
const EditableRow = ({ label, name, value, editable, onChange }) => (
  <div style={{ marginBottom: "16px" }}>
    <strong>{label}:</strong><br />
    {editable ? (
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "1rem"
        }}
      />
    ) : (
      <span>{value}</span>
    )}
  </div>
);

// Initials from name
const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

export default UserProfile;
