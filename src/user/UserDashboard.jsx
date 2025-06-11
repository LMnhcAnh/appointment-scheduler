import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import UserMenu from "./UserMenu";
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

const UserDashboard = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [activeDayEvents, setActiveDayEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Helper function to get appointments for a specific date
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
      <div className="logo-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
        <div className="logo-left">
          <Link to="/user/usercalendar">
            <img src="/image/img_logo.svg" alt="Logo" width={40} />
          </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      {/* Content */}
      
        {/* Calendar on top */}
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
            onChange={setSelectedDate}
            className="calendar-grid-stretch"
            tileContent={({ date, view }) => {
  const hasEvent = clients.some(c => new Date(c.date).toDateString() === date.toDateString());
  return view === "month" && hasEvent ? (
    <div style={{ textAlign: "center", color: "green", fontSize: "1.2rem" }}>•</div>
  ) : null;
}}
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
                      <td key={dayOffset} style={{ verticalAlign: "top", padding: "10px", heigght: "120px", border: "1px solid #ddd", boxSizing: "border-box"  }}>
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
<div style={{ padding: "40px" }}>
        <h2 style={{ fontFamily: "monospace", marginBottom: "20px" }}>Dashboard</h2>
        {/* List of clients */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              style={{
                backgroundColor: "#b0b3a8",
                borderRadius: "32px",
                padding: "20px 32px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                fontFamily: "monospace",
                cursor: "pointer",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img src={client.avatar} alt="avatar" width="64" height="64" style={{ borderRadius: "50%" }} />
                <span style={{ fontSize: "1.2rem" }}>
                  <strong>{client.name}</strong> – {client.role}
                </span>
              </div>
              <StatusBadge status={client.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detail */}
      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
      {/* Closing main-homepage div */}
    </div>
      </div>
  );
};

// Modal
const ClientDetailModal = ({ client, onClose }) => {
  const handleClickBackground = (e) => {
    if (e.target.id === "modal-bg") onClose();
  };

  return (
    <div
      id="modal-bg"
      onClick={handleClickBackground}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 999
      }}
    >
      <div
        onClick={onClose}
        style={{
          backgroundColor: "#b0b3a8",
          borderRadius: "48px",
          padding: "40px",
          width: "700px",
          maxWidth: "90%",
          fontFamily: "monospace",
          cursor: "pointer"
        }}
      >
        <div style={{ position: "absolute", top: "20px", right: "30px" }}>
          <StatusBadge status={client.status} />
        </div>
        <h2>{client.name}</h2>
        <p><strong>Date:</strong> {client.date || "—"}</p>
        <p><strong>Time:</strong> {client.time || "—"}</p>
        <div style={{
          backgroundColor: "#e1e1e1",
          borderRadius: "32px",
          padding: "24px",
          marginTop: "20px",
          minHeight: "180px"
        }}>
          <strong>Description:</strong><br />
          {client.description || "—"}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
          <button style={btnStyle("#fdbd88")}>Edit</button>
          <button style={btnStyle("#f87b6b")}>Delete</button>
        </div>
      </div>
    </div>
  );
};

// Badge
const StatusBadge = ({ status }) => {
  const color = {
    Pending: "#ccc",
    Confirm: "#5cb85c",
    Denied: "#d9534f"
  }[status] || "#999";

  return (
    <span style={{
      backgroundColor: color,
      color: "white",
      padding: "4px 12px",
      borderRadius: "10px",
      fontSize: "0.9rem"
    }}>
      {status}
    </span>
  );
};

// Button
const btnStyle = (bg) => ({
  backgroundColor: bg,
  color: "#333",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  fontWeight: "bold",
  cursor: "pointer"
});

export default UserDashboard;
