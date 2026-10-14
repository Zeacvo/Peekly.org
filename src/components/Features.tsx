import React from 'react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { 
  Map,
  BarChart2, 
  CheckCircle, 
  Users, 
  Download, 
  Copy, 
  EyeOff, 
  TrendingUp, 
  LayoutGrid,
  ArrowRight
} from 'lucide-react';

interface FeaturesProps {
  currentLang: Language;
  onSelectFeature: (featureId: string) => void;
}

// Procedural high-contrast tactical banners: Clean monochrome with #FF5500 hover accents (Universal i18n)
const CardTextures: Record<string, React.FC> = {
  // 001: MAP POOL RADAR CHART (Single centered regular pentagon with 5 rays, subtle fill)
  radar: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* 5 Spokes radiating from center (150, 90) */}
      <line x1="150" y1="90" x2="150" y2="38" stroke="#2c2c2c" strokeWidth="1" />
      <line x1="150" y1="90" x2="199" y2="74" stroke="#2c2c2c" strokeWidth="1" />
      <line x1="150" y1="90" x2="181" y2="132" stroke="#2c2c2c" strokeWidth="1" />
      <line x1="150" y1="90" x2="119" y2="132" stroke="#2c2c2c" strokeWidth="1" />
      <line x1="150" y1="90" x2="101" y2="74" stroke="#2c2c2c" strokeWidth="1" />

      {/* Single Centered Regular Pentagon */}
      <polygon 
        points="150,38 199,74 181,132 119,132 101,74" 
        stroke="#ffffff" 
        strokeWidth="1.5" 
        fill="rgba(255,255,255,0.06)"
        className="group-hover:stroke-[#FF5500] group-hover:fill-[rgba(255,85,0,0.1)] transition-all duration-200"
      />

      {/* Center Pivot Point */}
      <circle cx="150" cy="90" r="2.5" fill="#444444" />
    </svg>
  ),

  // 002: PLAYER STATS (Authentic FACEIT Profile HUD: avatar, nickname bar, 6 stat value skeletons — zero text/digits)
  stats: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* Main Player Profile Banner Card */}
      <rect x="24" y="24" width="252" height="132" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Profile Header Block */}
      {/* Avatar Container (Centered vertically relative to nickname bar) */}
      <rect x="36" y="38" width="34" height="34" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Clean User Silhouette directly inside square slot with flat background */}
      <circle cx="53" cy="50" r="5" fill="#777777" />
      <path d="M 44 63 C 44 56 48 55 53 55 C 58 55 62 56 62 63 Z" fill="#777777" />

      {/* Header Info: Single Clean Nickname Skeleton Bar */}
      <rect x="80" y="51" width="84" height="8" fill="#ffffff" />

      {/* Divider Line */}
      <line x1="36" y1="84" x2="264" y2="84" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Horizontal Stats Cells Block (6 Equal Columns) */}
      <rect x="36" y="94" width="228" height="46" fill="#121212" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Vertical Dividers */}
      <line x1="74" y1="94" x2="74" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="112" y1="94" x2="112" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="150" y1="94" x2="150" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="188" y1="94" x2="188" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="226" y1="94" x2="226" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* 6 Value Skeletons (Pure values, no text labels) */}
      {/* Cell 1 */}
      <rect x="44" y="113" width="22" height="8" fill="#888888" />

      {/* Cell 2 */}
      <rect x="82" y="113" width="22" height="8" fill="#888888" />

      {/* Cell 3 (Highlighted on hover) */}
      <rect x="120" y="113" width="22" height="8" fill="#ffffff" className="group-hover:fill-[#FF5500] transition-colors duration-200" />

      {/* Cell 4 */}
      <rect x="158" y="113" width="22" height="8" fill="#888888" />

      {/* Cell 5 */}
      <rect x="196" y="113" width="22" height="8" fill="#888888" />

      {/* Cell 6 */}
      <rect x="234" y="113" width="22" height="8" fill="#888888" />
    </svg>
  ),

  // 003: AUTO-ACCEPT MATCH (Unified window shell with faint skeleton & prominent horizontal plate with bold checkmark)
  autoAcceptMatch: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* Unified Window Shell */}
      <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="39" cy="40" r="3.5" fill="#555555" />
      <circle cx="52" cy="40" r="3.5" fill="#555555" />
      <circle cx="65" cy="40" r="3.5" fill="#555555" />
      <rect x="78" y="37" width="46" height="6" fill="#242424" />

      {/* Upper subtle details skeleton */}
      <rect x="45" y="66" width="64" height="5" fill="#2a2a2a" />
      <rect x="180" y="66" width="75" height="5" fill="#222222" />

      {/* Large Horizontal Accept Plate with Bold White Checkmark */}
      <rect 
        x="45" 
        y="86" 
        width="210" 
        height="40" 
        fill="#181818" 
        stroke="rgba(255,255,255,0.18)" 
        strokeWidth="1" 
        className="group-hover:stroke-[#FF5500] transition-colors duration-200" 
      />
      <path 
        d="M 143 106 L 148 111 L 158 100" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="group-hover:stroke-[#FF5500] transition-colors duration-200" 
      />

      {/* Subtle status baseline */}
      <rect x="110" y="136" width="80" height="4" fill="#1c1c1c" />
    </svg>
  ),

  // 004: AUTO-ACCEPT PARTY (Minimalist invite: square avatar slot, neutral arrow →, monochrome button with 👥)
  autoAcceptParty: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* Unified Window Shell */}
      <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="39" cy="40" r="3.5" fill="#555555" />
      <circle cx="52" cy="40" r="3.5" fill="#555555" />
      <circle cx="65" cy="40" r="3.5" fill="#555555" />

      {/* Left: Square Avatar Slot with Rounded Corners (matching Card 02, no circular outline) */}
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
        className="text-[#888888] group-hover:text-[#FF5500] group-hover:stroke-[#FF5500] transition-colors duration-200" 
      />

      {/* Right: Button with 👥 */}
      <rect 
        x="170" 
        y="82" 
        width="76" 
        height="40" 
        fill="#161616" 
        stroke="rgba(255,255,255,0.18)" 
        strokeWidth="1" 
      />
      <g transform="translate(208, 102)" className="text-white group-hover:text-[#FF5500] transition-colors duration-200">
        {/* Person 1 (Primary, white -> orange) */}
        <circle cx="-5" cy="-5" r="4.5" fill="currentColor" className="group-hover:fill-[#FF5500] transition-colors duration-200" />
        <path d="M -14 11 C -14 4 -10 3 -5 3 C 0 3 4 4 4 11 Z" fill="currentColor" className="group-hover:fill-[#FF5500] transition-colors duration-200" />
        {/* Person 2 (Secondary, muted gray -> orange) */}
        <circle cx="9" cy="-6" r="4" fill="currentColor" opacity="0.65" className="group-hover:fill-[#FF5500] transition-colors duration-200" />
        <path d="M 3 10 C 3 4 7 3 10 3 C 14 3 17 4 17 10 Z" fill="currentColor" opacity="0.65" className="group-hover:fill-[#FF5500] transition-colors duration-200" />
      </g>
    </svg>
  ),

  // 005: ENHANCED MATCH HISTORY (Only 1st row has download button with ↓, subsequent rows are pale placeholders)
  enhancedHistory: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />
      
      {/* Top Match Row (Active / Featured) */}
      <rect x="25" y="20" width="250" height="28" fill="#141414" stroke="#fff" strokeWidth="1" />
      {/* Skeleton score pill */}
      <rect x="36" y="30" width="28" height="8" fill="#fff" />
      {/* Skeleton map bar */}
      <rect x="80" y="31" width="46" height="6" fill="#777" />
      {/* Skeleton ELO bar */}
      <rect x="146" y="31" width="30" height="6" fill="#fff" />
      {/* Download button with clean download arrow icon (Featured hover trigger) */}
      <rect x="215" y="24" width="50" height="20" fill="#fff" className="group-hover:fill-[#FF5500] transition-colors duration-200" />
      <Download 
        x="233" 
        y="27" 
        width="14" 
        height="14" 
        strokeWidth="3.2" 
        className="text-black" 
      />

      {/* Subsequent Match Stream (4 rows of abstract skeletons without download arrow) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <g key={i}>
          <line x1="25" y1={58 + i * 27} x2="275" y2={58 + i * 27} stroke="#222" strokeWidth="1" />
          {/* Result indicator skeleton */}
          <rect x="36" y={68 + i * 27} width={i % 2 === 0 ? 24 : 20} height="6" fill={i % 2 === 0 ? "#555" : "#333"} />
          {/* Map bar skeleton */}
          <rect x="80" y={68 + i * 27} width={36 + (i % 3) * 8} height="6" fill="#282828" />
          {/* ELO change skeleton */}
          <rect x="146" y={68 + i * 27} width="22" height="6" fill="#282828" />
          {/* Mini button placeholder without arrow */}
          <rect x="225" y={64 + i * 27} width="40" height="15" stroke="#252525" fill="#111" />
        </g>
      ))}
    </svg>
  ),

  // 006: AUTO-COPY SERVER IP (Unified window shell: prompt, connect IP & copy badge turn #FF5500)
  autoCopyServer: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* Unified Window Shell */}
      <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="39" cy="40" r="3.5" fill="#555555" />
      <circle cx="52" cy="40" r="3.5" fill="#555555" />
      <circle cx="65" cy="40" r="3.5" fill="#555555" />
      
      {/* Abstract prompt chevron & skeleton command */}
      <path d="M 37 68 L 41 71 L 37 74" stroke="#666666" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="47" y="68" width="46" height="6" fill="#444444" />
      
      {/* Connect command skeleton line */}
      <rect x="37" y="88" width="136" height="11" fill="#ffffff" />
      
      {/* Abstract status badge skeleton */}
      <rect x="37" y="114" width="76" height="5" fill="#2c2c2c" />
      
      {/* Dark subtle copy button with white overlapping squares icon */}
      <rect 
        x="215" 
        y="83" 
        width="50" 
        height="21"
        fill="#141414" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="1"
        className="group-hover:stroke-[#FF5500] transition-colors duration-200" 
      />
      <g transform="translate(235, 88)">
        <rect x="0" y="2" width="7" height="7" stroke="#ffffff" strokeWidth="1.3" fill="none" className="group-hover:stroke-[#FF5500] transition-colors duration-200" />
        <path d="M 3 2 L 3 0 L 10 0 L 10 7 L 8 7" stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#FF5500] transition-colors duration-200" />
      </g>
    </svg>
  ),

  // 007: LOBBY FOCUS MODE (Muted dimmed rosters opacity-20 on sides, high-contrast white [ ] framing active center blocks)
  focusMode: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* Unified Window Shell */}
      <rect x="25" y="28" width="250" height="124" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="25" y1="52" x2="275" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="39" cy="40" r="3.5" fill="#555555" />
      <circle cx="52" cy="40" r="3.5" fill="#555555" />
      <circle cx="65" cy="40" r="3.5" fill="#555555" />

      {/* Dimmed Left Team Roster (opacity-20 to show it is hidden/muted) */}
      <g opacity="0.2">
        <rect x="36" y="64" width="34" height="4" fill="#555" />
        <circle cx="42" cy="78" r="2.5" fill="#666" /><rect x="49" y="76" width="22" height="4" fill="#333" />
        <circle cx="42" cy="90" r="2.5" fill="#666" /><rect x="49" y="88" width="22" height="4" fill="#333" />
        <circle cx="42" cy="102" r="2.5" fill="#666" /><rect x="49" y="100" width="22" height="4" fill="#333" />
        <circle cx="42" cy="114" r="2.5" fill="#666" /><rect x="49" y="112" width="22" height="4" fill="#333" />
        <circle cx="42" cy="126" r="2.5" fill="#666" /><rect x="49" y="124" width="22" height="4" fill="#333" />
      </g>

      {/* Dimmed Right Team Roster (opacity-20 to show it is hidden/muted) */}
      <g opacity="0.2">
        <rect x="230" y="64" width="34" height="4" fill="#555" />
        <circle cx="236" cy="78" r="2.5" fill="#666" /><rect x="243" y="76" width="22" height="4" fill="#333" />
        <circle cx="236" cy="90" r="2.5" fill="#666" /><rect x="243" y="88" width="22" height="4" fill="#333" />
        <circle cx="236" cy="102" r="2.5" fill="#666" /><rect x="243" y="100" width="22" height="4" fill="#333" />
        <circle cx="236" cy="114" r="2.5" fill="#666" /><rect x="243" y="112" width="22" height="4" fill="#333" />
        <circle cx="236" cy="126" r="2.5" fill="#666" /><rect x="243" y="124" width="22" height="4" fill="#333" />
      </g>

      {/* High-Contrast White Reticle Framing Brackets [ ] Holding the Central Active Content */}
      <path 
        d="M 96 64 L 86 64 L 86 138 L 96 138 M 204 64 L 214 64 L 214 138 L 204 138" 
        stroke="#ffffff" 
        strokeWidth="2.5" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="group-hover:stroke-[#FF5500] transition-colors duration-200" 
      />

      {/* Central Active Content: Veto Map Chips, Server Banner, Radar Status */}
      {/* 1. Map selection chips */}
      <g transform="translate(93, 67)">
        <rect width="114" height="18" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="6" y="5" width="22" height="8" fill="#333" />
        <rect x="32" y="5" width="22" height="8" fill="#ffffff" />
        <rect x="58" y="5" width="22" height="8" fill="#333" />
        <rect x="84" y="5" width="24" height="8" fill="#333" />
      </g>

      {/* 2. Active Server Connection Plate */}
      <g transform="translate(93, 90)">
        <rect width="114" height="24" fill="#ffffff" />
        <circle cx="14" cy="12" r="3.5" fill="#000000" />
        <rect x="25" y="9" width="76" height="6" fill="#000000" />
      </g>

      {/* 3. Veto Radar Status Plate */}
      <g transform="translate(93, 119)">
        <rect width="114" height="15" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <polygon points="14,124 17.5,126.5 16,131 12,131 10.5,126.5" transform="translate(0, -120)" stroke="#777" strokeWidth="1" fill="none" />
        <rect x="25" y="5" width="56" height="5" fill="#444" />
        <rect x="87" y="4" width="20" height="7" fill="#282828" />
      </g>
    </svg>
  ),

  // 008: TEAM AVERAGE ELO (FACEIT Matchroom Header HUD: Team A ELO plate + Captain avatar vs Center divider vs Captain avatar + Team B ELO plate — zero text/digits)
  avgEloPill: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* Main Match Header Banner Container */}
      <rect x="24" y="38" width="252" height="104" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Top Subtle Roster Skeletons */}
      <rect x="36" y="50" width="44" height="5" fill="#222222" />
      <rect x="135" y="50" width="30" height="5" fill="#1a1a1a" />
      <rect x="220" y="50" width="44" height="5" fill="#222222" />

      {/* Center Divider: Neutral Score/Status Skeletons (No text 'VS') */}
      <g transform="translate(132, 68)">
        <rect x="0" y="0" width="16" height="28" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="4" y="12" width="8" height="4" fill="#444444" />
        
        <rect x="20" y="0" width="16" height="28" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="24" y="12" width="8" height="4" fill="#444444" />
      </g>

      {/* Left: Team A (Dark ELO Plate + Captain Round Avatar) */}
      {/* Dark Avg ELO Plate (Centered skeleton, no rank circle) */}
      <g transform="translate(36, 68)">
        <rect width="52" height="28" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="13" y="11" width="26" height="6" fill="#666666" />
      </g>
      {/* Captain Round Avatar */}
      <g transform="translate(108, 82)">
        <circle cx="0" cy="0" r="14" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="0" cy="-4" r="4.5" fill="#666666" />
        <path d="M -9 9 C -9 3 -5 2 0 2 C 5 2 9 3 9 9 Z" fill="#666666" />
      </g>

      {/* Right: Team B (Captain Round Avatar + Dark ELO Plate) */}
      {/* Captain Round Avatar */}
      <g transform="translate(192, 82)">
        <circle cx="0" cy="0" r="14" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="0" cy="-4" r="4.5" fill="#666666" />
        <path d="M -9 9 C -9 3 -5 2 0 2 C 5 2 9 3 9 9 Z" fill="#666666" />
      </g>
      {/* Dark Avg ELO Plate (Centered skeleton, no rank circle) */}
      <g transform="translate(212, 68)">
        <rect 
          width="52" 
          height="28" 
          fill="#141414" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1" 
        />
        <rect 
          x="13" 
          y="11" 
          width="26" 
          height="6" 
          fill="#ffffff" 
        />
      </g>

      {/* Bottom Balance Scale Line (Synced with Card 09: h-1.5 / 6px, rounded-none, bg-white/10 track) */}
      <g transform="translate(36, 116)">
        <rect x="0" y="0" width="228" height="6" fill="rgba(255,255,255,0.1)" />
        <rect 
          x="0" 
          y="0" 
          width="125" 
          height="6" 
          fill="#ffffff" 
          className="group-hover:fill-[#FF5500] transition-colors duration-200" 
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
    </svg>
  ),

  // 009: SIDEBAR ELO WIDGET (Minimalist 2-color monochrome skeleton HUD)
  sidebarElo: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />

      {/* Main Floating Widget Modal (Left / Center) */}
      <g>
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
        <circle cx="52" cy="72" r="14" fill="#1c1c1c" stroke="#555555" strokeWidth="1.5" className="group-hover:stroke-[#FF5500] transition-colors duration-200" />
        <circle cx="52" cy="72" r="6" fill="#333333" />

        {/* ELO Rating: Horizontal White Skeleton Plate */}
        <rect x="78" y="66" width="64" height="12" fill="#ffffff" />

        {/* Trend Indicator: Subtle Grey Skeleton */}
        <rect x="152" y="68" width="24" height="8" fill="#333333" />

        {/* Progress Bar (Thin line with white active portion) */}
        <rect x="36" y="96" width="178" height="4" fill="#262626" />
        <rect x="36" y="96" width="96" height="4" fill="#ffffff" className="group-hover:fill-[#FF5500] transition-colors duration-200" />

        {/* Divider */}
        <line x1="36" y1="114" x2="214" y2="114" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Bottom Regional Rank Skeletons (Two Clean Grey Skeleton Blocks) */}
        <rect x="36" y="122" width="84" height="24" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="46" y="131" width="36" height="5" fill="#444444" />
        <rect x="88" y="131" width="22" height="5" fill="#666666" />

        <rect x="130" y="122" width="84" height="24" fill="#141414" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="140" y="131" width="36" height="5" fill="#444444" />
        <rect x="182" y="131" width="22" height="5" fill="#666666" />
      </g>

      {/* Right Navigation Dock (FACEIT Sidebar: Aligned along vertical axis cx=264) */}
      <rect x="244" y="20" width="40" height="140" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      
      {/* 1. Profile Avatar (Upper Circle) */}
      <circle cx="264" cy="36" r="8" fill="#181818" stroke="#555555" strokeWidth="1" />
      <circle cx="264" cy="34" r="3" fill="#777777" />
      <path d="M 258 41 C 258 38 261 37 264 37 C 267 37 270 38 270 41 Z" fill="#777777" />

      {/* 2. Neat Widget Slot Rectangular Box */}
      <rect x="249" y="52" width="30" height="34" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" className="group-hover:stroke-[#FF5500] transition-colors duration-200" />
      <circle cx="264" cy="61" r="4.5" fill="#222222" stroke="#666666" strokeWidth="1" />
      <rect x="254" y="70" width="20" height="4" fill="#ffffff" className="group-hover:fill-[#FF5500] transition-colors duration-200" />
      <rect x="257" y="77" width="14" height="2" fill="#444444" />

      {/* 3. Identical Grey Navigation Dots on the Same Vertical Axis */}
      <circle cx="264" cy="98" r="3" fill="#333333" />
      <circle cx="264" cy="112" r="3" fill="#333333" />
      <circle cx="264" cy="126" r="3" fill="#333333" />
      <circle cx="264" cy="140" r="3" fill="#333333" />
    </svg>
  ),

  // 010: MAP SELECTOR WIN RATES (Center tile progress bar turns #FF5500)
  mapSelectorStats: () => (
    <svg className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200" viewBox="0 0 300 180" fill="none">
      <rect width="300" height="180" fill="#0a0a0a" />
      {/* Left Tile */}
      <g transform="translate(25, 35)">
        <rect width="75" height="110" stroke="#333" fill="#111" />
        {/* Abstract title skeleton bar */}
        <rect x="22" y="28" width="31" height="5" fill="#555" />
        {/* Horizontal progress bar (68%) */}
        <rect x="14" y="82" width="47" height="6" fill="#222" />
        <rect x="14" y="82" width="32" height="6" fill="#666" />
      </g>
      {/* Main Center Tile (Featured: turns #FF5500 on hover) */}
      <g transform="translate(112, 35)">
        <rect width="75" height="110" stroke="#fff" strokeWidth="1.5" fill="#161616" className="group-hover:stroke-[#FF5500] transition-colors duration-200" />
        {/* Abstract title skeleton bar */}
        <rect x="20" y="28" width="35" height="5" fill="#fff" />
        {/* Horizontal progress bar (74%) */}
        <rect x="14" y="82" width="47" height="6" fill="#333" />
        <rect x="14" y="82" width="35" height="6" fill="#fff" className="group-hover:fill-[#FF5500] transition-colors duration-200" />
      </g>
      {/* Right Tile */}
      <g transform="translate(200, 35)">
        <rect width="75" height="110" stroke="#333" fill="#111" />
        {/* Abstract title skeleton bar */}
        <rect x="24" y="28" width="27" height="5" fill="#444" />
        {/* Horizontal progress bar (52%) */}
        <rect x="14" y="82" width="47" height="6" fill="#222" />
        <rect x="14" y="82" width="24" height="6" fill="#555" />
      </g>
    </svg>
  ),
};

export const Features: React.FC<FeaturesProps> = ({ currentLang, onSelectFeature }) => {
  const t = translations[currentLang] || translations.en;

  const iconMap: Record<string, React.ReactNode> = {
    radar: <Map className="w-5 h-5 stroke-[1.75]" />,
    stats: <BarChart2 className="w-5 h-5 stroke-[1.75]" />,
    avgEloPill: <TrendingUp className="w-5 h-5 stroke-[1.75]" />,
    autoCopyServer: <Copy className="w-5 h-5 stroke-[1.75]" />,
    focusMode: <EyeOff className="w-5 h-5 stroke-[1.75]" />,
    autoAcceptMatch: <CheckCircle className="w-5 h-5 stroke-[1.75]" />,
    autoAcceptParty: <Users className="w-5 h-5 stroke-[1.75]" />,
    enhancedHistory: <Download className="w-5 h-5 stroke-[1.75]" />,
    sidebarElo: <TrendingUp className="w-5 h-5 stroke-[1.75]" />,
    mapSelectorStats: <LayoutGrid className="w-5 h-5 stroke-[1.75]" />,
  };

  return (
    <>
      <section id="features" className="relative pt-8 sm:pt-12 pb-20 sm:pb-24 w-full max-w-6xl mx-auto px-4 sm:px-6 z-10">
        
        {/* Centered Clean Section Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            {t.features.title}
          </h2>
        </div>

        {/* 3x3 + 1 Card Grid (Sharp 90° Corners, Clickable, #FF5500 Hover Accents) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch">
          {t.features.items.map((item, index) => {
            const TextureComponent = CardTextures[item.id] || CardTextures.radar;
            const indexCode = String(index + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectFeature(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectFeature(item.id);
                  }
                }}
                className="group relative rounded-none flex flex-col h-full overflow-hidden bg-[#0a0a0a] border border-[#1f1f1f] hover:border-white/50 focus-visible:border-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transition-colors duration-200 cursor-pointer select-none"
              >
                {/* 1. Interactive Preview (Artwork top) */}
                <div className="h-44 sm:h-48 w-full relative border-b border-[#1f1f1f] overflow-hidden bg-[#0a0a0a] shrink-0 flex items-center justify-center cursor-pointer select-none">
                  <TextureComponent />
                </div>

                {/* Card Content Body: Clean Minimalist Layout */}
                <div className="p-5 sm:p-7 flex flex-col flex-1 bg-[#0a0a0a] cursor-pointer select-none">
                  {/* 2. Number & Icon row (Strictly centered flex with zero excess line-height) */}
                  <div className="flex items-center justify-between mb-3 leading-none w-full cursor-pointer select-none">
                    <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-neutral-500 group-hover:text-[#FF5500] transition-colors duration-200 leading-none cursor-pointer select-none">
                      {indexCode}
                    </span>
                    <div className="text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200 flex items-center shrink-0 cursor-pointer select-none">
                      {iconMap[item.id] || <CheckCircle className="w-5 h-5 stroke-[1.75]" />}
                    </div>
                  </div>

                  {/* 3. Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1 sm:mt-2 mb-2 cursor-pointer select-none">
                    {item.title}
                  </h3>

                  {/* 4. Description (Pure benefit, no noise) */}
                  <p className="font-sans text-xs sm:text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-left sm:text-justify hyphens-auto w-full max-w-none cursor-pointer select-none">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </section>
    </>
  );
};
