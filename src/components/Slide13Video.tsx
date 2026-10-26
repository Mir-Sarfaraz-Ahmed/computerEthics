import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import VideoPlayer from '@/components/ui/video-player';
import { playSlideWhoosh, resumeAudio } from '../audio/soundEffects';

interface Slide13VideoProps {
  currentState: PresentationState;
  videoUrl?: string;
  onBack: () => void;
  onForward: () => void;
}

export const Slide13Video: React.FC<Slide13VideoProps> = ({
  currentState,
  videoUrl,
  onBack,
  onForward,
}) => {
  const isVideoActive = currentState === 's13video';
  const hasTriggeredAudio = useRef<boolean>(false);

  const activeVideoUrl =
    videoUrl && videoUrl.trim().length > 0
      ? videoUrl.trim()
      : 'https://youtu.be/JzBaVohSC5s';

  useEffect(() => {
    if (isVideoActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playSlideWhoosh();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isVideoActive]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('.hint-badge') ||
      (e.target as HTMLElement).closest('.theatre-videoplayer-wrapper')
    ) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide theatre-video-slide ${isVideoActive ? 'active' : ''}`}
      id="video-screening-slide"
      aria-hidden={!isVideoActive}
      onClick={handleSlideClick}
    >
      {/* Saturated Ambient Aura Lighting Behind Player */}
      <div className="theatre-ambient-glow" aria-hidden="true" />

      <div className="slide-vignette" aria-hidden="true" />

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-video-back"
          title="Back to The Ghost (Slide 12)"
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
          <span>The Ghost</span>
        </button>

        <div className="slide-chapter-tag" id="video-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.85)',
            }}
          />
          <span style={{ letterSpacing: '0.14em' }}>SCREENING / VIDEO CASE STUDY</span>
        </div>

        <div className="slide-step-indicator" id="video-step-indicator">
          <span className="step-dot" id="video-dot-1" />
          <span className="step-dot" id="video-dot-2" />
          <span className="step-dot" id="video-dot-3" />
          <span className="step-dot" id="video-dot-4" />
          <span
            className="step-dot active"
            id="video-dot-5"
            style={{
              background: '#38bdf8',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.9)',
            }}
          />
        </div>
      </div>

      {/* Full-Screen Covering Theatrical Video Stage */}
      <div className="theatre-stage-fullscreen">
        <div className="theatre-stage-inner">
          <VideoPlayer
            src={activeVideoUrl}
            containerClassName="theatre-videoplayer-wrapper"
            className="theatre-videoplayer-element"
          />
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="video-footer-hint">
        <div
          className="hint-badge"
          id="btn-video-hint"
          role="button"
          tabIndex={0}
          title="Restart / Cover"
          aria-label="Restart"
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
