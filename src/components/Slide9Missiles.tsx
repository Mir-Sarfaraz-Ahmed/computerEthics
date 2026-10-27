import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { stopNuclearSiren, playRadarSweep, resumeAudio } from '../audio/soundEffects';

interface Slide9MissilesProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

interface MissileData {
  id: string;
  label: string;
  mach: string;
  altitude: string;
  dx: number;
  dy: number;
  scale: number;
  delay: string;
  hudPos: 'above' | 'below';
}

// Aerodynamically balanced chevron with zero flame or HUD overlaps
const MISSILE_FORMATION: MissileData[] = [
  // Wing Apex (Lead Missile - Tip of ">")
  {
    id: 'TRK-01',
    label: 'LEAD ICBM · OKO-01',
    mach: 'MACH 24.2',
    altitude: '182 KM',
    dx: 140,
    dy: 0,
    scale: 0.94,
    delay: '0.1s',
    hudPos: 'above',
  },
  // Upper Wing Inner
  {
    id: 'TRK-02',
    label: 'VECTOR 02 · OKO-02',
    mach: 'MACH 24.1',
    altitude: '179 KM',
    dx: -40,
    dy: -92,
    scale: 0.86,
    delay: '0.2s',
    hudPos: 'above',
  },
  // Upper Wing Outer
  {
    id: 'TRK-03',
    label: 'VECTOR 03 · OKO-03',
    mach: 'MACH 24.3',
    altitude: '185 KM',
    dx: -220,
    dy: -180,
    scale: 0.78,
    delay: '0.3s',
    hudPos: 'above',
  },
  // Lower Wing Inner
  {
    id: 'TRK-04',
    label: 'VECTOR 04 · OKO-04',
    mach: 'MACH 24.0',
    altitude: '177 KM',
    dx: -40,
    dy: 92,
    scale: 0.86,
    delay: '0.25s',
    hudPos: 'below',
  },
  // Lower Wing Outer
  {
    id: 'TRK-05',
    label: 'VECTOR 05 · OKO-05',
    mach: 'MACH 24.2',
    altitude: '180 KM',
    dx: -220,
    dy: 180,
    scale: 0.78,
    delay: '0.35s',
    hudPos: 'below',
  },
];

export const Slide9Missiles: React.FC<Slide9MissilesProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isMissilesActive = currentState === 's9missiles';
  const hasTriggeredAudio = useRef<boolean>(false);

  useEffect(() => {
    if (isMissilesActive) {
      stopNuclearSiren();
      resumeAudio();
      if (!hasTriggeredAudio.current) {
        playRadarSweep();
        hasTriggeredAudio.current = true;
      }
    } else {
      hasTriggeredAudio.current = false;
    }
  }, [isMissilesActive]);

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
      className={`cinematic-slide missiles-slide ${isMissilesActive ? 'active' : ''}`}
      id="missiles-slide"
      aria-hidden={!isMissilesActive}
      onClick={handleSlideClick}
    >
      {/* Tactical Radar Background Grid */}
      <div className="missiles-radar-backdrop" aria-hidden="true">
        <div className="missiles-radar-crosshair" />
        <div className="missiles-radar-rings">
          <span className="radar-range-tag r500">500 KM</span>
          <span className="radar-range-tag r1000">1000 KM</span>
          <span className="radar-range-tag r1500">1500 KM</span>
          <span className="radar-range-tag r2000">2000 KM</span>
        </div>
        <div className="missiles-radar-sweep-beam" />
        <div className="missiles-ambient-glow" />
        <div className="missiles-ambient-vignette" />
      </div>

      {/* Floating Header Bar */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-missiles-back"
          title="Back to Slide 08 (Missile Attack)"
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
          <span>Slide 08</span>
        </button>

        <div className="slide-chapter-tag" id="missiles-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#f43f5e',
              boxShadow: '0 0 10px #f43f5e, 0 0 20px rgba(244, 63, 94, 0.8)',
            }}
          />
          <span>CHAPTER 09 / THE DETECTION</span>
        </div>
      </div>

      {/* Hero Headline & Telemetry Status */}
      <div className="missile-single-message-wrap">
        <div className="missile-detected-eyebrow">
          <span className="hud-pulse-dot" />
          <span>SERPUKHOV-15 SATELLITE TELEMETRY · OKO SYSTEM CONFIRMATION</span>
        </div>

        <h1 className="missile-detected-hero-title">
          <span className="missile-digit-highlight">5</span> MISSILES DETECTED
        </h1>

        <div className="missile-accent-glow-line" aria-hidden="true" />

        <div className="missile-telemetry-subbar">
          <span className="telemetry-chip warning">
            <span className="telemetry-live-dot" />
            STATUS: AIRBORNE
          </span>
          <span className="telemetry-chip">FORMATION: CHEVRON ( &gt; )</span>
          <span className="telemetry-chip success">
            <span className="telemetry-lock-dot" />
            RADAR LOCK: 5/5 TRACKS
          </span>
        </div>
      </div>

      {/* 5 SVG Missiles Flying in Chevron ( > ) Formation */}
      <div
        className="missiles-chevron-airspace"
        aria-label="5 ICBM Missiles flying across the screen in chevron formation"
      >
        <div className="missiles-chevron-squadron">
          {MISSILE_FORMATION.map((missile) => (
            <div
              key={missile.id}
              className="chevron-missile-slot"
              style={{
                transform: `translate(${missile.dx}px, ${missile.dy}px) scale(${missile.scale})`,
                animationDelay: missile.delay,
              }}
            >
              {/* Telemetry Bracket Box */}
              <div className={`missile-radar-target-hud hud-pos-${missile.hudPos}`}>
                <div className="target-hud-bracket top-left" />
                <div className="target-hud-bracket top-right" />
                <div className="target-hud-bracket bottom-left" />
                <div className="target-hud-bracket bottom-right" />
                <div className="target-hud-data">
                  <span className="target-id">{missile.id}</span>
                  <span className="target-sep">·</span>
                  <span className="target-metrics">{missile.mach}</span>
                  <span className="target-sep">·</span>
                  <span className="target-alt">{missile.altitude}</span>
                </div>
              </div>

              {/* Vector SVG Missile Graphic */}
              <img
                src="/assets/missile.svg?v=301041"
                alt={`ICBM Missile ${missile.id}`}
                className="svg-missile-unit"
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="missiles-footer-hint">
        <div
          className="hint-badge"
          id="btn-missiles-hint"
          role="button"
          tabIndex={0}
          title="Press Space"
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
