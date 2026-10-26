import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';

interface Slide4DefinitionProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide4Definition: React.FC<Slide4DefinitionProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isS4 = currentState === 's4title' || currentState === 's4def';
  const isDefinitionRevealed = currentState === 's4def';

  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Ethics particle canvas
  useEffect(() => {
    const sc = particleCanvasRef.current;
    if (!sc) return;
    const ctx = sc.getContext('2d');
    if (!ctx) return;

    let sw = window.innerWidth;
    let sh = window.innerHeight;
    const dr = window.devicePixelRatio || 1;

    function resize() {
      if (!sc || !ctx) return;
      sw = window.innerWidth;
      sh = window.innerHeight;
      sc.width = sw * dr;
      sc.height = sh * dr;
      ctx.scale(dr, dr);
    }

    resize();
    window.addEventListener('resize', resize);

    const pts: Array<{
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      op: number;
      ps: number;
      ph: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      pts.push({
        x: Math.random() * sw,
        y: Math.random() * sh,
        r: Math.random() * 2 + 0.8,
        vy: -(Math.random() * 0.35 + 0.15),
        vx: (Math.random() - 0.5) * 0.2,
        op: Math.random() * 0.6 + 0.2,
        ps: Math.random() * 0.02 + 0.01,
        ph: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    function render(t: number) {
      if (!ctx || !sc) return;
      if (isS4) {
        ctx.clearRect(0, 0, sw, sh);
        pts.forEach((p) => {
          p.y += p.vy;
          p.x += Math.sin(t * 0.001 + p.ph) * 0.25;
          if (p.y < -10) {
            p.y = sh + 10;
            p.x = Math.random() * sw;
          }
          const op = p.op * (0.7 + Math.sin(t * p.ps + p.ph) * 0.3);
          ctx.beginPath();
          ctx.fillStyle = `rgba(56, 189, 248, ${op})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isS4]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('#btn-slide4-hint')
    ) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide ethics-slide ${isS4 ? 'active' : ''}`}
      id="ethics-slide"
      aria-hidden={!isS4}
      onClick={handleSlideClick}
    >
      <div className="slide-backdrop-wrap">
        <div className="slide-backdrop ethics-backdrop" id="ethics-backdrop"></div>
        <canvas
          ref={particleCanvasRef}
          id="ethics-particle-canvas"
          className="slide-particle-canvas"
          aria-hidden="true"
        />
        <div className="slide-vignette" aria-hidden="true"></div>
      </div>

      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-slide4-back"
          title="Back to Slide 3"
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
          <span>Slide 03</span>
        </button>

        <div className="slide-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{ background: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }}
          ></span>
          <span>CHAPTER 04 / DEFINITION</span>
        </div>

        <div className="slide-step-indicator" id="slide4-step-indicator">
          <span
            className={`step-dot ${!isDefinitionRevealed ? 'active' : ''}`}
            id="slide4-dot-1"
          ></span>
          <span
            className={`step-dot ${isDefinitionRevealed ? 'active' : ''}`}
            id="slide4-dot-2"
          ></span>
        </div>
      </div>

      <div className="ethics-content" id="ethics-content">
        <div className={`ethics-title-wrap ${isS4 ? 'visible' : ''}`} id="ethics-title-wrap">
          <div className="ethics-eyebrow">CHAPTER 04</div>
          <h2 className="ethics-main-title">
            <span className="ethics-word-computer">Computer</span>{' '}
            <span className="ethics-word-ethics">Ethics</span>
          </h2>
          <div className="ethics-title-underline"></div>
        </div>

        <div
          className={`ethics-definition-wrap ${isDefinitionRevealed ? 'visible' : ''}`}
          id="ethics-definition-wrap"
        >
          <p className="ethics-definition-text">
            Computer ethics is the study of moral issues arising from the use of
            computers and information technology — examining how individuals,
            organizations, and societies make choices about the{' '}
            <em className="ethics-em-word">design</em>,{' '}
            <em className="ethics-em-word">deployment</em>, and{' '}
            <em className="ethics-em-word">use</em> of computing systems in a
            way that is fair, responsible, and accountable to all.
          </p>
          <div className="ethics-def-source">
            James H. Moor — <em>What is Computer Ethics?</em> (1985)
          </div>
        </div>
      </div>

      <div className="slide-footer-hint" id="slide4-footer-hint">
        <div
          className="hint-badge"
          id="btn-slide4-hint"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
          <span className="hint-text" id="slide4-action-text">
            {!isDefinitionRevealed
              ? 'Click to reveal definition'
              : 'Definition revealed'}
          </span>
          <span className="hint-arrow">→</span>
        </div>
      </div>
    </section>
  );
};
