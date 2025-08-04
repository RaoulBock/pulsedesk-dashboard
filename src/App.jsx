import React, { useState, useEffect } from "react";
import Login from "./Login";
import MachinesTable from "./MachinesTable";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) {
      fetchMachines();
      const interval = setInterval(fetchMachines, 30000);
      return () => clearInterval(interval);
    }
  }, [loggedIn]);

  const fetchMachines = () => {
    setLoading(true);
    fetch("http://localhost:4000/api/machines")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setMachines(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>PulseDesk Admin Dashboard</h1>
      <button
        onClick={() => setLoggedIn(false)}
        style={{ marginBottom: 20, padding: 8 }}
      >
        Logout
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading devices...</p>
      ) : (
        <MachinesTable machines={machines} />
      )}
    </div>
  );
}
