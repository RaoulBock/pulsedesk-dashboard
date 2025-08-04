import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password123") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto", textAlign: "center" }}>
      <h2>PulseDesk Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ width: "100%", padding: 8 }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
