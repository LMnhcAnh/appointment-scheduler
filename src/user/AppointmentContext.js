import { createContext, useContext, useState } from "react";

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const initialMockAppointments = [
    {
      client: { id: 1, name: "Trần Gia Bảo" },
      date: new Date(),        // today
      time: "08:00",
      note: "Mock: already booked"
    },
    {
      client: { id: 2, name: "Nguyễn Văn A" },
      date: new Date(),
      time: "09:30",
      note: "Mock: test case"
    }
  ];

  const [appointments, setAppointments] = useState(initialMockAppointments);

  const addAppointment = (newAppt) => {
    setAppointments((prev) => [...prev, newAppt]);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
