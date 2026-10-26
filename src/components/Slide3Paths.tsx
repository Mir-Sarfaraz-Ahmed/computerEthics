import React from 'react';
import { PresentationState } from '../types/presentation';

interface Slide3PathsProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const Slide3Paths: React.FC<Slide3PathsProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isS3 =
    currentState === 's3intro' ||
    currentState === 's3aopen' ||
    currentState === 's3adone' ||
    currentState === 's3bopen' ||
    currentState === 's3bothdone';

  const isIntro = currentState === 's3intro';
  const isAOpen = currentState === 's3aopen';
  const isADone = currentState === 's3adone';
  const isBOpen = currentState === 's3bopen';
  const isBothDone = currentState === 's3bothdone';

  const isDetailOpen = isAOpen || isBOpen;

  let activeDotIndex = 0;
  let actionText = 'Two paths -- press Space / Right Arrow to open Path A';
  if (isAOpen) {
    activeDotIndex = 1;
    actionText = 'Path A active -- discuss, then press Space / Right Arrow';
  } else if (isADone) {
    activeDotIndex = 2;
    actionText = 'Path A covered -- press Space / Right Arrow for Path B';
  } else if (isBOpen) {
    activeDotIndex = 3;
    actionText = 'Path B active -- discuss, then press Space / Right Arrow';
  } else if (isBothDone) {
    activeDotIndex = 4;
    actionText = 'Both paths explored -- press Space / Right Arrow for Chapter 04';
  } else if (currentState === 's3plane') {
    activeDotIndex = 5;
  }

  const handleSlideClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('#btn-slide3-hint')
    ) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide paths-slide ${isS3 ? 'active' : ''} ${
        isDetailOpen ? 'detail-active' : ''
      }`}
      id="paths-slide"
      aria-hidden={!isS3}
      onClick={handleSlideClick}
    >
      {/* Full-bleed cinematic background covering the whole screen */}
      <div className="slide-backdrop-wrap">
        <div
          className="slide-backdrop paths-fullscreen-bg"
          style={{ backgroundImage: `url('/assets/paths_split_screen.jpg')` }}
        ></div>

        {/* Left Half Scrim (Path A) when dull/explored */}
        <div
          className={`paths-half-scrim paths-scrim-left ${
            (isADone || isBothDone) && !isDetailOpen ? 'active' : ''
          }`}
          aria-hidden="true"
        ></div>

        {/* Right Half Scrim (Path B) when dull/explored */}
        <div
          className={`paths-half-scrim paths-scrim-right ${
            isBothDone && !isDetailOpen ? 'active' : ''
          }`}
          aria-hidden="true"
        ></div>

        {/* Cinematic dark vignette */}
        <div className="slide-vignette" aria-hidden="true"></div>
      </div>

      {/* Floating Glass Header Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-slide3-back"
          title="Back to Slide 2"
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
          <span>Slide 02</span>
        </button>

        <div className="slide-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }}
          ></span>
          <span>CHAPTER 03 / THE CHOICE</span>
        </div>

        <div className="slide-step-indicator" id="slide3-step-indicator">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <span
              key={idx}
              className={`step-dot ${activeDotIndex === idx ? 'active' : ''}`}
              id={`slide3-dot-${idx + 1}`}
            ></span>
          ))}
        </div>
      </div>

      {/* Interactive Full-Screen Split Click Zones (No extra button outlines, clean click targets) */}
      {!isDetailOpen && (
        <div className="paths-split-click-zones" aria-hidden="true">
          <div
            className={`paths-click-zone paths-click-left ${
              isIntro ? 'clickable' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (isIntro) onForward();
            }}
            title={isIntro ? 'Click to explore Path A: Official Store' : undefined}
          ></div>

          <div
            className={`paths-click-zone paths-click-right ${
              isADone ? 'clickable' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (isADone) onForward();
            }}
            title={isADone ? 'Click to explore Path B: Cracked Version' : undefined}
          ></div>
        </div>
      )}

      {/* PATH A DEEP DIVE DISCUSSION */}
      <div
        className={`path-detail-container ${isAOpen ? 'visible' : ''}`}
        id="path-a-detail"
        aria-hidden={!isAOpen}
      >
        <div className="detail-badge detail-badge-a">
          <span className="badge-dot blue-dot"></span>
          <span>PATH A — THE ETHICAL CONTRACT</span>
        </div>
        <h2 className="detail-main-title">Honoring the Digital Covenant</h2>
        <p className="detail-subtitle">
          Why supporting the creators preserves digital security, software
          quality, and ethical accountability.
        </p>
        <div className="detail-pillars-grid">
          <div className="detail-pillar-card pillar-a">
            <div className="pillar-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4 className="pillar-title">Economic Justice</h4>
            <p className="pillar-desc">
              Over 1,000 developers, artists, and engineers spent 5+ years
              creating this universe. Purchasing directly sustains their
              livelihoods.
            </p>
            <span className="pillar-metric">1,000+ creators funded</span>
          </div>

          <div className="detail-pillar-card pillar-a">
            <div className="pillar-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h4 className="pillar-title">Digital Integrity</h4>
            <p className="pillar-desc">
              Cryptographically signed code direct from the publisher. Zero
              obfuscated malware, reliable automatic patches, and encrypted cloud
              synchronization.
            </p>
            <span className="pillar-metric">100% verified authentic</span>
          </div>

          <div className="detail-pillar-card pillar-a">
            <div className="pillar-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h4 className="pillar-title">Shared Digital Commons</h4>
            <p className="pillar-desc">
              Full access to GTA Online multiplayer and community ecosystems.
              Participating as an accountable member rather than a free-riding
              intruder.
            </p>
            <span className="pillar-metric">Fair play ecosystem</span>
          </div>
        </div>
      </div>

      {/* PATH B DEEP DIVE DISCUSSION */}
      <div
        className={`path-detail-container ${isBOpen ? 'visible' : ''}`}
        id="path-b-detail"
        aria-hidden={!isBOpen}
      >
        <div className="detail-badge detail-badge-b">
          <span className="badge-dot red-dot"></span>
          <span>PATH B — THE CRACKED ROUTE</span>
        </div>
        <h2 className="detail-main-title detail-title-b">The Free Illusion</h2>
        <p className="detail-subtitle">
          When the product is free, the currency becomes your computing power,
          personal privacy, and security.
        </p>
        <div className="detail-pillars-grid">
          <div className="detail-pillar-card pillar-b">
            <div className="pillar-icon icon-danger">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h4 className="pillar-title">The Hidden Payload</h4>
            <p className="pillar-desc">
              Studies show over 43% of cracked game binaries bundle stealth
              background cryptominers, info-stealers, or remote-access trojans.
            </p>
            <span className="pillar-metric metric-danger">
              43%+ contain malware
            </span>
          </div>

          <div className="detail-pillar-card pillar-b">
            <div className="pillar-icon icon-danger">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
            </div>
            <h4 className="pillar-title">Compromised Trust</h4>
            <p className="pillar-desc">
              Install instructions tell you:{' '}
              <em>"Disable Windows Defender before unzip."</em> You
              intentionally strip your OS immune system for untrusted binaries.
            </p>
            <span className="pillar-metric metric-danger">
              Security shields disabled
            </span>
          </div>

          <div className="detail-pillar-card pillar-b">
            <div className="pillar-icon icon-danger">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            </div>
            <h4 className="pillar-title">The Ethical Erosion</h4>
            <p className="pillar-desc">
              Zero payment for 5 years of human labor. Normalizes the fallacy
              that digital assets have no intrinsic worth, eroding respect for
              creators' work.
            </p>
            <span className="pillar-metric metric-danger">
              Devaluing human labor
            </span>
          </div>
        </div>
      </div>

      <div className="slide-footer-hint" id="slide3-footer-hint">
        <div
          className="hint-badge"
          id="btn-slide3-hint"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onForward();
          }}
        >
          <span className="kbd-key">Space</span>
          <span className="hint-text" id="slide3-action-text">
            {actionText}
          </span>
          <span className="hint-arrow">→</span>
        </div>
      </div>
    </section>
  );
};
