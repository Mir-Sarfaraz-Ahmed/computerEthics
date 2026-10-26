import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';

interface Slide2DilemmaProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide2Dilemma: React.FC<Slide2DilemmaProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isS2 = currentState === 's2scene1' || currentState === 's2scene2' || currentState === 's2scene3';
  const isScene2Or3 = currentState === 's2scene2' || currentState === 's2scene3';
  const isScene3 = currentState === 's2scene3';

  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const bgBlankRef = useRef<HTMLDivElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const bgBothRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isS2) return;

    const handleMouseMove = (e: MouseEvent) => {
      parallaxRef.current.tx = (e.clientX / window.innerWidth - 0.5) * -18;
      parallaxRef.current.ty = (e.clientY / window.innerHeight - 0.5) * -12;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const renderParallax = () => {
      const p = parallaxRef.current;
      p.x += (p.tx - p.x) * 0.06;
      p.y += (p.ty - p.y) * 0.06;

      const transformStr = `scale(1.04) translate3d(${p.x * 0.8}px, ${p.y * 0.8}px, 0)`;
      if (bgBlankRef.current && bgBlankRef.current.classList.contains('active')) {
        bgBlankRef.current.style.transform = transformStr;
      }
      if (bgLeftRef.current && bgLeftRef.current.classList.contains('active')) {
        bgLeftRef.current.style.transform = transformStr;
      }
      if (bgBothRef.current && bgBothRef.current.classList.contains('active')) {
        bgBothRef.current.style.transform = transformStr;
      }

      animId = requestAnimationFrame(renderParallax);
    };

    animId = requestAnimationFrame(renderParallax);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isS2]);

  let actionText = 'Scene 1: Blank Screen -- press Space / Right Arrow to power on';
  let activeDotIndex = 0;
  if (currentState === 's2scene2') {
    actionText = 'Scene 2: Official Store (₹1,999) -- press Space / Right Arrow';
    activeDotIndex = 1;
  } else if (currentState === 's2scene3') {
    actionText = 'Scene 3: The Crossroads -- press Space / Right Arrow for Choice';
    activeDotIndex = 2;
  }

  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('#btn-slide2-hint')) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide dilemma-slide ${isS2 ? 'active' : ''}`}
      id="dilemma-slide"
      aria-hidden={!isS2}
      onClick={handleSlideClick}
    >
      <div className="slide-backdrop-wrap">
        <div
          ref={bgBlankRef}
          className={`slide-backdrop dilemma-backdrop ${isS2 ? 'active' : ''}`}
          id="slide2-bg-blank"
          style={{ backgroundImage: `url('/assets/scene1_blank.png')` }}
        />
        <div
          ref={bgLeftRef}
          className={`slide-backdrop dilemma-backdrop ${isScene2Or3 ? 'active' : ''}`}
          id="slide2-bg-left"
          style={{ backgroundImage: `url('/assets/scene2_left.png')` }}
        />
        <div
          ref={bgBothRef}
          className={`slide-backdrop dilemma-backdrop ${isScene3 ? 'active' : ''}`}
          id="slide2-bg-both"
          style={{ backgroundImage: `url('/assets/scene3_both.jpg')` }}
        />
        <div className="slide2-lamp-glow" aria-hidden="true"></div>
        <div className={`slide2-screen-glow ${isScene2Or3 ? 'active' : ''}`} id="slide2-screen-glow" aria-hidden="true"></div>
        <div className="slide-vignette" aria-hidden="true"></div>
      </div>

      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-slide2-back"
          title="Back to Slide 1"
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
          <span>Slide 01</span>
        </button>

        <div className="slide-chapter-tag">
          <span className="slide-tag-dot orange-dot"></span>
          <span>CHAPTER 02 / THE DILEMMA</span>
        </div>

        <div className="slide-step-indicator" id="slide2-step-indicator">
          <span className={`step-dot ${activeDotIndex === 0 ? 'active' : ''}`} id="slide2-dot-1"></span>
          <span className={`step-dot ${activeDotIndex === 1 ? 'active' : ''}`} id="slide2-dot-2"></span>
          <span className={`step-dot ${activeDotIndex === 2 ? 'active' : ''}`} id="slide2-dot-3"></span>
        </div>
      </div>

      <div className="slide-footer-hint" id="slide2-footer-hint">
        <div
          className="hint-badge"
          id="btn-slide2-hint"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
          <span className="hint-text" id="slide2-action-text">
            {actionText}
          </span>
          <span className="hint-arrow">→</span>
        </div>
      </div>
    </section>
  );
};
