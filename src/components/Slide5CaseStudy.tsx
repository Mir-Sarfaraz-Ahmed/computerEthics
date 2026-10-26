import React from 'react';
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
  const isS5 = currentState === 's5casestudy';

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
      className={`cinematic-slide case-study-slide ${isS5 ? 'active' : ''}`}
      id="case-study-slide"
      aria-hidden={!isS5}
      onClick={handleSlideClick}
    >
      {/* 100% Clear, Ultra-Sharp Background Image (Zero Blur) */}
      <div className="slide-backdrop-wrap cs-backdrop-wrap">
        <div
          className="slide-backdrop cs-fullscreen-bg"
          style={{ backgroundImage: `url('/assets/case_study_bg.jpg')` }}
        ></div>

        {/* Crisp glass vignette that maintains complete center clarity */}
        <div className="cs-clear-vignette" aria-hidden="true"></div>

        {/* Ambient subtle cyber scanner sweep */}
        <div className="cs-scan-beam" aria-hidden="true"></div>
      </div>

      {/* Floating Glass Header Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-slide5-back"
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

        <div className="slide-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{ background: '#00f2fe', boxShadow: '0 0 10px #00f2fe' }}
          ></span>
          <span>CHAPTER 05 / CASE STUDY</span>
        </div>
      </div>

      {/* Hero Animated Content */}
      <div className={`cs-hero-container ${isS5 ? 'cs-visible' : ''}`}>
        <div className="cs-badge-pill">
          <span className="cs-badge-icon">
            <svg
              width="14"
              height="14"
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

        <h1 className="cs-hero-title">
          <span className="cs-word-case">CASE</span>{' '}
          <span className="cs-word-study">STUDY</span>
        </h1>

        <div className="cs-laser-divider" aria-hidden="true"></div>

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
            Case Study Overview
          </span>
          <span className="hint-arrow">→</span>
        </div>
      </div>
    </section>
  );
};
