import React, { useState } from "react";
import ClientMenu from "./ClientMenu";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchText, setSearchText] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [pendingAppointments] = useState([
    {
      id: 1,
      avatar: "/image/img_gbao_3.png",
      name: "Phan Bảo – Marketing",
      email: "bao.user@example.com",
      date: "June 11, 2025",
      time: "10:00 AM",
      notes: "Prefers morning meetings.",
    },
    {
      id: 2,
      avatar: "/image/img_avatar_placeholder.png",
      name: "Trần Minh Châu",
      email: "chau.tran@example.com",
      date: "June 12, 2025",
      time: "09:00 AM",
      notes: "Interested in startup collaboration.",
    },
    {
      id: 3,
      avatar: "/image/img_avatar_placeholder.png",
      name: "Lê Quốc Hưng",
      email: "hung.le@example.com",
      date: "June 12, 2025",
      time: "03:00 PM",
      notes: "Follow-up for investment opportunity.",
    },
  ]);

  const [todaysAppointments, setTodaysAppointments] = useState([
    {
      id: 201,
      name: "Lê Thị B",
      time: "11:00 AM",
      date: today,
      note: "Scheduled check-in.",
      description: "",
    },
    {
      id: 202,
      name: "Đỗ Thanh Hà",
      time: "09:30 AM",
      date: today,
      note: "Weekly progress sync.",
      description: "",
    },
  ]);

  const [completedAppointments, setCompletedAppointments] = useState([
    {
      id: 101,
      name: "Trần Gia Bảo",
      date: "June 5, 2025",
      time: "14:00",
      note: "Follow-up on branding strategy.",
      status: "Completed",
    },
    {
      id: 102,
      name: "Nguyễn Văn A",
      date: "May 27, 2025",
      time: "09:30",
      note: "Sales performance review.",
      status: "Denied",
    },
    {
      id: 103,
      name: "Võ Minh Tuấn",
      date: "June 6, 2025",
      time: "15:00",
      note: "Discuss quarterly growth strategy.",
      status: "Completed",
    },
  ]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredHistory = completedAppointments.filter(
    (item) => filterStatus === "All" || item.status === filterStatus
  );

  return (
    <div className="main-homepage">
      <div className="logo-box">
        <div className="logo-left" onClick={() => navigate("/client/homepage")} style={{ cursor: "pointer" }}>
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <ClientMenu />
      </div>

      <div
        style={{
          display: "flex",
          padding: "20px 30px",
          gap: "30px",
          height: "calc(100vh - 90px)",
          boxSizing: "border-box",
          fontFamily: "monospace",
        }}
      >
        {/* Pending */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h3>🕒 Pending Approvals</h3>
          <div style={{ flex: 1, overflowY: "auto", background: "#b0b3a860", borderRadius: "12px", padding: "12px" }}>
            {pendingAppointments.map((user) => (
  <div
    key={user.id}
    style={{ backgroundColor: "#b0b3a8", borderRadius: "16px", padding: "16px", marginBottom: "16px", minHeight: "140px", cursor: "pointer" }}
    onClick={() => toggleExpand(user.id)}
  >
    <div style={{ display: "flex", gap: "14px" }}>
      <img src={user.avatar} alt="avatar" width="40" height="40" style={{ borderRadius: "50%" }} />
      <span>{user.name}</span>
    </div>

    {expandedId === user.id && (
      <div style={{ marginTop: "10px" }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date:</strong> {user.date}</p>
        <p><strong>Time:</strong> {user.time}</p>
        <p><strong>Note:</strong> {user.notes}</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <button className="confirm-btn" style={{ backgroundColor: "#7a9cc6" }}>✅ Approve</button>
          <button className="confirm-btn" style={{ backgroundColor: "#e06d6d" }}>❌ Deny</button>
        </div>
      </div>
    )}
  </div>
))}

          </div>
        </div>

        {/* Today's */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h3>📅 Today’s Appointments</h3>
          <div style={{ flex: 1, overflowY: "auto", background: "#b0b3a860", borderRadius: "12px", padding: "12px" }}>
            {todaysAppointments.map((appt) => (
              <div
                key={appt.id}
                style={{ backgroundColor: "#b0b3a8", borderRadius: "16px", padding: "16px", marginBottom: "16px", minHeight: "140px" }}
              >
                <p><strong>Name:</strong> {appt.name}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Note:</strong> {appt.note}</p>
                <textarea
                  rows="2"
                  value={appt.description}
                  onChange={(e) => {
                    const desc = e.target.value;
                    setTodaysAppointments((prev) =>
                      prev.map((a) => a.id === appt.id ? { ...a, description: desc } : a)
                    );
                  }}
                  style={{ width: "100%", borderRadius: "8px", marginTop: "8px", padding: "6px" }}
                />
                <button
                  className="confirm-btn"
                  onClick={() => {
                    setCompletedAppointments((prev) => [
                      ...prev,
                      {
                        id: appt.id,
                        name: appt.name,
                        date: today,
                        time: appt.time,
                        note: appt.description || appt.note,
                        status: "Completed",
                      },
                    ]);
                    setTodaysAppointments((prev) => prev.filter((a) => a.id !== appt.id));
                  }}
                  style={{ marginTop: "10px" }}
                >
                  ✅ Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h3>✅ History</h3>
          <div style={{ marginBottom: "10px" }}>
            <label>
              <strong>Filter by status:</strong>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ marginLeft: "10px", padding: "4px" }}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Denied">Denied</option>
              </select>
            </label>
            <br />
            <label>
              <strong>Search by name:</strong>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter name..."
                style={{ width: "100%", marginTop: "6px", padding: "6px", borderRadius: "6px" }}
              />
            </label>
            <button
              onClick={() => {
                setFilterStatus("All");
                setSearchText("");
              }}
              style={{ marginTop: "10px", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
            >
              🔄 Clear Filters
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", background: "#b0b3a860", borderRadius: "12px", padding: "12px" }}>
            {filteredHistory
              .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
              .map((item) => (
                <div
                  key={item.id}
                  style={{ backgroundColor: "#b0b3a8", borderRadius: "16px", padding: "16px", marginBottom: "16px", minHeight: "140px" }}
                >
                  <p><strong>Date:</strong> {item.date}</p>
                  <p><strong>Time:</strong> {item.time}</p>
                  <p><strong>User:</strong> {item.name}</p>
                  <p><strong>Note:</strong> {item.note}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;