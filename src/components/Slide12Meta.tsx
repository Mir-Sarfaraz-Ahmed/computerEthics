import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playSlideWhoosh, resumeAudio } from '../audio/soundEffects';

interface Slide12MetaProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide12Meta: React.FC<Slide12MetaProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isMetaActive = currentState === 's12meta';
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isMetaActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playSlideWhoosh();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isMetaActive]);

  // Cinematic 3D parallax on mouse move
  useEffect(() => {
    if (!isMetaActive) return;

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

      if (mediaWrapRef.current) {
        mediaWrapRef.current.style.transform = `scale(1.05) translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMetaActive]);

  // Ambient Synaptic Sparks Canvas
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas || !isMetaActive) return;
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

    const sparkCount = 35;
    const sparks = Array.from({ length: sparkCount }, () => ({
      x: width * 0.3 + Math.random() * width * 0.4,
      y: height * 0.25 + Math.random() * height * 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.8 + 0.2,
      baseAlpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.45 ? '#38bdf8' : '#f59e0b',
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < width * 0.2) s.x = width * 0.8;
        if (s.x > width * 0.8) s.x = width * 0.2;
        if (s.y < height * 0.2) s.y = height * 0.8;
        if (s.y > height * 0.8) s.y = height * 0.2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMetaActive]);

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
      className={`cinematic-slide meta-intelligence-slide ${isMetaActive ? 'active' : ''}`}
      id="metacognitive-intelligence-slide"
      aria-hidden={!isMetaActive}
      onClick={handleSlideClick}
    >
      {/* Whole Background Full-Bleed Image Container */}
      <div className="meta-fullscreen-backdrop-wrap">
        <div
          ref={mediaWrapRef}
          className="meta-fullscreen-bg"
          style={{ backgroundImage: `url('/assets/metacognitive_intelligence.jpg')` }}
          role="img"
          aria-label="Metacognitive Intelligence - High Tech Glowing Neural Synaptic Brain"
        />

        {/* Dynamic Neural Synapse Flares & Text Shimmer */}
        <div className="meta-neural-flare-cyan" aria-hidden="true" />
        <div className="meta-neural-flare-gold" aria-hidden="true" />
        <div className="meta-text-shimmer-sheen" aria-hidden="true" />
        <canvas ref={particleCanvasRef} className="meta-particle-canvas" aria-hidden="true" />

        {/* Soft Vignette */}
        <div className="meta-cinematic-vignette" aria-hidden="true" />
      </div>

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-meta-back"
          title="Back to The Man Who Saved The World (Slide 11)"
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
          <span>Petrov Story</span>
        </button>

        <div className="slide-chapter-tag" id="meta-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.9)',
            }}
          />
          <span style={{ letterSpacing: '0.14em' }}>CHAPTER 06 / METACOGNITIVE INTELLIGENCE</span>
        </div>

        <div className="slide-step-indicator" id="meta-step-indicator">
          <span className="step-dot" id="meta-dot-1" />
          <span className="step-dot" id="meta-dot-2" />
          <span className="step-dot" id="meta-dot-3" />
          <span
            className="step-dot active"
            id="meta-dot-4"
            style={{
              background: '#38bdf8',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.95), 0 0 18px rgba(245, 158, 11, 0.5)',
            }}
          />
        </div>
      </div>

      {/* Floating Philosophical Insight Pill */}
      <div className="meta-floating-insight" aria-hidden="true">
        <div className="meta-insight-pill">
          <span className="meta-pill-dot" />
          <span className="meta-pill-tag">CONSCIENCE OVER CALCULATION</span>
          <span className="meta-pill-sep">·</span>
          <span className="meta-pill-text">
            The human capacity to step outside the algorithmic loop and doubt machine certainty.
          </span>
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="meta-footer-hint">
        <div
          className="hint-badge"
          id="btn-meta-hint"
          role="button"
          tabIndex={0}
          title="Next Slide (Video Case Study)"
          aria-label="Next Slide"
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
