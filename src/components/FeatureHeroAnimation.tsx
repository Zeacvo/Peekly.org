import React, { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';

interface AnimationProps {
  featureId: string;
}

/**
 * 9 Tactical Visualizations with Smooth Apple Kinematics & Hardware Acceleration
 * 
 * SCRIPTED TIMING:
 * - 3.8 seconds total runtime (3800ms)
 * - Multi-phase kinematic sequences (0.0s -> 1.0s -> 2.4s -> 3.4s -> 3.8s)
 * - At t >= 3.8s, the animation permanently freezes in the EXACT static monochrome artwork
 *   matching Cards 01-09 from the main page (Features.tsx).
 * - Zero loops, zero flicker, zero static noise, 100% monolithic background.
 */
export const FeatureHeroAnimation: React.FC<AnimationProps> = ({ featureId }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const TOTAL_DURATION = 3800; // 3.8 seconds total run
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION, now - start);
      const t = elapsed / 1000; // 0.0 to 3.8
      setElapsedTime(t);

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [featureId]);

  const t = elapsedTime; // Current timeline in seconds (0.0 to 3.8)
  const isFinal = t >= 3.8;

  switch (featureId) {
    case 'radar': {
      // 001: MAP POOL RADAR CHART
      // 0.0 - 1.0s: 5 spoke axes radiate smoothly from center (150, 90) to the 5 vertices
      // 1.0 - 3.4s: Winrate polygon organically blooms and expands from center outward to vertices
      // 3.4 - 3.8s: Soft lock into static regular pentagon

      const spokeGrowth = Math.min(1, t / 1.0);
      const spokeEase = 1 - Math.pow(1 - spokeGrowth, 2.5);

      const polyRaw = Math.max(0, Math.min(1, (t - 1.0) / 2.4));
      const polyEase = 1 - Math.pow(1 - polyRaw, 2.8);

      const p0 = { x: 150, y: 90 - 52 * polyEase };
      const p1 = { x: 150 + 49 * polyEase, y: 90 - 16 * polyEase };
      const p2 = { x: 150 + 31 * polyEase, y: 90 + 42 * polyEase };
      const p3 = { x: 150 - 31 * polyEase, y: 90 + 42 * polyEase };
      const p4 = { x: 150 - 49 * polyEase, y: 90 - 16 * polyEase };

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* 5 Spokes radiating from center (150, 90) */}
          <line x1="150" y1="90" x2={150} y2={90 - 52 * spokeEase} stroke="#2c2c2c" strokeWidth="1" />
          <line x1="150" y1="90" x2={150 + 49 * spokeEase} y2={90 - 16 * spokeEase} stroke="#2c2c2c" strokeWidth="1" />
          <line x1="150" y1="90" x2={150 + 31 * spokeEase} y2={90 + 42 * spokeEase} stroke="#2c2c2c" strokeWidth="1" />
          <line x1="150" y1="90" x2={150 - 31 * spokeEase} y2={90 + 42 * spokeEase} stroke="#2c2c2c" strokeWidth="1" />
          <line x1="150" y1="90" x2={150 - 49 * spokeEase} y2={90 - 16 * spokeEase} stroke="#2c2c2c" strokeWidth="1" />

          {/* Organically expanding regular pentagon */}
          {polyEase > 0 && (
            <polygon 
              points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`} 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              fill="rgba(255,255,255,0.06)"
              opacity={Math.min(1, polyEase * 1.5)}
            />
          )}

          {/* Center Pivot Point */}
          <circle cx="150" cy="90" r="2.5" fill="#444444" />
        </svg>
      );
    }

    case 'stats': {
      // 002: PLAYER STATS
      // 0.0 - 1.2s: Card border fades in, avatar and nickname bar reveal
      // 1.2 - 3.2s: Staggered sequential loading of the 6 stat columns
      // 3.2 - 3.8s: Settles into exact dimensions and final HUD appearance

      const cardOpacity = Math.min(1, t / 1.0);
      const nickWidth = 84 * Math.min(1, t / 1.2);

      const getColProgress = (index: number) => {
        if (t >= 3.2) return 1;
        const startTime = 1.2 + index * 0.3;
        if (t < startTime) return 0;
        return Math.min(1, (t - startTime) / 0.35);
      };

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Main Player Profile Banner Card */}
          <rect x="24" y="24" width="252" height="132" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" opacity={cardOpacity} />

          {/* Profile Header Block */}
          <g opacity={cardOpacity}>
            {/* Avatar Container */}
            <rect x="36" y="38" width="34" height="34" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="53" cy="50" r="5" fill="#777777" />
            <path d="M 44 63 C 44 56 48 55 53 55 C 58 55 62 56 62 63 Z" fill="#777777" />

            {/* Header Info: Nickname Skeleton Bar */}
            <rect x="80" y="51" width={nickWidth} height="8" fill="#ffffff" />

            {/* Divider Line */}
            <line x1="36" y1="84" x2="264" y2="84" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </g>

          {/* Horizontal Stats Cells Block (6 Equal Columns) */}
          {t >= 1.0 && (
            <g opacity={Math.min(1, (t - 1.0) / 0.4)}>
              <rect x="36" y="94" width="228" height="46" fill="#121212" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* Vertical Dividers */}
              <line x1="74" y1="94" x2="74" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="112" y1="94" x2="112" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="150" y1="94" x2="150" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="188" y1="94" x2="188" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="226" y1="94" x2="226" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* 6 Value Skeletons */}
              <rect x="44" y="113" width={22 * getColProgress(0)} height="8" fill="#888888" />
              <rect x="82" y="113" width={22 * getColProgress(1)} height="8" fill="#888888" />
              <rect x="120" y="113" width={22 * getColProgress(2)} height="8" fill="#ffffff" />
              <rect x="158" y="113" width={22 * getColProgress(3)} height="8" fill="#888888" />
              <rect x="196" y="113" width={22 * getColProgress(4)} height="8" fill="#888888" />
              <rect x="234" y="113" width={22 * getColProgress(5)} height="8" fill="#888888" />
            </g>
          )}
        </svg>
      );
    }

    case 'autoAcceptMatch': {
      // 003: AUTO-ACCEPT MATCH
      // 0.0 - 1.5s: Pulse radar search circles
      // 1.5 - 2.8s: Match found event, countdown progress fill
      // 2.8 - 3.8s: Checkmark draws via stroke-dashoffset and stabilizes

      const isSearching = t < 1.5;
      const searchRadius1 = ((t * 45) % 65) + 10;
      const searchRadius2 = (((t + 0.6) * 45) % 65) + 10;

      const windowOpacity = isSearching ? 0 : Math.min(1, (t - 1.5) / 0.5);
      const timerFill = t < 1.5 ? 0 : t >= 2.8 ? 210 : 210 * ((t - 1.5) / 1.3);

      const checkProgress = t < 2.8 ? 0 : Math.min(1, (t - 2.8) / 0.8);
      const checkOffset = 26 * (1 - checkProgress);

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Searching concentric pulses during 0.0s - 1.5s */}
          {isSearching && (
            <g transform="translate(150, 90)">
              <circle cx="0" cy="0" r={searchRadius1} stroke="#ffffff" strokeWidth="1" opacity={Math.max(0, 1 - searchRadius1 / 75) * 0.4} fill="none" />
              <circle cx="0" cy="0" r={searchRadius2} stroke="#ffffff" strokeWidth="1" opacity={Math.max(0, 1 - searchRadius2 / 75) * 0.4} fill="none" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" opacity="0.8" />
              <rect x="-35" y="24" width="70" height="6" fill="#252525" />
            </g>
          )}

          {/* Unified Window Shell from 1.5s onwards */}
          {t >= 1.5 && (
            <g opacity={windowOpacity}>
              <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <circle cx="39" cy="40" r="3.5" fill="#555555" />
              <circle cx="52" cy="40" r="3.5" fill="#555555" />
              <circle cx="65" cy="40" r="3.5" fill="#555555" />
              <rect x="78" y="37" width="46" height="6" fill="#242424" />

              {/* Upper skeletons */}
              <rect x="45" y="66" width="64" height="5" fill="#2a2a2a" />
              <rect x="180" y="66" width="75" height="5" fill="#222222" />

              {/* Large Horizontal Accept Plate */}
              <rect 
                x="45" 
                y="86" 
                width="210" 
                height="40" 
                fill="#181818" 
                stroke="rgba(255,255,255,0.18)" 
                strokeWidth="1" 
              />

              {/* Timer Progress Fill Line (during countdown phase) */}
              {t < 2.8 && (
                <rect x="45" y="124" width={timerFill} height="2" fill="#ffffff" opacity={0.6} />
              )}

              {/* Bold Checkmark drawn after 2.8s */}
              {t >= 2.8 && (
                <path 
                  d="M 143 106 L 148 111 L 158 100" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  {...(!isFinal ? { strokeDasharray: "26", strokeDashoffset: checkOffset } : {})}
                />
              )}

              {/* Status baseline */}
              <rect x="110" y="136" width="80" height="4" fill="#1c1c1c" />
            </g>
          )}
        </svg>
      );
    }

    case 'autoAcceptParty': {
      // 004: AUTO-ACCEPT PARTY
      // 0.0 - 1.0s: Avatar slot appears on the left with friend silhouette
      // 1.0 - 2.4s: Energy impulse travels smoothly along the arrow towards party button
      // 2.4 - 3.4s: Group silhouettes lock in sequentially, party confirms
      // 3.4 - 3.8s: Stabilizes cleanly into exact Card 04

      const shellOpacity = Math.min(1, t / 0.8);
      
      const isImpulse = t >= 1.0 && t < 2.4;
      const impulseP = isImpulse ? (t - 1.0) / 1.4 : t >= 2.4 ? 1 : 0;
      const impulseX = 94 + 72 * impulseP;

      const person1Reveal = t >= 2.4 ? 1 : 0;
      const person2Reveal = t >= 2.8 ? 0.65 : 0;

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          {/* Monolithic uniform dark canvas background */}
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Unified Window Shell (Matching #0d0d0d background perfectly) */}
          <g opacity={shellOpacity}>
            <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="39" cy="40" r="3.5" fill="#555555" />
            <circle cx="52" cy="40" r="3.5" fill="#555555" />
            <circle cx="65" cy="40" r="3.5" fill="#555555" />

            {/* Left: Square Avatar Slot with Friend Silhouette */}
            <g transform="translate(54, 84)">
              <rect width="36" height="36" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <circle cx="18" cy="13" r="5" fill="#777777" />
              <path d="M 9 26 C 9 19 13 18 18 18 C 23 18 27 19 27 26 Z" fill="#777777" />
            </g>

            {/* Center: Standard Lucide ArrowRight */}
            <ArrowRight 
              x="118" 
              y="90" 
              width="24" 
              height="24" 
              strokeWidth="2.2" 
              className={isImpulse ? "text-white" : "text-[#888888]"}
            />

            {/* Energy impulse beam traveling along arrow during 1.0s - 2.4s */}
            {isImpulse && (
              <line 
                x1={Math.max(94, impulseX - 12)} 
                y1="102" 
                x2={impulseX} 
                y2="102" 
                stroke="#ffffff" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
            )}

            {/* Right: Party Button */}
            <rect 
              x="170" 
              y="82" 
              width="76" 
              height="40" 
              fill="#161616" 
              stroke={t >= 2.4 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.18)"} 
              strokeWidth="1" 
            />

            {/* Silhouettes inside party slot */}
            <g transform="translate(208, 102)">
              {/* Person 1 (Primary) */}
              <circle cx="-5" cy="-5" r="4.5" fill="#ffffff" opacity={isFinal ? 1 : person1Reveal} />
              <path d="M -14 11 C -14 4 -10 3 -5 3 C 0 3 4 4 4 11 Z" fill="#ffffff" opacity={isFinal ? 1 : person1Reveal} />

              {/* Person 2 (Secondary) */}
              <circle cx="9" cy="-6" r="4" fill="#ffffff" opacity={isFinal ? 0.65 : person2Reveal} />
              <path d="M 3 10 C 3 4 7 3 10 3 C 14 3 17 4 17 10 Z" fill="#ffffff" opacity={isFinal ? 0.65 : person2Reveal} />
            </g>
          </g>
        </svg>
      );
    }

    case 'enhancedHistory': {
      // 005: ENHANCED MATCH HISTORY
      // 0.0 - 1.5s: Rows reveal sequentially from top to bottom
      // 1.5 - 3.2s: Row 1 .DEM download button animates progress & subtle arrow glide
      // 3.2 - 3.8s: Download finishes, solid white button, stabilizes into Card 05

      const getRowOpacity = (rowIndex: number) => {
        const rowStart = rowIndex * 0.25;
        if (t < rowStart) return 0;
        return Math.min(1, (t - rowStart) / 0.3);
      };

      const isDownloading = t >= 1.5 && t < 3.2;
      const downloadProgress = isDownloading ? (t - 1.5) / 1.7 : t >= 3.2 ? 1 : 0;
      const arrowBob = isDownloading ? Math.sin((t - 1.5) * Math.PI * 3) * 1.5 : 0;

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />
          
          {/* Top Match Row (Active / Featured) */}
          <g opacity={getRowOpacity(0)}>
            <rect x="25" y="20" width="250" height="28" fill="#141414" stroke="#fff" strokeWidth="1" />
            <rect x="36" y="30" width="28" height="8" fill="#fff" />
            <rect x="80" y="31" width="46" height="6" fill="#777" />
            <rect x="146" y="31" width="30" height="6" fill="#fff" />

            {/* Download Button */}
            {t < 3.2 ? (
              <g>
                <rect x="215" y="24" width="50" height="20" fill="#222" stroke="#444" strokeWidth="1" />
                <rect x="215" y="24" width={50 * downloadProgress} height="20" fill="#444" />
                <g transform={`translate(0, ${arrowBob})`}>
                  <Download x="233" y="27" width="14" height="14" strokeWidth="3.2" className="text-white" />
                </g>
              </g>
            ) : (
              <g>
                <rect x="215" y="24" width="50" height="20" fill="#fff" />
                <Download x="233" y="27" width="14" height="14" strokeWidth="3.2" className="text-black" />
              </g>
            )}
          </g>

          {/* Subsequent 4 Rows */}
          {Array.from({ length: 4 }).map((_, i) => (
            <g key={i} opacity={getRowOpacity(i + 1)}>
              <line x1="25" y1={58 + i * 27} x2="275" y2={58 + i * 27} stroke="#222" strokeWidth="1" />
              <rect x="36" y={68 + i * 27} width={i % 2 === 0 ? 24 : 20} height="6" fill={i % 2 === 0 ? "#555" : "#333"} />
              <rect x="80" y={68 + i * 27} width={36 + (i % 3) * 8} height="6" fill="#282828" />
              <rect x="146" y={68 + i * 27} width="22" height="6" fill="#282828" />
              <rect x="225" y={64 + i * 27} width="40" height="15" stroke="#252525" fill="#111" />
            </g>
          ))}
        </svg>
      );
    }

    case 'autoCopyServer': {
      // 006: AUTO-COPY SERVER IP
      // 0.0 - 1.2s: Window reveals, prompt chevron shows
      // 0.6 - 1.8s: Connect command expands smoothly
      // 2.0 - 2.8s: Copy button responds with soft pulse and gentle stroke glow
      // 2.8 - 3.8s: Smooth, permanent fixation into ready state with zero flicker

      const windowOpacity = Math.min(1, t / 1.0);
      const cmdP = Math.max(0, Math.min(1, (t - 0.6) / 1.2));
      const cmdWidth = 136 * (1 - Math.pow(1 - cmdP, 2.5));

      const isCopyPulse = t >= 2.0 && t < 2.8;
      const copyPulseP = isCopyPulse ? (t - 2.0) / 0.8 : 0;
      const copyScale = isCopyPulse ? 1 - 0.06 * Math.sin(copyPulseP * Math.PI) : 1;
      const copyStrokeOpacity = isCopyPulse ? 0.2 + 0.35 * Math.sin(copyPulseP * Math.PI) : 0.2;

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Unified Window Shell */}
          <g opacity={windowOpacity}>
            <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="39" cy="40" r="3.5" fill="#555555" />
            <circle cx="52" cy="40" r="3.5" fill="#555555" />
            <circle cx="65" cy="40" r="3.5" fill="#555555" />
            
            {/* Prompt chevron */}
            <path d="M 37 68 L 41 71 L 37 74" stroke="#666666" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="47" y="68" width="46" height="6" fill="#444444" />
            
            {/* Connect command skeleton typing */}
            <rect x="37" y="88" width={cmdWidth} height="11" fill="#ffffff" />
            
            {/* Abstract status badge */}
            <rect x="37" y="114" width="76" height="5" fill="#2c2c2c" />
            
            {/* Stable Copy button with smooth scale pulse during copy */}
            <g transform={`translate(240, 93.5) scale(${copyScale}) translate(-240, -93.5)`}>
              <rect 
                x="215" 
                y="83" 
                width="50" 
                height="21"
                fill="#141414" 
                stroke={`rgba(255,255,255,${copyStrokeOpacity})`}
                strokeWidth="1"
              />
              <g transform="translate(235, 88)">
                <rect x="0" y="2" width="7" height="7" stroke="#ffffff" strokeWidth="1.3" fill="none" />
                <path d="M 3 2 L 3 0 L 10 0 L 10 7 L 8 7" stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
          </g>
        </svg>
      );
    }

    case 'focusMode': {
      // 007: LOBBY FOCUS MODE
      // 0.0 - 1.2s: Full interface elements visible on sides
      // 1.2 - 3.2s: Focus filter activates: sides smoothly dim, central reticle brackets converge
      // 3.2 - 3.8s: Rock-solid static state matching Card 07

      const windowOpacity = Math.min(1, t / 1.0);

      const focusProgress = t < 1.2 ? 0 : Math.min(1, (t - 1.2) / 2.0);
      const focusEase = (1 - Math.cos(focusProgress * Math.PI)) / 2;
      const sideOpacity = 0.7 - 0.5 * focusEase; // 0.7 smoothly down to 0.2
      const reticleOpacity = 0.3 + 0.7 * focusEase; // 0.3 smoothly up to 1.0

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Unified Window Shell */}
          <g opacity={windowOpacity}>
            <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="39" cy="40" r="3.5" fill="#555555" />
            <circle cx="52" cy="40" r="3.5" fill="#555555" />
            <circle cx="65" cy="40" r="3.5" fill="#555555" />

            {/* Left Team Roster (Dimmed smoothly) */}
            <g opacity={sideOpacity}>
              <rect x="36" y="64" width="34" height="4" fill="#555" />
              <circle cx="42" cy="78" r="2.5" fill="#666" /><rect x="49" y="76" width="22" height="4" fill="#333" />
              <circle cx="42" cy="90" r="2.5" fill="#666" /><rect x="49" y="88" width="22" height="4" fill="#333" />
              <circle cx="42" cy="102" r="2.5" fill="#666" /><rect x="49" y="100" width="22" height="4" fill="#333" />
              <circle cx="42" cy="114" r="2.5" fill="#666" /><rect x="49" y="112" width="22" height="4" fill="#333" />
              <circle cx="42" cy="126" r="2.5" fill="#666" /><rect x="49" y="124" width="22" height="4" fill="#333" />
            </g>

            {/* Right Team Roster (Dimmed smoothly) */}
            <g opacity={sideOpacity}>
              <rect x="230" y="64" width="34" height="4" fill="#555" />
              <circle cx="236" cy="78" r="2.5" fill="#666" /><rect x="243" y="76" width="22" height="4" fill="#333" />
              <circle cx="236" cy="90" r="2.5" fill="#666" /><rect x="243" y="88" width="22" height="4" fill="#333" />
              <circle cx="236" cy="102" r="2.5" fill="#666" /><rect x="243" y="100" width="22" height="4" fill="#333" />
              <circle cx="236" cy="114" r="2.5" fill="#666" /><rect x="243" y="112" width="22" height="4" fill="#333" />
              <circle cx="236" cy="126" r="2.5" fill="#666" /><rect x="243" y="124" width="22" height="4" fill="#333" />
            </g>

            {/* Central Framing Brackets [ ] */}
            <path 
              d="M 96 64 L 86 64 L 86 138 L 96 138 M 204 64 L 214 64 L 214 138 L 204 138" 
              stroke="#ffffff" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              opacity={reticleOpacity}
            />

            {/* Central Active Content */}
            <g transform="translate(93, 67)">
              <rect width="114" height="18" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="6" y="5" width="22" height="8" fill="#333" />
              <rect x="32" y="5" width="22" height="8" fill="#ffffff" />
              <rect x="58" y="5" width="22" height="8" fill="#333" />
              <rect x="84" y="24" width="24" height="8" fill="#333" />
            </g>

            <g transform="translate(93, 90)">
              <rect width="114" height="24" fill="#ffffff" />
              <circle cx="14" cy="12" r="3.5" fill="#000000" />
              <rect x="25" y="9" width="76" height="6" fill="#000000" />
            </g>

            <g transform="translate(93, 119)">
              <rect width="114" height="15" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <polygon points="14,124 17.5,126.5 16,131 12,131 10.5,126.5" transform="translate(0, -120)" stroke="#777" strokeWidth="1" fill="none" />
              <rect x="25" y="5" width="56" height="5" fill="#444" />
              <rect x="87" y="4" width="20" height="7" fill="#282828" />
            </g>
          </g>
        </svg>
      );
    }

    case 'avgEloPill': {
      // 008: TEAM AVERAGE ELO
      // 0.0 - 0.8s: Two team plaques appear on left and right sides
      // 0.8 - 3.2s: Lower balance scale fills smoothly strictly from left edge (x=0) to right
      // 3.2 - 3.8s: Stabilizes cleanly at 125px width (~55% advantage to Team A)

      const headerOpacity = Math.min(1, t / 0.8);

      // Balance scale progression strictly from left to right (origin-left)
      const p = Math.max(0, Math.min(1, (t - 0.8) / 2.4));
      const ease = 1 - Math.pow(1 - p, 2.5);
      const targetWidth = 125; // ~55% of 228px rail (crosses 50% midpoint 114px)
      const curWidth = targetWidth * ease;

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Main Match Header Banner Container */}
          <g opacity={headerOpacity}>
            <rect x="24" y="38" width="252" height="104" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

            {/* Top Subtle Roster Skeletons */}
            <rect x="36" y="50" width="44" height="5" fill="#222222" />
            <rect x="135" y="50" width="30" height="5" fill="#1a1a1a" />
            <rect x="220" y="50" width="44" height="5" fill="#222222" />

            {/* Center Divider: Score / Status Skeletons */}
            <g transform="translate(132, 68)">
              <rect x="0" y="0" width="16" height="28" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <rect x="4" y="12" width="8" height="4" fill="#444444" />
              
              <rect x="20" y="0" width="16" height="28" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <rect x="24" y="12" width="8" height="4" fill="#444444" />
            </g>

            {/* Left: Team A Plaque */}
            <g transform="translate(36, 68)">
              <rect width="52" height="28" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <rect x="13" y="11" width="26" height="6" fill="#666666" />
            </g>
            <g transform="translate(108, 82)">
              <circle cx="0" cy="0" r="14" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="0" cy="-4" r="4.5" fill="#666666" />
              <path d="M -9 9 C -9 3 -5 2 0 2 C 5 2 9 3 9 9 Z" fill="#666666" />
            </g>

            {/* Right: Team B Plaque */}
            <g transform="translate(192, 82)">
              <circle cx="0" cy="0" r="14" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="0" cy="-4" r="4.5" fill="#666666" />
              <path d="M -9 9 C -9 3 -5 2 0 2 C 5 2 9 3 9 9 Z" fill="#666666" />
            </g>
            <g transform="translate(212, 68)">
              <rect width="52" height="28" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <rect x="13" y="11" width="26" height="6" fill="#ffffff" />
            </g>

            {/* Bottom Balance Scale Line: Fills strictly left-to-right (origin-left) */}
            <g transform="translate(36, 116)">
              {/* Neutral background rail */}
              <rect x="0" y="0" width="228" height="6" fill="rgba(255,255,255,0.1)" />
              {/* Active advantage bar (strictly from left edge x=0 to right) */}
              <rect 
                x="0" 
                y="0" 
                width={curWidth} 
                height="6" 
                fill="#ffffff" 
              />
              {/* Center midpoint marker (visible grey neutral-500, 50/50 static reference) */}
              <line 
                x1="114" 
                y1="-1" 
                x2="114" 
                y2="7" 
                stroke="#737373" 
                strokeWidth="1.5" 
              />
            </g>
          </g>
        </svg>
      );
    }

    case 'sidebarElo': {
      // 009: SIDEBAR ELO WIDGET (Minimalist 2-color monochrome skeleton HUD)
      // 0.0 - 0.8s: Right sidebar and modal container fade in smoothly
      // 0.8 - 2.4s: White ELO plate expands smoothly, progress bar fills (0 -> 96px)
      // 1.6 - 2.6s: Bottom regional rank skeletons reveal smoothly

      const containerOpacity = Math.min(1, t / 0.8);
      
      const eloProgress = Math.max(0, Math.min(1, (t - 0.8) / 1.6));
      const eloEase = 1 - Math.pow(1 - eloProgress, 3);
      const whitePlateWidth = 64 * eloEase;
      const barWidth = 96 * eloEase;
      
      const ranksOpacity = t < 1.6 ? 0 : Math.min(1, (t - 1.6) / 0.6);

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Main Floating Widget Modal (Left / Center) */}
          <g opacity={containerOpacity}>
            {/* Modal Outer Shell */}
            <rect 
              x="20" 
              y="20" 
              width="210" 
              height="140" 
              fill="#0d0d0d" 
              stroke="rgba(255,255,255,0.12)" 
              strokeWidth="1" 
            />

            {/* Modal Header Skeletons (Abstract Title + Close) */}
            <rect x="36" y="34" width="42" height="6" fill="#555555" />
            <rect x="194" y="34" width="20" height="6" fill="#333333" />
            <line x1="36" y1="48" x2="214" y2="48" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Level Indicator: Geometric Grey Circle */}
            <circle cx="52" cy="72" r="14" fill="#1c1c1c" stroke="#555555" strokeWidth="1.5" />
            <circle cx="52" cy="72" r="6" fill="#333333" />

            {/* ELO Rating: Horizontal White Skeleton Plate */}
            <rect x="78" y="66" width={whitePlateWidth} height="12" fill="#ffffff" />

            {/* Trend Indicator: Subtle Grey Skeleton */}
            <rect x="152" y="68" width="24" height="8" fill="#333333" />

            {/* Progress Bar (Thin line with animated white portion) */}
            <rect x="36" y="96" width="178" height="4" fill="#262626" />
            <rect x="36" y="96" width={barWidth} height="4" fill="#ffffff" />

            {/* Divider */}
            <line x1="36" y1="114" x2="214" y2="114" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Bottom Regional Rank Skeletons (Two Clean Grey Skeleton Blocks) */}
            <g opacity={ranksOpacity}>
              <rect x="36" y="122" width="84" height="24" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <rect x="46" y="131" width="36" height="5" fill="#444444" />
              <rect x="88" y="131" width="22" height="5" fill="#666666" />

              <rect x="130" y="122" width="84" height="24" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <rect x="140" y="131" width="36" height="5" fill="#444444" />
              <rect x="182" y="131" width="22" height="5" fill="#666666" />
            </g>
          </g>

          {/* Right Navigation Dock (FACEIT Sidebar: Aligned along vertical axis cx=264) */}
          <g opacity={containerOpacity}>
            <rect x="244" y="20" width="40" height="140" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            
            {/* 1. Profile Avatar (Upper Circle) */}
            <circle cx="264" cy="36" r="8" fill="#181818" stroke="#555555" strokeWidth="1" />
            <circle cx="264" cy="34" r="3" fill="#777777" />
            <path d="M 258 41 C 258 38 261 37 264 37 C 267 37 270 38 270 41 Z" fill="#777777" />

            {/* 2. Neat Widget Slot Rectangular Box */}
            <rect x="249" y="52" width="30" height="34" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle cx="264" cy="61" r="4.5" fill="#222222" stroke="#666666" strokeWidth="1" />
            <rect x="254" y="70" width="20" height="4" fill="#ffffff" />
            <rect x="257" y="77" width="14" height="2" fill="#444444" />

            {/* 3. Identical Grey Navigation Dots on the Same Vertical Axis */}
            <circle cx="264" cy="98" r="3" fill="#333333" />
            <circle cx="264" cy="112" r="3" fill="#333333" />
            <circle cx="264" cy="126" r="3" fill="#333333" />
            <circle cx="264" cy="140" r="3" fill="#333333" />
          </g>
        </svg>
      );
    }

    case 'mapSelectorStats': {
      // 009: MAP SELECTOR WIN RATES
      // 0.0 - 1.5s: Tiles reveal sequentially
      // 1.5 - 3.2s: Progress bars fill smoothly to target lengths
      // 3.2 - 3.8s: Center tile highlights and stabilizes into Card 09

      const getTileOpacity = (tileIndex: number) => {
        const start = tileIndex * 0.3;
        if (t < start) return 0;
        return Math.min(1, (t - start) / 0.4);
      };

      const barProgress = t < 1.5 ? 0 : Math.min(1, (t - 1.5) / 1.7);
      const barEase = (1 - Math.cos(barProgress * Math.PI)) / 2;

      return (
        <svg 
          className="w-full h-full max-w-xl object-contain" 
          width="300"
          height="180"
          viewBox="0 0 300 180" 
          fill="none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <rect width="300" height="180" fill="#0d0d0d" />

          {/* Left Tile */}
          <g transform="translate(25, 35)" opacity={getTileOpacity(0)}>
            <rect width="75" height="110" stroke="#333" fill="#111" />
            <rect x="22" y="28" width="31" height="5" fill="#555" />
            <rect x="14" y="82" width="47" height="6" fill="#222" />
            <rect x="14" y="82" width={32 * barEase} height="6" fill="#666" />
          </g>

          {/* Main Center Tile (Featured) */}
          <g transform="translate(112, 35)" opacity={getTileOpacity(1)}>
            <rect width="75" height="110" stroke="#fff" strokeWidth="1.5" fill="#161616" />
            <rect x="20" y="28" width="35" height="5" fill="#fff" />
            <rect x="14" y="82" width="47" height="6" fill="#333" />
            <rect x="14" y="82" width={35 * barEase} height="6" fill="#fff" />
          </g>

          {/* Right Tile */}
          <g transform="translate(200, 35)" opacity={getTileOpacity(2)}>
            <rect width="75" height="110" stroke="#333" fill="#111" />
            <rect x="24" y="28" width="27" height="5" fill="#444" />
            <rect x="14" y="82" width="47" height="6" fill="#222" />
            <rect x="14" y="82" width={24 * barEase} height="6" fill="#555" />
          </g>
        </svg>
      );
    }

    default:
      return null;
  }
};
