import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MachinesTable from "./MachinesTable";
import Login from "./Login";

const socket = io("http://localhost:4000");

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState("");

  const fetchMachines = () => {
    fetch("http://localhost:4000/api/machines")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch devices");
        return res.json();
      })
      .then(setMachines)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    if (!loggedIn) return;

    // Fetch initial machines list on login
    fetchMachines();

    // Listen for real-time updates
    socket.on("update", (updatedDevices) => {
      setMachines(updatedDevices);
    });

    // Clean up socket listener on unmount or logout
    return () => {
      socket.off("update");
    };
  }, [loggedIn]);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
        padding: 20,
      }}
    >
      <h1>PulseDesk Admin Dashboard</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setLoggedIn(false)}
          style={{ padding: "8px 12px", cursor: "pointer", marginRight: 10 }}
        >
          Logout
        </button>
        <button
          onClick={fetchMachines}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Refresh
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MachinesTable machines={machines} />
    </div>
  );
}
