export const SIGNALING_URL =
  "wss://webrtc-signaling-backend.onrender.com/ws"

export const LIVE_STREAM_ROOM_ID = "radio-live-room"

export const WEBRTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject"
    }
  ],
  iceTransportPolicy: "all"
}
