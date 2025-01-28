import React, { useEffect } from "react";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const Meeting = ({ payload }) => {
  useEffect(() => {
    const meetingSDKElement = document.getElementById("meetingSDKElement");

    const client = ZoomMtgEmbedded.createClient();

    async function initializeZoom() {
      try {
        // Initialize the Zoom client
        await client.init({
          zoomAppRoot: meetingSDKElement, // Element where Zoom Meeting will be rendered
          language: "en-US", // Language for the UI
          patchJsMedia: true, // Enables media patching for compatibility
          debug: true, // Enable debugging
        });

        console.log("Zoom client initialized");

        // Generate signature (fetch from server-side ideally)
        const signature = await fetchSignature(payload);
        console.log(`signature`, signature);

        // Join the meeting
        await client.join({
          sdkKey: payload.sdkKey,
          signature: signature,
          meetingNumber: payload.meetingNumber,
          password: payload.passWord,
          userName: payload.userName,
          userEmail: payload.userEmail || "",
        });

        console.log("Successfully joined the meeting");
      } catch (error) {
        console.error("Error initializing or joining the meeting:", error);
      }
    }

    initializeZoom(); // Call the async function
  }, [payload]);

  return (
    <div id="meetingSDKElement" style={{ width: "100%", height: "100vh", backgroundColor:"skyblue" }} />
  );
};

// Example function to fetch the signature (server-side recommended)
async function fetchSignature(payload) {
  const response = await fetch("http://localhost:5050/generate-signature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meetingNumber: payload.meetingNumber,
      role: payload.role,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch signature");
  }

  const { signature } = await response.json();
  return signature;
}


export default Meeting;
