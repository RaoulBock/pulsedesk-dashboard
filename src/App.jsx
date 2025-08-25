// App.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MachinesTable from "./MachinesTable";
import Login from "./Login";

const socket = io("https://pulsedesk-backend.onrender.com");

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState("");
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(() => {
    if (!loggedIn) return;

    fetch("https://pulsedesk-backend.onrender.com/api/machines")
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
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarLogo}>⚡ PulseDesk</h2>
        <nav style={styles.nav}>
          <a href="#" style={styles.navItem}>
            🏠 Dashboard
          </a>
          {/* <a href="#" style={styles.navItem}>
            📊 Reports
          </a>
          <a href="#" style={styles.navItem}>
            📈 Analytics
          </a>
          <a href="#" style={styles.navItem}>
            ⚙️ Settings
          </a> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <input
            type="text"
            placeholder="🔍 Search anything..."
            style={styles.search}
          />
          <button style={styles.logoutBtn} onClick={() => setLoggedIn(false)}>
            🚪 Logout
          </button>
        </header>

        {/* Stat Cards */}
        <section style={styles.cards}>
          <div
            style={{
              ...styles.card,
              background: "linear-gradient(135deg,#667eea,#764ba2)",
            }}
          >
            <h4>💻 Total Devices</h4>
            <p>{machines.length}</p>
          </div>
          <div
            style={{
              ...styles.card,
              background: "linear-gradient(135deg,#43e97b,#38f9d7)",
            }}
          >
            <h4>🟢 Online</h4>
            <p>{machines.filter((m) => m.status === "online").length}</p>
          </div>
          <div
            style={{
              ...styles.card,
              background: "linear-gradient(135deg,#ff758c,#ff7eb3)",
            }}
          >
            <h4>🔴 Offline</h4>
            <p>{machines.filter((m) => m.status !== "online").length}</p>
          </div>
        </section>

        {/* Content */}
        <main style={styles.main}>
          {error && <div style={styles.errorBox}>{error}</div>}
          <MachinesTable machines={machines} />
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f3f4f6",
  },
  sidebar: {
    width: "230px",
    background: "linear-gradient(180deg,#1e293b,#0f172a)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    borderRight: "1px solid rgba(255,255,255,0.1)",
  },
  sidebarLogo: {
    margin: 0,
    marginBottom: "30px",
    fontSize: "22px",
    fontWeight: "700",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  navItem: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "15px",
    padding: "10px 12px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  search: {
    flex: 1,
    maxWidth: "300px",
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    marginRight: "15px",
    transition: "all 0.3s ease",
  },
  logoutBtn: {
    background: "linear-gradient(135deg,#ff0844,#ffb199)",
    border: "none",
    color: "white",
    padding: "10px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "25px 30px",
  },
  card: {
    color: "white",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    textAlign: "center",
    transition: "transform 0.2s ease",
    fontSize: "18px",
    fontWeight: "600",
  },
  main: {
    flex: 1,
    padding: "20px 30px",
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
