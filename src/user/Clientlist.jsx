import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useClientStatus } from "../context/ClientStatusContext";

const ClientList = () => {
  const navigate = useNavigate();
  const { clients } = useClientStatus();

  const activeClients = clients.filter(client => client.status === "Active");

  return (
    <div className="main-homepage">
      <div className="logo-box">
        <div className="logo-left">
          <Link to="/user/dashboard" className="login-logo-link">
              <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
            </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      <section className="client-list-container">
        {activeClients.map((client) => (
          <div
            key={client.id}
            className="client-card"
            onClick={() => navigate(`/user/client/${client.id}`)}
          >
            {client.name}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClientList;
