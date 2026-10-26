import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';

interface Slide5CaseStudyProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide5CaseStudy: React.FC<Slide5CaseStudyProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isS5Active = currentState === 's5intro' || currentState === 's5casestudy';
  const isCaseStudyRevealed = currentState === 's5casestudy';

  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle ambient cyan cyber dust
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

    for (let i = 0; i < 35; i++) {
      pts.push({
        x: Math.random() * sw,
        y: Math.random() * sh,
        r: Math.random() * 1.8 + 0.6,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.15,
        op: Math.random() * 0.55 + 0.25,
        ps: Math.random() * 0.02 + 0.01,
        ph: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    function render(t: number) {
      if (!ctx || !sc) return;
      if (isS5Active) {
        ctx.clearRect(0, 0, sw, sh);
        pts.forEach((p) => {
          p.y += p.vy;
          p.x += Math.sin(t * 0.001 + p.ph) * 0.2;
          if (p.y < -10) {
            p.y = sh + 10;
            p.x = Math.random() * sw;
          }
          const op = p.op * (0.75 + Math.sin(t * p.ps + p.ph) * 0.25);
          ctx.beginPath();
          ctx.fillStyle = `rgba(56, 189, 248, ${op})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 6;
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
  }, [isS5Active]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('#btn-slide5-hint')
    ) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide case-study-slide ${isS5Active ? 'active' : ''}`}
      id="case-study-slide"
      aria-hidden={!isS5Active}
      onClick={handleSlideClick}
    >
      {/* 100% Clear, Ultra-Sharp Background Image (Zero Blur on center) */}
      <div className="slide-backdrop-wrap cs-backdrop-wrap">
        <div
          className="slide-backdrop cs-fullscreen-bg"
          style={{ backgroundImage: `url('/assets/case_study_bg.jpg')` }}
        />
        <canvas
          ref={particleCanvasRef}
          id="cs-particle-canvas"
          className="slide-particle-canvas"
          aria-hidden="true"
        />
        {/* Edge glass vignette protecting high contrast readability while keeping center razor-sharp */}
        <div className="cs-clear-vignette" aria-hidden="true" />
        {/* Subtle holographic beam sweep */}
        <div className="cs-scan-beam" aria-hidden="true" />
      </div>

      {/* Floating Glass Header Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-slide5-back"
          title="Back to previous slide"
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
          <span>{isCaseStudyRevealed ? 'Chapter 05' : 'Slide 04'}</span>
        </button>

        <div className="slide-chapter-tag" id="slide5-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#38bdf8',
              boxShadow: isCaseStudyRevealed
                ? '0 0 12px #38bdf8, 0 0 24px rgba(56, 189, 248, 0.6)'
                : '0 0 8px #38bdf8',
            }}
          ></span>
          <span className="cs-chapter-label">
            {isCaseStudyRevealed ? 'CHAPTER 05 / CASE STUDY' : 'CHAPTER 05'}
          </span>
        </div>

        <div className="slide-step-indicator" id="slide5-step-indicator">
          <span
            className={`step-dot ${!isCaseStudyRevealed ? 'active' : ''}`}
            id="slide5-dot-1"
            title="Chapter 05 Introduction"
          ></span>
          <span
            className={`step-dot ${isCaseStudyRevealed ? 'active' : ''}`}
            id="slide5-dot-2"
            title="Case Study Content"
          ></span>
        </div>
      </div>

      {/* Slide Main Content */}
      <div className="cs-content-stage">
        {/* STEP 1: PRE-CLICK CHAPTER 05 CARD (Shows until click) */}
        {!isCaseStudyRevealed && (
          <div className="cs-intro-teaser visible">
            <div className="cs-badge-pill">
              <span className="cs-badge-icon">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              <span>FIELD INVESTIGATION & REAL-WORLD ANALYSIS</span>
            </div>

            <div className="cs-intro-chapter-title">
              <span className="cs-chapter-eyebrow">CHAPTER 05</span>
              <h2 className="cs-intro-heading">The Digital Fault Line</h2>
              <div className="cs-intro-divider"></div>
              <p className="cs-intro-description">
                A deep dive into real-world technological accountability, digital rights,
                and systemic cyber vulnerabilities.
              </p>
            </div>

            <div
              className="cs-click-invitation"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onForward();
              }}
            >
              <div className="cs-pulse-radar">
                <span className="radar-core"></span>
                <span className="radar-wave"></span>
              </div>
              <span className="cs-invitation-text">Click to reveal Case Study</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        )}

        {/* STEP 2: POST-CLICK "CASE STUDY" HERO & BRIEFING CARDS (Appears after click) */}
        {isCaseStudyRevealed && (
          <div className="cs-hero-container cs-visible">
            <div className="cs-badge-pill">
              <span className="cs-badge-icon">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              <span>FIELD INVESTIGATION & REAL-WORLD ANALYSIS</span>
            </div>

            {/* Prominent "Case Study" text that appears dynamically upon click */}
            <h1 className="cs-hero-title cs-title-revealed">
              <span className="cs-word-case">CASE</span>{' '}
              <span className="cs-word-study">STUDY</span>
            </h1>

            <div className="cs-laser-divider cs-laser-active" aria-hidden="true"></div>

            <p className="cs-hero-subtitle">
              Examining the ethical fault lines, digital accountability, and human impact
              through the lens of real-world gaming ecosystems and cybersecurity breaches.
            </p>

            {/* 3 Animated Glass Briefing Cards */}
            <div className="cs-cards-grid">
              <div className="cs-briefing-card cs-card-1">
                <div className="cs-card-header">
                  <span className="cs-card-index">01</span>
                  <span className="cs-card-tag">DIGITAL RIGHTS</span>
                </div>
                <h3 className="cs-card-title">The Creator Covenant</h3>
                <p className="cs-card-body">
                  How unauthorized distribution impacts the livelihood of thousands of
                  developers, artists, and engineers behind modern virtual worlds.
                </p>
                <div className="cs-card-accent"></div>
              </div>

              <div className="cs-briefing-card cs-card-2">
                <div className="cs-card-header">
                  <span className="cs-card-index">02</span>
                  <span className="cs-card-tag cs-tag-amber">CYBERSECURITY</span>
                </div>
                <h3 className="cs-card-title">The Trojanized Supply Chain</h3>
                <p className="cs-card-body">
                  Over 43% of cracked payloads weaponize trust to install info-stealers,
                  cryptominers, and rootkits across consumer workstations.
                </p>
                <div className="cs-card-accent cs-accent-amber"></div>
              </div>

              <div className="cs-briefing-card cs-card-3">
                <div className="cs-card-header">
                  <span className="cs-card-index">03</span>
                  <span className="cs-card-tag cs-tag-cyan">SHARED RESPONSIBILITY</span>
                </div>
                <h3 className="cs-card-title">The Ethical Matrix</h3>
                <p className="cs-card-body">
                  Applying James H. Moor's ethical framework to balance user accessibility,
                  fair compensation, and systemic digital trust.
                </p>
                <div className="cs-card-accent cs-accent-cyan"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="slide5-footer-hint">
        <div
          className="hint-badge"
          id="btn-slide5-hint"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
          <span className="hint-text" id="slide5-action-text">
            {!isCaseStudyRevealed ? 'Click to reveal Case Study' : 'Case Study Briefing Complete'}
          </span>
          <span className="hint-arrow">→</span>
        </div>
      </div>
    </section>
  );
};

export default Slide5CaseStudy;
