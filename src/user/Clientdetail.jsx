import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../homepage.css';
import UserMenu from "./UserMenu";
import { useAppointment } from "./AppointmentContext";

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { setAppointmentData } = useAppointment();
  const { addAppointment } = useAppointment();


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

    addAppointment({
      date: selectedDate,
      client,
      time,
      note: ""  // or your note value
    });

    navigate("/user/appointment-detail");
  };

  return (
    <div className="main-homepage">
      {/* Top Bar */}
      <div className="logo-box">
        <div className="logo-left">
          <Link to="/user/usercalendar" className="login-logo-link">
            <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
          </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      {/* Page Content */}
      <div style={{
          padding: "32px",
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "center"
          }}>
            
        {/* Calendar + Time */}
        <div
  style={{
    backgroundColor: "#b0b3a8",
    borderRadius: "20px",
    padding: "24px",
    width: "100%",
    maxWidth: "900px",
    boxSizing: "border-box",
    textAlign: "center"
  }}
>
  <Calendar
    onChange={(date) => {
      setSelectedDate(date);
      setShowTimeInput(true);
    }}
    value={selectedDate}
    className="calendar-grid-stretch"
  />

          {showTimeInput && (
    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <label style={{
        fontSize: "1.1rem",
        marginBottom: "6px",
        fontWeight: "bold"
      }}>
        Time:
      </label>
      <select
  ref={timeInputRef}
  value={time}
  onChange={(e) => setTime(e.target.value)}
  style={{
    fontSize: "1rem",
    padding: "10px 16px",
    borderRadius: "12px",
    border: "2px solid #666851",
    backgroundColor: "#ECE7DC",
    fontFamily: "monospace",
    width: "240px"
  }}
>
  <option value="">-- Select Time --</option>
  <option value="08:00">08:00 AM</option>
  <option value="09:00">09:00 AM</option>
  <option value="10:00">10:00 AM</option>
  <option value="11:00">11:00 AM</option>
  <option value="13:00">01:00 PM</option>
  <option value="14:00">02:00 PM</option>
  <option value="15:00">03:00 PM</option>
  <option value="16:00">04:00 PM</option>
  <option value="17:00">05:00 PM</option>
</select>
      
    </div>
  )}
</div>

        {/* <div style={{ height: "120px" }}></div> */}

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
    </div>
  );
};

export default ClientDetail;
