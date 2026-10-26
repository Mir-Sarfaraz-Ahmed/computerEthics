import React, { useState, useEffect, useRef } from 'react';
import { PresentationState } from '../types/presentation';
import { playTypewriterKeystroke, resumeAudio } from '../audio/soundEffects';

interface Slide6DateProps {
  currentState: PresentationState;
  onBack: () => void;
  onForward: () => void;
}

const TARGET_TEXT = '26 SEPTEMBER 1983';

export const Slide6Date: React.FC<Slide6DateProps> = ({
  currentState,
  onBack,
  onForward,
}) => {
  const isDateActive = currentState === 's6date';
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const timeoutsRef = useRef<number[]>([]);

  // Clear pending timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (!isDateActive) {
      clearAllTimeouts();
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }

    // Reset and start typewriter effect
    clearAllTimeouts();
    setDisplayedText('');
    setIsTypingComplete(false);
    resumeAudio();

    // Dramatic initial silence before first keystroke
    const startDelay = 550;
    let accumulatedDelay = startDelay;

    for (let i = 0; i < TARGET_TEXT.length; i++) {
      const char = TARGET_TEXT[i];
      // Humanized typing cadence with micro-variations
      const cadence = char === ' ' ? 160 : 105 + Math.floor(Math.random() * 35);
      accumulatedDelay += cadence;

      const timeoutId = window.setTimeout(() => {
        setDisplayedText(TARGET_TEXT.slice(0, i + 1));
        playTypewriterKeystroke(char === ' ');

        if (i === TARGET_TEXT.length - 1) {
          setIsTypingComplete(true);
        }
      }, accumulatedDelay);

      timeoutsRef.current.push(timeoutId);
    }

    return () => {
      clearAllTimeouts();
    };
  }, [isDateActive]);

  const handleSlideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    // If clicked while still typing, instantly complete the text; otherwise advance
    if (!isTypingComplete) {
      clearAllTimeouts();
      setDisplayedText(TARGET_TEXT);
      setIsTypingComplete(true);
      playTypewriterKeystroke(false);
    } else {
      onForward();
    }
  };

  return (
    <section
      className={`cinematic-slide date-slide ${isDateActive ? 'active' : ''}`}
      id="date-slide"
      aria-hidden={!isDateActive}
      onClick={handleSlideClick}
    >
      {/* Floating Header */}
      <div className="slide-floating-nav">
        <button
          className="slide-nav-back"
          id="btn-date-back"
          title="Back to Slide 5 (The Choice)"
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
          <span>Slide 05</span>
        </button>

        <div className="slide-chapter-tag" id="date-chapter-tag">
          <span
            className="slide-tag-dot"
            style={{
              background: '#ffffff',
              boxShadow: '0 0 10px #ffffff, 0 0 20px rgba(255, 255, 255, 0.6)',
            }}
          ></span>
          <span>CHAPTER 06</span>
        </div>
      </div>

      {/* Stark Black Center Content: pure text "26 SEPTEMBER 1983" */}
      <div className="date-content-wrap">
        <div className="date-typewriter-container" aria-live="polite">
          <span className="date-text">{displayedText}</span>
          <span
            className={`date-cursor ${isTypingComplete ? 'blinking' : 'solid'}`}
            aria-hidden="true"
          >
            _
          </span>
        </div>
      </div>

      {/* Footer Navigation Hint */}
      <div className="slide-footer-hint" id="date-footer-hint">
        <div
          className="hint-badge"
          id="btn-date-hint"
          role="button"
          tabIndex={0}
          title="Press Space"
          aria-label="Advance"
          onClick={(e) => {
            e.stopPropagation();
            if (!isTypingComplete) {
              clearAllTimeouts();
              setDisplayedText(TARGET_TEXT);
              setIsTypingComplete(true);
            } else {
              onForward();
            }
          }}
        >
          <span className="kbd-key">Space</span>
        </div>
      </div>
    </section>
  );
};
