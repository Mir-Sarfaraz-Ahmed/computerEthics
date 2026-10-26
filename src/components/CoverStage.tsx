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

    // Ambient floating orbs
    const orbs = [
      { bx: 0.32, by: 0.35, r: 460, dc: 'rgba(56,189,248,0.18)', lc: 'rgba(14,165,233,0.12)', sx: 0.00042, sy: 0.0005, ph: 0 },
      { bx: 0.68, by: 0.38, r: 500, dc: 'rgba(99,102,241,0.20)', lc: 'rgba(129,140,248,0.14)', sx: -0.00035, sy: 0.00038, ph: Math.PI / 3 },
      { bx: 0.50, by: 0.70, r: 440, dc: 'rgba(139,92,246,0.15)', lc: 'rgba(192,132,252,0.10)', sx: 0.00048, sy: -0.00032, ph: Math.PI },
      { bx: 0.42, by: 0.52, r: 400, dc: 'rgba(244,63,94,0.08)', lc: 'rgba(251,113,133,0.08)', sx: -0.00038, sy: -0.00042, ph: Math.PI * 1.5 },
    ];

    // Ambient stardust particles drifting in the spotlight
    const particles: Array<{
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      op: number;
      ps: number;
      ph: number;
    }> = [];

    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * aw,
        y: Math.random() * ah,
        r: Math.random() * 1.8 + 0.6,
        vy: -(Math.random() * 0.4 + 0.15),
        vx: (Math.random() - 0.5) * 0.2,
        op: Math.random() * 0.6 + 0.2,
        ps: Math.random() * 0.02 + 0.01,
        ph: Math.random() * Math.PI * 2,
      });
    }

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

      // 1. Ambient Floating Orbs
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

      // 2. Cinematic Overhead Stage Spotlight Cone
      const spotApexX = aw * 0.5 + mx * 0.15;
      const spotApexY = -40;
      const spotCenterY = ah * 0.48;
      const spotRadius = Math.max(aw * 0.55, 620);

      const spotGrad = ctx.createRadialGradient(
        spotApexX,
        spotApexY,
        20,
        spotApexX,
        spotCenterY,
        spotRadius
      );

      if (currentTheme === 'dark') {
        spotGrad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        spotGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.08)');
        spotGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.03)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        spotGrad.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
        spotGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.06)');
        spotGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.02)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.ellipse(spotApexX, spotCenterY, spotRadius * 0.85, ah * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3. 3D Perspective Ground Grid & Stage Floor
      const horizonY = ah * 0.54;
      const vpX = aw * 0.5 + mx * 0.35;
      const numLongLines = 22;
      const maxDist = aw * 0.8;

      ctx.save();
      // Longitudinal perspective lines radiating from horizon
      for (let i = 0; i <= numLongLines; i++) {
        const norm = (i / numLongLines) - 0.5; // -0.5 to 0.5
        const bottomX = vpX + norm * maxDist * 2.8;

        const lineGrad = ctx.createLinearGradient(vpX, horizonY, bottomX, ah);
        if (currentTheme === 'dark') {
          lineGrad.addColorStop(0, 'rgba(56, 189, 248, 0.0)');
          lineGrad.addColorStop(0.2, 'rgba(56, 189, 248, 0.08)');
          lineGrad.addColorStop(0.65, 'rgba(99, 102, 241, 0.18)');
          lineGrad.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
        } else {
          lineGrad.addColorStop(0, 'rgba(14, 165, 233, 0.0)');
          lineGrad.addColorStop(0.2, 'rgba(14, 165, 233, 0.06)');
          lineGrad.addColorStop(0.65, 'rgba(99, 102, 241, 0.12)');
          lineGrad.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
        }

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vpX + norm * 40, horizonY);
        ctx.lineTo(bottomX, ah);
        ctx.stroke();
      }

      // Transverse horizontal grid lines with exponential perspective depth
      const numTransLines = 14;
      for (let j = 1; j <= numTransLines; j++) {
        // Exponential distribution for realistic camera depth perspective
        const prog = Math.pow(j / numTransLines, 2.2);
        const curY = horizonY + prog * (ah - horizonY);
        const depthAlpha = Math.min(prog * (currentTheme === 'dark' ? 0.22 : 0.14), 0.25);

        ctx.strokeStyle = currentTheme === 'dark'
          ? `rgba(56, 189, 248, ${depthAlpha})`
          : `rgba(14, 165, 233, ${depthAlpha})`;
        ctx.lineWidth = 1;

        const spread = (curY - horizonY) / (ah - horizonY);
        const halfWidth = maxDist * 1.4 * spread;

        ctx.beginPath();
        ctx.moveTo(vpX - halfWidth, curY);
        ctx.lineTo(vpX + halfWidth, curY);
        ctx.stroke();
      }

      // Polished Stage Lacquer Horizon Glow
      const lacquerGrad = ctx.createLinearGradient(0, horizonY - 10, 0, horizonY + 30);
      lacquerGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      lacquerGrad.addColorStop(0.4, currentTheme === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(14, 165, 233, 0.08)');
      lacquerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = lacquerGrad;
      ctx.fillRect(0, horizonY - 10, aw, 40);
      ctx.restore();

      // 4. Ambient Stardust Floating in Spotlight Beam
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += Math.sin(t * 0.0012 + p.ph) * 0.28;

        if (p.y < -10) {
          p.y = ah + 10;
          p.x = Math.random() * aw;
        }

        const op = p.op * (0.6 + Math.sin(t * p.ps + p.ph) * 0.4);
        ctx.beginPath();
        ctx.fillStyle = currentTheme === 'dark'
          ? `rgba(224, 242, 254, ${op * 0.85})`
          : `rgba(14, 165, 233, ${op * 0.65})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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

          {/* Polished Glass Stage Lacquer Mirror Reflection */}
          <div className="hero-title-reflection" aria-hidden="true">
            <span className="title-line">Are You Ready ?</span>
          </div>

          <p className="hero-subtitle" id="hero-subtitle">
            To question what is right, and redefine what is possible.
          </p>
        </div>

        <div className="hero-action-area">
          <div className="btn-cta-wrapper">
            <div className="btn-halo-glow" aria-hidden="true"></div>
            <button
              className="btn-enter-presentation"
              id="btn-enter"
              aria-label="Begin presentation"
              onClick={onEnter}
            >
              <span className="btn-shine"></span>
              <span className="btn-content">
                <span className="btn-audio-wave" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
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
          </div>

          <div className="keyboard-hint">
            <span className="kbd-key">Space</span>
            <span className="hint-label">or click to proceed</span>
          </div>
        </div>
      </div>
    </main>
  );
};
