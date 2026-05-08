// fm_shared.jsx — Fund Mapping Animation: shared constants + primitives

const FM = {
  BG: '#08090C',
  PANEL: '#10121A',
  PANEL_HI: '#141720',
  BORDER: 'rgba(255,255,255,0.07)',
  BORDER_HI: 'rgba(255,255,255,0.13)',
  TEXT: '#E8EAF0',
  DIM: 'rgba(232,234,240,0.50)',
  DIMMER: 'rgba(232,234,240,0.32)',
  ACCENT: 'oklch(70% 0.14 248)',
  ACCENT_S: 'oklch(70% 0.14 248 / 0.15)',
  SUCCESS: 'oklch(73% 0.14 155)',
  SUCCESS_S: 'oklch(73% 0.14 155 / 0.15)',
  WARN: 'oklch(78% 0.12 60)',
  WARN_S: 'oklch(78% 0.12 60 / 0.15)',
  SANS: "'Inter', system-ui, sans-serif",
  MONO: "'JetBrains Mono', ui-monospace, monospace",

  // Fund color palette
  FUND_COLORS: [
    { accent: 'oklch(68% 0.16 255)', soft: 'oklch(68% 0.16 255 / 0.14)' }, // blue
    { accent: 'oklch(72% 0.14 200)', soft: 'oklch(72% 0.14 200 / 0.14)' }, // teal
    { accent: 'oklch(74% 0.12 270)', soft: 'oklch(74% 0.12 270 / 0.14)' }, // violet
  ],
};

const WIRE_TOTAL = 4125000;

const FUNDS = [
  { id: 'FND-GRWTH', label: 'Growth Fund',       ticker: 'GRW', pct: 45 },
  { id: 'FND-BALNC', label: 'Balanced Fund',     ticker: 'BAL', pct: 35 },
  { id: 'FND-FIXED', label: 'Fixed Income',       ticker: 'FIX', pct: 20 },
];

const PARTICIPANTS = [
  {
    id: 'ACCT-4401', label: 'Account A',
    allocations: [50, 30, 20],
  },
  {
    id: 'ACCT-4402', label: 'Account B',
    allocations: [40, 40, 20],
  },
  {
    id: 'ACCT-4403', label: 'Account C',
    allocations: [35, 35, 30],
  },
];

// Each participant's total value = sum of their fund slices
// Fund total = WIRE_TOTAL * fund.pct / 100
// Each fund is split across 3 participants by their allocations

function fundValue(fIdx) { return WIRE_TOTAL * FUNDS[fIdx].pct / 100; }
function participantFundValue(pIdx, fIdx) {
  return fundValue(fIdx) * PARTICIPANTS[pIdx].allocations[fIdx] / 100;
}
function participantTotal(pIdx) {
  return FUNDS.reduce((sum, _, fi) => sum + participantFundValue(pIdx, fi), 0);
}

// ─── Shared primitives ────────────────────────────────────────

function FMGlow({ x, y, size = 400, color, opacity = 0.15 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: `radial-gradient(circle at center, ${color || FM.ACCENT}, transparent 65%)`,
      opacity,
      filter: 'blur(50px)',
      pointerEvents: 'none',
    }} />
  );
}

function FMPanel({ x, y, w, h, children, style = {}, elevated = false, glowColor = null }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
      background: elevated ? FM.PANEL_HI : FM.PANEL,
      border: `1px solid ${elevated ? FM.BORDER_HI : FM.BORDER}`,
      borderRadius: 12,
      boxShadow: elevated
        ? '0 2px 0 rgba(255,255,255,0.04) inset, 0 24px 80px -20px rgba(0,0,0,0.9)'
        : '0 1px 0 rgba(255,255,255,0.03) inset',
      overflow: 'hidden',
      ...style,
    }}>
      {glowColor && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${glowColor}, transparent 55%)`,
          pointerEvents: 'none',
        }} />
      )}
      {children}
    </div>
  );
}

function FMChip({ label, color, soft }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: FM.MONO, fontSize: 10,
      color, letterSpacing: '0.12em', textTransform: 'uppercase',
      padding: '3px 8px',
      background: soft,
      border: `1px solid ${color}`,
      borderRadius: 4,
    }}>{label}</div>
  );
}

function FMRow({ label, value, dim = false }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 0',
      borderBottom: `1px solid ${FM.BORDER}`,
      fontFamily: FM.MONO, fontSize: 11,
    }}>
      <span style={{ color: FM.DIMMER }}>{label}</span>
      <span style={{ color: dim ? FM.DIM : FM.TEXT, letterSpacing: '0.03em' }}>{value}</span>
    </div>
  );
}

function SceneCaption({ n, total = 6, label, t, startDelay = 0.4 }) {
  const op = Easing.easeOutCubic(clamp((t - startDelay) / 0.5, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: 100, bottom: 72,
      display: 'flex', alignItems: 'center', gap: 14, opacity: op,
    }}>
      <div style={{
        fontFamily: FM.MONO, fontSize: 10,
        color: FM.DIMMER, letterSpacing: '0.22em',
      }}>{String(n).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
      <div style={{ width: 28, height: 1, background: FM.BORDER_HI }} />
      <div style={{
        fontFamily: FM.SANS, fontSize: 15, fontWeight: 500,
        color: FM.TEXT, letterSpacing: '-0.005em',
      }}>{label}</div>
    </div>
  );
}

// Particle stream between two points on an SVG canvas
function FMStream({ fromX, fromY, toX, toY, progress, active = true, color, count = 10, stageW = 1280, stageH = 720 }) {
  const col = color || FM.ACCENT;
  const dx = toX - fromX, dy = toY - fromY;
  const len = Math.sqrt(dx*dx + dy*dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const t = useTime();

  return (
    <>
      <div style={{
        position: 'absolute', left: fromX, top: fromY,
        width: len * progress, height: 1.5,
        transformOrigin: '0 50%',
        transform: `translateY(-0.75px) rotate(${angle}deg)`,
        background: `linear-gradient(90deg, transparent, ${col} 25%, ${col} 75%, transparent)`,
        opacity: 0.35,
        pointerEvents: 'none',
      }} />
      {active && Array.from({ length: count }).map((_, i) => {
        const stagger = i / count;
        const p = ((t * 0.8 - stagger) % 1);
        if (p < 0 || p > progress) return null;
        const x = fromX + dx * p;
        const y = fromY + dy * p + Math.sin(p * Math.PI * 3 + i) * 3;
        const op = Math.sin(p * Math.PI);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: x - 3, top: y - 3,
            width: 6, height: 6, borderRadius: 3,
            background: col, opacity: op * 0.85,
            boxShadow: `0 0 10px ${col}`,
            pointerEvents: 'none',
          }} />
        );
      })}
    </>
  );
}

// Bezier arc flow (SVG path)
function FMArc({ fromX, fromY, toX, toY, progress, color, curveDir = 1 }) {
  const col = color || FM.ACCENT;
  const cpX = (fromX + toX) / 2;
  const cpY = fromY + curveDir * 60;
  const d = `M ${fromX} ${fromY} Q ${cpX} ${cpY} ${toX} ${toY}`;
  const pathRef = React.useRef(null);
  const [len, setLen] = React.useState(300);
  React.useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [fromX, fromY, toX, toY]);

  const t = useTime();
  const particles = [];
  if (len > 0 && progress > 0 && progress < 1) {
    for (let i = 0; i < 8; i++) {
      const stagger = i / 8;
      const p = ((t * 0.6 - stagger) % 1);
      if (p < 0 || p > progress || !pathRef.current) continue;
      try {
        const pt = pathRef.current.getPointAtLength(len * p);
        particles.push({ x: pt.x, y: pt.y, op: Math.sin(p * Math.PI), key: i });
      } catch {}
    }
  }

  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
      width={1280} height={720}>
      <path ref={pathRef} d={d} fill="none" stroke={col} strokeWidth={1.5}
        strokeDasharray={len} strokeDashoffset={len * (1 - progress)}
        opacity={progress > 0 ? 0.5 : 0} />
      {particles.map(pt => (
        <circle key={pt.key} cx={pt.x} cy={pt.y} r={3} fill={col} opacity={pt.op}
          style={{ filter: `drop-shadow(0 0 5px ${col})` }} />
      ))}
    </svg>
  );
}

Object.assign(window, {
  FM, WIRE_TOTAL, FUNDS, PARTICIPANTS,
  fundValue, participantFundValue, participantTotal,
  FMGlow, FMPanel, FMChip, FMRow, SceneCaption, FMStream, FMArc,
});
