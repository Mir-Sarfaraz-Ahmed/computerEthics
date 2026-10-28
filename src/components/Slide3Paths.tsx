import React, { useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playChimePositive, playChimeWarning } from '../audio/soundEffects';

interface Slide3PathsProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
  onSelectState?: (state: PresentationState) => void;
}

export const Slide3Paths: React.FC<Slide3PathsProps> = ({
  currentState,
  onBack,
  onForward,
  onSelectState,
}) => {
  const isS3 = currentState === 's3intro';
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (!isS3) return;

    const handleMouseMove = (e: MouseEvent) => {
      parallaxRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 12;
      parallaxRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const render = () => {
      const p = parallaxRef.current;
      p.x += (p.tx - p.x) * 0.05;
      p.y += (p.ty - p.y) * 0.05;

      if (mediaWrapRef.current) {
        mediaWrapRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isS3]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onForward();
  };

  const handleChooseLegal = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChimePositive();
    onForward();
  };

  const handleChooseRisk = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChimeWarning();
    onForward();
  };

  return (
    <section
      className={`cinematic-slide paths-slide ${isS3 ? 'active' : ''}`}
      id="paths-slide"
      aria-hidden={!isS3}
      onClick={handleSlideClick}
    >
      {/* Full Background Stage (No Box, No Blur, Unclipped & Crystal Clear) */}
      <div className="slide-backdrop-wrap paths-fullscreen-wrap">
        <div ref={mediaWrapRef} className="paths-fullscreen-inner">
          <img
            src="/assets/paths_split_screen.jpg"
            alt="Two Paths. One Choice. The Ethical Contract vs The Free Illusion"
            className="paths-fullscreen-image"
          />

          {/* Interactive button hotspots mapped over graphic */}
          <button
            type="button"
            className="paths-hotspot-btn paths-hotspot-legal"
            title="Choose Legal (Path A)"
            aria-label="Choose Legal"
            onClick={handleChooseLegal}
          />

          <button
            type="button"
            className="paths-hotspot-btn paths-hotspot-risk"
            title="Choose Risk (Path B)"
            aria-label="Choose Risk"
            onClick={handleChooseRisk}
          />
        </div>
        <div className="slide-vignette" aria-hidden="true" />
      </div>

      {/* Floating Mac Keynote Header */}
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
          <span>Back</span>
        </button>

        <div className="slide-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }}
          />
          <span>CHAPTER 03 / THE CHOICE</span>
        </div>

        <div className="slide-step-indicator" id="slide3-step-indicator">
          <span className="step-dot active" id="slide3-dot-1" />
          <span className="step-dot" id="slide3-dot-2" />
          <span className="step-dot" id="slide3-dot-3" />
          <span className="step-dot" id="slide3-dot-4" />
        </div>
      </div>

      {/* Bottom Keynote Presenter Hint */}
      <div className="slide-footer-hint" id="slide3-footer-hint">
        <div
          className="hint-badge"
          id="btn-slide3-hint"
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
