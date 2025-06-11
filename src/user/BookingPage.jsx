import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../homepage.css";
import UserMenu from "./UserMenu";
import { useAppointment } from "./AppointmentContext";
import { FaUser, FaClock } from "react-icons/fa";

const mockClients = [
  { id: 1, name: "Trần Gia Bảo" },
  { id: 2, name: "Nguyễn Văn A" },
  { id: 3, name: "Lê Thị B" },
  { id: 4, name: "Nguyễn Văn A" },
  { id: 5, name: "Nguyễn Văn A" },
  { id: 6, name: "Nguyễn Văn A" },
  { id: 7, name: "Nguyễn Văn A" },
  { id: 8, name: "Nguyễn Văn A" },
  { id: 9, name: "Nguyễn Văn A" },
  { id: 10, name: "Nguyễn Văn A" },
  { id: 11, name: "Nguyễn Văn A" },
  { id: 12, name: "Nguyễn Văn A" },
  { id: 13, name: "Nguyễn Văn A" },
  { id: 14, name: "Nguyễn Văn A" },
];

const generateTimeSlots = () => {
  const slots = [];
  const startHour = 7;
  const endHour = 16;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute of [0, 30]) {
      // Skip 12:00 and 12:30
      if (hour === 12) continue;

      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
    }
  }

  return slots;
};


const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { appointments = [], addAppointment } = useAppointment();

  const slots = generateTimeSlots();

  const isClientAvailable = (clientId, time) => {
    return !appointments.some(
      (appt) =>
        appt.client?.id === clientId &&
        new Date(appt.date).toDateString() === selectedDate.toDateString() &&
        appt.time === time
    );
  };

  const handleClientClick = (client) => {
    if (selectedClient?.id === client.id) {
      setSelectedClient(null);
    } else {
      setSelectedClient(client);
    }
  };

  const handleTimeClick = (time) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const isTimeSelectable = (time) => {
    if (!selectedClient) return true;
    return isClientAvailable(selectedClient.id, time);
  };

  const isClientSelectable = (client) => {
    if (!selectedTime) return true;
    return isClientAvailable(client.id, selectedTime);
  };

  const handleConfirmBooking = () => {
    if (selectedClient && selectedTime) {
      addAppointment({
        date: selectedDate,
        client: selectedClient,
        time: selectedTime,
        note: ""
      });
      setShowToast(true);
      setTimeout(() => {
      setShowToast(false);
      setShowPopup(false);
      setSelectedClient(null);
      setSelectedTime(null);
      }, 1000);

    }
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

      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2>Book Appointment</h2>
        <Calendar value={selectedDate} onChange={setSelectedDate} />

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="confirm-btn" onClick={() => setShowPopup(true)}>Book</button>
        </div>

        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            onClick={() => setShowPopup(false)}
          >
            <div
              style={{
                backgroundColor: "#f4f1e8",
                padding: "30px",
                borderRadius: "20px",
                width: "90%",
                maxWidth: "1200px",
                height: "90%",
                maxHeight: "1000px",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flex: 1,
                // height: "400px",
                overflow: "hidden"
              }}>
                {/* Time Slot Selection */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Time</h3>
                  <div style={{
                    background: "#dcdad3",
                    padding: "10px",
                    borderRadius: "16px",
                    height: "620px",
                    overflowY: "scroll"
                  }}>
                    {slots.map((time) => {
                      const isSelected = selectedTime === time;
                      const isDisabled = !isTimeSelectable(time);
                      return (
                        <div
                          key={time}
                          onClick={() => !isDisabled && handleTimeClick(time)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "10px 16px",
                            marginBottom: "12px",
                            borderRadius: "16px",
                            backgroundColor: isSelected ? "#7eb9b6" : isDisabled ? "#c0c0c0" : "#b2c7d9",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            opacity: isDisabled ? 0.5 : 1
                          }}
                        >
                          <FaClock size={20} /> <strong>{time}</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: "2px", backgroundColor: "black", height: "100%", margin: "0 10px" }} />

                {/* Clients (right side) */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Client</h3>
                  <div style={{
                    background: "#dcdad3",
                    padding: "10px",
                    borderRadius: "16px",
                    height: "620px",
                    overflowY: "scroll"
                  }}>
                    {mockClients.map((client) => {
                      const isSelected = selectedClient?.id === client.id;
                      const isDisabled = !isClientSelectable(client);
                      return (
                        <div
                          key={client.id}
                          onClick={() => !isDisabled && handleClientClick(client)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "10px 16px",
                            marginBottom: "12px",
                            borderRadius: "16px",
                            backgroundColor: isSelected ? "#7eb9b6" : isDisabled ? "#c0c0c0" : "#d2b9d9",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            opacity: isDisabled ? 0.5 : 1
                          }}
                        >
                          <FaUser size={40} />
                          <strong>{client.name}</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  className="confirm-btn"
                  disabled={!(selectedClient && selectedTime)}
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <div style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#5cb85c",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            fontSize: "1rem",
            zIndex: 1100
          }}>
            ✅ Appointment booked successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
