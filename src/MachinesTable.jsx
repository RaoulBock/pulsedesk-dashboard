// MachinesTable.jsx
import React from "react";

export default function MachinesTable({ machines, onRemoteControl }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        overflowX: "auto",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#333" }}>Machines</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
            <th style={thStyle}>Hostname</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>IP</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr
              key={machine.id}
              style={{
                borderBottom: "1px solid #eee",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f9f9f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={tdStyle}>{machine.hostname}</td>
              <td
                style={{
                  ...tdStyle,
                  color: machine.status === "online" ? "green" : "red",
                }}
              >
                {machine.status}
              </td>
              <td style={tdStyle}>{machine.ip}</td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => onRemoteControl(machine)}
                >
                  Remote Control
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ddd",
  fontWeight: "600",
  color: "#555",
};

const tdStyle = {
  padding: "12px",
  color: "#444",
};

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  transition: "background 0.2s",
};

buttonStyle[":hover"] = {
  backgroundColor: "#0056b3",
};
