// src/context/ClientStatusContext.js
import React, { createContext, useContext, useState } from "react";

const ClientStatusContext = createContext();

export const useClientStatus = () => useContext(ClientStatusContext);

export const ClientStatusProvider = ({ children }) => {
  const [clients, setClients] = useState([
    { id: 1, name: "Trần Gia Bảo", status: "Active" },
    { id: 2, name: "Nguyễn Văn A", status: "Busy" },
    { id: 3, name: "Lê Thị B", status: "Active" }
  ]);

  const updateStatus = (id, newStatus) => {
    setClients(prev =>
      prev.map(client =>
        client.id === id ? { ...client, status: newStatus } : client
      )
    );
  };

  return (
    <ClientStatusContext.Provider value={{ clients, updateStatus }}>
      {children}
    </ClientStatusContext.Provider>
  );
};
