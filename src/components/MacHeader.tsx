import React from 'react';
import { ThemeMode } from '../types/presentation';

interface MacHeaderProps {
  currentTheme: ThemeMode;
  isSoundOn: boolean;
  onReplayHello: () => void;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onShowToast: (msg: string) => void;
}

export const MacHeader: React.FC<MacHeaderProps> = ({
  currentTheme,
  isSoundOn,
  onReplayHello,
  onToggleTheme,
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
          className="action-pill-btn"
          id="btn-replay-hello"
          title="Replay Sarfaraz Intro"
          onClick={onReplayHello}
        >
          <span>Replay Intro</span>
        </button>

        <button
          className="action-pill-btn"
          id="btn-theme"
          title="Toggle Theme"
          onClick={onToggleTheme}
        >
          <span id="theme-icon">{currentTheme === 'dark' ? '☀' : '☾'}</span>
          <span id="theme-label">{currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <button
          className="action-pill-btn"
          id="btn-audio"
          title="Toggle Sound"
          onClick={onToggleSound}
          style={{ opacity: isSoundOn ? 1 : 0.6 }}
        >
          <span id="audio-label">{isSoundOn ? 'Sound On' : 'Sound Off'}</span>
        </button>
      </div>
    </header>
  );
};
