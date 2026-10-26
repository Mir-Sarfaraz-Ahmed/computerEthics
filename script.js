/**
 * Presentation Keynote — Apple "hello" Effect & Multi-Slide Engine
 * Includes:
 * 1. Audio Engine (Web Audio API Synthesizer)
 * 2. Authentic Apple "hello" handwriting sequence with replay support
 * 3. macOS header controls (theme toggle, sound toggle, window actions)
 * 4. Ambient aura canvas for the cover stage
 * 5. Slide 01: The Duality of Computer Ethics
 *    - Step 1: Ultra-cinematic visual scene only (parallax & dual particle atmosphere)
 *    - Step 2: Dramatic reveal of "WHAT IS COMPUTER ETHICS, ACTUALLY?"
 * 6. Slide 02: The Piracy Dilemma ("You've probably seen this before.")
 *    - Step 1: Split-screen choice (Official Store vs. Cracked Portal) with interactive inspection hotspots
 *    - Step 2: The 3 Philosophical Pillars & Live Audience Ethics Poll
 * 7. Keynote presenter keyboard & mouse navigation (<kbd>→</kbd>, <kbd>←</kbd>, <kbd>Space</kbd>, <kbd>Esc</kbd>)
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Audio Engine (Web Audio API Synthesizer)
  // -------------------------------------------------------------
  let audioContext = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
  }

  function resumeAudio() {
    initAudio();
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  // Apple F# Major Startup Chime
  function playAppleChime() {
    if (!soundEnabled) return;
    try {
      resumeAudio();
      if (!audioContext) return;

      const frequencies = [92.5, 138.59, 185.0, 233.08, 277.18, 369.99];
      const now = audioContext.currentTime + 0.05;

      frequencies.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = idx < 2 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const baseVolume = 0.06 / (idx + 1);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(baseVolume, now + 0.14);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(now);
        osc.stop(now + 3.2);
      });
    } catch (e) {
      console.warn('Audio chime skipped:', e);
    }
  }

  // Slide Enter Cinematic Whoosh / Low Resonance
  function playSlideWhoosh() {
    if (!soundEnabled) return;
    try {
      resumeAudio();
      if (!audioContext) return;

      const now = audioContext.currentTime + 0.02;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch (e) {
      console.warn('Slide whoosh skipped:', e);
    }
  }

  // Dramatic Philosophical Question Reveal Chord
  function playQuestionRevealChord() {
    if (!soundEnabled) return;
    try {
      resumeAudio();
      if (!audioContext) return;

      const now = audioContext.currentTime + 0.02;
      const freqs = [146.83, 220.00, 349.23, 523.25, 659.25, 1318.51];

      freqs.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const vol = idx === freqs.length - 1 ? 0.015 : 0.04 / (idx + 1);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(vol, now + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch (e) {
      console.warn('Question chord skipped:', e);
    }
  }

  // Positive Ethical Verification Chime (Path A)
  function playChimePositive() {
    if (!soundEnabled) return;
    try {
      resumeAudio();
      if (!audioContext) return;

      const now = audioContext.currentTime + 0.02;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major Arpeggio

      freqs.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.05, now + idx * 0.06 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.4);
      });
    } catch (e) {
      console.warn('Positive chime skipped:', e);
    }
  }

  // Security Warning Dissonance Tone (Path B)
  function playChimeWarning() {
    if (!soundEnabled) return;
    try {
      resumeAudio();
      if (!audioContext) return;

      const now = audioContext.currentTime + 0.02;
      const freqs = [233.08, 329.63]; // Tritone dissonance

      freqs.forEach((freq) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(now);
        osc.stop(now + 0.9);
      });
    } catch (e) {
      console.warn('Warning chime skipped:', e);
    }
  }

  // -------------------------------------------------------------
  // 2. DOM Elements & State Management
  // -------------------------------------------------------------
  const helloScreen = document.getElementById('apple-hello-screen');
  const presentationStage = document.getElementById('presentation-stage');
  
  // Slide 1 Elements
  const cinematicSlide = document.getElementById('cinematic-slide');
  const slideContentCenter = document.getElementById('slide-content-center');
  const slideActionText = document.getElementById('slide-action-text');
  const stepDot1 = document.getElementById('step-dot-1');
  const stepDot2 = document.getElementById('step-dot-2');
  const btnSlideBack = document.getElementById('btn-slide-back');
  const btnRevealHint = document.getElementById('btn-reveal-hint');
  const btnEnter = document.getElementById('btn-enter');
  const slideBackdrop = document.getElementById('slide-backdrop');

  // Slide 2 Elements
  const dilemmaSlide = document.getElementById('dilemma-slide');
  const slide2BgGtav = document.getElementById('slide2-bg-gtav');
  const slide2BgBlank = document.getElementById('slide2-bg-blank');
  const slide2BgLeft = document.getElementById('slide2-bg-left');
  const slide2BgBoth = document.getElementById('slide2-bg-both');
  const slide2ScreenGlow = document.getElementById('slide2-screen-glow');
  const dilemmaHeaderWrap = document.getElementById('dilemma-header-wrap');
  const btnSlide2Back = document.getElementById('btn-slide2-back');
  const slide2Dots = [
    document.getElementById('slide2-dot-1'),
    document.getElementById('slide2-dot-2'),
    document.getElementById('slide2-dot-3'),
    document.getElementById('slide2-dot-4'),
    document.getElementById('slide2-dot-5')
  ];
  const slide2ActionText = document.getElementById('slide2-action-text');
  const btnSlide2Hint = document.getElementById('btn-slide2-hint');

  // Header Bar Elements
  const btnReplayHello = document.getElementById('btn-replay-hello');
  const btnAudio = document.getElementById('btn-audio');
  const audioLabel = document.getElementById('audio-label');
  const btnTheme = document.getElementById('btn-theme');
  const themeLabel = document.getElementById('theme-label');
  const themeIcon = document.getElementById('theme-icon');

  // Presentation State Machine
  const STATES = {
    HELLO: 'hello',
    COVER: 'cover',
    SLIDE1_SCENE: 'slide1_scene',
    SLIDE1_QUESTION: 'slide1_question',
    SLIDE2_GTAV_SCENE: 'slide2_gtav_scene',
    SLIDE2_GTAV_TEXT: 'slide2_gtav_text',
    SLIDE2_DESK_BLANK: 'slide2_desk_blank',
    SLIDE2_DESK_LEFT: 'slide2_desk_left',
    SLIDE2_DESK_BOTH: 'slide2_desk_both'
  };
  let currentState = STATES.HELLO;

  // -------------------------------------------------------------
  // 3. Apple "hello" Handwriting Animation Sequence
  // -------------------------------------------------------------
  let isHelloAnimating = false;
  let helloTimeoutId = null;

  function runAppleHelloSequence() {
    if (helloTimeoutId) {
      clearTimeout(helloTimeoutId);
      helloTimeoutId = null;
    }
    isHelloAnimating = true;
    currentState = STATES.HELLO;

    // Reset all slides and stages
    dilemmaSlide.classList.remove('active', 'active-breakdown');
    cinematicSlide.classList.remove('active');
    slideContentCenter.classList.remove('revealed');
    presentationStage.classList.remove('active', 'exited');

    // Reset hello screen classes
    helloScreen.classList.add('no-transition');
    helloScreen.classList.remove('dismissed', 'animating');

    const path1 = document.getElementById('hello-path-1');
    const path2 = document.getElementById('hello-path-2');
    if (path1) path1.style.animation = 'none';
    if (path2) path2.style.animation = 'none';

    void helloScreen.offsetWidth;
    helloScreen.classList.remove('no-transition');
    if (path1) path1.style.animation = '';
    if (path2) path2.style.animation = '';

    setTimeout(() => {
      helloScreen.classList.add('animating');
      playAppleChime();
    }, 100);

    helloTimeoutId = setTimeout(() => {
      helloScreen.classList.add('dismissed');
      presentationStage.classList.add('active');
      isHelloAnimating = false;
      currentState = STATES.COVER;
    }, 4200);
  }

  // Trigger Apple "hello" on page load
  runAppleHelloSequence();

  if (btnReplayHello) {
    btnReplayHello.addEventListener('click', (e) => {
      e.stopPropagation();
      runAppleHelloSequence();
    });
  }

  // -------------------------------------------------------------
  // 4. Slide Navigation & Step Progression
  // -------------------------------------------------------------
  
  // Transition to Cover Stage ("Are You Ready ?")
  function goToCover() {
    currentState = STATES.COVER;
    dilemmaSlide.classList.remove('active', 'active-breakdown');
    cinematicSlide.classList.remove('active');
    slideContentCenter.classList.remove('revealed');
    presentationStage.classList.remove('exited');
    presentationStage.classList.add('active');
  }

  // Transition to Slide 1 (STEP 1: Scene & Atmosphere ONLY)
  function goToSlide1Scene() {
    currentState = STATES.SLIDE1_SCENE;

    if (btnEnter) {
      btnEnter.style.transform = 'scale(0.96)';
      setTimeout(() => { btnEnter.style.transform = ''; }, 160);
    }

    presentationStage.classList.remove('active');
    presentationStage.classList.add('exited');

    dilemmaSlide.classList.remove('active', 'active-breakdown');
    cinematicSlide.classList.add('active');
    slideContentCenter.classList.remove('revealed');

    if (stepDot1) stepDot1.classList.add('active');
    if (stepDot2) stepDot2.classList.remove('active');

    if (slideActionText) {
      slideActionText.textContent = 'Click anywhere or press Space to reveal question';
    }

    playSlideWhoosh();
  }

  // Slide 1 (STEP 2: Theatrical Reveal of Question)
  function revealSlide1Question() {
    currentState = STATES.SLIDE1_QUESTION;

    slideContentCenter.classList.add('revealed');

    if (stepDot1) stepDot1.classList.remove('active');
    if (stepDot2) stepDot2.classList.add('active');

    if (slideActionText) {
      slideActionText.textContent = 'Question Active · Press Space or Click for Slide 02';
    }

    // Schedule audio asynchronously so GPU renders frame 0 immediately without micro-stutter
    requestAnimationFrame(() => {
      playQuestionRevealChord();
    });
  }

  // -------------------------------------------------------------
  // 4b. Slide 2: The GTA V Case Study (5-Step Master Sequence)
  // -------------------------------------------------------------
  function updateSlide2StepDot(activeIndex) {
    slide2Dots.forEach((dot, idx) => {
      if (dot) {
        if (idx === activeIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      }
    });
  }

  // Step 1: GTA V Intro Scene (Visual Only)
  function goToSlide2GtavScene() {
    currentState = STATES.SLIDE2_GTAV_SCENE;

    cinematicSlide.classList.remove('active');
    dilemmaSlide.classList.add('active');

    // Show GTA V intro backdrop only
    if (slide2BgGtav) slide2BgGtav.classList.add('active');
    if (slide2BgBlank) slide2BgBlank.classList.remove('active');
    if (slide2BgLeft) slide2BgLeft.classList.remove('active');
    if (slide2BgBoth) slide2BgBoth.classList.remove('active');
    if (slide2ScreenGlow) slide2ScreenGlow.classList.remove('active');

    // Hide headline until revealed on click
    if (dilemmaHeaderWrap) dilemmaHeaderWrap.classList.remove('visible');

    updateSlide2StepDot(0);

    if (slide2ActionText) {
      slide2ActionText.textContent = 'Click anywhere or press Space to reveal';
    }

    requestAnimationFrame(() => {
      playSlideWhoosh();
    });
  }

  // Step 2: Pop "You Have Seen This Before."
  function revealSlide2GtavText() {
    currentState = STATES.SLIDE2_GTAV_TEXT;

    if (dilemmaHeaderWrap) dilemmaHeaderWrap.classList.add('visible');

    updateSlide2StepDot(1);

    if (slide2ActionText) {
      slide2ActionText.textContent = 'Press Space to enter the case study →';
    }

    requestAnimationFrame(() => {
      playQuestionRevealChord();
    });
  }

  // Step 3: Switch to Real-World Desk Scene with BLANK Laptop Screen
  function revealSlide2DeskBlank() {
    currentState = STATES.SLIDE2_DESK_BLANK;

    // Switch backdrop to Blank Laptop Screen
    if (slide2BgGtav) slide2BgGtav.classList.remove('active');
    if (slide2BgBlank) slide2BgBlank.classList.add('active');
    if (slide2BgLeft) slide2BgLeft.classList.remove('active');
    if (slide2BgBoth) slide2BgBoth.classList.remove('active');
    if (slide2ScreenGlow) slide2ScreenGlow.classList.remove('active');

    if (dilemmaHeaderWrap) dilemmaHeaderWrap.classList.add('visible');

    updateSlide2StepDot(2);

    if (slide2ActionText) {
      slide2ActionText.textContent = 'Laptop display blank · Press Space to power on display →';
    }

    requestAnimationFrame(() => {
      playSlideWhoosh();
    });
  }

  // Step 4: Laptop Screen Powers On LEFT Half (The Official / Paid Store: ₹1,999)
  function revealSlide2DeskLeft() {
    currentState = STATES.SLIDE2_DESK_LEFT;

    // Switch backdrop to Left Half Only
    if (slide2BgGtav) slide2BgGtav.classList.remove('active');
    if (slide2BgBlank) slide2BgBlank.classList.remove('active');
    if (slide2BgLeft) slide2BgLeft.classList.add('active');
    if (slide2BgBoth) slide2BgBoth.classList.remove('active');
    if (slide2ScreenGlow) slide2ScreenGlow.classList.add('active');

    updateSlide2StepDot(3);

    if (slide2ActionText) {
      slide2ActionText.textContent = 'Left partition: Official Store (₹1,999) · Press Space for alternative →';
    }

    requestAnimationFrame(() => {
      playChimePositive();
    });
  }

  // Step 5: Laptop Screen Powers On RIGHT Half (The Cracked Portal)
  function revealSlide2DeskBoth() {
    currentState = STATES.SLIDE2_DESK_BOTH;

    // Switch backdrop to Both Halves
    if (slide2BgGtav) slide2BgGtav.classList.remove('active');
    if (slide2BgBlank) slide2BgBlank.classList.remove('active');
    if (slide2BgLeft) slide2BgLeft.classList.remove('active');
    if (slide2BgBoth) slide2BgBoth.classList.add('active');
    if (slide2ScreenGlow) slide2ScreenGlow.classList.add('active');

    updateSlide2StepDot(4);

    if (slide2ActionText) {
      slide2ActionText.textContent = 'Both partitions active · Press Space for Path A vs Path B discussion →';
    }

    requestAnimationFrame(() => {
      playChimePositive();
    });
  }

  // Forward Navigation within Slide 2
  function nextSlide2Step() {
    if (currentState === STATES.SLIDE2_GTAV_SCENE) {
      revealSlide2GtavText();
    } else if (currentState === STATES.SLIDE2_GTAV_TEXT) {
      revealSlide2DeskBlank();
    } else if (currentState === STATES.SLIDE2_DESK_BLANK) {
      revealSlide2DeskLeft();
    } else if (currentState === STATES.SLIDE2_DESK_LEFT) {
      revealSlide2DeskBoth();
    } else if (currentState === STATES.SLIDE2_DESK_BOTH) {
      showToast('Case Study Active · Path A vs Path B discussion on Slide 03');
    }
  }

  // Backward Navigation within Slide 2
  function prevSlide2Step() {
    if (currentState === STATES.SLIDE2_DESK_BOTH) {
      revealSlide2DeskLeft();
    } else if (currentState === STATES.SLIDE2_DESK_LEFT) {
      revealSlide2DeskBlank();
    } else if (currentState === STATES.SLIDE2_DESK_BLANK) {
      // Step back to GTA V text view
      currentState = STATES.SLIDE2_GTAV_TEXT;
      if (slide2BgGtav) slide2BgGtav.classList.add('active');
      if (slide2BgBlank) slide2BgBlank.classList.remove('active');
      if (slide2BgLeft) slide2BgLeft.classList.remove('active');
      if (slide2BgBoth) slide2BgBoth.classList.remove('active');
      if (dilemmaHeaderWrap) dilemmaHeaderWrap.classList.add('visible');
      updateSlide2StepDot(1);
      if (slide2ActionText) slide2ActionText.textContent = 'Press Space to enter the case study →';
    } else if (currentState === STATES.SLIDE2_GTAV_TEXT) {
      goToSlide2GtavScene();
    } else if (currentState === STATES.SLIDE2_GTAV_SCENE) {
      dilemmaSlide.classList.remove('active');
      cinematicSlide.classList.add('active');
      revealSlide1Question();
    }
  }

  // -------------------------------------------------------------
  // 5. Button Listeners & Slide Click Handlers
  // -------------------------------------------------------------
  
  if (btnEnter) {
    btnEnter.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide1Scene();
    });
  }

  // Slide 1 Back to Cover
  if (btnSlideBack) {
    btnSlideBack.addEventListener('click', (e) => {
      e.stopPropagation();
      goToCover();
    });
  }

  // Slide 2 Back to Slide 1
  if (btnSlide2Back) {
    btnSlide2Back.addEventListener('click', (e) => {
      e.stopPropagation();
      dilemmaSlide.classList.remove('active');
      cinematicSlide.classList.add('active');
      revealSlide1Question();
    });
  }

  // Slide 1 Hint Badge Click
  if (btnRevealHint) {
    btnRevealHint.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentState === STATES.SLIDE1_SCENE) {
        revealSlide1Question();
      } else if (currentState === STATES.SLIDE1_QUESTION) {
        goToSlide2GtavScene();
      }
    });
  }

  // Slide 2 Hint Badge Click
  if (btnSlide2Hint) {
    btnSlide2Hint.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide2Step();
    });
  }

  // Clicking anywhere on Slide 1
  if (cinematicSlide) {
    cinematicSlide.addEventListener('click', (e) => {
      if (e.target.closest('#btn-slide-back')) return;

      if (currentState === STATES.SLIDE1_SCENE) {
        revealSlide1Question();
      } else if (currentState === STATES.SLIDE1_QUESTION) {
        goToSlide2GtavScene();
      }
    });
  }

  // Clicking anywhere on Slide 2
  if (dilemmaSlide) {
    dilemmaSlide.addEventListener('click', (e) => {
      if (e.target.closest('#btn-slide2-back')) return;
      if (e.target.closest('#btn-slide2-hint')) return;

      nextSlide2Step();
    });
  }

  // -------------------------------------------------------------
  // 8. Global Keyboard Navigation (Keynote Presenter Experience)
  // -------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (isHelloAnimating) return;

    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
      e.preventDefault();
      if (currentState === STATES.COVER) {
        goToSlide1Scene();
      } else if (currentState === STATES.SLIDE1_SCENE) {
        revealSlide1Question();
      } else if (currentState === STATES.SLIDE1_QUESTION) {
        goToSlide2GtavScene();
      } else if (
        currentState === STATES.SLIDE2_GTAV_SCENE ||
        currentState === STATES.SLIDE2_GTAV_TEXT ||
        currentState === STATES.SLIDE2_DESK_BLANK ||
        currentState === STATES.SLIDE2_DESK_LEFT ||
        currentState === STATES.SLIDE2_DESK_BOTH
      ) {
        nextSlide2Step();
      }
    } else if (e.code === 'ArrowLeft' || e.code === 'Backspace') {
      e.preventDefault();
      if (
        currentState === STATES.SLIDE2_GTAV_SCENE ||
        currentState === STATES.SLIDE2_GTAV_TEXT ||
        currentState === STATES.SLIDE2_DESK_BLANK ||
        currentState === STATES.SLIDE2_DESK_LEFT ||
        currentState === STATES.SLIDE2_DESK_BOTH
      ) {
        prevSlide2Step();
      } else if (currentState === STATES.SLIDE1_QUESTION) {
        // Step back to Slide 1 Scene
        currentState = STATES.SLIDE1_SCENE;
        slideContentCenter.classList.remove('revealed');
        if (stepDot1) stepDot1.classList.add('active');
        if (stepDot2) stepDot2.classList.remove('active');
        if (slideActionText) {
          slideActionText.textContent = 'Click anywhere or press Space to reveal question';
        }
      } else if (currentState === STATES.SLIDE1_SCENE) {
        goToCover();
      }
    } else if (e.code === 'Escape') {
      if (
        currentState === STATES.SLIDE2_GTAV_SCENE ||
        currentState === STATES.SLIDE2_GTAV_TEXT ||
        currentState === STATES.SLIDE2_DESK_BLANK ||
        currentState === STATES.SLIDE2_DESK_LEFT ||
        currentState === STATES.SLIDE2_DESK_BOTH
      ) {
        dilemmaSlide.classList.remove('active');
        cinematicSlide.classList.add('active');
        revealSlide1Question();
      } else if (currentState === STATES.SLIDE1_QUESTION || currentState === STATES.SLIDE1_SCENE) {
        goToCover();
      }
    }
  });

  // -------------------------------------------------------------
  // 9. Interactive Mouse Parallax on Slide Backdrops
  // -------------------------------------------------------------
  const slideParallax = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  };

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;
    slideParallax.targetX = normX * -18;
    slideParallax.targetY = normY * -12;
  });

  function renderParallax() {
    slideParallax.x += (slideParallax.targetX - slideParallax.x) * 0.06;
    slideParallax.y += (slideParallax.targetY - slideParallax.y) * 0.06;

    if (slideBackdrop && (currentState === STATES.SLIDE1_SCENE || currentState === STATES.SLIDE1_QUESTION)) {
      slideBackdrop.style.transform = `scale(1.04) translate3d(${slideParallax.x}px, ${slideParallax.y}px, 0)`;
    }

    const isSlide2 = (
      currentState === STATES.SLIDE2_GTAV_SCENE ||
      currentState === STATES.SLIDE2_GTAV_TEXT ||
      currentState === STATES.SLIDE2_DESK_BLANK ||
      currentState === STATES.SLIDE2_DESK_LEFT ||
      currentState === STATES.SLIDE2_DESK_BOTH
    );

    if (isSlide2) {
      const allDilemmaBackdrops = [slide2BgGtav, slide2BgBlank, slide2BgLeft, slide2BgBoth];
      allDilemmaBackdrops.forEach((bg) => {
        if (bg && bg.classList.contains('active')) {
          bg.style.transform = `scale(1.04) translate3d(${slideParallax.x * 0.8}px, ${slideParallax.y * 0.8}px, 0)`;
        }
      });
    }

    requestAnimationFrame(renderParallax);
  }
  requestAnimationFrame(renderParallax);

  // -------------------------------------------------------------
  // 10. Dual-Atmosphere Slide 1 Particle Canvas
  // -------------------------------------------------------------
  const slideCanvas = document.getElementById('slide-particle-canvas');
  if (slideCanvas) {
    const sCtx = slideCanvas.getContext('2d');
    let sWidth = 0;
    let sHeight = 0;
    const sDpr = window.devicePixelRatio || 1;

    function resizeSlideCanvas() {
      sWidth = window.innerWidth;
      sHeight = window.innerHeight;
      slideCanvas.width = sWidth * sDpr;
      slideCanvas.height = sHeight * sDpr;
      sCtx.scale(sDpr, sDpr);
    }
    window.addEventListener('resize', resizeSlideCanvas);
    resizeSlideCanvas();

    const particles = [];
    const PARTICLE_COUNT = 45;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isCyber = Math.random() < 0.5;
      particles.push({
        type: isCyber ? 'cyber' : 'amber',
        x: isCyber ? Math.random() * (sWidth * 0.48) : sWidth * 0.52 + Math.random() * (sWidth * 0.48),
        y: Math.random() * sHeight,
        radius: isCyber ? (Math.random() < 0.3 ? 2.5 : 1.4) : (Math.random() * 2.2 + 0.8),
        speedY: isCyber ? -(Math.random() * 0.45 + 0.2) : -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.65 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }

    function renderSlideParticles(time) {
      if (currentState === STATES.SLIDE1_SCENE || currentState === STATES.SLIDE1_QUESTION) {
        sCtx.clearRect(0, 0, sWidth, sHeight);

        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += Math.sin(time * 0.001 + p.phase) * 0.25;

          if (p.y < -10) {
            p.y = sHeight + 10;
            p.x = p.type === 'cyber' ? Math.random() * (sWidth * 0.48) : sWidth * 0.52 + Math.random() * (sWidth * 0.48);
          }

          const currentOpacity = p.opacity * (0.7 + Math.sin(time * p.pulseSpeed + p.phase) * 0.3);

          sCtx.beginPath();
          if (p.type === 'cyber') {
            sCtx.fillStyle = `rgba(56, 189, 248, ${currentOpacity})`;
            sCtx.shadowColor = '#38bdf8';
            sCtx.shadowBlur = 8;
            sCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          } else {
            sCtx.fillStyle = `rgba(251, 191, 36, ${currentOpacity})`;
            sCtx.shadowColor = '#f59e0b';
            sCtx.shadowBlur = 6;
            sCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          }
          sCtx.fill();
        });

        sCtx.shadowBlur = 0;
      }

      requestAnimationFrame(renderSlideParticles);
    }
    requestAnimationFrame(renderSlideParticles);
  }

  // -------------------------------------------------------------
  // 11. Ambient Aura Canvas for Cover Page ("Are You Ready ?")
  // -------------------------------------------------------------
  const ambientCanvas = document.getElementById('ambient-canvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    const dpr = window.devicePixelRatio || 1;

    function resizeAmbientCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      ambientCanvas.width = width * dpr;
      ambientCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resizeAmbientCanvas);
    resizeAmbientCanvas();

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2
    };

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    const orbs = [
      {
        baseX: 0.32,
        baseY: 0.38,
        radius: 440,
        darkColor: 'rgba(56, 189, 248, 0.16)',
        lightColor: 'rgba(14, 165, 233, 0.12)',
        speedX: 0.00042,
        speedY: 0.0005,
        phase: 0
      },
      {
        baseX: 0.68,
        baseY: 0.42,
        radius: 480,
        darkColor: 'rgba(99, 102, 241, 0.18)',
        lightColor: 'rgba(129, 140, 248, 0.14)',
        speedX: -0.00035,
        speedY: 0.00038,
        phase: Math.PI / 3
      },
      {
        baseX: 0.5,
        baseY: 0.68,
        radius: 420,
        darkColor: 'rgba(139, 92, 246, 0.14)',
        lightColor: 'rgba(192, 132, 252, 0.1)',
        speedX: 0.00048,
        speedY: -0.00032,
        phase: Math.PI
      },
      {
        baseX: 0.42,
        baseY: 0.56,
        radius: 380,
        darkColor: 'rgba(244, 63, 94, 0.08)',
        lightColor: 'rgba(251, 113, 133, 0.08)',
        speedX: -0.00038,
        speedY: -0.00042,
        phase: Math.PI * 1.5
      }
    ];

    function renderAmbient(time) {
      if (currentState === STATES.COVER || currentState === STATES.HELLO) {
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;

        const mouseNormX = (mouse.x / width - 0.5) * 80;
        const mouseNormY = (mouse.y / height - 0.5) * 80;

        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = currentTheme === 'dark' ? 'screen' : 'multiply';

        orbs.forEach((orb) => {
          const xOffset = Math.sin(time * orb.speedX + orb.phase) * (width * 0.12);
          const yOffset = Math.cos(time * orb.speedY + orb.phase) * (height * 0.12);

          const cx = orb.baseX * width + xOffset + mouseNormX;
          const cy = orb.baseY * height + yOffset + mouseNormY;

          const orbColor = currentTheme === 'dark' ? orb.darkColor : orb.lightColor;
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.radius);
          gradient.addColorStop(0, orbColor);
          gradient.addColorStop(0.5, orbColor.replace(/[\d\.]+\)$/, '0.04)'));
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(cx, cy, orb.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      requestAnimationFrame(renderAmbient);
    }

    requestAnimationFrame(renderAmbient);
  }

  // -------------------------------------------------------------
  // 12. Theme & Sound Controls
  // -------------------------------------------------------------
  let currentTheme = 'dark';

  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      if (themeLabel) themeLabel.textContent = 'Dark Mode';
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      if (themeLabel) themeLabel.textContent = 'Light Mode';
      if (themeIcon) themeIcon.textContent = '☀️';
    }
  }

  if (btnTheme) {
    btnTheme.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  if (btnAudio) {
    btnAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        if (audioLabel) audioLabel.textContent = 'Sound On';
        btnAudio.style.opacity = '1';
        playAppleChime();
      } else {
        if (audioLabel) audioLabel.textContent = 'Sound Off';
        btnAudio.style.opacity = '0.6';
      }
    });
  }

  // Fullscreen & Window Controls
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnClose = document.getElementById('btn-close');
  const btnMin = document.getElementById('btn-minimize');

  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Keynote in Presentation Mode');
    });
  }

  if (btnMin) {
    btnMin.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Presentation Active');
    });
  }

  // -------------------------------------------------------------
  // 13. Micro Toast System
  // -------------------------------------------------------------
  function showToast(message) {
    const existingToast = document.getElementById('mac-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'mac-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 56px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      padding: 10px 24px;
      background: rgba(18, 20, 29, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      color: #f8fafc;
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), 0 0 20px rgba(245, 158, 11, 0.2);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      z-index: 99999;
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }
});
