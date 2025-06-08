import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../homepage.css';
import UserMenu from "./UserMenu";
import { useAppointment } from "./AppointmentContext";

const AppointmentDetail = () => {
  const navigate = useNavigate();
  const { appointmentData, setAppointmentData } = useAppointment();
  const [showToast, setShowToast] = useState(false);

  const { selectedDate, client, time, note } = appointmentData;

  const handleConfirm = () => {
    if (!time) {
      alert("Please select a time.");
      return;
    }

    // In a real app: send appointmentData to a backend here

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/user/userhomepage");
    }, 2000);
  };

  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div className="logo-left">
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      {/* Content */}
      <div style={{
        padding: "32px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Roboto Mono, monospace"
      }}>
        <h2>Appointment Details</h2>

        <div style={{
          background: "#b0b3a8",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px"
        }}>
          <p><strong>Name:</strong> {client?.name || "Unknown"}</p>
          <p><strong>Date:</strong> {selectedDate ? new Date(selectedDate).toDateString() : "No date selected"}</p>

          <label>
            <strong>Time:</strong>
            <input
              type="time"
              value={time}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, time: e.target.value }))}
              style={{ marginLeft: "10px", fontFamily: "monospace", padding: "5px", borderRadius: "6px" }}
            />
          </label>

          <br /><br />

          <label>
            <strong>Notes:</strong><br />
            <textarea
              rows="4"
              style={{ width: "100%", borderRadius: "8px", padding: "8px" }}
              value={note}
              onChange={(e) => setAppointmentData(prev => ({ ...prev, note: e.target.value }))}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
          <button className="confirm-btn" onClick={() => navigate(-1)}>Back</button>
        </div>

        {showToast && (
          <div style={{
            marginTop: "20px",
            background: "#666851",
            color: "white",
            padding: "10px 20px",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            ✅ Appointment confirmed!
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetail;
