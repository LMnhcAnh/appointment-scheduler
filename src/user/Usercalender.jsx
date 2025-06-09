import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import Modal from "react-modal";
import 'react-calendar/dist/Calendar.css';
import UserMenu from "./UserMenu";
import "../homepage.css";
// import ReactTooltip from 'react-tooltip';


const CLIENT_ID = "75861827941-hlh8t58n7rs8lh6slkah07sam5dsh3sg.apps.googleusercontent.com";
const API_KEY = "";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

Modal.setAppElement("#root"); // ensure accessibility

const UserCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("month"); // or 'week'
  const [showSidePanel, setShowSidePanel] = useState(false);

  
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = new Date(event.start.dateTime || event.start.date).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {});

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(setIsSignedIn);
          if (auth.isSignedIn.get()) listEvents();
        });
    });
  }, []);

  const listEvents = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();

gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: startOfMonth,
      timeMax: endOfNextMonth,
      showDeleted: false,
      singleEvents: true, // expands recurring events into individual instances
      maxResults: 999,
      orderBy: "startTime"
    })
    .then((res) => {
      const items = res.result.items;
      if (items.length === 0) {
        console.log("No events found.");
      } else {
        console.log(`Fetched ${items.length} events.`);
        setEvents(items); // this feeds tileContent
      }
    })
    .catch((err) => {
      console.error("Failed to fetch events:", err);
    });
};

  //     .then((res) => setEvents(res.result.items || []));
  // };

  const handleLogin = () => gapi.auth2.getAuthInstance().signIn();
  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
    setEvents([]);
  };

  return (
    <div className="main-homepage">
      {/* Header */}
      <div className="logo-box">
        <div className="logo-left">
          <img src="/image/img_logo.svg" alt="Logo" />
          <span className="navbar-title">Appointment Scheduler</span>
        </div>
        <UserMenu />
      </div>

      {/* Main */}
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2>Google Calendar</h2>
        {!isSignedIn ? (
          <button className="confirm-btn" onClick={handleLogin}>
            Sign in with Google
          </button>
        ) : (
          <>
            <button className="confirm-btn" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="confirm-btn"
              style={{ marginLeft: "12px" }}
              onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
            >
              Switch to {viewMode === "month" ? "Week View" : "Month View"}
            </button>

            {/* Month View */}
            {viewMode === "month" && (
              <>
                <div style={{ maxWidth: "100%", overflowX: "auto"}}>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={({ date }) => {
                      
                      const dayKey = date.toDateString();
                      const dailyEvents = eventsByDate[dayKey] || [];

                      return (
                        <div style={{ marginTop: "4px", padding: "2px", height: "52px", overflow: "hidden" }}>
                          {dailyEvents.slice(0, 3).map((ev, i) => (
                            <div
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(ev);
                              }}
                              style={{
                                backgroundColor: "#d81b60", // Google Calendar pink
                                color: "white",
                                padding: "1px 4px",
                                marginBottom: "2px",
                                fontSize: "0.65rem",
                                fontWeight: 500,
                                borderRadius: "4px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                cursor: "pointer"
                              }}
                              title={ev.summary}
                            >
                              {ev.summary}
                            </div>
                          ))}
                          {dailyEvents.length > 3 && (
                            <div style={{ fontSize: "0.6rem", color: "#555", textAlign: "right" }}>
                              +{dailyEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>

                {/* Detail for selected date
                <div style={{ marginTop: "30px" }}>
                  <h3>{selectedDate.toDateString()} - Full Details</h3>
                  <ul style={{ fontFamily: "monospace" }}>
                    {(eventsByDate[selectedDate.toDateString()] || []).map((event, i) => (
                      <li key={i} style={{ marginBottom: "10px" }}>
                        <strong>{event.summary}</strong><br />
                        {new Date(event.start.dateTime || event.start.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </>
            )}

             {/* Week View (experimental layout) */}
            {viewMode === "week" && (
              <div style={{ marginTop: "30px", padding: "20px", background: "#eee", borderRadius: "10px" }}>
                <h3>Week View</h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                        <th key={i} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
  <tr>
    {Array.from({ length: 7 }).map((_, dayOffset) => {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() - selectedDate.getDay() + dayOffset);
      const key = date.toDateString();
      return (
        <td key={dayOffset} style={{ verticalAlign: "top", padding: "10px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
            {date.getDate()} / {date.getMonth() + 1}
          </div>
          {(eventsByDate[key] || []).map((event, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#34a853",
                color: "#fff",
                borderRadius: "6px",
                marginBottom: "6px",
                padding: "4px 8px",
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
              onClick={() => setSelectedEvent(event)}
              title={event.summary}
            >
              {event.summary}
            </div>
          ))}
        </td>
      );
    })}
  </tr>
</tbody>
</table>
</div>
            )}

            {/* Event Details Modal */}
            {selectedEvent && (
              <Modal
                isOpen={!!selectedEvent}
                onRequestClose={() => setSelectedEvent(null)}
                style={{
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: "600px",
                  },
                }}
              >
                <h2>{selectedEvent.summary}</h2>
                <p>
                  Start: {new Date(selectedEvent.start.dateTime || selectedEvent.start.date).toLocaleString()}
                </p>
                <p>
                  End: {new Date(selectedEvent.end.dateTime || selectedEvent.end.date).toLocaleString()}
                </p>
                <button className="confirm-btn" onClick={() => setSelectedEvent(null)}>
                  Close
                </button>
              </Modal>
            )}
          </>
        )}
      </div>
      {showSidePanel && selectedEvent && (
  <div
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      height: "100%",
      width: "320px",
      backgroundColor: "#f9f9f9",
      boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
      padding: "24px",
      zIndex: 1000
    }}
  >
    <h3>{selectedEvent.summary}</h3>
    <p>
      <strong>Start:</strong>{" "}
      {new Date(selectedEvent.start.dateTime || selectedEvent.start.date).toLocaleString()}
    </p>
    <p>
      <strong>End:</strong>{" "}
      {new Date(selectedEvent.end.dateTime || selectedEvent.end.date).toLocaleString()}
    </p>
    {selectedEvent.description && <p>{selectedEvent.description}</p>}
    <button
      className="confirm-btn"
      onClick={() => setShowSidePanel(false)}
      style={{ marginTop: "20px" }}
    >
      Close
    </button>
  </div>
)}

    </div>
    
  );
}
export default UserCalendar;
