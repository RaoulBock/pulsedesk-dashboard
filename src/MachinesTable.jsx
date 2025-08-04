import React from "react";

export default function MachinesTable({ machines }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#333", color: "white" }}>
          <th style={{ padding: 10, border: "1px solid #ddd" }}>Hostname</th>
          <th style={{ padding: 10, border: "1px solid #ddd" }}>
            Private IP(s)
          </th>
          <th style={{ padding: 10, border: "1px solid #ddd" }}>Public IP</th>
          <th style={{ padding: 10, border: "1px solid #ddd" }}>Platform</th>
          <th style={{ padding: 10, border: "1px solid #ddd" }}>
            Online Status
          </th>
          <th style={{ padding: 10, border: "1px solid #ddd" }}>Last Seen</th>
        </tr>
      </thead>
      <tbody>
        {machines.length === 0 && (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
              No devices found
            </td>
          </tr>
        )}
        {machines.map((machine) => (
          <tr key={machine.hostname} style={{ borderBottom: "1px solid #ccc" }}>
            <td style={{ padding: 10, border: "1px solid #ddd" }}>
              {machine.hostname}
            </td>
            <td style={{ padding: 10, border: "1px solid #ddd" }}>
              {machine.privateIPs?.join(", ") || "N/A"}
            </td>
            <td style={{ padding: 10, border: "1px solid #ddd" }}>
              {machine.publicIP || "N/A"}
            </td>
            <td style={{ padding: 10, border: "1px solid #ddd" }}>
              {machine.platform || "N/A"}
            </td>
            <td
              style={{
                padding: 10,
                border: "1px solid #ddd",
                color: machine.online ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {machine.online ? "Online" : "Offline"}
            </td>
            <td style={{ padding: 10, border: "1px solid #ddd" }}>
              {machine.lastSeenFormatted || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
