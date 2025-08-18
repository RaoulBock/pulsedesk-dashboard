// admin-dashboard/src/AdminDashboardRemote.jsx
import React, { useRef, useState } from "react";

export default function AdminDashboardRemote() {
  const [isRemoteStarted, setIsRemoteStarted] = useState(false);
  const videoRef = useRef(null);
  const peerConnection = useRef(null);

  // const startRemoteControl = async () => {
  //   setIsRemoteStarted(true);

  //   // Connect via socket.io to signaling server
  //   const socket = io("http://localhost:5173");

  //   peerConnection.current = new RTCPeerConnection();

  //   // Handle incoming stream
  //   peerConnection.current.ontrack = (event) => {
  //     videoRef.current.srcObject = event.streams[0];
  //   };

  //   // Listen for answer from remote client
  //   socket.on("webrtc-answer", async (answer) => {
  //     await peerConnection.current.setRemoteDescription(answer);
  //   });

  //   // Create offer
  //   const offer = await peerConnection.current.createOffer();
  //   await peerConnection.current.setLocalDescription(offer);

  //   // Send offer to client
  //   socket.emit("webrtc-offer", offer);
  // };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={startRemoteControl} style={{ padding: "8px 12px" }}>
        Remote Control
      </button>

      {isRemoteStarted && (
        <div style={{ marginTop: 20 }}>
          <h3>Remote Screen</h3>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
}
