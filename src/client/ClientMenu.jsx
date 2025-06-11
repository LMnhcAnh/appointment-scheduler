import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronDown, FaChevronUp, FaCalendarAlt, FaChartBar, FaBell,
  FaUser, FaCog, FaSignOutAlt, FaList, FaHistory
} from "react-icons/fa";
import "../user/UserMenu.css";

const menuItems = [
  { icon: FaChartBar, label: "Dashboard", route: "/client/dashboard" },
  { icon: FaBell, label: "Notification", route: "/client/notifications" },
  { icon: FaList, label: "List of user", route: "/client/users" },
  { icon: FaUser, label: "Profile", route: "/client/profile" },
  { icon: FaCog, label: "Setting", route: "/client/settings" },
];

const ClientMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false); // close menu after clicking
  };

  return (
    <div className="user-menu-container">
      <div className="user-menu-button" onClick={() => setOpen(!open)}>
        Menu {open ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {open && (
        <div className="dropdown-panel-fixed">
          <ul>
            {menuItems.map(({ icon: Icon, label, route }) => (
              <li key={label} onClick={() => handleNavigate(route)}>
                <Icon style={{ fontSize: "1.4rem" }} /> {label}
              </li>
            ))}
            <li onClick={() => handleNavigate("/")}>
              <FaSignOutAlt style={{ fontSize: "1.4rem" }} /> Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientMenu;
