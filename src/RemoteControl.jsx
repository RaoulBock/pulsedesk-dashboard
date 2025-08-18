// RemoteControl.jsx
import React, { useEffect } from "react";

export default function RemoteControl({ machine, onClose }) {
  useEffect(() => {
    console.log("Start WebRTC session with:", machine);
    // Initialize WebRTC session here
  }, [machine]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Remote Control - {machine.hostname}</h2>
      <p>IP: {machine.ip}</p>
      <button
        onClick={onClose}
        style={{
          marginTop: 20,
          padding: "8px 12px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Close Remote Session
      </button>

      {/* TODO: WebRTC Video Stream + Controls */}
      <div style={{ marginTop: 20, border: "1px solid #ccc", height: 400 }}>
        <p style={{ textAlign: "center", marginTop: 180 }}>
          Remote screen goes here
        </p>
      </div>
    </div>
  );
}
