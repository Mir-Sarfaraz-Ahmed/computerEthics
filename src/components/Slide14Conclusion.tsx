import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import {
  playAppleChime,
  playHeroRevealChord,
  playSlideWhoosh,
  resumeAudio,
} from '../audio/soundEffects';

interface Slide14ConclusionProps {
  currentState: PresentationState;
  onBack: () => void;
  onRestart: () => void;
}

interface ReferenceItem {
  title: string;
  author: string;
  detail: string;
  tag: string;
}

const REFERENCE_GROUPS: {
  category: string;
  tagline: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  items: ReferenceItem[];
}[] = [
  {
    category: 'CASE ARCHIVES',
    tagline: 'Historical System Failures',
    color: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.25)',
    items: [
      {
        title: 'The 1983 Soviet Nuclear False Alarm Incident',
        author: 'Stanislav Petrov Case Archive · UN World Citizen Award',
        detail:
          'Analysis of OKO satellite early-warning radar anomaly and the necessity of human conscience in automated decision loops.',
        tag: 'Case Study',
      },
      {
        title: 'Crunch Culture & The Human Cost of Software',
        author: 'Schreier, J. (2017) · Blood, Sweat, and Pixels',
        detail:
          'Investigative analysis of engineering burnout, labor exploitation, and the hidden human cost behind $0 piracy expectations.',
        tag: 'Industry Study',
      },
    ],
  },
  {
    category: 'ETHICAL FRAMEWORKS',
    tagline: 'Professional Standards & Codes',
    color: '#818cf8',
    badgeBg: 'rgba(129, 140, 248, 0.1)',
    borderColor: 'rgba(129, 140, 248, 0.25)',
    items: [
      {
        title: 'ACM Code of Ethics & Professional Conduct',
        author: 'Association for Computing Machinery (ACM)',
        detail:
          'Mandating that technologists bear ethical responsibility for the societal impact, safety, and human dignity of their architectures.',
        tag: 'Standard',
      },
      {
        title: 'Ethically Aligned Design: Human Well-being',
        author: 'IEEE Global Initiative on Autonomous Systems',
        detail:
          'Comprehensive architectural principles ensuring human sovereignty, algorithmic transparency, and moral accountability.',
        tag: 'IEEE Charter',
      },
    ],
  },
  {
    category: 'LITERATURE & FOUNDATIONS',
    tagline: 'Philosophy of Computing',
    color: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    items: [
      {
        title: 'Computer Power and Human Reason',
        author: 'Joseph Weizenbaum · MIT Press (1976)',
        detail:
          'The foundational philosophical distinction between mere algorithmic calculation and genuine human judgment and conscience.',
        tag: 'Foundations',
      },
      {
        title: 'The Age of Surveillance Capitalism',
        author: 'Shoshana Zuboff · Harvard Business School (2019)',
        detail:
          'The economics of behavioral modification and the real cost extracted when consumer digital platforms cost nothing.',
        tag: 'Economics & Tech',
      },
    ],
  },
];

export const Slide14Conclusion: React.FC<Slide14ConclusionProps> = ({
  currentState,
  onBack,
  onRestart,
}) => {
  const isConclusionActive = currentState === 's14conclusion';
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isConclusionActive) {
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playHeroRevealChord();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isConclusionActive]);

  // Subtle interactive 3D parallax
  useEffect(() => {
    if (!isConclusionActive) return;

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
        containerRef.current.style.transform = `translate3d(${p.x * 0.4}px, ${p.y * 0.4}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isConclusionActive]);

  // Atmospheric Particle Canvas
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas || !isConclusionActive) return;
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

    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#38bdf8' : '#f59e0b',
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
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
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
  }, [isConclusionActive]);

  return (
    <section
      className={`cinematic-slide conclusion-slide ${isConclusionActive ? 'active' : ''}`}
      id="conclusion-slide"
      aria-hidden={!isConclusionActive}
      style={{ overflowY: 'auto' }}
    >
      {/* Background Ambience & Canvas */}
      <div className="conclusion-atmosphere" aria-hidden="true">
        <canvas ref={particleCanvasRef} className="conclusion-particle-canvas" />
        <div className="conclusion-ambient-glow-cyan" />
        <div className="conclusion-ambient-glow-gold" />
        <div className="conclusion-grid-mesh" />
        <div className="slide-vignette" />
      </div>

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-conclusion-back"
          title="Back to Video Screening (Slide 14)"
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

        <div className="slide-chapter-tag" id="conclusion-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.85)',
            }}
          />
          <span style={{ letterSpacing: '0.14em' }}>CHAPTER 07 / REFERENCES & ARCHIVE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="slide-nav-next-btn"
            id="btn-conclusion-restart-header"
            title="Restart Presentation from Beginning"
            onClick={(e) => {
              e.stopPropagation();
              playAppleChime();
              onRestart();
            }}
            style={{
              borderColor: 'rgba(16, 185, 129, 0.4)',
              color: '#34d399',
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
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Main Content Stage */}
      <div
        ref={containerRef}
        className="conclusion-content-wrap"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '28px 32px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          zIndex: 10,
          position: 'relative',
        }}
      >
        {/* Title & Tagline */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#ffffff',
              margin: '0 0 10px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Academic Papers & <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>References</span>
            <span style={{ color: '#f59e0b' }}>.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
              color: 'rgba(226, 232, 240, 0.72)',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Core citations, historical case studies, and engineering charters referenced throughout this case inquiry.
          </p>
        </div>

        {/* 3 Reference Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {REFERENCE_GROUPS.map((group, gIdx) => (
            <div
              key={gIdx}
              style={{
                background: 'rgba(15, 23, 42, 0.55)',
                border: `1px solid ${group.borderColor}`,
                borderRadius: '18px',
                padding: '24px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
              }}
            >
              <div>
                {/* Group Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '14px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '18px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: group.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    {group.category}
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'rgba(255, 255, 255, 0.45)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {group.tagline}
                  </span>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                        <h3
                          style={{
                            fontSize: '0.98rem',
                            fontWeight: 700,
                            color: '#f8fafc',
                            margin: 0,
                            lineHeight: 1.35,
                          }}
                        >
                          {item.title}
                        </h3>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: group.badgeBg,
                            color: group.color,
                            border: `1px solid ${group.borderColor}`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: '#94a3b8',
                          fontWeight: 500,
                        }}
                      >
                        {item.author}
                      </span>
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: 'rgba(226, 232, 240, 0.65)',
                          margin: 0,
                          lineHeight: 1.45,
                          fontWeight: 300,
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Quote and Restart Button */}
        <div
          style={{
            marginTop: '8px',
            background: 'rgba(10, 15, 28, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#f59e0b', fontSize: '1.4rem', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
              “
            </span>
            <span style={{ fontSize: '0.88rem', color: '#cbd5e1', fontStyle: 'italic' }}>
              What we permit in our systems, we enforce on society.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                playAppleChime();
                onRestart();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '10px',
                background: '#10b981',
                color: '#022c22',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.45)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.background = '#34d399';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#10b981';
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Restart Presentation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
