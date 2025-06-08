import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../homepage.css";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const ClientList = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Simulated fetch from database or API
    const fetchClients = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "Trần Gia Bảo" },
            { id: 2, name: "Nguyễn Văn A" },
            { id: 3, name: "Lê Thị B" },
            // Add more as needed
          ]);
        }, 300); // simulate network delay
      });

      setClients(response);
    };

    fetchClients();
  }, []);

  const goToClient = (id) => {
    navigate(`/user/client/${id}`);
  };

  return (
    <div className="main-homepage">
      <div className="logo-box">
        <div className="logo-left">
          <Link to="/" className="login-logo-link">
                    <img src="/image/img_logo.svg" alt="Logo" className="login-logo" />
                  </Link>
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      <section className="client-list-container">
        {clients.map((client) => (
          <div
            key={client.id}
            className="client-card"
            onClick={() => goToClient(client.id)}
          >
            {client.name}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClientList;
