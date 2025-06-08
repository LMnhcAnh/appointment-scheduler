import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../homepage.css';
import UserMenu from "./UserMenu";
import { useAppointment } from "./AppointmentContext";

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAppointmentData } = useAppointment();

  const [client, setClient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [time, setTime] = useState("");

  const timeInputRef = useRef();

  useEffect(() => {
    if (showTimeInput && timeInputRef.current) {
      timeInputRef.current.focus();
    }
  }, [showTimeInput]);

  useEffect(() => {
    const fetchClient = async () => {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            name: "Trần Gia Bảo (Nghiện)",
            profession: "Nuôi cá, 'Bonsai'",
            note: "Renting for One night: Pay with fish",
            rating: "4.20/10"
          });
        }, 200);
      });
      setClient(data);
    };

    fetchClient();
  }, [id]);

  const handleContinue = () => {
    if (!selectedDate || !time) {
      alert("Please select both date and time.");
      return;
    }

    setAppointmentData({
      selectedDate,
      client,
      time,
      note: "" // keeping it blank in case other pages expect it
    });

    navigate("/user/appointment-detail");
  };

  return (
    <div className="main-homepage">
      {/* Top Bar */}
      <div className="logo-box">
        <div className="logo-left">
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      {/* Page Content */}
      <div style={{ padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
        
        {/* Calendar + Time */}
        <div style={{
          backgroundColor: "#b0b3a8",
          borderRadius: "20px",
          padding: "24px",
          transform: "scale(1.3)",         // ✅ scale up the calendar
          transformOrigin: "top center",
          textAlign: "center"
        }}>
          <Calendar
            onChange={(date) => {
              setSelectedDate(date);
              setShowTimeInput(true);
            }}
            value={selectedDate}
          />

          {showTimeInput && (
            <div style={{ marginTop: "20px" }}>
              <label>
                <strong>Time:</strong>
                <input
                  type="time"
                  ref={timeInputRef}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    marginLeft: "10px",
                    fontFamily: "monospace",
                    padding: "5px",
                    borderRadius: "6px"
                  }}
                />
              </label>
            </div>
          )}
        </div>

        <div style={{ height: "100px" }}></div>

        {/* Client Info + Buttons */}
        <div style={{
          display: "flex",
          width: "100%",
          maxWidth: "1000px",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          
          {/* Info Box */}
          <div style={{
            backgroundColor: "#b0b3a8",
            borderRadius: "20px",
            padding: "20px",
            fontFamily: "Roboto Mono, monospace",
            fontSize: "1rem",
            lineHeight: "1.8",
            flex: 1,
            marginRight: "20px"
          }}>
            {client ? (
              <>
                <div><strong>Name:</strong> {client.name}</div>
                <div><strong>Profession:</strong> {client.profession}</div>
                <div><strong>{client.note}</strong></div>
                <div><strong>Rating:</strong> {client.rating}</div>
              </>
            ) : (
              <p>Loading client data...</p>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <button className="confirm-btn" onClick={handleContinue}>Continue</button>
            <button className="confirm-btn" onClick={() => navigate("/clients")}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
