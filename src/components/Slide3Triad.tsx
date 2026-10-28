import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playSlideWhoosh, playQuestionRevealChord, resumeAudio } from '../audio/soundEffects';

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
  const isTriadActive =
    currentState === 's3triad1' ||
    currentState === 's3triad2' ||
    currentState === 's3triad3' ||
    currentState === 's3questions';

  const currentStep: 1 | 2 | 3 =
    currentState === 's3triad2'
      ? 2
      : currentState === 's3triad3'
      ? 3
      : 1;

  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const prevStepRef = useRef<number>(0);

  useEffect(() => {
    if (isTriadActive) {
      resumeAudio();
      if (prevStepRef.current !== currentStep) {
        if (currentStep === 1) {
          playSlideWhoosh();
        } else {
          playQuestionRevealChord();
        }
        prevStepRef.current = currentStep;
      }
    } else {
      prevStepRef.current = 0;
    }
  }, [isTriadActive, currentStep]);

  // Subtle cinematic parallax on mouse move
  useEffect(() => {
    if (!isTriadActive) return;

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
        mediaWrapRef.current.style.transform = `translate(-50%, -50%) translate3d(${p.x}px, ${p.y}px, 0)`;
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

  const stepSubtitles = {
    1: '01: CAN I?',
    2: '02: AM I ALLOWED?',
    3: '03: SHOULD I?',
  };

  const backLabels = {
    1: 'Digital Conscience',
    2: '01: Can I?',
    3: '02: Am I Allowed?',
  };

  const tagColors = {
    1: '#94a3b8',
    2: '#38bdf8',
    3: '#ef4444',
  };

  const hintLabels = {
    1: 'Reveal "Am I Allowed?"',
    2: 'Reveal "Should I?"',
    3: 'Next Chapter',
  };

  return (
    <section
      className={`cinematic-slide triad-slide ${isTriadActive ? 'active' : ''} step-${currentStep}`}
      id="triad-slide"
      aria-hidden={!isTriadActive}
      onClick={handleSlideClick}
    >
      {/* 16:9 Stage Container (Unclipped, Crisp, Perfect Pixel Registration) */}
      <div className="triad-stage-16-9" ref={mediaWrapRef}>
        {/* Panel 1: CAN ? */}
        <div
          className={`triad-panel triad-panel-can ${currentStep >= 1 ? 'revealed' : ''}`}
          aria-label="Panel 1: Can I? (Feasibility)"
        >
          <div className="triad-panel-inner" />
          <div className="triad-panel-tag">
            <span className="triad-tag-pill">01 • FEASIBILITY</span>
          </div>
        </div>

        {/* Panel 2: AM I ALLOWED ? */}
        <div
          className={`triad-panel triad-panel-allowed ${currentStep >= 2 ? 'revealed' : ''}`}
          aria-label="Panel 2: Am I Allowed? (Legality)"
        >
          <div className="triad-panel-inner" />
          <div className="triad-panel-tag">
            <span className="triad-tag-pill">02 • LEGALITY</span>
          </div>
        </div>

        {/* Panel 3: SHOULD ? */}
        <div
          className={`triad-panel triad-panel-should ${currentStep >= 3 ? 'revealed' : ''}`}
          aria-label="Panel 3: Should I? (Ethics)"
        >
          <div className="triad-panel-inner" />
          <div className="triad-panel-tag">
            <span className="triad-tag-pill">03 • ETHICS</span>
          </div>
        </div>

        {/* Dynamic Mood Lighting Halos */}
        <div className={`triad-mood-lighting step-${currentStep}`} aria-hidden="true">
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
          title={`Back to ${backLabels[currentStep]}`}
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
          <span>{backLabels[currentStep]}</span>
        </button>

        <div className="slide-chapter-tag" id="triad-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: tagColors[currentStep],
              boxShadow: `0 0 10px ${tagColors[currentStep]}, 0 0 20px ${tagColors[currentStep]}80`,
            }}
          />
          <span>CHAPTER 03 / THE ETHICAL TRIAD — {stepSubtitles[currentStep]}</span>
        </div>

        <div className="slide-step-indicator triad-step-dots" id="triad-step-indicator">
          <span className={`step-dot ${currentStep >= 1 ? 'active' : ''}`} id="triad-dot-1" title="Part 1: Can I?" />
          <span className={`step-dot ${currentStep >= 2 ? 'active' : ''}`} id="triad-dot-2" title="Part 2: Am I Allowed?" />
          <span className={`step-dot ${currentStep >= 3 ? 'active' : ''}`} id="triad-dot-3" title="Part 3: Should I?" />
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="triad-footer-hint">
        <div
          className="hint-badge"
          id="btn-triad-hint"
          role="button"
          tabIndex={0}
          title={`Press Space to ${hintLabels[currentStep]}`}
          aria-label={hintLabels[currentStep]}
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
          <span className="hint-label-detail">{hintLabels[currentStep]}</span>
        </div>
      </div>
    </section>
  );
};
