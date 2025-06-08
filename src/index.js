import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";
import { AppointmentProvider } from "./user/AppointmentContext";
import { ClientAnalyticsProvider } from "./client/ClientAnalyticsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppointmentProvider>
      <ClientAnalyticsProvider> {/* ✅ context added */}
        <App />
      </ClientAnalyticsProvider>
    </AppointmentProvider>
  </BrowserRouter>
);