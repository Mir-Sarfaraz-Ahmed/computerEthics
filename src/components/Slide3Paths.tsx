import React from 'react';
import { PresentationState } from '../types/presentation';

interface Slide3PathsProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
  onSelectState?: (state: PresentationState) => void;
}

export const Slide3Paths: React.FC<Slide3PathsProps> = ({
  currentState,
  onBack,
  onForward,
  onSelectState,
}) => {
  const isS3 = currentState === 's3intro';

  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide paths-slide ${isS3 ? 'active' : ''}`}
      id="paths-slide"
      aria-hidden={!isS3}
      onClick={handleSlideClick}
    >
      {/* Full-bleed split screen background image */}
      <div
        className="paths-fullscreen-bg"
        style={{ backgroundImage: `url('/assets/paths_split_screen.jpg')` }}
        aria-hidden="true"
      />
      <div className="slide-vignette" aria-hidden="true"></div>

      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-slide3-back"
          title="Back to Slide 2"
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Slide 02</span>
        </button>

        <div className="slide-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }}
          ></span>
          <span>CHAPTER 03 / THE CHOICE</span>
        </div>

        <div className="slide-step-indicator" id="slide3-step-indicator">
          <span className="step-dot active" id="slide3-dot-1"></span>
        </div>
      </div>

      <div className="slide-footer-hint" id="slide3-footer-hint">
        <div
          className="hint-badge"
          id="btn-slide3-hint"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
          <span className="hint-text" id="slide3-action-text">
            Two paths. One choice — press Space for Chapter 04
          </span>
          <span className="hint-arrow">→</span>
        </div>
      </div>
    </section>
  );
};
