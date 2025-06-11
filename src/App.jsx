import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainhomepage from "./Mainhomepage";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Signup from "./Signup";

// User Pages
import UserCalendar from "./user/Usercalender";
import ClientList from "./user/Clientlist";
import ClientDetail from "./user/Clientdetail"; 
import AppointmentDetail from "./user/Appointmentdetail";
import UserProfile from "./user/UserProfile";
import UserHistory from "./user/UserHistory";
import UserNotification from "./user/UserNotification";
import UserDashboard from "./user/UserDashboard";
import BookingPage from "./user/BookingPage";

// Client Pages
import ClientHomepage from "./client/ClientHomepage";
import ClientDashboard from "./client/ClientDashboard";
import ClientNotification from "./client/ClientNotification";
import ClientHistory from "./client/ClientHistory";
import ClientProfile from "./client/ClientProfile";
import UserList from "./client/UserList";
import UserDetail from "./client/UserDetail";

// Admin pages
import AdminHomepage from "./admin/AdminHomepage";
import AdminUser from "./admin/AdminUser";
import AdminClient from "./admin/AdminClient";
import AdminAddAccount from "./admin/AdminAddAccount";


import "./index.css"; 

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Mainhomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />


        {/* user */}

        <Route path="/user/usercalendar" element={<UserCalendar />} />
        <Route path="/user/clients" element={<ClientList />} />
        <Route path="/user/client/:id" element={<ClientDetail />} />
        <Route path="/user/appointment-detail" element={<AppointmentDetail />} />
        <Route path="/user/userprofile" element={<UserProfile />} />
        <Route path="/user/history" element={<UserHistory />} />
        <Route path="/user/notifications" element={<UserNotification />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/booking" element={<BookingPage />} />


        {/* client */}

        <Route path="/client/homepage" element={<ClientHomepage />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/notifications" element={<ClientNotification />} />
        <Route path="/client/history" element={<ClientHistory />} />
        <Route path="/client/profile" element={<ClientProfile />} />
        <Route path="/client/users" element={<UserList />} />
        <Route path="/client/user/:id" element={<UserDetail />} />


        {/* Admin Routes */}
        <Route path="/admin/homepage" element={<AdminHomepage />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/client" element={<AdminClient />} />
        <Route path="/admin/add-client" element={<AdminAddAccount />} />
        


    </Routes>
  );
};

export default App;
