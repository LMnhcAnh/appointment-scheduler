import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainhomepage from "./Mainhomepage";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Signup from "./Signup";
import Userhomepage from "./user/Userhomepage";
import UserCalendar from "./user/Usercalender";
import ClientList from "./user/Clientlist";
import ClientDetail from "./user/Clientdetail"; 
import AppointmentDetail from "./user/Appointmentdetail";
import UserProfile from "./user/UserProfile";
import UserHistory from "./user/UserHistory";
import UserNotification from "./user/UserNotification";
import UserDashboard from "./user/UserDashboard";
import ClientHomepage from "./client/ClientHomepage";

import "./index.css"; 

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Mainhomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />


        {/* user */}

        <Route path="/user/userhomepage" element={<Userhomepage />} />
        <Route path="/user/usercalendar" element={<UserCalendar />} />
        <Route path="/user/clients" element={<ClientList />} />
        <Route path="/user/client/:id" element={<ClientDetail />} />
        <Route path="/user/appointment-detail" element={<AppointmentDetail />} />
        <Route path="/user/userprofile" element={<UserProfile />} />
        <Route path="/user/history" element={<UserHistory />} />
        <Route path="/user/notifications" element={<UserNotification />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />


        {/* client */}

        <Route path="/client/homepage" element={<ClientHomepage />} />
    </Routes>
  );
};

export default App;
