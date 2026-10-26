import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playCinematicBoom, resumeAudio } from '../audio/soundEffects';

interface Slide7WW3Props {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide7WW3: React.FC<Slide7WW3Props> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isWW3Active = currentState === 's7ww3';
  const containerRef = useRef<HTMLDivElement>(null);

  // Play ominous cinematic boom when slide becomes active
  useEffect(() => {
    if (isWW3Active) {
      resumeAudio();
      playCinematicBoom();
    }
  }, [isWW3Active]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('.hint-badge')
    ) {
      return;
    }
    onForward();
  };

  return (
    <section
      ref={containerRef}
      className={`cinematic-slide ww3-slide ${isWW3Active ? 'active' : ''}`}
      id="ww3-slide"
      aria-hidden={!isWW3Active}
      onClick={handleSlideClick}
    >
      {/* Ominous Atmospheric Backdrop */}
      <div className="ww3-backdrop-wrap" aria-hidden="true">
        <div className="ww3-radial-threat" />
        <div className="ww3-vignette" />
      </div>

      {/* Floating Glass Header Bar - Cleanly docked at the top */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-ww3-back"
          title="Back to Slide 6 (26 September 1983)"
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
          <span>Slide 06</span>
        </button>

        <div className="slide-chapter-tag" id="ww3-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#f43f5e',
              boxShadow: '0 0 10px #f43f5e, 0 0 20px rgba(244, 63, 94, 0.75)',
            }}
          ></span>
          <span>CHAPTER 07 / THE THREAT</span>
        </div>
      </div>

      {/* Main Center Content: WORLD WAR 3 */}
      <div className="ww3-content-wrap">
        <div className="ww3-hero-container">
          <h1 className="ww3-hero-title">
            <span className="ww3-word-world">WORLD</span>{' '}
            <span className="ww3-word-war">WAR</span>{' '}
            <span className="ww3-word-num">3</span>
          </h1>
          <div className="ww3-alert-line" aria-hidden="true" />
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="ww3-footer-hint">
        <div
          className="hint-badge"
          id="btn-ww3-hint"
          role="button"
          tabIndex={0}
          title="Press Space"
          aria-label="Advance"
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
        </div>
      </div>
    </section>
  );
};
