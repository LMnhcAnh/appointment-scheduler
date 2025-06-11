import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import UserMenu from "./UserMenu";
import "../homepage.css";
import { Link } from "react-router-dom";

const clients = [
  { id: 1, name: "Alice", date: "June 10, 2025", time: "08:00 AM", status: "Pending", avatar: "/image/img_gbao_2.png", role: "Marketing" },
  { id: 2, name: "Bob", date: "June 10, 2025", time: "09:00 AM", status: "Confirm", avatar: "/image/img_gbao_2.png", role: "Sales" },
  { id: 3, name: "Charlie", date: "June 10, 2025", time: "10:00 AM", status: "Denied", avatar: "/image/img_gbao_2.png", role: "Engineering" },
  { id: 4, name: "Diana", date: "June 11, 2025", time: "08:00 AM", status: "Confirm", avatar: "/image/img_gbao_2.png", role: "Manager" },
  { id: 5, name: "Ethan", date: "June 11, 2025", time: "01:00 PM", status: "Complete", avatar: "/image/img_gbao_2.png", role: "Design" },
  { id: 6, name: "Fiona", date: "June 12, 2025", time: "03:00 PM", status: "Denied", avatar: "/image/img_gbao_2.png", role: "Support" },
  { id: 7, name: "George", date: "June 13, 2025", time: "11:00 AM", status: "Confirm", avatar: "/image/img_gbao_2.png", role: "QA" },
  { id: 8, name: "Hannah", date: "June 14, 2025", time: "04:00 PM", status: "Pending", avatar: "/image/img_gbao_2.png", role: "Intern" },
  { id: 9, name: "Ian", date: "June 15, 2025", time: "02:00 PM", status: "Complete", avatar: "/image/img_gbao_2.png", role: "Lead" }
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
          <Link to="/user/dashboard">
            <img src="/image/img_logo.svg" alt="Logo" width={40} />
          </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      {/* Content */}
      
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
          const hasEvent = clients.some(
            c => new Date(c.date).toDateString() === date.toDateString()
          );
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
              const dailyEvents = clients
                .filter(client => new Date(client.date).toDateString() === date.toDateString())
                .sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));

              return (
                <td key={dayOffset} style={{
                  verticalAlign: "top",
                  padding: "10px",
                  height: "120px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box"
                }}>
                  <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                    {date.getDate()} / {date.getMonth() + 1}
                  </div>
                  {dailyEvents.map((event, i) => {
                    const bgColor = {
                      Pending: "#aaa",
                      Confirm: "#5cb85c",
                      Denied: "#d9534f",
                      Complete: "#0275d8"
                    }[event.status] || "#999";

                    return (
                      <div
                        key={i}
                        style={{
                          backgroundColor: bgColor,
                          color: "white",
                          borderRadius: "6px",
                          marginBottom: "6px",
                          padding: "4px 8px",
                          fontSize: "0.85rem"
                        }}
                      >
                        {event.name} – {event.time}
                      </div>
                    );
                  })}

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
    Denied: "#d9534f",
    Complete: "#0275d8"
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
