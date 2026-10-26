import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';

interface Slide1IntroductionProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide1Introduction: React.FC<Slide1IntroductionProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isActive = currentState === 's1scene' || currentState === 's1q';
  const isQuestionRevealed = currentState === 's1q';

  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Parallax tracking
  useEffect(() => {
    if (!isActive) return;

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

      if (backdropRef.current) {
        backdropRef.current.style.transform = `scale(1.04) translate3d(${p.x}px, ${p.y}px, 0)`;
      }

      animId = requestAnimationFrame(renderParallax);
    };

    animId = requestAnimationFrame(renderParallax);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  // Particle Canvas
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
      type: 'cyber' | 'amber';
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      op: number;
      ps: number;
      ph: number;
    }> = [];

    for (let i = 0; i < 45; i++) {
      const cy = Math.random() < 0.5;
      pts.push({
        type: cy ? 'cyber' : 'amber',
        x: cy ? Math.random() * (sw * 0.48) : sw * 0.52 + Math.random() * (sw * 0.48),
        y: Math.random() * sh,
        r: cy ? (Math.random() < 0.3 ? 2.5 : 1.4) : Math.random() * 2.2 + 0.8,
        vy: cy ? -(Math.random() * 0.45 + 0.2) : -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.25,
        op: Math.random() * 0.65 + 0.2,
        ps: Math.random() * 0.02 + 0.01,
        ph: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    function render(t: number) {
      if (!ctx || !sc) return;
      if (isActive) {
        ctx.clearRect(0, 0, sw, sh);
        pts.forEach((p) => {
          p.y += p.vy;
          p.x += Math.sin(t * 0.001 + p.ph) * 0.25;
          if (p.y < -10) {
            p.y = sh + 10;
            p.x = p.type === 'cyber' ? Math.random() * (sw * 0.48) : sw * 0.52 + Math.random() * (sw * 0.48);
          }
          const op = p.op * (0.7 + Math.sin(t * p.ps + p.ph) * 0.3);
          ctx.beginPath();
          if (p.type === 'cyber') {
            ctx.fillStyle = `rgba(56, 189, 248, ${op})`;
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(251, 191, 36, ${op})`;
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 6;
          }
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
  }, [isActive]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('#btn-reveal-hint')) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide ${isActive ? 'active' : ''}`}
      id="cinematic-slide"
      aria-hidden={!isActive}
      onClick={handleSlideClick}
    >
      <div className="slide-backdrop-wrap">
        <div
          ref={backdropRef}
          className="slide-backdrop"
          id="slide-backdrop"
          style={{ backgroundImage: `url('/assets/ethics_slide_bg.jpg')` }}
        />
        <div className="slide-glow-cyber" aria-hidden="true"></div>
        <div className="slide-glow-sunset" aria-hidden="true"></div>
        <canvas ref={particleCanvasRef} id="slide-particle-canvas" className="slide-particle-canvas" aria-hidden="true" />
        <div className="slide-vignette" aria-hidden="true"></div>
      </div>

      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-slide-back"
          title="Back to cover"
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
          <span>Cover</span>
        </button>

        <div className="slide-chapter-tag">
          <span className="slide-tag-dot"></span>
          <span>CHAPTER 01 / INTRODUCTION</span>
        </div>

        <div className="slide-step-indicator" id="slide-step-indicator">
          <span className={`step-dot ${!isQuestionRevealed ? 'active' : ''}`} id="step-dot-1"></span>
          <span className={`step-dot ${isQuestionRevealed ? 'active' : ''}`} id="step-dot-2"></span>
        </div>
      </div>

      <div className={`slide-content-center ${isQuestionRevealed ? 'revealed' : ''}`} id="slide-content-center">
        <div className="question-hero" id="question-hero">
          <div className="question-prefix">
            <span className="letter-reveal">W</span>
            <span className="letter-reveal">H</span>
            <span className="letter-reveal">A</span>
            <span className="letter-reveal">T</span>
            <span className="letter-space"> </span>
            <span className="letter-reveal">I</span>
            <span className="letter-reveal">S</span>
          </div>

          <h2 className="question-main-title">
            <span className="cyber-word">COMPUTER</span>{' '}
            <span className="amber-word">ETHICS,</span>
          </h2>

          <div className="question-suffix">
            <span className="letter-reveal">A</span>
            <span className="letter-reveal">C</span>
            <span className="letter-reveal">T</span>
            <span className="letter-reveal">U</span>
            <span className="letter-reveal">A</span>
            <span className="letter-reveal">L</span>
            <span className="letter-reveal">L</span>
            <span className="letter-reveal">Y</span>
            <span className="letter-reveal">?</span>
          </div>
        </div>
      </div>

      <div className="slide-footer-hint" id="slide-footer-hint">
        <div
          className="hint-badge"
          id="btn-reveal-hint"
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
