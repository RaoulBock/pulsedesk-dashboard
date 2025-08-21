// MachinesTable.jsx
import React, { useState } from "react";

export default function MachinesTable({ machines, onRemoteControl }) {
  const [search, setSearch] = useState("");

  // filter machines by hostname or status
  const filteredMachines = machines.filter(
    (machine) =>
      machine.hostname.toLowerCase().includes(search.toLowerCase()) ||
      machine.status.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by hostname or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "8px 12px",
       
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />

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
            <th style={thStyle}>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {filteredMachines.length > 0 ? (
            filteredMachines.map((machine) => (
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
                <td style={tdStyle}>{machine.lastSeen}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ ...tdStyle, textAlign: "center" }}>
                No machines found
              </td>
            </tr>
          )}
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
