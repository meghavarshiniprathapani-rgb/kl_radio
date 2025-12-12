'use client';

export function AudioWave() {
  return (
    <>
    <style>{`
      .audio-wave-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        gap: 4px;
      }
      .audio-wave-bar {
        width: 4px;
        background-color: hsla(var(--primary-foreground) / 0.7);
        border-radius: 2px;
        animation: wave 1.2s infinite ease-in-out;
      }
      .audio-wave-bar:nth-child(1) { animation-delay: 0.1s; }
      .audio-wave-bar:nth-child(2) { animation-delay: 0.2s; }
      .audio-wave-bar:nth-child(3) { animation-delay: 0.3s; }
      .audio-wave-bar:nth-child(4) { animation-delay: 0.4s; }
      .audio-wave-bar:nth-child(5) { animation-delay: 0.5s; }

      @keyframes wave {
        0%, 40%, 100% { height: 8px; }
        20% { height: 32px; }
      }
    `}</style>
    <div className="audio-wave-container">
      <div className="audio-wave-bar"></div>
      <div className="audio-wave-bar"></div>
      <div className="audio-wave-bar"></div>
      <div className="audio-wave-bar"></div>
      <div className="audio-wave-bar"></div>
    </div>
    </>
  );
}
