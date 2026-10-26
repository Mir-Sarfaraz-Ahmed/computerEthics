import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playCyberGlitchSound, resumeAudio } from '../audio/soundEffects';

interface Slide12GhostProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide12Ghost: React.FC<Slide12GhostProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isGhostActive = currentState === 's12ghost';
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isGhostActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playCyberGlitchSound();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isGhostActive]);

  // Cinematic 3D parallax on mouse move
  useEffect(() => {
    if (!isGhostActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      parallaxRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 12;
      parallaxRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 8;
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
  }, [isGhostActive]);

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
      className={`cinematic-slide ghost-artwork-slide ${isGhostActive ? 'active' : ''}`}
      id="the-ghost-slide"
      aria-hidden={!isGhostActive}
      onClick={handleSlideClick}
    >
      {/* Saturated Ambient Aura Expanding into Letterbox Space */}
      <div
        className="ghost-ambient-blur-bg"
        style={{ backgroundImage: `url('/assets/the_ghost.jpg')` }}
        aria-hidden="true"
      />

      {/* Cyber Glitch Mood Lighting: Electric Cyan vs Menacing Crimson Red */}
      <div className="ghost-mood-lighting" aria-hidden="true">
        <div className="ghost-cyan-halo" />
        <div className="ghost-crimson-halo" />
        <div className="ghost-scanline-sweep" />
      </div>

      <div className="slide-vignette" aria-hidden="true" />

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-ghost-back"
          title="Back to Metacognitive Intelligence"
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

        <div className="slide-chapter-tag" id="ghost-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#ef4444',
              boxShadow: '0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.85)',
            }}
          />
          <span style={{ letterSpacing: '0.14em' }}>EPILOGUE / THE GHOST</span>
        </div>

        <div className="slide-step-indicator" id="ghost-step-indicator">
          <span className="step-dot" id="ghost-dot-1" />
          <span className="step-dot" id="ghost-dot-2" />
          <span className="step-dot" id="ghost-dot-3" />
          <span
            className="step-dot active"
            id="ghost-dot-4"
            style={{
              background: '#ef4444',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.9), 0 0 16px rgba(56, 189, 248, 0.6)',
            }}
          />
        </div>
      </div>

      {/* Main Theatrical Stage Frame */}
      <div className="finale-stage-frame ghost-stage-frame">
        <div ref={mediaWrapRef} className="finale-stage-media-wrap ghost-stage-media-wrap">
          <img
            src="/assets/the_ghost.jpg"
            alt="The Ghost - Cyber Entity with Red Eyes in Matrix Data Stream"
            className="finale-stage-image ghost-stage-image"
            loading="eager"
            draggable={false}
          />
          {/* Subtle Glitch Edge Sheen Overlay */}
          <div className="ghost-media-sheen" aria-hidden="true" />
        </div>
      </div>

      {/* Floating Glitch Cyber Particles */}
      <div className="ghost-cyber-particles" aria-hidden="true">
        <span className="cyber-glitch-bit bit-1" />
        <span className="cyber-glitch-bit bit-2" />
        <span className="cyber-glitch-bit bit-3" />
        <span className="cyber-glitch-bit bit-4" />
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="ghost-footer-hint">
        <div
          className="hint-badge"
          id="btn-ghost-hint"
          role="button"
          tabIndex={0}
          title="Restart Presentation"
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
