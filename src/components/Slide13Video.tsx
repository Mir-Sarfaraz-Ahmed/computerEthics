import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import VideoPlayer from '@/components/ui/video-player';
import { playSlideWhoosh, resumeAudio } from '../audio/soundEffects';

interface Slide13VideoProps {
  currentState: PresentationState;
  videoUrl?: string;
  isFullscreen: boolean;
  onToggleFullscreen: (fullscreen: boolean) => void;
  onBack: () => void;
  onForward: () => void;
}

export const Slide13Video: React.FC<Slide13VideoProps> = ({
  currentState,
  videoUrl,
  isFullscreen,
  onToggleFullscreen,
  onBack,
  onForward,
}) => {
  const isVideoActive = currentState === 's13video';
  const hasTriggeredAudio = useRef<boolean>(false);
  const stageContainerRef = useRef<HTMLDivElement>(null);

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

  // Request native browser fullscreen when entering fullscreen mode
  useEffect(() => {
    if (!isVideoActive) return;

    if (isFullscreen) {
      const el = stageContainerRef.current;
      if (el && !document.fullscreenElement) {
        if (el.requestFullscreen) {
          el.requestFullscreen().catch(() => {});
        } else if ((el as any).webkitRequestFullscreen) {
          (el as any).webkitRequestFullscreen();
        }
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [isVideoActive, isFullscreen]);

  // Sync state if user exits via browser native Esc key
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNativeFs = !!document.fullscreenElement;
      if (!isNativeFs && isFullscreen) {
        onToggleFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, onToggleFullscreen]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('.hint-badge') ||
      (e.target as HTMLElement).closest('.slide-nav-next-btn')
    ) {
      return;
    }
    if (!isFullscreen) {
      onToggleFullscreen(true);
    }
    // Note: Do not trigger onForward on arbitrary background click in fullscreen mode
  };

  const handleProceedNext = () => {
    if (isFullscreen) {
      onToggleFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide theatre-video-slide ${isVideoActive ? 'active' : ''} ${
        isFullscreen ? 'cinema-fullscreen-mode' : ''
      }`}
      id="video-screening-slide"
      aria-hidden={!isVideoActive}
      onClick={handleSlideClick}
    >
      {/* Saturated Ambient Aura Lighting Behind Player */}
      {!isFullscreen && <div className="theatre-ambient-glow" aria-hidden="true" />}

      {!isFullscreen && <div className="slide-vignette" aria-hidden="true" />}

      {/* Floating Header Navigation Bar */}
      {!isFullscreen && (
        <div className="slide-floating-nav">
          <button
            className="slide-nav-back"
            id="btn-video-back"
            title="Back to Metacognitive (Slide 12)"
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
            <span>Metacognitive</span>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

            <button
              className="slide-nav-next-btn"
              id="btn-video-next-header"
              title="Proceed to Final Conclusion Slide"
              onClick={(e) => {
                e.stopPropagation();
                handleProceedNext();
              }}
            >
              <span>Conclusion</span>
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Theatrical Video Stage — Expands Edge-to-Edge When Fullscreen */}
      <div
        ref={stageContainerRef}
        className={`theatre-stage-fullscreen ${isFullscreen ? 'cinema-fullscreen' : ''}`}
      >
        {isFullscreen && (
          <div className="cinema-top-controls" style={{ position: 'absolute', top: 24, right: 28, zIndex: 100000, display: 'flex', gap: '12px' }}>
            <button
              className="cinema-fullscreen-exit-btn"
              id="btn-cinema-exit"
              title="Exit Fullscreen (Esc)"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFullscreen(false);
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span>Exit Fullscreen</span>
              <span
                className="kbd-key"
                style={{ fontSize: '0.68rem', padding: '1px 5px', marginLeft: 4 }}
              >
                Esc
              </span>
            </button>

            <button
              className="cinema-fullscreen-next-btn"
              id="btn-cinema-next"
              title="Next: Conclusion Slide"
              onClick={(e) => {
                e.stopPropagation();
                handleProceedNext();
              }}
            >
              <span>Next: Conclusion</span>
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {isFullscreen && (
          <div className="cinema-fullscreen-toast" aria-live="polite">
            ▶ THEATRE SCREENING — ESC TO EXIT FULLSCREEN · CLICK NEXT (→) FOR CONCLUSION
          </div>
        )}

        <div className="theatre-stage-inner">
          {/* Only render VideoPlayer while video slide is active — prevents background audio playback! */}
          {isVideoActive && (
            <VideoPlayer
              key={isVideoActive ? 'video-active' : 'video-inactive'}
              src={activeVideoUrl}
              autoPlay={isFullscreen}
              isFullscreen={isFullscreen}
              isActive={isVideoActive}
              containerClassName="theatre-videoplayer-wrapper"
              className="theatre-videoplayer-element"
            />
          )}
        </div>
      </div>

      {/* Footer Navigation Hint */}
      {!isFullscreen && (
        <div className="slide-footer-hint" id="video-footer-hint" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            className="hint-badge hint-badge-fullscreen"
            id="btn-video-hint"
            role="button"
            tabIndex={0}
            title="Press Space or click to Play Full Screen"
            aria-label="Play in Full Screen"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFullscreen(true);
            }}
          >
            <span className="kbd-key">Space</span>
            <span
              className="hint-label-text"
              style={{ marginLeft: 8, fontSize: '0.78rem', color: '#94a3b8' }}
            >
              Play Full Screen
            </span>
          </div>

          <div
            className="hint-badge hint-badge-next"
            id="btn-video-forward-hint"
            role="button"
            tabIndex={0}
            title="Next Slide: Conclusion"
            aria-label="Next Slide: Conclusion"
            onClick={(e) => {
              e.stopPropagation();
              handleProceedNext();
            }}
            style={{
              background: 'rgba(56, 189, 248, 0.12)',
              borderColor: 'rgba(56, 189, 248, 0.4)',
              cursor: 'pointer',
            }}
          >
            <span
              className="hint-label-text"
              style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}
            >
              Next: Conclusion
            </span>
            <span className="kbd-key" style={{ marginLeft: 8, borderColor: 'rgba(56,189,248,0.4)', color: '#38bdf8' }}>→</span>
          </div>
        </div>
      )}
    </section>
  );
};
