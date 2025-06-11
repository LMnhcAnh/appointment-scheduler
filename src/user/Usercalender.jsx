import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import UserMenu from "./UserMenu";
import { useAppointment } from "./AppointmentContext";
import "../homepage.css";
import { Link } from "react-router-dom";


const clients = [
  {
    id: 1,
    avatar: "/image/img_gbao_1.png",
    name: "Phan Bảo",
    role: "Marketing",
    status: "Pending",
    time: "10:00 AM",
    date: "June 10, 2025",
    description: "Discuss campaign strategies."
  },
  {
    id: 2,
    avatar: "/image/img_gbao_1.png",
    name: "Nguyễn Văn A",
    role: "Sales",
    status: "Confirm",
    time: "11:30 AM",
    date: "June 12, 2025",
    description: "Review quarterly sales."
  },
  {
    id: 3,
    avatar: "/image/img_gbao_1.png",
    name: "Lê Thị B",
    role: "Developer",
    status: "Denied",
    time: "2:00 PM",
    date: "June 15, 2025",
    description: "Discuss feature timeline."
  }
];

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [activeDayEvents, setActiveDayEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const getAppointmentsForDate = (date) => {
  return clients
    .filter(client => new Date(client.date).toDateString() === date.toDateString())
    .map(client => ({
      client,
      time: client.time
    }));
};


  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div className="logo-left">
          <Link to="/user/usercalendar">
          <img src="/image/img_logo.svg" alt="Logo" />
          </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2>Calendar</h2>

        <button
          className="confirm-btn"
          style={{ marginLeft: "12px" }}
          onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
        >
          Switch to {viewMode === "month" ? "Week View" : "Month View"}
        </button>

        {/* Month View */}
        {viewMode === "month" && (
          <div style={{
            marginTop: "30px",
            padding: "20px",
            background: "#ece7dc",
            borderRadius: "10px"
          }}>
            <Calendar
              value={selectedDate}
              onClickDay={(date) => {
                setSelectedDate(date);
                const events = getAppointmentsForDate(date);
                if (events.length > 0) {
                  setActiveDayEvents(events);
                  setShowModal(true);
                }
              }}
              tileContent={({ date, view }) => {
  const hasEvent = clients.some(c => new Date(c.date).toDateString() === date.toDateString());
  return view === "month" && hasEvent ? (
    <div style={{ textAlign: "center", color: "green", fontSize: "1.2rem" }}>•</div>
  ) : null;
}}
              className="calendar-grid-stretch"
            />
          </div>
        )}

        {/* Week View */}
        {viewMode === "week" && (
          <div style={{ marginTop: "30px", padding: "20px", background: "#ece7dc", borderRadius: "10px" }}>
            <h3>Week View</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                    <th key={i} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array.from({ length: 7 }).map((_, dayOffset) => {
                    const date = new Date(selectedDate);
                    date.setDate(selectedDate.getDate() - selectedDate.getDay() + dayOffset);
                    const dailyEvents = getAppointmentsForDate(date);
                    return (
                      <td key={dayOffset} style={{ verticalAlign: "top", padding: "10px", heigght: "120px", border: "1px solid #ddd", boxSizing: "border-box" }}>
                        <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                          {date.getDate()} / {date.getMonth() + 1}
                        </div>
                        {dailyEvents.map((event, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setActiveDayEvents([event]);
                              setShowModal(true);
                            }}
                            style={{
                              whiteSpace: "normal", 
                              backgroundColor: "#34a853",
                              color: "#fff",
                              borderRadius: "6px",
                              marginBottom: "6px",
                              padding: "4px 8px",
                              fontSize: "0.85rem",
                              cursor: "pointer"
                            }}
                          >
                            {event.client.name} - {event.time}
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Event Details */}
        {showModal && (
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "2px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
            zIndex: 1000,
            minWidth: "300px",
            maxWidth: "500px"
          }}>
            <h3>Appointments</h3>
            {activeDayEvents.map((appt, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <strong>Client:</strong> {appt.client.name}<br />
                <strong>Time:</strong> {appt.time}<br />
                <strong>Note:</strong> {appt.note || "-"}
              </div>
            ))}
            <button
              className="confirm-btn"
              style={{ marginTop: "16px" }}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCalendar;
