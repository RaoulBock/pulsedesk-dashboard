import React from "react";

export default function Login({ onLogin }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>PulseDesk Admin Login</h2>
        <p style={styles.subtitle}>Sign in to access your dashboard</p>
        <button style={styles.button} onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0f4f8, #ffffff)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "350px",
  },
  title: {
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#2c3e50",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#7f8c8d",
  },
  button: {
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
};

// Add hover effect manually
styles.button[":hover"] = {
  background: "linear-gradient(135deg, #3a8dde, #00c6fb)",
};
