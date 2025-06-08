import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronDown, FaChevronUp,
  FaUser, FaUsers, FaPlusCircle,
  FaCog, FaSignOutAlt
} from "react-icons/fa";
import "../user/UserMenu.css"; // Reuse your dropdown styles

const adminMenuItems = [
  { icon: FaUser, label: "User", route: "/admin/user" },
  { icon: FaUsers, label: "Client", route: "/admin/client" },
  { icon: FaPlusCircle, label: "Add", route: "/admin/add-client" },
  { icon: FaCog, label: "Setting", route: "/admin/settings" }
];

const AdminMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
            {adminMenuItems.map(({ icon: Icon, label, route }) => (
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

export default AdminMenu;
