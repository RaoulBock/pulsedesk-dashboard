import React from "react";

export default function MachinesTable({ machines, onRemoteControl }) {
  return (
    <table
      border="1"
      cellPadding="8"
      cellSpacing="0"
      width="100%"
      style={{ borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th>Hostname</th>
          <th>Platform</th>
          <th>CPU Count</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {machines.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              No devices found.
            </td>
          </tr>
        ) : (
          machines.map((device) => (
            <tr key={device.socketId || device.hostname}>
              <td>{device.hostname}</td>
              <td>{device.platform}</td>
              <td>{device.cpuCount}</td>
              <td
                style={{ color: device.status === "online" ? "green" : "red" }}
              >
                {device.status === "online" ? "Online" : "Offline"}
              </td>
              <td>
                <button
                  onClick={() => onRemoteControl(device)}
                  disabled={device.status !== "online"} // Disable if offline
                  style={{
                    cursor:
                      device.status === "online" ? "pointer" : "not-allowed",
                    padding: "6px 10px",
                  }}
                >
                  Remote Control
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
