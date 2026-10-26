import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';

interface SlideChoiceProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const SlideChoice: React.FC<SlideChoiceProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isChoiceActive = currentState === 's5choice';
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Subtle cinematic parallax on mouse move
  useEffect(() => {
    if (!isChoiceActive) {
      return;
    }

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
        mediaWrapRef.current.style.transform = `scale(1.04) translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isChoiceActive]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('.hint-badge') ||
      (e.target as HTMLElement).closest('.video-theatre-modal')
    ) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide choice-slide ${isChoiceActive ? 'active' : ''}`}
      id="choice-slide"
      aria-hidden={!isChoiceActive}
      onClick={handleSlideClick}
    >
      {/* Cinematic Full-Bleed Background */}
      <div className="slide-backdrop-wrap choice-backdrop-wrap">
        <div
          ref={mediaWrapRef}
          className="slide-backdrop choice-fullscreen-bg"
          style={{ backgroundImage: `url('/assets/the_choice_bg.jpg')` }}
        />
        {/* Subtle cinematic vignette */}
        <div className="choice-vignette" aria-hidden="true" />
      </div>

      {/* Floating Glass Header Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-choice-back"
          title="Back to Slide 4 (Definition)"
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
          <span>Slide 04</span>
        </button>

        <div className="slide-chapter-tag" id="choice-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.5)',
            }}
          ></span>
          <span>CHAPTER 05 / THE CHOICE</span>
        </div>
      </div>

      {/* Main Center Content: Just the text "The Choice" */}
      <div className="choice-content-wrap">
        <h1 className="choice-hero-title">
          <span className="choice-word-the">The</span>{' '}
          <span className="choice-word-choice">Choice</span>
        </h1>
        <div className="choice-accent-line" aria-hidden="true"></div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="choice-footer-hint">
        <div
          className="hint-badge"
          id="btn-choice-hint"
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
