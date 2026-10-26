/**
 * Presentation Keynote — Multi-Slide Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  let audioContext = null, soundEnabled = true;
  function initAudio() { if (!audioContext) { const A = window.AudioContext || window.webkitAudioContext; if (A) audioContext = new A(); } }
  function resumeAudio() { initAudio(); if (audioContext && audioContext.state === 'suspended') audioContext.resume(); }
  function playAppleChime() {
    if (!soundEnabled) return;
    try { resumeAudio(); if (!audioContext) return;
      const freqs = [92.5,138.59,185.0,233.08,277.18,369.99], now = audioContext.currentTime+0.05;
      freqs.forEach((f,i) => { const o=audioContext.createOscillator(), g=audioContext.createGain(); o.type=i<2?'triangle':'sine'; o.frequency.setValueAtTime(f,now); const v=0.06/(i+1); g.gain.setValueAtTime(0.0001,now); g.gain.exponentialRampToValueAtTime(v,now+0.14); g.gain.exponentialRampToValueAtTime(0.0001,now+3.0); o.connect(g); g.connect(audioContext.destination); o.start(now); o.stop(now+3.2); }); } catch(e){} }
  function playSlideWhoosh() {
    if (!soundEnabled) return;
    try { resumeAudio(); if (!audioContext) return;
      const now=audioContext.currentTime+0.02, o=audioContext.createOscillator(), g=audioContext.createGain(), f=audioContext.createBiquadFilter();
      o.type='sine'; o.frequency.setValueAtTime(140,now); o.frequency.exponentialRampToValueAtTime(45,now+1.2);
      f.type='lowpass'; f.frequency.setValueAtTime(260,now);
      g.gain.setValueAtTime(0.001,now); g.gain.exponentialRampToValueAtTime(0.08,now+0.15); g.gain.exponentialRampToValueAtTime(0.0001,now+1.4);
      o.connect(f); f.connect(g); g.connect(audioContext.destination); o.start(now); o.stop(now+1.5); } catch(e){} }
  function playQuestionRevealChord() {
    if (!soundEnabled) return;
    try { resumeAudio(); if (!audioContext) return;
      const now=audioContext.currentTime+0.02, freqs=[146.83,220,349.23,523.25,659.25,1318.51];
      freqs.forEach((freq,i) => { const o=audioContext.createOscillator(), g=audioContext.createGain(); o.type=i===0?'triangle':'sine'; o.frequency.setValueAtTime(freq,now); const v=i===freqs.length-1?0.015:0.04/(i+1); g.gain.setValueAtTime(0.0001,now); g.gain.exponentialRampToValueAtTime(v,now+0.22); g.gain.exponentialRampToValueAtTime(0.0001,now+3.8); o.connect(g); g.connect(audioContext.destination); o.start(now); o.stop(now+4.0); }); } catch(e){} }
  function playChimePositive() {
    if (!soundEnabled) return;
    try { resumeAudio(); if (!audioContext) return;
      const now=audioContext.currentTime+0.02, freqs=[523.25,659.25,783.99,1046.50];
      freqs.forEach((f,i) => { const o=audioContext.createOscillator(), g=audioContext.createGain(); o.type='sine'; o.frequency.setValueAtTime(f,now+i*0.06); g.gain.setValueAtTime(0.0001,now+i*0.06); g.gain.exponentialRampToValueAtTime(0.05,now+i*0.06+0.04); g.gain.exponentialRampToValueAtTime(0.0001,now+i*0.06+1.2); o.connect(g); g.connect(audioContext.destination); o.start(now+i*0.06); o.stop(now+i*0.06+1.4); }); } catch(e){} }
  function playChimeWarning() {
    if (!soundEnabled) return;
    try { resumeAudio(); if (!audioContext) return;
      const now=audioContext.currentTime+0.02;
      [233.08,329.63].forEach(f => { const o=audioContext.createOscillator(), g=audioContext.createGain(); o.type='sawtooth'; o.frequency.setValueAtTime(f,now); g.gain.setValueAtTime(0.0001,now); g.gain.exponentialRampToValueAtTime(0.04,now+0.04); g.gain.exponentialRampToValueAtTime(0.0001,now+0.85); o.connect(g); g.connect(audioContext.destination); o.start(now); o.stop(now+0.9); }); } catch(e){} }
  function playPaperPlaneSound() {
    if (!soundEnabled) return;
    try { resumeAudio(); if (!audioContext) return;
      const now=audioContext.currentTime+0.02, o=audioContext.createOscillator(), g=audioContext.createGain();
      o.type='sine'; o.frequency.setValueAtTime(180,now); o.frequency.exponentialRampToValueAtTime(680,now+0.9); o.frequency.exponentialRampToValueAtTime(280,now+1.5);
      g.gain.setValueAtTime(0.0001,now); g.gain.exponentialRampToValueAtTime(0.09,now+0.2); g.gain.exponentialRampToValueAtTime(0.0001,now+1.7);
      o.connect(g); g.connect(audioContext.destination); o.start(now); o.stop(now+1.8); } catch(e){} }

  // DOM Elements
  const helloScreen=document.getElementById('apple-hello-screen'), presentationStage=document.getElementById('presentation-stage');
  const cinematicSlide=document.getElementById('cinematic-slide'), slideContentCenter=document.getElementById('slide-content-center');
  const slideActionText=document.getElementById('slide-action-text'), stepDot1=document.getElementById('step-dot-1'), stepDot2=document.getElementById('step-dot-2');
  const btnSlideBack=document.getElementById('btn-slide-back'), btnRevealHint=document.getElementById('btn-reveal-hint'), btnEnter=document.getElementById('btn-enter'), slideBackdrop=document.getElementById('slide-backdrop');
  const dilemmaSlide=document.getElementById('dilemma-slide'), slide2BgGtav=document.getElementById('slide2-bg-gtav'), slide2BgBlank=document.getElementById('slide2-bg-blank'), slide2BgLeft=document.getElementById('slide2-bg-left'), slide2BgBoth=document.getElementById('slide2-bg-both'), slide2ScreenGlow=document.getElementById('slide2-screen-glow');
  const slide2Dots=[document.getElementById('slide2-dot-1'),document.getElementById('slide2-dot-2'),document.getElementById('slide2-dot-3'),document.getElementById('slide2-dot-4')];
  const pathsSlide=document.getElementById('paths-slide'), pathsCenter=document.getElementById('paths-center'), pathADetail=document.getElementById('path-a-detail'), pathBDetail=document.getElementById('path-b-detail');
  const pathACard=document.getElementById('path-a-card'), pathBCard=document.getElementById('path-b-card'), pathsVsDivider=document.getElementById('paths-vs-divider'), pathsChapterLabel=document.getElementById('paths-chapter-label');
  const btnSlide3Back=document.getElementById('btn-slide3-back'), slide3ActionText=document.getElementById('slide3-action-text'), btnSlide3Hint=document.getElementById('btn-slide3-hint');
  const slide3Dots=[document.getElementById('slide3-dot-1'),document.getElementById('slide3-dot-2'),document.getElementById('slide3-dot-3'),document.getElementById('slide3-dot-4'),document.getElementById('slide3-dot-5'),document.getElementById('slide3-dot-6')];
  const paperPlaneOverlay=document.getElementById('paper-plane-overlay');
  const ethicsSlide=document.getElementById('ethics-slide'), ethicsTitleWrap=document.getElementById('ethics-title-wrap'), ethicsDefinitionWrap=document.getElementById('ethics-definition-wrap');
  const btnSlide4Back=document.getElementById('btn-slide4-back'), slide4Dot1=document.getElementById('slide4-dot-1'), slide4Dot2=document.getElementById('slide4-dot-2'), slide4ActionText=document.getElementById('slide4-action-text'), btnSlide4Hint=document.getElementById('btn-slide4-hint');
  const btnReplayHello=document.getElementById('btn-replay-hello'), btnAudio=document.getElementById('btn-audio'), audioLabel=document.getElementById('audio-label'), btnTheme=document.getElementById('btn-theme'), themeLabel=document.getElementById('theme-label'), themeIcon=document.getElementById('theme-icon');

  const STATES={HELLO:'hello',COVER:'cover',SLIDE1_SCENE:'s1scene',SLIDE1_QUESTION:'s1q',SLIDE2_GTAV:'s2gtav',SLIDE2_BLANK:'s2blank',SLIDE2_LEFT:'s2left',SLIDE2_BOTH:'s2both',SLIDE3_INTRO:'s3intro',SLIDE3_PATH_A_OPEN:'s3aopen',SLIDE3_PATH_A_DONE:'s3adone',SLIDE3_PATH_B_OPEN:'s3bopen',SLIDE3_BOTH_DONE:'s3bothdone',SLIDE3_PLANE:'s3plane',SLIDE4_TITLE:'s4title',SLIDE4_DEFINITION:'s4def'};
  let currentState=STATES.HELLO, isHelloAnimating=false, helloTimeoutId=null, isPlaneAnimating=false, currentTheme='dark';

  // Hello sequence
  function runAppleHelloSequence() {
    if(helloTimeoutId){clearTimeout(helloTimeoutId);helloTimeoutId=null;}
    isHelloAnimating=true; currentState=STATES.HELLO;
    [dilemmaSlide,pathsSlide,ethicsSlide,cinematicSlide].forEach(s=>{if(s)s.classList.remove('active');});
    if(slideContentCenter)slideContentCenter.classList.remove('revealed');
    if(presentationStage)presentationStage.classList.remove('active','exited');
    helloScreen.classList.add('no-transition');
    helloScreen.classList.remove('dismissed','animating');
    const p1=document.getElementById('hello-path-1'),p2=document.getElementById('hello-path-2');
    if(p1)p1.style.animation='none'; if(p2)p2.style.animation='none';
    void helloScreen.offsetWidth;
    helloScreen.classList.remove('no-transition');
    if(p1)p1.style.animation=''; if(p2)p2.style.animation='';
    setTimeout(()=>{helloScreen.classList.add('animating');playAppleChime();},100);
    helloTimeoutId=setTimeout(()=>{helloScreen.classList.add('dismissed');presentationStage.classList.add('active');isHelloAnimating=false;currentState=STATES.COVER;},4200);
  }
  runAppleHelloSequence();
  if(btnReplayHello)btnReplayHello.addEventListener('click',e=>{e.stopPropagation();runAppleHelloSequence();});

  // Navigation functions
  function goToCover(){currentState=STATES.COVER;[dilemmaSlide,pathsSlide,ethicsSlide,cinematicSlide].forEach(s=>{if(s)s.classList.remove('active');});if(slideContentCenter)slideContentCenter.classList.remove('revealed');if(presentationStage){presentationStage.classList.remove('exited');presentationStage.classList.add('active');}}
  function goToSlide1Scene(){currentState=STATES.SLIDE1_SCENE;if(btnEnter){btnEnter.style.transform='scale(0.96)';setTimeout(()=>{btnEnter.style.transform='';},160);}if(presentationStage){presentationStage.classList.remove('active');presentationStage.classList.add('exited');}[dilemmaSlide,pathsSlide,ethicsSlide].forEach(s=>{if(s)s.classList.remove('active');});if(cinematicSlide)cinematicSlide.classList.add('active');if(slideContentCenter)slideContentCenter.classList.remove('revealed');if(stepDot1)stepDot1.classList.add('active');if(stepDot2)stepDot2.classList.remove('active');if(slideActionText)slideActionText.textContent='Click anywhere or press Space to reveal question';requestAnimationFrame(()=>playSlideWhoosh());}
  function revealSlide1Question(){currentState=STATES.SLIDE1_QUESTION;if(slideContentCenter)slideContentCenter.classList.add('revealed');if(stepDot1)stepDot1.classList.remove('active');if(stepDot2)stepDot2.classList.add('active');if(slideActionText)slideActionText.textContent='Press Space for Slide 02';requestAnimationFrame(()=>playQuestionRevealChord());}
  function updateDots(dots,i){dots.forEach((d,j)=>{if(d){if(j===i)d.classList.add('active');else d.classList.remove('active');}});}
  function goToSlide2Gtav(){currentState=STATES.SLIDE2_GTAV;if(cinematicSlide)cinematicSlide.classList.remove('active');if(pathsSlide)pathsSlide.classList.remove('active');if(dilemmaSlide)dilemmaSlide.classList.add('active');if(slide2BgGtav)slide2BgGtav.classList.add('active');[slide2BgBlank,slide2BgLeft,slide2BgBoth].forEach(b=>{if(b)b.classList.remove('active');});if(slide2ScreenGlow)slide2ScreenGlow.classList.remove('active');updateDots(slide2Dots,0);if(slide2ActionText)slide2ActionText.textContent='Click anywhere or press Space to continue';requestAnimationFrame(()=>playSlideWhoosh());}
  function goToSlide2Blank(){currentState=STATES.SLIDE2_BLANK;if(slide2BgGtav)slide2BgGtav.classList.remove('active');if(slide2BgBlank)slide2BgBlank.classList.add('active');if(slide2BgLeft)slide2BgLeft.classList.remove('active');if(slide2BgBoth)slide2BgBoth.classList.remove('active');if(slide2ScreenGlow)slide2ScreenGlow.classList.remove('active');updateDots(slide2Dots,1);if(slide2ActionText)slide2ActionText.textContent='Laptop blank -- click to power on left screen';requestAnimationFrame(()=>playSlideWhoosh());}
  function goToSlide2Left(){currentState=STATES.SLIDE2_LEFT;if(slide2BgGtav)slide2BgGtav.classList.remove('active');if(slide2BgBlank)slide2BgBlank.classList.remove('active');if(slide2BgLeft)slide2BgLeft.classList.add('active');if(slide2BgBoth)slide2BgBoth.classList.remove('active');if(slide2ScreenGlow)slide2ScreenGlow.classList.add('active');updateDots(slide2Dots,2);if(slide2ActionText)slide2ActionText.textContent='Left: Official Store -- click to reveal right side';requestAnimationFrame(()=>playChimePositive());}
  function goToSlide2Both(){currentState=STATES.SLIDE2_BOTH;[slide2BgGtav,slide2BgBlank,slide2BgLeft].forEach(b=>{if(b)b.classList.remove('active');});if(slide2BgBoth)slide2BgBoth.classList.add('active');if(slide2ScreenGlow)slide2ScreenGlow.classList.add('active');updateDots(slide2Dots,3);if(slide2ActionText)slide2ActionText.textContent='Both revealed -- click for Path A vs B discussion';requestAnimationFrame(()=>playChimePositive());}
  function nextSlide2(){if(currentState===STATES.SLIDE2_GTAV)goToSlide2Blank();else if(currentState===STATES.SLIDE2_BLANK)goToSlide2Left();else if(currentState===STATES.SLIDE2_LEFT)goToSlide2Both();else if(currentState===STATES.SLIDE2_BOTH)goToSlide3Intro();}
  function prevSlide2(){if(currentState===STATES.SLIDE2_BOTH)goToSlide2Left();else if(currentState===STATES.SLIDE2_LEFT)goToSlide2Blank();else if(currentState===STATES.SLIDE2_BLANK)goToSlide2Gtav();else if(currentState===STATES.SLIDE2_GTAV){if(dilemmaSlide)dilemmaSlide.classList.remove('active');revealSlide1Question();currentState=STATES.SLIDE1_QUESTION;}}

  // Slide 3 — Path A/B
  function resetPaths(){
    if(pathsCenter)pathsCenter.classList.remove('hidden-for-detail');
    if(pathADetail)pathADetail.classList.remove('visible');
    if(pathBDetail)pathBDetail.classList.remove('visible');
    [pathACard,pathBCard].forEach(c=>{if(c)c.classList.remove('visible','used','active-path','ready-pulse');});
    if(pathsVsDivider)pathsVsDivider.classList.remove('visible');
    if(pathsChapterLabel)pathsChapterLabel.classList.remove('visible');
  }

  function goToSlide3Intro(){
    currentState=STATES.SLIDE3_INTRO;
    if(dilemmaSlide)dilemmaSlide.classList.remove('active');
    if(ethicsSlide)ethicsSlide.classList.remove('active');
    if(pathsSlide)pathsSlide.classList.add('active');
    resetPaths();
    setTimeout(()=>{if(pathsChapterLabel)pathsChapterLabel.classList.add('visible');},100);
    setTimeout(()=>{if(pathACard)pathACard.classList.add('visible');if(pathsVsDivider)pathsVsDivider.classList.add('visible');},300);
    setTimeout(()=>{if(pathBCard)pathBCard.classList.add('visible');},480);
    updateDots(slide3Dots,0);
    if(slide3ActionText)slide3ActionText.textContent='Two paths -- click to open Path A first';
    requestAnimationFrame(()=>playSlideWhoosh());
  }

  function goToSlide3AOpen(){
    currentState=STATES.SLIDE3_PATH_A_OPEN;
    if(pathsCenter)pathsCenter.classList.add('hidden-for-detail');
    if(pathBDetail)pathBDetail.classList.remove('visible');
    setTimeout(()=>{if(pathADetail)pathADetail.classList.add('visible');},150);
    updateDots(slide3Dots,1);
    if(slide3ActionText)slide3ActionText.textContent='Path A active -- discuss, then click to continue';
    requestAnimationFrame(()=>playChimePositive());
  }

  function goToSlide3ADone(){
    currentState=STATES.SLIDE3_PATH_A_DONE;
    if(pathADetail)pathADetail.classList.remove('visible');
    if(pathBDetail)pathBDetail.classList.remove('visible');
    setTimeout(()=>{
      if(pathsCenter)pathsCenter.classList.remove('hidden-for-detail');
      if(pathACard){
        pathACard.classList.add('visible','used');
        pathACard.classList.remove('active-path','ready-pulse');
      }
      if(pathBCard){
        pathBCard.classList.add('visible','ready-pulse');
        pathBCard.classList.remove('used','active-path');
      }
      if(pathsVsDivider)pathsVsDivider.classList.add('visible');
      if(pathsChapterLabel)pathsChapterLabel.classList.add('visible');
    },150);
    updateDots(slide3Dots,2);
    if(slide3ActionText)slide3ActionText.textContent='Path A covered -- click to enter Path B';
    requestAnimationFrame(()=>playSlideWhoosh());
  }

  function goToSlide3BOpen(){
    currentState=STATES.SLIDE3_PATH_B_OPEN;
    if(pathsCenter)pathsCenter.classList.add('hidden-for-detail');
    if(pathADetail)pathADetail.classList.remove('visible');
    setTimeout(()=>{if(pathBDetail)pathBDetail.classList.add('visible');},150);
    updateDots(slide3Dots,3);
    if(slide3ActionText)slide3ActionText.textContent='Path B active -- discuss, then click to continue';
    requestAnimationFrame(()=>playChimeWarning());
  }

  function goToSlide3BothDone(){
    currentState=STATES.SLIDE3_BOTH_DONE;
    if(pathADetail)pathADetail.classList.remove('visible');
    if(pathBDetail)pathBDetail.classList.remove('visible');
    setTimeout(()=>{
      if(pathsCenter)pathsCenter.classList.remove('hidden-for-detail');
      if(pathACard){
        pathACard.classList.add('visible','used');
        pathACard.classList.remove('active-path','ready-pulse');
      }
      if(pathBCard){
        pathBCard.classList.add('visible','used');
        pathBCard.classList.remove('active-path','ready-pulse');
      }
      if(pathsVsDivider)pathsVsDivider.classList.add('visible');
      if(pathsChapterLabel)pathsChapterLabel.classList.add('visible');
    },150);
    updateDots(slide3Dots,4);
    if(slide3ActionText)slide3ActionText.textContent='Both paths explored -- click to proceed to Chapter 04';
    requestAnimationFrame(()=>playSlideWhoosh());
  }

  function launchPaperPlane(){
    if(isPlaneAnimating)return; isPlaneAnimating=true; currentState=STATES.SLIDE3_PLANE; updateDots(slide3Dots,5);
    requestAnimationFrame(()=>playPaperPlaneSound());
    if(paperPlaneOverlay){
      paperPlaneOverlay.classList.remove('active');
      void paperPlaneOverlay.offsetWidth;
      paperPlaneOverlay.classList.add('active');
    }
    setTimeout(()=>{
      if(pathsSlide)pathsSlide.classList.remove('active');
      goToSlide4Title();
    },1400);
    setTimeout(()=>{
      if(paperPlaneOverlay){
        paperPlaneOverlay.classList.remove('active');
      }
      isPlaneAnimating=false;
    },2100);
  }

  function nextSlide3(){
    if(currentState===STATES.SLIDE3_INTRO)goToSlide3AOpen();
    else if(currentState===STATES.SLIDE3_PATH_A_OPEN)goToSlide3ADone();
    else if(currentState===STATES.SLIDE3_PATH_A_DONE)goToSlide3BOpen();
    else if(currentState===STATES.SLIDE3_PATH_B_OPEN)goToSlide3BothDone();
    else if(currentState===STATES.SLIDE3_BOTH_DONE)launchPaperPlane();
  }

  function prevSlide3(){
    if(currentState===STATES.SLIDE3_BOTH_DONE)goToSlide3BOpen();
    else if(currentState===STATES.SLIDE3_PATH_B_OPEN)goToSlide3ADone();
    else if(currentState===STATES.SLIDE3_PATH_A_DONE)goToSlide3AOpen();
    else if(currentState===STATES.SLIDE3_PATH_A_OPEN)goToSlide3Intro();
    else if(currentState===STATES.SLIDE3_INTRO){if(pathsSlide)pathsSlide.classList.remove('active');goToSlide2Both();}
  }

  // Slide 4
  function goToSlide4Title(){currentState=STATES.SLIDE4_TITLE;if(ethicsSlide)ethicsSlide.classList.add('active');if(ethicsDefinitionWrap)ethicsDefinitionWrap.classList.remove('visible');setTimeout(()=>{if(ethicsTitleWrap)ethicsTitleWrap.classList.add('visible');},80);if(slide4Dot1)slide4Dot1.classList.add('active');if(slide4Dot2)slide4Dot2.classList.remove('active');if(slide4ActionText)slide4ActionText.textContent='Click to reveal the definition';requestAnimationFrame(()=>playSlideWhoosh());}
  function goToSlide4Definition(){currentState=STATES.SLIDE4_DEFINITION;if(ethicsDefinitionWrap)ethicsDefinitionWrap.classList.add('visible');if(slide4Dot1)slide4Dot1.classList.remove('active');if(slide4Dot2)slide4Dot2.classList.add('active');if(slide4ActionText)slide4ActionText.textContent='Definition revealed';requestAnimationFrame(()=>playQuestionRevealChord());}
  function nextSlide4(){if(currentState===STATES.SLIDE4_TITLE)goToSlide4Definition();}
  function prevSlide4(){if(currentState===STATES.SLIDE4_DEFINITION){currentState=STATES.SLIDE4_TITLE;if(ethicsDefinitionWrap)ethicsDefinitionWrap.classList.remove('visible');if(slide4Dot1)slide4Dot1.classList.add('active');if(slide4Dot2)slide4Dot2.classList.remove('active');if(slide4ActionText)slide4ActionText.textContent='Click to reveal the definition';}else if(currentState===STATES.SLIDE4_TITLE){if(ethicsSlide)ethicsSlide.classList.remove('active');if(ethicsTitleWrap)ethicsTitleWrap.classList.remove('visible');goToSlide3BothDone();}}

  // Button listeners
  if(btnEnter)btnEnter.addEventListener('click',e=>{e.stopPropagation();goToSlide1Scene();});
  if(btnSlideBack)btnSlideBack.addEventListener('click',e=>{e.stopPropagation();goToCover();});
  if(btnSlide2Back)btnSlide2Back.addEventListener('click',e=>{e.stopPropagation();if(dilemmaSlide)dilemmaSlide.classList.remove('active');revealSlide1Question();currentState=STATES.SLIDE1_QUESTION;});
  if(btnSlide3Back)btnSlide3Back.addEventListener('click',e=>{e.stopPropagation();if(pathsSlide)pathsSlide.classList.remove('active');goToSlide2Both();});
  if(btnSlide4Back)btnSlide4Back.addEventListener('click',e=>{e.stopPropagation();if(ethicsSlide)ethicsSlide.classList.remove('active');if(ethicsTitleWrap)ethicsTitleWrap.classList.remove('visible');if(ethicsDefinitionWrap)ethicsDefinitionWrap.classList.remove('visible');goToSlide3BothDone();});
  if(btnRevealHint)btnRevealHint.addEventListener('click',e=>{e.stopPropagation();if(currentState===STATES.SLIDE1_SCENE)revealSlide1Question();else if(currentState===STATES.SLIDE1_QUESTION)goToSlide2Gtav();});
  if(btnSlide2Hint)btnSlide2Hint.addEventListener('click',e=>{e.stopPropagation();nextSlide2();});
  if(btnSlide3Hint)btnSlide3Hint.addEventListener('click',e=>{e.stopPropagation();nextSlide3();});
  if(btnSlide4Hint)btnSlide4Hint.addEventListener('click',e=>{e.stopPropagation();nextSlide4();});
  if(cinematicSlide)cinematicSlide.addEventListener('click',e=>{if(e.target.closest('#btn-slide-back'))return;if(currentState===STATES.SLIDE1_SCENE)revealSlide1Question();else if(currentState===STATES.SLIDE1_QUESTION)goToSlide2Gtav();});
  if(dilemmaSlide)dilemmaSlide.addEventListener('click',e=>{if(e.target.closest('#btn-slide2-back')||e.target.closest('#btn-slide2-hint'))return;nextSlide2();});
  if(pathsSlide)pathsSlide.addEventListener('click',e=>{if(e.target.closest('#btn-slide3-back')||e.target.closest('#btn-slide3-hint'))return;if(!isPlaneAnimating)nextSlide3();});
  if(ethicsSlide)ethicsSlide.addEventListener('click',e=>{if(e.target.closest('#btn-slide4-back')||e.target.closest('#btn-slide4-hint'))return;nextSlide4();});

  const s2States=[STATES.SLIDE2_GTAV,STATES.SLIDE2_BLANK,STATES.SLIDE2_LEFT,STATES.SLIDE2_BOTH];
  const s3States=[STATES.SLIDE3_INTRO,STATES.SLIDE3_PATH_A_OPEN,STATES.SLIDE3_PATH_A_DONE,STATES.SLIDE3_PATH_B_OPEN,STATES.SLIDE3_BOTH_DONE];
  const s4States=[STATES.SLIDE4_TITLE,STATES.SLIDE4_DEFINITION];

  window.addEventListener('keydown',e=>{
    if(isHelloAnimating||isPlaneAnimating)return;
    if(e.code==='Space'||e.code==='Enter'||e.code==='ArrowRight'){
      e.preventDefault();
      if(currentState===STATES.COVER)goToSlide1Scene();
      else if(currentState===STATES.SLIDE1_SCENE)revealSlide1Question();
      else if(currentState===STATES.SLIDE1_QUESTION)goToSlide2Gtav();
      else if(s2States.includes(currentState))nextSlide2();
      else if(s3States.includes(currentState))nextSlide3();
      else if(s4States.includes(currentState))nextSlide4();
    } else if(e.code==='ArrowLeft'||e.code==='Backspace'){
      e.preventDefault();
      if(s2States.includes(currentState))prevSlide2();
      else if(s3States.includes(currentState))prevSlide3();
      else if(s4States.includes(currentState))prevSlide4();
      else if(currentState===STATES.SLIDE1_QUESTION){currentState=STATES.SLIDE1_SCENE;if(slideContentCenter)slideContentCenter.classList.remove('revealed');if(stepDot1)stepDot1.classList.add('active');if(stepDot2)stepDot2.classList.remove('active');if(slideActionText)slideActionText.textContent='Click anywhere or press Space to reveal question';}
      else if(currentState===STATES.SLIDE1_SCENE)goToCover();
    } else if(e.code==='Escape'){
      if(s2States.includes(currentState)){if(dilemmaSlide)dilemmaSlide.classList.remove('active');revealSlide1Question();currentState=STATES.SLIDE1_QUESTION;}
      else if(s3States.includes(currentState)){if(pathsSlide)pathsSlide.classList.remove('active');goToSlide2Both();}
      else if(s4States.includes(currentState)){if(ethicsSlide)ethicsSlide.classList.remove('active');if(ethicsTitleWrap)ethicsTitleWrap.classList.remove('visible');if(ethicsDefinitionWrap)ethicsDefinitionWrap.classList.remove('visible');goToSlide3BothDone();}
      else if(currentState===STATES.SLIDE1_QUESTION||currentState===STATES.SLIDE1_SCENE)goToCover();
    }
  });

  // Parallax
  const sp={x:0,y:0,tx:0,ty:0};
  window.addEventListener('mousemove',e=>{sp.tx=(e.clientX/window.innerWidth-0.5)*-18;sp.ty=(e.clientY/window.innerHeight-0.5)*-12;});
  function renderParallax(){
    sp.x+=(sp.tx-sp.x)*0.06; sp.y+=(sp.ty-sp.y)*0.06;
    if(slideBackdrop&&(currentState===STATES.SLIDE1_SCENE||currentState===STATES.SLIDE1_QUESTION))slideBackdrop.style.transform=`scale(1.04) translate3d(${sp.x}px,${sp.y}px,0)`;
    if(s2States.includes(currentState))[slide2BgGtav,slide2BgBlank,slide2BgLeft,slide2BgBoth].forEach(b=>{if(b&&b.classList.contains('active'))b.style.transform=`scale(1.04) translate3d(${sp.x*0.8}px,${sp.y*0.8}px,0)`;});
    requestAnimationFrame(renderParallax);
  }
  requestAnimationFrame(renderParallax);

  // Slide 1 particles
  const sc=document.getElementById('slide-particle-canvas');
  if(sc){const ctx2=sc.getContext('2d');let sw=0,sh=0;const dr=window.devicePixelRatio||1;function rsz(){sw=window.innerWidth;sh=window.innerHeight;sc.width=sw*dr;sc.height=sh*dr;ctx2.scale(dr,dr);}window.addEventListener('resize',rsz);rsz();const pts=[];for(let i=0;i<45;i++){const cy=Math.random()<0.5;pts.push({type:cy?'cyber':'amber',x:cy?Math.random()*(sw*0.48):sw*0.52+Math.random()*(sw*0.48),y:Math.random()*sh,r:cy?(Math.random()<0.3?2.5:1.4):(Math.random()*2.2+0.8),vy:cy?-(Math.random()*0.45+0.2):-(Math.random()*0.3+0.1),vx:(Math.random()-0.5)*0.25,op:Math.random()*0.65+0.2,ps:Math.random()*0.02+0.01,ph:Math.random()*Math.PI*2});}function rp(t){if(currentState===STATES.SLIDE1_SCENE||currentState===STATES.SLIDE1_QUESTION){ctx2.clearRect(0,0,sw,sh);pts.forEach(p=>{p.y+=p.vy;p.x+=Math.sin(t*0.001+p.ph)*0.25;if(p.y<-10){p.y=sh+10;p.x=p.type==='cyber'?Math.random()*(sw*0.48):sw*0.52+Math.random()*(sw*0.48);}const op=p.op*(0.7+Math.sin(t*p.ps+p.ph)*0.3);ctx2.beginPath();if(p.type==='cyber'){ctx2.fillStyle=`rgba(56,189,248,${op})`;ctx2.shadowColor='#38bdf8';ctx2.shadowBlur=8;}else{ctx2.fillStyle=`rgba(251,191,36,${op})`;ctx2.shadowColor='#f59e0b';ctx2.shadowBlur=6;}ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);ctx2.fill();});ctx2.shadowBlur=0;}requestAnimationFrame(rp);}requestAnimationFrame(rp);}

  // Ambient canvas
  const ac=document.getElementById('ambient-canvas');
  if(ac){const ctx3=ac.getContext('2d');let aw=0,ah=0;const da=window.devicePixelRatio||1;function rszA(){aw=window.innerWidth;ah=window.innerHeight;ac.width=aw*da;ac.height=ah*da;ctx3.scale(da,da);}window.addEventListener('resize',rszA);rszA();const mouse={x:aw/2,y:ah/2,tx:aw/2,ty:ah/2};window.addEventListener('mousemove',e=>{mouse.tx=e.clientX;mouse.ty=e.clientY;});const orbs=[{bx:0.32,by:0.38,r:440,dc:'rgba(56,189,248,0.16)',lc:'rgba(14,165,233,0.12)',sx:0.00042,sy:0.0005,ph:0},{bx:0.68,by:0.42,r:480,dc:'rgba(99,102,241,0.18)',lc:'rgba(129,140,248,0.14)',sx:-0.00035,sy:0.00038,ph:Math.PI/3},{bx:0.5,by:0.68,r:420,dc:'rgba(139,92,246,0.14)',lc:'rgba(192,132,252,0.1)',sx:0.00048,sy:-0.00032,ph:Math.PI},{bx:0.42,by:0.56,r:380,dc:'rgba(244,63,94,0.08)',lc:'rgba(251,113,133,0.08)',sx:-0.00038,sy:-0.00042,ph:Math.PI*1.5}];
  function rA(t){if(currentState===STATES.COVER||currentState===STATES.HELLO){mouse.x+=(mouse.tx-mouse.x)*0.04;mouse.y+=(mouse.ty-mouse.y)*0.04;const mx=(mouse.x/aw-0.5)*80,my=(mouse.y/ah-0.5)*80;ctx3.clearRect(0,0,aw,ah);ctx3.globalCompositeOperation=currentTheme==='dark'?'screen':'multiply';orbs.forEach(o=>{const xo=Math.sin(t*o.sx+o.ph)*(aw*0.12),yo=Math.cos(t*o.sy+o.ph)*(ah*0.12),cx2=o.bx*aw+xo+mx,cy2=o.by*ah+yo+my,oc=currentTheme==='dark'?o.dc:o.lc,g=ctx3.createRadialGradient(cx2,cy2,0,cx2,cy2,o.r);g.addColorStop(0,oc);g.addColorStop(0.5,oc.replace(/[\d\.]+\)$/,'0.04)'));g.addColorStop(1,'rgba(0,0,0,0)');ctx3.fillStyle=g;ctx3.beginPath();ctx3.arc(cx2,cy2,o.r,0,Math.PI*2);ctx3.fill();});}requestAnimationFrame(rA);}requestAnimationFrame(rA);}

  // Theme & sound
  function applyTheme(t){currentTheme=t;if(t==='light'){document.body.classList.remove('theme-dark');document.body.classList.add('theme-light');if(themeLabel)themeLabel.textContent='Dark Mode';if(themeIcon)themeIcon.textContent='moon';}else{document.body.classList.remove('theme-light');document.body.classList.add('theme-dark');if(themeLabel)themeLabel.textContent='Light Mode';if(themeIcon)themeIcon.textContent='sun';}}
  if(btnTheme)btnTheme.addEventListener('click',e=>{e.stopPropagation();applyTheme(currentTheme==='dark'?'light':'dark');});
  if(btnAudio)btnAudio.addEventListener('click',e=>{e.stopPropagation();soundEnabled=!soundEnabled;if(soundEnabled){if(audioLabel)audioLabel.textContent='Sound On';btnAudio.style.opacity='1';playAppleChime();}else{if(audioLabel)audioLabel.textContent='Sound Off';btnAudio.style.opacity='0.6';}});
  const bF=document.getElementById('btn-fullscreen'),bC=document.getElementById('btn-close'),bM=document.getElementById('btn-minimize');
  if(bF)bF.addEventListener('click',e=>{e.stopPropagation();if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});else document.exitFullscreen().catch(()=>{});});
  if(bC)bC.addEventListener('click',e=>{e.stopPropagation();showToast('Keynote in Presentation Mode');});
  if(bM)bM.addEventListener('click',e=>{e.stopPropagation();showToast('Presentation Active');});

  function showToast(msg){const ex=document.getElementById('mac-toast');if(ex)ex.remove();const t=document.createElement('div');t.id='mac-toast';t.textContent=msg;t.style.cssText='position:fixed;bottom:56px;left:50%;transform:translateX(-50%) translateY(20px);padding:10px 24px;background:rgba(18,20,29,0.88);border:1px solid rgba(255,255,255,0.16);border-radius:999px;color:#f8fafc;font-size:0.82rem;font-weight:500;box-shadow:0 12px 32px rgba(0,0,0,0.45);backdrop-filter:blur(20px);z-index:99999;opacity:0;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);pointer-events:none;';document.body.appendChild(t);requestAnimationFrame(()=>{t.style.opacity='1';t.style.transform='translateX(-50%) translateY(0)';});setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(-50%) translateY(10px)';setTimeout(()=>t.remove(),400);},2800);}
});
