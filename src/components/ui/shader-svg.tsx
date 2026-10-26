"use client";

import React, { useState, useEffect } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

export function MeshGradientSVG() {
  const colors = [
    "#FFB3D9", // Pastel pink
    "#87CEEB", // Sky blue
    "#4A90E2", // Medium blue
    "#2C3E50", // Dark blue-gray
    "#1A1A2E", // Very dark blue
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const rect = document.querySelector("#ghost-character-svg")?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (mousePosition.x - centerX) * 0.08;
      const deltaY = (mousePosition.y - centerY) * 0.08;

      const maxOffset = 8;
      setEyeOffset({
        x: Math.max(-maxOffset, Math.min(maxOffset, deltaX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, deltaY)),
      });
    }
  }, [mousePosition]);

  const bodyPath =
    "M230.809 115.385V249.411C230.809 269.923 214.985 287.282 194.495 288.411C184.544 288.949 175.364 285.718 168.26 280C159.746 273.154 147.769 273.461 139.178 280.23C132.638 285.384 124.381 288.462 115.379 288.462C106.377 288.462 98.1451 285.384 91.6055 280.23C82.912 273.385 70.9353 273.385 62.2415 280.23C55.7532 285.334 47.598 288.411 38.7246 288.462C17.4132 288.615 0 270.667 0 249.359V115.385C0 51.6667 51.6756 0 115.404 0C179.134 0 230.809 51.6667 230.809 115.385Z";

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto p-4 rounded-lg flex items-center justify-center"
      animate={{
        y: [0, -10, 0],
        scaleY: [1, 1.06, 1],
      }}
      transition={{
        duration: 2.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "top center" }}
    >
      <svg
        id="ghost-character-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="231"
        height="289"
        viewBox="0 0 231 289"
        className="w-full h-auto drop-shadow-2xl"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Multi-stop mesh gradient fallback and base */}
          <linearGradient id="ghostMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB3D9" />
            <stop offset="28%" stopColor="#87CEEB" />
            <stop offset="55%" stopColor="#4A90E2" />
            <stop offset="80%" stopColor="#2C3E50" />
            <stop offset="100%" stopColor="#1A1A2E" />
          </linearGradient>

          {/* 3D Curved Specular Lighting */}
          <radialGradient id="ghostVolumeSheen" cx="35%" cy="25%" r="75%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="85%" stopColor="rgba(0, 0, 0, 0.35)" />
          </radialGradient>

          <clipPath id="shapeClip">
            <path d={bodyPath} />
          </clipPath>
        </defs>

        {/* 1. VISIBLE GHOST BODY FOUNDATION (Guarantees body is never transparent/missing) */}
        <path
          d={bodyPath}
          fill="url(#ghostMeshGrad)"
          filter="drop-shadow(0 14px 35px rgba(74, 144, 226, 0.4))"
        />

        {/* 2. LIVE WEBGL MESH GRADIENT SHADER OVERLAY */}
        <foreignObject
          width="231"
          height="289"
          clipPath="url(#shapeClip)"
          style={{ width: "231px", height: "289px", opacity: 0.85 }}
        >
          <div style={{ width: "231px", height: "289px", overflow: "hidden", position: "relative" }}>
            <MeshGradient
              colors={colors}
              speed={1}
              width={231}
              height={289}
              style={{ width: "231px", height: "289px" }}
            />
          </div>
        </foreignObject>

        {/* 3. VOLUMETRIC SPECULAR SHEEN & HIGHLIGHT BORDER */}
        <path
          d={bodyPath}
          fill="url(#ghostVolumeSheen)"
          stroke="rgba(255, 255, 255, 0.55)"
          strokeWidth="1.8"
        />

        {/* 4. LEFT EYE (Track cursor + blink) */}
        <motion.ellipse
          rx="18"
          ry="28"
          fill="#0f172a"
          className="animate-blink"
          animate={{
            cx: 80 + eyeOffset.x,
            cy: 120 + eyeOffset.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
        <motion.circle
          r="4.5"
          fill="#ffffff"
          animate={{
            cx: 74 + eyeOffset.x * 0.7,
            cy: 112 + eyeOffset.y * 0.7,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />

        {/* 5. RIGHT EYE (Track cursor + blink) */}
        <motion.ellipse
          rx="18"
          ry="28"
          fill="#0f172a"
          className="animate-blink"
          animate={{
            cx: 150 + eyeOffset.x,
            cy: 120 + eyeOffset.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
        <motion.circle
          r="4.5"
          fill="#ffffff"
          animate={{
            cx: 144 + eyeOffset.x * 0.7,
            cy: 112 + eyeOffset.y * 0.7,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      </svg>

      <style>{`
        .animate-blink {
          animation: blink 3s infinite ease-in-out;
        }

        @keyframes blink {
          0%,
          90%,
          100% {
            ry: 28;
          }
          95% {
            ry: 3;
          }
        }
      `}</style>
    </motion.div>
  );
}
