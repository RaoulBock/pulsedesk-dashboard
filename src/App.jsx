// App.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MachinesTable from "./MachinesTable";
import Login from "./Login";

const socket = io("http://localhost:4000");

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState("");
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(() => {
    if (!loggedIn) return;

    fetch("http://localhost:4000/api/machines")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch devices");
        return res.json();
      })
      .then(setMachines)
      .catch((err) => setError(err.message));

    socket.on("devices:update", (updatedDevices) => {
      setMachines(updatedDevices);
    });

    return () => {
      socket.off("devices:update");
    };
  }, [loggedIn]);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>PulseDesk Dashboard</h1>
        <button style={styles.logoutBtn} onClick={() => setLoggedIn(false)}>
          Logout
        </button>
      </header>

      {/* Content */}
      <main style={styles.main}>
        {error && <div style={styles.errorBox}>{error}</div>}
        <MachinesTable
          machines={machines}
          onRemoteControl={setSelectedMachine}
        />
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9fbfd",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    padding: "15px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  logoutBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  main: {
    flex: 1,
    padding: "20px 40px",
  },
  errorBox: {
    background: "#ffe5e5",
    border: "1px solid #ffb3b3",
    color: "#c0392b",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "15px",
  },
};
