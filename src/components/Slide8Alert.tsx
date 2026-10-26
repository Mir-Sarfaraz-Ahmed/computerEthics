import React, { useState, useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { startNuclearSiren, stopNuclearSiren, resumeAudio } from '../audio/soundEffects';

interface Slide8AlertProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide8Alert: React.FC<Slide8AlertProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isAlertActive = currentState === 's8alert';
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAlertActive) {
      stopNuclearSiren();
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
      setIsEnglish(false);
      return;
    }

    // When slide becomes active: resume audio and start emergency siren
    resumeAudio();
    startNuclearSiren();
    setIsEnglish(false);

    // After 2.6 seconds of intense alarm, smoothly transition to English "MISSILE ATTACK"
    transitionTimerRef.current = window.setTimeout(() => {
      setIsEnglish(true);
    }, 2600);

    return () => {
      stopNuclearSiren();
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, [isAlertActive]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('.hint-badge')
    ) {
      return;
    }

    // If still in Russian alert, click triggers immediate transition to English
    if (!isEnglish) {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
      setIsEnglish(true);
    } else {
      onForward();
    }
  };

  return (
    <section
      className={`cinematic-slide alert-slide ${isAlertActive ? 'active' : ''}`}
      id="alert-slide"
      aria-hidden={!isAlertActive}
      onClick={handleSlideClick}
    >
      {/* Black Screen with Emergency Siren Pulse Ambiance */}
      <div className="alert-backdrop-wrap" aria-hidden="true">
        <div className="alert-siren-pulse" />
      </div>

      {/* Floating Header Bar - Cleanly docked at the top */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-alert-back"
          title="Back to Slide 7 (World War 3)"
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
          <span>Slide 07</span>
        </button>

        <div className="slide-chapter-tag" id="alert-chapter-tag">
          <span
            className="slide-tag-dot alert-blinking-dot"
            style={{
              background: '#ef4444',
              boxShadow: '0 0 12px #ef4444, 0 0 24px rgba(239, 68, 68, 0.9)',
            }}
          ></span>
          <span>CHAPTER 08 / THE ALERT</span>
        </div>
      </div>

      {/* Main Center Content: Red Warning Sign & Smooth Transition */}
      <div className="alert-content-wrap">
        {/* Red Warning Sign */}
        <div className="alert-sign-container" aria-hidden="true">
          <svg
            className="alert-warning-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Message Container with Smooth Crossfade Transition */}
        <div className="alert-message-viewport">
          {/* Russian: РАКЕТНЫЙ УДАР */}
          <h1
            className={`alert-hero-title alert-text-russian ${
              isEnglish ? 'fade-out' : 'fade-in'
            }`}
          >
            РАКЕТНЫЙ УДАР
          </h1>

          {/* English: MISSILE ATTACK */}
          <h1
            className={`alert-hero-title alert-text-english ${
              isEnglish ? 'fade-in' : 'fade-out'
            }`}
          >
            MISSILE ATTACK
          </h1>
        </div>

        {/* Tactical Sub-indicator */}
        <div className="alert-meta-pill" aria-hidden="true">
          <span className="alert-meta-tag">
            {isEnglish ? 'CRITICAL SYSTEM WARNING' : 'ТРЕВОГА ВЫСШЕЙ КАТЕГОРИИ'}
          </span>
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="alert-footer-hint">
        <div
          className="hint-badge"
          id="btn-alert-hint"
          role="button"
          tabIndex={0}
          title="Press Space"
          aria-label="Advance"
          onClick={(e) => {
            e.stopPropagation();
            if (!isEnglish) {
              if (transitionTimerRef.current) {
                window.clearTimeout(transitionTimerRef.current);
                transitionTimerRef.current = null;
              }
              setIsEnglish(true);
            } else {
              onForward();
            }
          }}
        >
          <span className="kbd-key">Space</span>
        </div>
      </div>
    </section>
  );
};
