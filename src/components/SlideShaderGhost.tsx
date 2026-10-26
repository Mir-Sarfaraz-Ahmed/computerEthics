import React from 'react';
import { PresentationState } from '../types/presentation';
import { MeshGradientSVG } from './ui/shader-svg';

interface SlideShaderGhostProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

export const SlideShaderGhost: React.FC<SlideShaderGhostProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isShader = currentState === 's2shader';

  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onForward();
  };

  return (
    <section
      className={`cinematic-slide shader-slide ${isShader ? 'active' : ''}`}
      id="shader-slide"
      aria-hidden={!isShader}
      onClick={handleSlideClick}
    >
      {/* Deep atmospheric backdrop */}
      <div className="slide-backdrop-wrap">
        <div className="slide-backdrop shader-backdrop" id="shader-backdrop"></div>
        <div className="slide-vignette" aria-hidden="true"></div>
      </div>

      {/* Floating Mac Keynote Header */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-shader-back"
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
            style={{ background: '#ec4899', boxShadow: '0 0 10px #ec4899' }}
          ></span>
          <span>CHAPTER 02 / THE DIGITAL CONSCIENCE</span>
        </div>

        <div className="slide-step-indicator" id="shader-step-indicator">
          <span className="step-dot active" id="shader-dot-1"></span>
        </div>
      </div>

      {/* Center Stage Presentation Content */}
      <div className="shader-content-wrap">
        <div className="shader-header-text">
          <div className="shader-eyebrow">WHAT'S YOUR CHOICE</div>
          <h2 className="shader-main-title">
            <span>Every choice leaves a</span>{' '}
            <span className="shader-glow-word">footprint.</span>
          </h2>
        </div>

        {/* Interactive MeshGradient SVG with responsive eye tracking */}
        <div className="shader-interactive-stage">
          <div className="shader-glow-aura" aria-hidden="true"></div>
          <MeshGradientSVG />
        </div>
      </div>

      {/* Bottom Keynote Spacebar Hint */}
      <div className="slide-footer-hint" id="shader-footer-hint">
        <div
          className="hint-badge"
          id="btn-shader-hint"
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
