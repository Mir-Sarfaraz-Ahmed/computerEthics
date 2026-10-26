import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playSlideWhoosh, resumeAudio } from '../audio/soundEffects';

interface Slide11StoryProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide11Story: React.FC<Slide11StoryProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isStoryActive = currentState === 's11story';
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isStoryActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playSlideWhoosh();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isStoryActive]);

  // Cinematic 3D parallax on mouse move
  useEffect(() => {
    if (!isStoryActive) return;

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
  }, [isStoryActive]);

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
      className={`cinematic-slide finale-artwork-slide ${isStoryActive ? 'active' : ''}`}
      id="petrov-story-slide"
      aria-hidden={!isStoryActive}
      onClick={handleSlideClick}
    >
      {/* Saturated Ambient Aura Expanding into Letterbox Space */}
      <div
        className="finale-ambient-blur-bg"
        style={{ backgroundImage: `url('/assets/man_who_saved_the_world.jpg')` }}
        aria-hidden="true"
      />

      {/* Dynamic Mood Lighting: Tactical Crimson (Alert) vs Warm Amber/Gold (Petrov) */}
      <div className="finale-mood-lighting" aria-hidden="true">
        <div className="finale-red-halo" />
        <div className="finale-gold-halo" />
      </div>

      <div className="slide-vignette" aria-hidden="true" />

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-story-back"
          title="Back to Stanislav Petrov (Slide 10)"
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
          <span>Petrov</span>
        </button>

        <div className="slide-chapter-tag" id="story-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#f59e0b',
              boxShadow: '0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.75)',
            }}
          />
          <span>CASE STUDY / CLIMAX</span>
        </div>

        <div className="slide-step-indicator" id="story-step-indicator">
          <span className="step-dot" id="story-dot-1" />
          <span className="step-dot" id="story-dot-2" />
          <span
            className="step-dot active"
            id="story-dot-3"
            style={{
              background: '#f59e0b',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Main Theatrical Stage Frame */}
      <div className="finale-stage-frame">
        <div ref={mediaWrapRef} className="finale-stage-media-wrap">
          <img
            src="/assets/man_who_saved_the_world.jpg"
            alt="The Man Who Saved The World - September 26, 1983. Serpukhov-15 Command Bunker. The Alert, The Protocol, The Decision."
            className="finale-stage-image"
            loading="eager"
            draggable={false}
          />
          {/* Subtle Glass Edge Glow Overlay */}
          <div className="finale-media-sheen" aria-hidden="true" />
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="story-footer-hint">
        <div
          className="hint-badge"
          id="btn-story-hint"
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
