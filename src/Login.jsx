// admin-dashboard/src/Login.jsx
import React from "react";

export default function Login({ onLogin }) {
  return (
    <div style={{ maxWidth: 300, margin: "100px auto", textAlign: "center" }}>
      <h2>PulseDesk Admin Login</h2>
      <button
        onClick={onLogin}
        style={{ padding: "10px 20px", cursor: "pointer", fontSize: 16 }}
      >
        Login
      </button>
    </div>
  );
}
