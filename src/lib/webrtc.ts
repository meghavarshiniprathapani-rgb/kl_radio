export const SIGNALING_URL = "wss://webrtc-signaling-eupy.onrender.com/ws";
export const LIVE_STREAM_ROOM_ID = "radio-live-room";

export const WEBRTC_CONFIG: RTCConfiguration = {
  iceServers: [
    // STUN (discovery)
    {
      urls: "stun:stun.l.google.com:19302"
    },

    // TURN UDP (good for WiFi)
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject"
    },

    // TURN TCP (critical for mobile data)
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject"
    },

    // TURN TLS (best success rate on phones)
    {
      urls: "turns:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject"
    }
  ],
  iceTransportPolicy: "all"
};
