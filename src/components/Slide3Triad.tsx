import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playSlideWhoosh, resumeAudio } from '../audio/soundEffects';

interface Slide3TriadProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide3Triad: React.FC<Slide3TriadProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isTriadActive = currentState === 's3questions';
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isTriadActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playSlideWhoosh();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isTriadActive]);

  // Subtle cinematic parallax on mouse move
  useEffect(() => {
    if (!isTriadActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      parallaxRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 14;
      parallaxRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 10;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const render = () => {
      const p = parallaxRef.current;
      p.x += (p.tx - p.x) * 0.05;
      p.y += (p.ty - p.y) * 0.05;

      if (mediaWrapRef.current) {
        mediaWrapRef.current.style.transform = `scale(1.02) translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTriadActive]);

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
      className={`cinematic-slide triad-slide ${isTriadActive ? 'active' : ''}`}
      id="triad-slide"
      aria-hidden={!isTriadActive}
      onClick={handleSlideClick}
    >
      {/* Full Background Stage (Unclipped & Crystal Clear 16:9) */}
      <div className="slide-backdrop-wrap triad-backdrop-wrap">
        <div
          ref={mediaWrapRef}
          className="slide-backdrop triad-fullscreen-bg"
          style={{ backgroundImage: `url('/assets/can_allowed_should.jpg')` }}
          role="img"
          aria-label="Can I? Am I Allowed? Should I? - The Ethical Triad"
        />
        <div className="triad-mood-lighting" aria-hidden="true">
          <div className="triad-left-halo" />
          <div className="triad-center-halo" />
          <div className="triad-right-halo" />
        </div>
      </div>

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-triad-back"
          title="Back to The Human Cost (Slide 3)"
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
          <span>The Human Cost</span>
        </button>

        <div className="slide-chapter-tag" id="triad-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#ef4444',
              boxShadow: '0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.75)',
            }}
          />
          <span>CHAPTER 03 / THE ETHICAL TRIAD</span>
        </div>

        <div className="slide-step-indicator" id="triad-step-indicator">
          <span className="step-dot" id="triad-dot-1" />
          <span className="step-dot" id="triad-dot-2" />
          <span className="step-dot active" id="triad-dot-3" />
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="triad-footer-hint">
        <div
          className="hint-badge"
          id="btn-triad-hint"
          role="button"
          tabIndex={0}
          title="Press Space to advance"
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
