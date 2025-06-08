import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../homepage.css';
import { FaChevronDown, FaChevronUp, FaCalendarAlt, FaBell, FaUser, FaCog, FaSignOutAlt, FaList, FaHistory, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu"; // Assuming UserMenu is in the same directory
import { Link } from "react-router-dom";


const UserCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="main-homepage">
      {/* Taskbar Header */}
      <div className="logo-box">
        <div className="logo-left">
            <Link to="/userhomepage" className="logo-link">
          <img src="/image/img_logo.svg" alt="Logo" />
            </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu /> {/* User Menu Component */}
        </div>

      {/* Calendar Section */}
      <section className="calendar-page-content">
  <h1>User Calendar</h1>
  <p>Select a date below to book or view appointments.</p>
  <h3>Select a Date</h3>
  <div className="calendar-wrapper">
    <Calendar
      onChange={setDate}
      value={date}
      className="calendar-box"
      tileClassName={() => 'calendar-tile'}
    />
    <p style={{ marginTop: '12px' }}>Selected: {date.toDateString()}</p>

    <button className="confirm-btn" onClick={() => alert(`Confirmed: ${date.toDateString()}`)}>
  Confirm
</button>
  </div>
</section>

    </div>
  );
};

export default UserCalendar;
