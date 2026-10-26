import React from 'react';

interface PaperPlaneOverlayProps {
  isActive: boolean;
}

export const PaperPlaneOverlay: React.FC<PaperPlaneOverlayProps> = ({ isActive }) => {
  return (
    <div
      id="paper-plane-overlay"
      className={`paper-plane-overlay ${isActive ? 'active' : ''}`}
      aria-hidden={!isActive}
    >
      {/* Sky backdrop */}
      <div className="pp-sky"></div>

      {/* Atmospheric ambient drifting clouds */}
      <div className="pp-cloud pp-cloud-1"></div>
      <div className="pp-cloud pp-cloud-2"></div>
      <div className="pp-cloud pp-cloud-3"></div>
      <div className="pp-cloud pp-cloud-4"></div>
      <div className="pp-cloud pp-cloud-5"></div>
      <div className="pp-cloud pp-cloud-6"></div>

      {/* High-speed wind streaks pointing toward top-left */}
      <div className="pp-wind-streak streak-1"></div>
      <div className="pp-wind-streak streak-2"></div>
      <div className="pp-wind-streak streak-3"></div>

      {/* Flight convoy: Plane + Clouds travelling together toward top-left */}
      <div className="pp-flight-convoy" id="pp-flight-convoy">
        {/* Fluffy clouds billowing right with the plane */}
        <div className="pp-escort-cloud escort-cloud-main"></div>
        <div className="pp-escort-cloud escort-cloud-puff1"></div>
        <div className="pp-escort-cloud escort-cloud-puff2"></div>
        <div className="pp-escort-cloud escort-cloud-wake"></div>

        <div className="pp-plane-wrapper" id="pp-plane-wrapper">
          <svg
            id="paper-plane-svg"
            className="paper-plane-svg"
            viewBox="0 0 120 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="0,40 120,0 85,40 120,80"
              fill="rgba(255,255,255,0.98)"
              stroke="rgba(200,225,255,0.85)"
              strokeWidth="1.2"
            />
            <polygon
              points="85,40 120,80 60,55"
              fill="rgba(190,215,255,0.65)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.6"
            />
            <line
              x1="0"
              y1="40"
              x2="85"
              y2="40"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
