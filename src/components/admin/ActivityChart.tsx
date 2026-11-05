import React, { useState, useMemo } from 'react';

export interface ActivityUser {
  guid: string;
  created_at: string | number;
  last_login_at?: string | number;
}

interface ActivityChartProps {
  users: ActivityUser[];
  currentLang?: string;
}

interface DataPoint {
  dateStr: string;
  label: string;
  registrations: number;
  active: number;
  total: number;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ users, currentLang = 'ru' }) => {
  const isRu = currentLang === 'ru';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Generate 14-day timeline ending today
  const points: DataPoint[] = useMemo(() => {
    const list: DataPoint[] = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Aggregate user dates
    const regCounts: Record<string, number> = {};
    const activeCounts: Record<string, number> = {};

    users.forEach((u) => {
      if (u.created_at) {
        const d = new Date(
          typeof u.created_at === 'number'
            ? (u.created_at < 1e11 ? u.created_at * 1000 : u.created_at)
            : u.created_at
        );
        if (!isNaN(d.getTime())) {
          const key = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
          regCounts[key] = (regCounts[key] || 0) + 1;
        }
      }
      if (u.last_login_at) {
        const d = new Date(
          typeof u.last_login_at === 'number'
            ? (u.last_login_at < 1e11 ? u.last_login_at * 1000 : u.last_login_at)
            : u.last_login_at
        );
        if (!isNaN(d.getTime())) {
          const key = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
          activeCounts[key] = (activeCounts[key] || 0) + 1;
        }
      }
    });

    for (let i = 13; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const key = `${day}.${month}`;
      const regs = regCounts[key] || 0;
      const act = activeCounts[key] || (regs > 0 ? regs : 0);
      list.push({
        dateStr: `${key}.${d.getFullYear()}`,
        label: key,
        registrations: regs,
        active: act,
        total: Math.max(regs, act),
      });
    }

    return list;
  }, [users]);

  // Chart coordinate space
  const chartWidth = 900;
  const chartHeight = 130;
  const paddingX = 30;
  const paddingTop = 20;
  const paddingBottom = 20;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const maxVal = useMemo(() => {
    const rawMax = Math.max(...points.map((p) => Math.max(p.registrations, p.active)), 1);
    return Math.max(rawMax, 3);
  }, [points]);

  const regCoords = useMemo(() => {
    return points.map((p, i) => {
      const x = paddingX + (i / (points.length - 1)) * innerWidth;
      const y = paddingTop + innerHeight - (p.registrations / maxVal) * innerHeight;
      return { x, y, point: p, val: p.registrations };
    });
  }, [points, maxVal, innerWidth, innerHeight]);

  const activeCoords = useMemo(() => {
    return points.map((p, i) => {
      const x = paddingX + (i / (points.length - 1)) * innerWidth;
      const y = paddingTop + innerHeight - (p.active / maxVal) * innerHeight;
      return { x, y, point: p, val: p.active };
    });
  }, [points, maxVal, innerWidth, innerHeight]);

  function buildSmoothPath(cList: Array<{ x: number; y: number }>) {
    if (cList.length === 0) return '';
    let d = `M ${cList[0].x} ${cList[0].y}`;
    for (let i = 0; i < cList.length - 1; i++) {
      const p0 = i > 0 ? cList[i - 1] : cList[i];
      const p1 = cList[i];
      const p2 = cList[i + 1];
      const p3 = i < cList.length - 2 ? cList[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  const regLinePath = useMemo(() => buildSmoothPath(regCoords), [regCoords]);
  const activeLinePath = useMemo(() => buildSmoothPath(activeCoords), [activeCoords]);

  const regAreaPath = useMemo(() => {
    if (regCoords.length === 0) return '';
    const bottomY = paddingTop + innerHeight;
    return `${regLinePath} L ${regCoords[regCoords.length - 1].x} ${bottomY} L ${regCoords[0].x} ${bottomY} Z`;
  }, [regLinePath, regCoords, innerHeight]);

  const activeHover = hoveredIdx !== null ? { reg: regCoords[hoveredIdx], act: activeCoords[hoveredIdx] } : null;

  return (
    <section className="w-full bg-[#090909] border border-[#1A1A1F] p-5 rounded-none">
      {/* Header with Title and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1A1A1F] gap-2 mb-4">
        <div>
          <h2 className="font-mono text-xs font-bold text-[#FFFFFF] tracking-wider">
            {isRu ? 'Динамика регистраций и активности' : 'Registration & Activity trends'}
          </h2>
          <span className="text-[10px] text-[#929292] font-mono">
            {isRu ? 'Активность игроков за последние 14 дней' : 'Player activity trends over the last 14 days'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#929292]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-white inline-block" />
            <span className="text-white">{isRu ? 'Регистрации' : 'Registrations'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b-2 border-dotted border-[#929292] inline-block" />
            <span>{isRu ? 'Активность' : 'Activity'}</span>
          </div>
          <div className="text-[#FFFFFF] font-bold bg-[#141416] border border-[#222228] px-2 py-0.5">
            {users.length} {isRu ? 'игроков' : 'players'}
          </div>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="relative w-full h-[150px] select-none">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="chartGradientWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingTop}
            x2={chartWidth - paddingX}
            y2={paddingTop}
            stroke="#1A1A1F"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={paddingTop + innerHeight / 2}
            x2={chartWidth - paddingX}
            y2={paddingTop + innerHeight / 2}
            stroke="#1A1A1F"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={paddingTop + innerHeight}
            x2={chartWidth - paddingX}
            y2={paddingTop + innerHeight}
            stroke="#1A1A1F"
            strokeWidth="1"
          />

          {/* Area fill for registrations */}
          <path d={regAreaPath} fill="url(#chartGradientWhite)" />

          {/* Series 2: Activity (dotted / dashed gray line) */}
          <path
            d={activeLinePath}
            fill="none"
            stroke="#929292"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Series 1: Registrations (solid white line) */}
          <path
            d={regLinePath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points & Interactive columns */}
          {regCoords.map((rc, idx) => {
            const ac = activeCoords[idx];
            const isHovered = hoveredIdx === idx;
            return (
              <g key={idx}>
                {/* Vertical guide on hover */}
                {isHovered && (
                  <line
                    x1={rc.x}
                    y1={paddingTop}
                    x2={rc.x}
                    y2={paddingTop + innerHeight}
                    stroke="#222228"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Activity point circle */}
                <circle
                  cx={ac.x}
                  cy={ac.y}
                  r={isHovered ? 4 : 2}
                  fill={isHovered ? '#FF5500' : '#090909'}
                  stroke={isHovered ? '#FF5500' : '#929292'}
                  strokeWidth="1.5"
                  className="transition-all duration-150 pointer-events-none"
                />

                {/* Registration point circle */}
                <circle
                  cx={rc.x}
                  cy={rc.y}
                  r={isHovered ? 4.5 : 2.5}
                  fill={isHovered ? '#FFFFFF' : '#090909'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-150 pointer-events-none"
                />

                {/* Invisible hover hitbox */}
                <rect
                  x={rc.x - innerWidth / points.length / 2}
                  y={0}
                  width={innerWidth / points.length}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {activeHover && (
          <div
            className="absolute -top-3 z-20 pointer-events-none bg-[#000000] border border-[#222228] px-2.5 py-1.5 shadow-2xl font-mono text-[11px] transform -translate-x-1/2 -translate-y-full whitespace-nowrap"
            style={{
              left: `${(activeHover.reg.x / chartWidth) * 100}%`,
            }}
          >
            <div className="text-white font-bold">{activeHover.reg.point.dateStr}</div>
            <div className="text-[#929292] text-[10px] flex items-center gap-2 mt-0.5">
              <span>
                {isRu ? 'Регистрации' : 'Registrations'}:{' '}
                <strong className="text-white">{activeHover.reg.val}</strong>
              </span>
              <span>•</span>
              <span>
                {isRu ? 'Активность' : 'Active'}:{' '}
                <strong className="text-white">{activeHover.act.val}</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Date Labels below chart */}
      <div className="flex justify-between items-center px-4 pt-2 border-t border-[#1A1A1F] mt-1 text-[10px] font-mono text-[#929292]">
        {points.map((p, i) => (
          <span
            key={i}
            className={`${i % 2 !== 0 && points.length > 8 ? 'hidden sm:inline-block' : ''} ${
              hoveredIdx === i ? 'text-white font-bold' : ''
            }`}
          >
            {p.label}
          </span>
        ))}
      </div>
    </section>
  );
};
