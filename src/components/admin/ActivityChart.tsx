import React, { useState, useMemo, useRef } from 'react';

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

export type ChartPeriod = 'all' | 'year' | 'month';

export const ActivityChart: React.FC<ActivityChartProps> = ({ users, currentLang = 'ru' }) => {
  const isRu = currentLang === 'ru';
  const [period, setPeriod] = useState<ChartPeriod>('month');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate timeline points based on selected period
  const points: DataPoint[] = useMemo(() => {
    const list: DataPoint[] = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const parseDate = (val?: string | number): Date | null => {
      if (!val) return null;
      const d = new Date(
        typeof val === 'number'
          ? (val < 1e11 ? val * 1000 : val)
          : val
      );
      return isNaN(d.getTime()) ? null : d;
    };

    if (period === 'month') {
      // Last 30 daily buckets
      const regCounts: Record<string, number> = {};
      const activeCounts: Record<string, number> = {};

      users.forEach((u) => {
        const dReg = parseDate(u.created_at);
        if (dReg) {
          const k = `${String(dReg.getDate()).padStart(2, '0')}.${String(dReg.getMonth() + 1).padStart(2, '0')}`;
          regCounts[k] = (regCounts[k] || 0) + 1;
        }
        const dAct = parseDate(u.last_login_at);
        if (dAct) {
          const k = `${String(dAct.getDate()).padStart(2, '0')}.${String(dAct.getMonth() + 1).padStart(2, '0')}`;
          activeCounts[k] = (activeCounts[k] || 0) + 1;
        }
      });

      for (let i = 29; i >= 0; i--) {
        const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const k = `${day}.${month}`;
        const regs = regCounts[k] || 0;
        const act = activeCounts[k] || (regs > 0 ? regs : 0);
        list.push({
          dateStr: `${k}.${d.getFullYear()}`,
          label: k,
          registrations: regs,
          active: act,
          total: Math.max(regs, act),
        });
      }
    } else if (period === 'year') {
      // 12 monthly buckets
      const monthNamesRu = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthNames = isRu ? monthNamesRu : monthNamesEn;

      const regCounts: Record<string, number> = {};
      const activeCounts: Record<string, number> = {};

      users.forEach((u) => {
        const dReg = parseDate(u.created_at);
        if (dReg) {
          const k = `${dReg.getFullYear()}-${String(dReg.getMonth() + 1).padStart(2, '0')}`;
          regCounts[k] = (regCounts[k] || 0) + 1;
        }
        const dAct = parseDate(u.last_login_at);
        if (dAct) {
          const k = `${dAct.getFullYear()}-${String(dAct.getMonth() + 1).padStart(2, '0')}`;
          activeCounts[k] = (activeCounts[k] || 0) + 1;
        }
      });

      for (let i = 11; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth();
        const k = `${y}-${String(m + 1).padStart(2, '0')}`;
        const regs = regCounts[k] || 0;
        const act = activeCounts[k] || (regs > 0 ? regs : 0);
        list.push({
          dateStr: `${monthNames[m]} ${y}`,
          label: monthNames[m],
          registrations: regs,
          active: act,
          total: Math.max(regs, act),
        });
      }
    } else {
      // All time: all recorded months or 24-month horizon
      const monthNamesRu = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthNames = isRu ? monthNamesRu : monthNamesEn;

      const regCounts: Record<string, number> = {};
      const activeCounts: Record<string, number> = {};

      users.forEach((u) => {
        const dReg = parseDate(u.created_at);
        if (dReg) {
          const k = `${dReg.getFullYear()}-${String(dReg.getMonth() + 1).padStart(2, '0')}`;
          regCounts[k] = (regCounts[k] || 0) + 1;
        }
        const dAct = parseDate(u.last_login_at);
        if (dAct) {
          const k = `${dAct.getFullYear()}-${String(dAct.getMonth() + 1).padStart(2, '0')}`;
          activeCounts[k] = (activeCounts[k] || 0) + 1;
        }
      });

      for (let i = 17; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth();
        const k = `${y}-${String(m + 1).padStart(2, '0')}`;
        const regs = regCounts[k] || 0;
        const act = activeCounts[k] || (regs > 0 ? regs : 0);
        list.push({
          dateStr: `${monthNames[m]} ${y}`,
          label: `${monthNames[m]} '${String(y).slice(2)}`,
          registrations: regs,
          active: act,
          total: Math.max(regs, act),
        });
      }
    }

    return list;
  }, [users, period, isRu]);

  // Chart coordinate space
  const chartWidth = 900;
  const chartHeight = 130;
  const paddingX = 30;
  const paddingTop = 20;
  const paddingBottom = 20;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingTop - paddingBottom;
  const bottomY = paddingTop + innerHeight;

  const maxVal = useMemo(() => {
    const rawMax = Math.max(...points.map((p) => Math.max(p.registrations, p.active)), 1);
    return Math.max(rawMax, 3);
  }, [points]);

  const regCoords = useMemo(() => {
    return points.map((p, i) => {
      const x = paddingX + (i / (points.length - 1)) * innerWidth;
      const y = bottomY - (p.registrations / maxVal) * innerHeight;
      return { x, y, point: p, val: p.registrations };
    });
  }, [points, maxVal, innerWidth, innerHeight, bottomY]);

  const activeCoords = useMemo(() => {
    return points.map((p, i) => {
      const x = paddingX + (i / (points.length - 1)) * innerWidth;
      const y = bottomY - (p.active / maxVal) * innerHeight;
      return { x, y, point: p, val: p.active };
    });
  }, [points, maxVal, innerWidth, innerHeight, bottomY]);

  // Monotonic Catmull-Rom cubic bezier with strict zero-baseline clamp
  function buildSmoothPath(cList: Array<{ x: number; y: number; val: number }>) {
    if (cList.length === 0) return '';
    let d = `M ${cList[0].x} ${cList[0].y}`;
    for (let i = 0; i < cList.length - 1; i++) {
      const p0 = i > 0 ? cList[i - 1] : cList[i];
      const p1 = cList[i];
      const p2 = cList[i + 1];
      const p3 = i < cList.length - 2 ? cList[i + 2] : p2;

      let cp1x = p1.x + (p2.x - p0.x) / 6;
      let cp1y = p1.y + (p2.y - p0.y) / 6;
      let cp2x = p2.x - (p3.x - p1.x) / 6;
      let cp2y = p2.y - (p3.y - p1.y) / 6;

      // Strict clamping to completely eliminate overshoot below the baseline
      if (p1.val === 0 && p2.val === 0) {
        cp1y = bottomY;
        cp2y = bottomY;
      } else {
        if (p1.val === 0) {
          cp1y = bottomY;
        }
        if (p2.val === 0) {
          cp2y = bottomY;
        }
        // Never allow control points to dip below bottomY or exceed paddingTop
        cp1y = Math.min(Math.max(cp1y, paddingTop), bottomY);
        cp2y = Math.min(Math.max(cp2y, paddingTop), bottomY);
      }

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  const regLinePath = useMemo(() => buildSmoothPath(regCoords), [regCoords]);
  const activeLinePath = useMemo(() => buildSmoothPath(activeCoords), [activeCoords]);

  const regAreaPath = useMemo(() => {
    if (regCoords.length === 0) return '';
    return `${regLinePath} L ${regCoords[regCoords.length - 1].x} ${bottomY} L ${regCoords[0].x} ${bottomY} Z`;
  }, [regLinePath, regCoords, bottomY]);

  const activeHover = hoveredIdx !== null ? { reg: regCoords[hoveredIdx], act: activeCoords[hoveredIdx] } : null;

  // Static, evenly spaced ticks for X-axis to eliminate layout shift and random gaps
  const displayTicks = useMemo(() => {
    if (points.length === 0) return [];
    const indices: number[] = [];
    if (period === 'month') {
      const step = 6;
      for (let i = 0; i < points.length; i += step) {
        indices.push(i);
      }
      if (indices[indices.length - 1] !== points.length - 1) {
        indices.push(points.length - 1);
      }
    } else if (period === 'year') {
      const step = 2;
      for (let i = 0; i < points.length; i += step) {
        indices.push(i);
      }
      if (indices[indices.length - 1] !== points.length - 1) {
        indices.push(points.length - 1);
      }
    } else {
      const step = 3;
      for (let i = 0; i < points.length; i += step) {
        indices.push(i);
      }
      if (indices[indices.length - 1] !== points.length - 1) {
        indices.push(points.length - 1);
      }
    }

    return indices.map((idx) => ({
      index: idx,
      label: points[idx].label,
      coord: regCoords[idx],
    }));
  }, [points, period, regCoords]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const mouseY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    setMousePos({ x: mouseX, y: mouseY });

    // Compute hovered index mapped across inner chart area
    const mouseSvgX = (mouseX / rect.width) * chartWidth;
    const rel = (mouseSvgX - paddingX) / innerWidth;
    const idx = Math.round(rel * (points.length - 1));
    const clampedIdx = Math.max(0, Math.min(idx, points.length - 1));
    setHoveredIdx(clampedIdx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setMousePos(null);
  };

  // Safe floating tooltip positioning clamped inside chart area
  const rectWidth = containerRef.current?.clientWidth || chartWidth;
  const tooltipX = mousePos ? Math.max(90, Math.min(mousePos.x, rectWidth - 90)) : 0;
  const isCursorNearTop = mousePos ? mousePos.y < 60 : false;
  const tooltipY = mousePos ? (isCursorNearTop ? Math.max(10, mousePos.y + 16) : mousePos.y - 12) : 0;
  const tooltipTransform = isCursorNearTop ? 'translate(-50%, 0)' : 'translate(-50%, -100%)';

  return (
    <section className="w-full bg-[#090909] border border-[#1A1A1F] p-5 rounded-none">
      {/* Clean Single Header without Duplicate Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1A1A1F] gap-2 mb-4">
        <h3 className="font-mono text-xs font-normal text-[#FFFFFF] tracking-wider">
          {isRu ? 'Динамика регистраций и активности' : 'Registration & Activity trends'}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {/* Period switch buttons */}
          <div className="flex items-center gap-1">
            {(['all', 'year', 'month'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-2 py-1 text-[11px] font-mono border rounded-none transition-colors cursor-pointer ${
                  period === p
                    ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF] font-bold'
                    : 'bg-transparent text-[#929292] border-[#222228] hover:text-[#FFFFFF] hover:border-[#929292]'
                }`}
              >
                {p === 'all'
                  ? (isRu ? 'За всё время' : 'All time')
                  : p === 'year'
                  ? (isRu ? '1 год' : '1 year')
                  : (isRu ? '1 месяц' : '1 month')}
              </button>
            ))}
          </div>

          {/* Series indicators */}
          <div className="flex items-center gap-3 text-xs text-[#929292]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-white inline-block" />
              <span className="text-white">{isRu ? 'Регистрации' : 'Registrations'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b-2 border-dotted border-[#929292] inline-block" />
              <span>{isRu ? 'Активность' : 'Activity'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive SVG Chart with Fluid Mouse Tracking */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[150px] select-none cursor-crosshair"
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible pointer-events-none"
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
            y1={bottomY}
            x2={chartWidth - paddingX}
            y2={bottomY}
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

          {/* Points & Interactive guides */}
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
                    y2={bottomY}
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
                  className="transition-all duration-150"
                />

                {/* Registration point circle */}
                <circle
                  cx={rc.x}
                  cy={rc.y}
                  r={isHovered ? 4.5 : 2.5}
                  fill={isHovered ? '#FFFFFF' : '#090909'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip — Strictly Floating Inside Chart Area (top >= 10px, never overlaps buttons) */}
        {activeHover && mousePos && (
          <div
            className="absolute z-20 pointer-events-none bg-[#000000] border border-[#222228] px-2.5 py-1.5 shadow-2xl font-mono text-[11px] whitespace-nowrap transition-transform duration-75"
            style={{
              left: `${tooltipX}px`,
              top: `${tooltipY}px`,
              transform: tooltipTransform,
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

      {/* Date Labels below chart — Strictly Static Ticks with Absolute Positioning (Zero Layout Shift) */}
      <div className="relative w-full h-6 border-t border-[#1A1A1F] mt-2 select-none">
        {displayTicks.map((tick) => {
          const isHovered = hoveredIdx === tick.index;
          const leftPercent = (tick.coord.x / chartWidth) * 100;
          return (
            <span
              key={tick.index}
              className="absolute top-1.5 font-mono text-[10px] select-none pointer-events-none transition-colors duration-150"
              style={{
                left: `${leftPercent}%`,
                transform: 'translateX(-50%)',
                fontWeight: 400, // ALWAYS 400! Strict font-normal, zero layout shift!
                color: isHovered ? '#FFFFFF' : '#929292',
              }}
            >
              {tick.label}
            </span>
          );
        })}
      </div>
    </section>
  );
};
