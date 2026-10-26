import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PresentationState } from './types/presentation';
import {
  playAppleChime,
  playSlideWhoosh,
  playQuestionRevealChord,
  playChimePositive,
  playChimeWarning,
  resumeAudio,
  toggleSound,
  isSoundEnabled,
} from './audio/soundEffects';

import { AppleHello } from './components/AppleHello';
import { CoverStage } from './components/CoverStage';
import { Slide1Introduction } from './components/Slide1Introduction';
import { Slide2Dilemma } from './components/Slide2Dilemma';
import { SlideShaderGhost } from './components/SlideShaderGhost';
import { Slide3Paths } from './components/Slide3Paths';
import { Slide3Cost } from './components/Slide3Cost';
import { Slide4Definition } from './components/Slide4Definition';
import { SlideChoice } from './components/SlideChoice';
import { Slide6Date } from './components/Slide6Date';
import { Slide7WW3 } from './components/Slide7WW3';
import { Slide8Alert } from './components/Slide8Alert';
import { Slide9Missiles } from './components/Slide9Missiles';
import { Slide10Petrov } from './components/Slide10Petrov';
import { Slide11Story } from './components/Slide11Story';
import { Slide12Meta } from './components/Slide12Meta';
import { Slide12Ghost } from './components/Slide12Ghost';
import { Slide13Video } from './components/Slide13Video';

export const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<PresentationState>('hello');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [replayTrigger] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  // Default keynote dark theme
  useEffect(() => {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const handleToggleSound = useCallback(() => {
    const updated = toggleSound();
    setIsSoundOn(updated);
  }, []);

  const dismissHello = useCallback(() => {
    setCurrentState('cover');
  }, []);

  // Forward Navigation
  const navigateForward = useCallback(() => {
    resumeAudio();

    if (currentState === 'hello') {
      dismissHello();
      return;
    }

    if (currentState === 'cover') {
      setCurrentState('s1scene');
      playSlideWhoosh();
    } else if (currentState === 's1scene') {
      setCurrentState('s1q');
      playQuestionRevealChord();
    } else if (currentState === 's1q') {
      setCurrentState('s2scene1');
      playSlideWhoosh();
    } else if (currentState === 's2scene1') {
      setCurrentState('s2scene2');
      playChimePositive();
    } else if (currentState === 's2scene2') {
      setCurrentState('s2scene3');
      playChimePositive();
    } else if (currentState === 's2scene3') {
      setCurrentState('s2shader');
      playSlideWhoosh();
    } else if (currentState === 's2shader') {
      setCurrentState('s3intro');
      playSlideWhoosh();
    } else if (currentState === 's3intro') {
      setCurrentState('s3cost');
      playSlideWhoosh();
    } else if (currentState === 's3cost') {
      setCurrentState('s4title');
      playSlideWhoosh();
    } else if (currentState === 's4title') {
      setCurrentState('s4def');
      playQuestionRevealChord();
    } else if (currentState === 's4def') {
      setCurrentState('s5choice');
      playSlideWhoosh();
    } else if (currentState === 's5choice') {
      setCurrentState('s6date');
      playSlideWhoosh();
    } else if (currentState === 's6date') {
      setCurrentState('s7ww3');
    } else if (currentState === 's7ww3') {
      setCurrentState('s8alert');
      playSlideWhoosh();
    } else if (currentState === 's8alert') {
      setCurrentState('s9missiles');
    } else if (currentState === 's9missiles') {
      setCurrentState('s10petrov');
      playSlideWhoosh();
    } else if (currentState === 's10petrov') {
      setCurrentState('s11story');
      playSlideWhoosh();
    } else if (currentState === 's11story') {
      setCurrentState('s12meta');
      playSlideWhoosh();
    } else if (currentState === 's12meta') {
      setCurrentState('s12ghost');
      playSlideWhoosh();
    } else if (currentState === 's12ghost') {
      setCurrentState('s13video');
      playSlideWhoosh();
    } else if (currentState === 's13video') {
      setCurrentState('cover');
      playAppleChime();
    }
  }, [currentState, dismissHello]);

  // Backward Navigation
  const navigateBackward = useCallback(() => {
    resumeAudio();

    if (currentState === 'hello') {
      dismissHello();
      return;
    }

    if (currentState === 's13video') {
      setCurrentState('s12ghost');
    } else if (currentState === 's12ghost') {
      setCurrentState('s12meta');
    } else if (currentState === 's12meta') {
      setCurrentState('s11story');
    } else if (currentState === 's11story') {
      setCurrentState('s10petrov');
    } else if (currentState === 's10petrov') {
      setCurrentState('s9missiles');
    } else if (currentState === 's9missiles') {
      setCurrentState('s8alert');
    } else if (currentState === 's8alert') {
      setCurrentState('s7ww3');
    } else if (currentState === 's7ww3') {
      setCurrentState('s6date');
    } else if (currentState === 's6date') {
      setCurrentState('s5choice');
    } else if (currentState === 's5choice') {
      setCurrentState('s4def');
    } else if (currentState === 's4def') {
      setCurrentState('s4title');
    } else if (currentState === 's4title') {
      setCurrentState('s3cost');
    } else if (currentState === 's3cost') {
      setCurrentState('s3intro');
    } else if (currentState === 's3intro') {
      setCurrentState('s2shader');
    } else if (currentState === 's2shader') {
      setCurrentState('s2scene3');
    } else if (currentState === 's2scene3') {
      setCurrentState('s2scene2');
    } else if (currentState === 's2scene2') {
      setCurrentState('s2scene1');
    } else if (currentState === 's2scene1') {
      setCurrentState('s1q');
    } else if (currentState === 's1q') {
      setCurrentState('s1scene');
    } else if (currentState === 's1scene') {
      setCurrentState('cover');
    }
  }, [currentState, dismissHello]);

  // Keyboard navigation
  useEffect(() => {
    const FORWARD_CODES = new Set(['Space', 'Enter', 'ArrowRight', 'ArrowDown', 'PageDown']);
    const BACKWARD_CODES = new Set(['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']);
    const FORWARD_KEYS = new Set([' ', 'Enter', 'ArrowRight', 'ArrowDown', 'PageDown', 'Right', 'Down']);
    const BACKWARD_KEYS = new Set(['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'Left', 'Up']);

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (FORWARD_CODES.has(e.code) || FORWARD_KEYS.has(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        navigateForward();
      } else if (BACKWARD_CODES.has(e.code) || BACKWARD_KEYS.has(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        navigateBackward();
      } else if (e.code === 'Escape' || e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (currentState === 's13video') {
          setCurrentState('s12ghost');
        } else if (currentState === 's12ghost') {
          setCurrentState('s12meta');
        } else if (currentState === 's12meta') {
          setCurrentState('s11story');
        } else if (currentState === 's11story') {
          setCurrentState('s10petrov');
        } else if (currentState === 's10petrov') {
          setCurrentState('s9missiles');
        } else if (currentState === 's9missiles') {
          setCurrentState('s8alert');
        } else if (currentState === 's7ww3') {
          setCurrentState('s6date');
        } else if (currentState === 's6date') {
          setCurrentState('s5choice');
        } else if (currentState === 's5choice') {
          setCurrentState('s4def');
        } else if (currentState === 's4def' || currentState === 's4title') {
          setCurrentState('s3intro');
        } else if (currentState.startsWith('s3')) {
          setCurrentState('s2shader');
        } else if (currentState === 's2shader') {
          setCurrentState('s2scene3');
        } else if (currentState.startsWith('s2')) {
          setCurrentState('s1q');
        } else if (currentState === 's1q' || currentState === 's1scene') {
          setCurrentState('cover');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [currentState, navigateForward, navigateBackward]);


  return (
    <>
      {/* Apple Hello Screen */}
      <AppleHello
        isActive={currentState === 'hello'}
        onDismiss={dismissHello}
        replayTrigger={replayTrigger}
      />

      {/* Cover / Presentation Stage */}
      <CoverStage
        isActive={currentState === 'cover'}
        isSoundOn={isSoundOn}
        onEnter={() => {
          setCurrentState('s1scene');
          playSlideWhoosh();
        }}
        onToggleSound={handleToggleSound}
        onShowToast={showToast}
      />

      {/* Slide 1: Introduction */}
      <Slide1Introduction
        currentState={currentState}
        onBack={() => setCurrentState('cover')}
        onForward={navigateForward}
      />

      {/* Slide 2: Dilemma */}
      <Slide2Dilemma
        currentState={currentState}
        onBack={() => setCurrentState('s1q')}
        onForward={navigateForward}
      />

      {/* Slide: Shader Ghost / The Digital Conscience */}
      <SlideShaderGhost
        currentState={currentState}
        onBack={() => setCurrentState('s2scene3')}
        onForward={navigateForward}
      />

      {/* Slide 3: Paths */}
      <Slide3Paths
        currentState={currentState}
        onBack={() => setCurrentState('s2shader')}
        onForward={navigateForward}
      />

      {/* Slide 3.5: Free for you, but at what cost? */}
      <Slide3Cost
        currentState={currentState}
        onBack={() => setCurrentState('s3intro')}
        onForward={navigateForward}
      />

      {/* Slide 4: Definition */}
      <Slide4Definition
        currentState={currentState}
        onBack={() => setCurrentState('s3cost')}
        onForward={navigateForward}
      />

      {/* Slide 5: The Choice */}
      <SlideChoice
        currentState={currentState}
        onBack={() => setCurrentState('s4def')}
        onForward={navigateForward}
      />

      {/* Slide 6: 26 SEPTEMBER 1983 */}
      <Slide6Date
        currentState={currentState}
        onBack={() => setCurrentState('s5choice')}
        onForward={navigateForward}
      />

      {/* Slide 7: WORLD WAR 3 */}
      <Slide7WW3
        currentState={currentState}
        onBack={() => setCurrentState('s6date')}
        onForward={navigateForward}
      />

      {/* Slide 8: РАКЕТНЫЙ УДАР / MISSILE ATTACK */}
      <Slide8Alert
        currentState={currentState}
        onBack={() => setCurrentState('s7ww3')}
        onForward={navigateForward}
      />

      {/* Slide 9: 5 Missiles in Chevron Formation */}
      <Slide9Missiles
        currentState={currentState}
        onBack={() => setCurrentState('s8alert')}
        onForward={navigateForward}
      />

      {/* Slide 10: Stanislav Yevgrafovich Petrov */}
      <Slide10Petrov
        currentState={currentState}
        onBack={() => setCurrentState('s9missiles')}
        onForward={navigateForward}
      />

      {/* Slide 11: The Man Who Saved The World & Ethical Conflict */}
      <Slide11Story
        currentState={currentState}
        onBack={() => setCurrentState('s10petrov')}
        onForward={navigateForward}
      />

      {/* Slide 12: Metacognitive Intelligence (Whole Fullscreen Background) */}
      <Slide12Meta
        currentState={currentState}
        onBack={() => setCurrentState('s11story')}
        onForward={navigateForward}
      />

      {/* Slide 13: The Ghost (Cyber Entity & Shadow Threat) */}
      <Slide12Ghost
        currentState={currentState}
        onBack={() => setCurrentState('s12meta')}
        onForward={navigateForward}
      />

      {/* Slide 13: Fullscreen Theatrical Video Player */}
      <Slide13Video
        currentState={currentState}
        videoUrl="https://youtu.be/JzBaVohSC5s"
        onBack={() => setCurrentState('s12ghost')}
        onForward={navigateForward}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="mac-toast"
          style={{
            position: 'fixed',
            bottom: '56px',
            left: '50%',
            transform: 'translateX(-50%) translateY(0)',
            padding: '10px 24px',
            background: 'rgba(18, 20, 29, 0.88)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '999px',
            color: '#f8fafc',
            fontSize: '0.82rem',
            fontWeight: 500,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(20px)',
            zIndex: 99999,
            opacity: 1,
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default App;
