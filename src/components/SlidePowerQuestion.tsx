import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playHeroRevealChord, resumeAudio } from '../audio/soundEffects';

interface SlidePowerQuestionProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const SlidePowerQuestion: React.FC<SlidePowerQuestionProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isPowerActive = currentState === 's14power';
  const containerRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isPowerActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playHeroRevealChord();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isPowerActive]);

  // Subtle floating parallax on mouse tracking
  useEffect(() => {
    if (!isPowerActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      parallaxRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 16;
      parallaxRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 12;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const render = () => {
      const p = parallaxRef.current;
      p.x += (p.tx - p.x) * 0.05;
      p.y += (p.ty - p.y) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPowerActive]);

  // Ambient drifting starlight particles
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas || !isPowerActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 36;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.3 + 0.1),
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#fbbf24' : '#38bdf8',
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPowerActive]);

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
      className={`cinematic-slide power-slide ${isPowerActive ? 'active' : ''}`}
      id="power-slide"
      aria-hidden={!isPowerActive}
      onClick={handleSlideClick}
    >
      {/* Background Atmosphere */}
      <div className="power-atmosphere" aria-hidden="true">
        <canvas ref={particleCanvasRef} className="power-particle-canvas" />
        <div className="power-radial-glow" />
        <div className="power-radial-core" />
        <div className="slide-vignette" />
      </div>

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-power-back"
          title="Back to Video Screening (Slide 13)"
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
          <span>Video Case Study</span>
        </button>

        <div className="slide-chapter-tag" id="power-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#fbbf24',
              boxShadow: '0 0 10px #fbbf24, 0 0 22px rgba(251, 191, 36, 0.85)',
            }}
          />
          <span>THE FINAL QUESTION</span>
        </div>

        <div className="slide-step-indicator" id="power-step-indicator">
          <span className="step-dot active" id="power-dot-1" />
        </div>
      </div>

      {/* Center Climax Question */}
      <div className="power-content-container" ref={containerRef}>
        <div className="power-kicker">THE MORAL HORIZON</div>

        <h1 className="power-main-heading">
          <span className="power-text-white">What will you do with the</span>
          <span className="power-text-emphasis">
            <span className="power-gradient-word">POWER</span>
            <span className="power-text-dim">you</span>
            <span className="power-gradient-word power-word-build">BUILD?</span>
          </span>
        </h1>

        <div className="power-sub-badge">
          <span className="power-badge-dot" />
          <span>CODE CARRIES CONSEQUENCES • THE CHOICE IS ALWAYS YOURS</span>
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="power-footer-hint">
        <div
          className="hint-badge"
          id="btn-power-hint"
          role="button"
          tabIndex={0}
          title="Press Space to view References & Tools"
          aria-label="Advance to References"
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
          <span className="hint-label-detail">References & Tools</span>
        </div>
      </div>
    </section>
  );
};
export default SlidePowerQuestion;
