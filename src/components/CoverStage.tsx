import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types/presentation';
import { MacHeader } from './MacHeader';

interface CoverStageProps {
  isActive: boolean;
  currentTheme: ThemeMode;
  isSoundOn: boolean;
  onEnter: () => void;
  onReplayHello: () => void;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onShowToast: (msg: string) => void;
}

export const CoverStage: React.FC<CoverStageProps> = ({
  isActive,
  currentTheme,
  isSoundOn,
  onEnter,
  onReplayHello,
  onToggleTheme,
  onToggleSound,
  onShowToast,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let aw = window.innerWidth;
    let ah = window.innerHeight;
    const da = window.devicePixelRatio || 1;

    function resize() {
      aw = window.innerWidth;
      ah = window.innerHeight;
      if (!canvas || !ctx) return;
      canvas.width = aw * da;
      canvas.height = ah * da;
      ctx.scale(da, da);
    }

    resize();
    window.addEventListener('resize', resize);

    mouseRef.current = { x: aw / 2, y: ah / 2, tx: aw / 2, ty: ah / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const orbs = [
      { bx: 0.32, by: 0.38, r: 440, dc: 'rgba(56,189,248,0.16)', lc: 'rgba(14,165,233,0.12)', sx: 0.00042, sy: 0.0005, ph: 0 },
      { bx: 0.68, by: 0.42, r: 480, dc: 'rgba(99,102,241,0.18)', lc: 'rgba(129,140,248,0.14)', sx: -0.00035, sy: 0.00038, ph: Math.PI / 3 },
      { bx: 0.5, by: 0.68, r: 420, dc: 'rgba(139,92,246,0.14)', lc: 'rgba(192,132,252,0.1)', sx: 0.00048, sy: -0.00032, ph: Math.PI },
      { bx: 0.42, by: 0.56, r: 380, dc: 'rgba(244,63,94,0.08)', lc: 'rgba(251,113,133,0.08)', sx: -0.00038, sy: -0.00042, ph: Math.PI * 1.5 },
    ];

    let animId: number;

    function render(t: number) {
      if (!ctx || !canvas) return;
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.04;
      m.y += (m.ty - m.y) * 0.04;

      const mx = (m.x / aw - 0.5) * 80;
      const my = (m.y / ah - 0.5) * 80;

      ctx.clearRect(0, 0, aw, ah);
      ctx.globalCompositeOperation = currentTheme === 'dark' ? 'screen' : 'multiply';

      orbs.forEach((o) => {
        const xo = Math.sin(t * o.sx + o.ph) * (aw * 0.12);
        const yo = Math.cos(t * o.sy + o.ph) * (ah * 0.12);
        const cx2 = o.bx * aw + xo + mx;
        const cy2 = o.by * ah + yo + my;
        const oc = currentTheme === 'dark' ? o.dc : o.lc;

        const g = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, o.r);
        g.addColorStop(0, oc);
        g.addColorStop(0.5, oc.replace(/[\d.]+\)$/, '0.04)'));
        g.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx2, cy2, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentTheme]);

  return (
    <main className={`presentation-stage ${isActive ? 'active' : ''}`} id="presentation-stage">
      <canvas ref={canvasRef} id="ambient-canvas" className="ambient-canvas" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true"></div>
      <div className="ambient-grain" aria-hidden="true"></div>

      <MacHeader
        currentTheme={currentTheme}
        isSoundOn={isSoundOn}
        onReplayHello={onReplayHello}
        onToggleTheme={onToggleTheme}
        onToggleSound={onToggleSound}
        onShowToast={onShowToast}
      />

      <div className="hero-stage">
        <div className="hero-title-container">
          <h1 className="hero-title">
            <span className="title-line shimmer-text">Are You Ready ?</span>
          </h1>
          <p className="hero-subtitle" id="hero-subtitle">
            To question what is right, and redefine what is possible.
          </p>
        </div>

        <div className="hero-action-area">
          <button
            className="btn-enter-presentation"
            id="btn-enter"
            aria-label="Begin presentation"
            onClick={onEnter}
          >
            <span className="btn-shine"></span>
            <span className="btn-content">
              <span className="btn-text">Begin Presentation</span>
              <svg
                className="btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
          <div className="keyboard-hint">
            <span className="kbd-key">Space</span>
            <span className="hint-label">or click to proceed</span>
          </div>
        </div>
      </div>
    </main>
  );
};
