import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playChimeWarning, playSlideWhoosh, resumeAudio } from '../audio/soundEffects';

interface Slide3CostProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide3Cost: React.FC<Slide3CostProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isCostActive = currentState === 's3cost';
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isCostActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playChimeWarning();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isCostActive]);

  // Cinematic 3D parallax on mouse move
  useEffect(() => {
    if (!isCostActive) return;

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
        mediaWrapRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isCostActive]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.hint-badge')) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide cost-slide ${isCostActive ? 'active' : ''}`}
      id="cost-slide"
      aria-hidden={!isCostActive}
      onClick={handleSlideClick}
    >
      {/* Full Background Stage (No Box, No Blur, Unclipped & Crystal Clear) */}
      <div className="slide-backdrop-wrap cost-backdrop-wrap">
        <div
          ref={mediaWrapRef}
          className="slide-backdrop cost-fullscreen-bg"
          style={{ backgroundImage: `url('/assets/free_at_what_cost.jpg')` }}
          role="img"
          aria-label="Free For You. But At What Cost?"
        />
        <div className="cost-mood-lighting" aria-hidden="true">
          <div className="cost-blue-halo" />
          <div className="cost-red-halo" />
          <div className="cost-free-spotlight" />
        </div>
        <div className="slide-vignette" aria-hidden="true" />
      </div>

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-cost-back"
          title="Back to Two Paths"
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
          <span>Two Paths</span>
        </button>

        <div className="slide-chapter-tag" id="cost-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#ef4444',
              boxShadow: '0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.65)',
            }}
          />
          <span>CHAPTER 03 / THE HUMAN COST</span>
        </div>

        <div className="slide-step-indicator" id="cost-step-indicator">
          <span className="step-dot" id="cost-dot-1" />
          <span className="step-dot active" id="cost-dot-2" />
          <span className="step-dot" id="cost-dot-3" />
          <span className="step-dot" id="cost-dot-4" />
        </div>
      </div>


      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="cost-footer-hint">
        <div
          className="hint-badge"
          id="btn-cost-hint"
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
