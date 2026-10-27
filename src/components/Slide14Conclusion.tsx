import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import {
  playAppleChime,
  playHeroRevealChord,
  resumeAudio,
} from '../audio/soundEffects';

interface Slide14ConclusionProps {
  currentState: PresentationState;
  onBack: () => void;
  onRestart: () => void;
}

interface ReferenceItem {
  name: string;
  url: string;
  type:
    | 'youtube'
    | 'gfg'
    | 'google'
    | 'researchgate'
    | 'portfolio'
    | 'github'
    | 'antigravity'
    | 'aistudio'
    | 'claude'
    | 'chatgpt'
    | 'gemini';
}

const REFERENCES: ReferenceItem[] = [
  {
    name: 'YouTube Shorts — Case Archive',
    url: 'https://youtube.com/shorts/a4KF8Ei_gk8',
    type: 'youtube',
  },
  {
    name: 'Computer Ethics — GeeksforGeeks',
    url: 'https://share.google/ladEdkZKWyxkoNmOX',
    type: 'gfg',
  },
  {
    name: 'Computer Ethics | Ethics, Laws, Definition & Privacy',
    url: 'https://share.google/7hnzi8nYqeEWO0b76',
    type: 'google',
  },
  {
    name: 'YouTube — Theatrical Case Study',
    url: 'https://youtu.be/zUPA8kyo0Fo',
    type: 'youtube',
  },
  {
    name: 'Review Paper on Computer Ethics & Research Models',
    url: 'https://www.researchgate.net/publication/282604875_Review_Paper_on_Computer_Ethics_and_Related_Research_Models',
    type: 'researchgate',
  },
  {
    name: 'mirsarfarazahmed.tech',
    url: 'https://mirsarfarazahmed.tech',
    type: 'portfolio',
  },
  {
    name: 'Google',
    url: 'https://google.com',
    type: 'google',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    type: 'github',
  },
  {
    name: 'Antigravity',
    url: 'https://antigravity.google/',
    type: 'antigravity',
  },
  {
    name: 'Google AI Studio',
    url: 'https://aistudio.google.com',
    type: 'aistudio',
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    type: 'claude',
  },
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com',
    type: 'chatgpt',
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    type: 'gemini',
  },
];

export const Slide14Conclusion: React.FC<Slide14ConclusionProps> = ({
  currentState,
  onBack,
  onRestart,
}) => {
  const isConclusionActive = currentState === 's14conclusion';
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
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

  // Subtle ambient particle canvas
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

    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.5 ? '#38bdf8' : '#818cf8',
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        width: '100%',
        padding: '0',
        overflowY: 'auto', overflowX: 'hidden',
        background: '#07080b',
      }}
    >
      {/* Background Ambience & Canvas */}
      <div className="conclusion-atmosphere" aria-hidden="true">
        <canvas ref={particleCanvasRef} className="conclusion-particle-canvas" />
        <div className="conclusion-ambient-glow-cyan" />
        <div className="slide-vignette" />
      </div>

      {/* Floating Header Navigation Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-conclusion-back"
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

        <div className="slide-chapter-tag" id="conclusion-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.85)',
            }}
          />
          <span style={{ letterSpacing: '0.14em' }}>REFERENCES</span>
        </div>

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

      {/* Single Center Block */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 24px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '920px',
            background: 'rgba(15, 23, 42, 0.68)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '24px 28px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), 0 0 40px rgba(56, 189, 248, 0.08)',
          }}
        >
          {/* Block Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '14px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: '#38bdf8',
                  boxShadow: '0 0 8px #38bdf8',
                }}
              />
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                References & Tools
              </h2>
            </div>
            <span
              style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {REFERENCES.length} Sources
            </span>
          </div>

          {/* Line by Line Links in 2-Column Responsive Grid with Scroll Support */}
          <div
            className="references-links-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '8px 12px',
              maxHeight: 'calc(100vh - 220px)',
              overflowY: 'auto',
              paddingRight: '6px',
            }}
          >
            {REFERENCES.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  textDecoration: 'none',
                  color: '#f8fafc',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.35)';
                  e.currentTarget.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {/* Left: Logo & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  {/* YouTube Logo */}
                  {ref.type === 'youtube' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(255, 0, 0, 0.12)',
                        border: '1px solid rgba(255, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#FF0000">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                  )}

                  {/* GeeksforGeeks Logo */}
                  {ref.type === 'gfg' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(47, 141, 70, 0.15)',
                        border: '1px solid rgba(47, 141, 70, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          color: '#2F8D46',
                          fontWeight: 900,
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        GfG
                      </span>
                    </div>
                  )}

                  {/* Google Logo */}
                  {ref.type === 'google' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(66, 133, 244, 0.12)',
                        border: '1px solid rgba(66, 133, 244, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                    </div>
                  )}

                  {/* ResearchGate Logo */}
                  {ref.type === 'researchgate' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(0, 204, 187, 0.15)',
                        border: '1px solid rgba(0, 204, 187, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          color: '#00CCBB',
                          fontWeight: 900,
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        RG
                      </span>
                    </div>
                  )}

                  {/* Portfolio Logo (mirsarfarazahmed.tech) */}
                  {ref.type === 'portfolio' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                  )}

                  {/* GitHub Logo */}
                  {ref.type === 'github' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </div>
                  )}

                  {/* Antigravity Logo */}
                  {ref.type === 'antigravity' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(168, 85, 247, 0.15)',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 15-6-6-6 6"/>
                        <path d="m18 9-6-6-6 6"/>
                      </svg>
                    </div>
                  )}

                  {/* Google AI Studio Logo */}
                  {ref.type === 'aistudio' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                      </svg>
                    </div>
                  )}

                  {/* Claude Logo */}
                  {ref.type === 'claude' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(217, 119, 6, 0.15)',
                        border: '1px solid rgba(217, 119, 6, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: '#fbbf24', fontWeight: 900, fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>✳</span>
                    </div>
                  )}

                  {/* ChatGPT Logo */}
                  {ref.type === 'chatgpt' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(16, 163, 127, 0.15)',
                        border: '1px solid rgba(16, 163, 127, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93"/>
                      </svg>
                    </div>
                  )}

                  {/* Gemini Logo */}
                  {ref.type === 'gemini' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        background: 'rgba(78, 117, 255, 0.15)',
                        border: '1px solid rgba(182, 85, 255, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#93c5fd">
                        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
                      </svg>
                    </div>
                  )}

                  {/* Name */}
                  <span
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: '#f1f5f9',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {ref.name}
                  </span>
                </div>

                {/* Right: External Link Arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.35)', flexShrink: 0 }}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom spacing */}
      <div style={{ height: '24px' }} />
    </section>
  );
};
