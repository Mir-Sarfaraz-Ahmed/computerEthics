import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playHeroRevealChord, resumeAudio } from '../audio/soundEffects';

interface Slide10PetrovProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide10Petrov: React.FC<Slide10PetrovProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isPetrovActive = currentState === 's10petrov';
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isPetrovActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playHeroRevealChord();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isPetrovActive]);

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
      className={`cinematic-slide petrov-slide ${isPetrovActive ? 'active' : ''}`}
      id="petrov-slide"
      aria-hidden={!isPetrovActive}
      onClick={handleSlideClick}
    >
      {/* Cold War Tactical Backdrop & Ambient Lights */}
      <div className="petrov-atmosphere" aria-hidden="true">
        <div className="petrov-ambient-halo" />
        <div className="petrov-ambient-blue" />
        <div className="petrov-scanlines" />
        <div className="petrov-radar-grid" />
      </div>

      {/* Floating Header Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-petrov-back"
          title="Back to Slide 09 (5 Missiles)"
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
          <span>Slide 09</span>
        </button>

        <div className="slide-chapter-tag" id="petrov-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#eab308',
              boxShadow: '0 0 10px #eab308, 0 0 20px rgba(234, 179, 8, 0.8)',
            }}
          />
          <span>CHAPTER 10 / THE HUMAN ELEMENT</span>
        </div>
      </div>

      {/* Centered Hero Stage: Petrov Blended With Background */}
      <div className="petrov-center-stage">
        {/* Eyebrow Tag */}
        <div className="petrov-eyebrow-badge">
          <span className="petrov-live-dot" />
          <span>SOVIET AIR DEFENCE FORCES · LIEUTENANT COLONEL</span>
        </div>

        {/* Animated Hero Name */}
        <div className="petrov-name-lockup centered" aria-label="Stanislav Yevgrafovich Petrov">
          <h1 className="petrov-hero-title">
            <span className="petrov-title-word word-first">STANISLAV</span>{' '}
            <span className="petrov-title-word word-middle">YEVGRAFOVICH</span>{' '}
            <span className="petrov-title-word word-last petrov-highlight">PETROV</span>
          </h1>
        </div>

        {/* Blended Portrait Centerpiece */}
        <div className="petrov-portrait-stage centered">
          <div className="petrov-portrait-backlight" aria-hidden="true" />
          <div className="petrov-portrait-rings" aria-hidden="true" />
          <div className="petrov-img-blend-wrap">
            <img
              src="/assets/petrov.png"
              alt="Stanislav Yevgrafovich Petrov"
              className="petrov-portrait-img blended"
              loading="eager"
            />
          </div>
          {/* Rank & Duty Pill */}
          <div className="petrov-portrait-tag">
            <span className="portrait-tag-icon">★</span>
            <span>SERPUKHOV-15 · DUTY OFFICER</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="petrov-footer-hint">
        <div
          className="hint-badge"
          id="btn-petrov-hint"
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
