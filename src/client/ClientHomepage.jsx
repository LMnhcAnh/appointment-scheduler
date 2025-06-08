import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../homepage.css";
import ClientMenu from "./ClientMenu";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import { useClientAnalytics } from "./ClientAnalyticsContext";

const COLORS = ["#8884d8", "#ffc658", "#ff5f5f"];

const ClientHomepage = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const { weeklyBookings, statusCounts } = useClientAnalytics();

  const pieData = [
    { name: "Confirmed", value: statusCounts.confirmed },
    { name: "Pending", value: statusCounts.pending },
    { name: "Cancelled", value: statusCounts.cancelled }
  ];

  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div className="logo-left" style={{ cursor: "pointer" }} onClick={() => navigate("/client/dashboard")}>
          <img src="/image/img_logo.svg" alt="Logo" width={40} />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <ClientMenu />
      </div>

      {/* Calendar */}
      <section className="calendar-page-content" style={{ marginTop: "40px" }}>
        <h2>Client Calendar</h2>
        <Calendar
          onChange={setDate}
          value={date}
          className="calendar-box"
          tileClassName={() => "calendar-tile"}
        />
        <p style={{ marginTop: "12px" }}>Selected: {date.toDateString()}</p>
      </section>
      <hr style={{
  border: "none",
  borderTop: "2px solid black",
  margin: "60px auto",
  width: "90%"
}} />


      {/* Charts */}
      <section style={{ marginTop: "60px", padding: "32px" }}>
        <h2 style={{ textAlign: "center" }}>Live Booking Analytics</h2>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center" }}>
          {/* Bar Chart */}
          <BarChart width={480} height={350} data={weeklyBookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>

          {/* Line Chart */}
          <LineChart width={480} height={350} data={weeklyBookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#ff7300" />
          </LineChart>

          {/* Pie Chart */}
          <PieChart width={360} height={360}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </section>
    </div>
  );
};

export default ClientHomepage;
