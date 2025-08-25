import React, { useState } from "react";

export default function MachinesTable({ machines, onRemoteControl }) {
  const [search, setSearch] = useState("");

  // Filter machines by hostname
  const filteredMachines = machines.filter((machine) =>
    machine.hostname.toLowerCase().includes(search.toLowerCase())
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
      {/* Header with search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ color: "#333", margin: 0 }}>Machines</h3>
        <input
          type="text"
          placeholder="🔍 Search by hostname..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "14px",
            width: "200px",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        />
      </div>

      {/* Table */}
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
              <td
                colSpan="3"
                style={{ padding: "15px", textAlign: "center", color: "#888" }}
              >
                😕 No machines found
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
