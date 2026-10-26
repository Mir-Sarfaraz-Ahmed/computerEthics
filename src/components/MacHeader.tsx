import React from 'react';

interface MacHeaderProps {
  isSoundOn: boolean;
  onToggleSound: () => void;
  onShowToast: (msg: string) => void;
}

export const MacHeader: React.FC<MacHeaderProps> = ({
  isSoundOn,
  onToggleSound,
  onShowToast,
}) => {
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleClose = () => {
    onShowToast('Keynote in Presentation Mode');
  };

  const handleMinimize = () => {
    onShowToast('Presentation Active');
  };

  return (
    <header className="mac-header">
      <div className="mac-window-controls">
        <button
          className="win-btn win-close"
          id="btn-close"
          title="Close"
          aria-label="Close window"
          onClick={handleClose}
        >
          <span className="btn-icon">×</span>
        </button>
        <button
          className="win-btn win-min"
          id="btn-minimize"
          title="Minimize"
          aria-label="Minimize window"
          onClick={handleMinimize}
        >
          <span className="btn-icon">−</span>
        </button>
        <button
          className="win-btn win-max"
          id="btn-fullscreen"
          title="Toggle Fullscreen"
          aria-label="Toggle fullscreen"
          onClick={handleFullscreen}
        >
          <span className="btn-icon">+</span>
        </button>
      </div>

      <div className="mac-header-title">
        <span className="header-badge-dot"></span>
        <span className="header-project-name">ETHICS &amp; FUTURE SYSTEMS</span>
        <span className="header-divider">/</span>
        <span className="header-chapter">KEYNOTE 2026</span>
      </div>

      <div className="mac-header-actions">
        <button
          className="action-icon-btn"
          id="btn-audio"
          title={isSoundOn ? 'Sound On (Click to mute)' : 'Sound Muted (Click to unmute)'}
          aria-label={isSoundOn ? 'Mute sound' : 'Unmute sound'}
          onClick={onToggleSound}
          style={{ opacity: isSoundOn ? 1 : 0.65 }}
        >
          {isSoundOn ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};
