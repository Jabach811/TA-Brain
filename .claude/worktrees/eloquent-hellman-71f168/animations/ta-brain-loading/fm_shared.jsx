// fm_shared.jsx — Design tokens + shared FM components
// Reverse-engineered to match the TIK workflow visual language.

const FM = {
  // Text
  TEXT:    'oklch(96% 0.008 250)',
  DIM:     'oklch(72% 0.015 250)',
  DIMMER:  'oklch(50% 0.012 250)',

  // Surfaces
  PANEL:    'rgba(18,20,26,0.55)',
  PANEL_HI: 'rgba(28,30,38,0.85)',
  BORDER:    'rgba(255,255,255,0.06)',
  BORDER_HI: 'rgba(255,255,255,0.12)',

  // Accents
  ACCENT:   'oklch(72% 0.14 248)',
  ACCENT_S: 'oklch(72% 0.14 248 / 0.16)',
  SUCCESS:  'oklch(76% 0.16 150)',
  SUCCESS_S:'oklch(76% 0.16 150 / 0.16)',
  WARN:     'oklch(80% 0.14 75)',
  WARN_S:   'oklch(80% 0.14 75 / 0.16)',
  ERROR:    'oklch(68% 0.20 25)',
  ERROR_S:  'oklch(68% 0.20 25 / 0.16)',

  // Type
  MONO: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
  SANS: 'Inter, system-ui, sans-serif',
};

function FMPanel({ x = 0, y = 0, w, h, elevated = false, children }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
      background: elevated ? FM.PANEL_HI : FM.PANEL,
      border: `1px solid ${elevated ? FM.BORDER_HI : FM.BORDER}`,
      borderRadius: 12,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: elevated ? '0 24px 60px -20px rgba(0,0,0,0.7)' : 'none',
      overflow: 'hidden',
    }}>{children}</div>
  );
}

function FMGlow({ x, y, size = 500, color = FM.ACCENT, opacity = 0.1 }) {
  return (
    <div style={{
      position: 'absolute',
      left: x - size / 2, top: y - size / 2,
      width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
      opacity, pointerEvents: 'none',
      filter: 'blur(24px)',
    }} />
  );
}

function FMChip({ label, color = FM.ACCENT, soft = FM.ACCENT_S }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: 100,
      background: soft, border: `1px solid ${color}`,
      fontFamily: FM.MONO, fontSize: 9, color,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>{label}</div>
  );
}

// Animated bezier arc with traveling dot.
// curveDir: vertical curvature offset multiplier (negative = up, positive = down)
function FMArc({ fromX, fromY, toX, toY, progress, color = FM.ACCENT, curveDir = 0 }) {
  const dx = toX - fromX, dy = toY - fromY;
  const cx = fromX + dx * 0.5;
  const cy = fromY + dy * 0.5 + curveDir * 60;
  const path = `M ${fromX} ${fromY} Q ${cx} ${cy} ${toX} ${toY}`;
  // Arc length approximation
  const len = Math.hypot(dx, dy) + Math.abs(curveDir) * 30;
  // Dot position on quadratic bezier at t=progress
  const t = progress;
  const dotX = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * cx + t * t * toX;
  const dotY = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * cy + t * t * toY;
  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
         width="1280" height="720" viewBox="0 0 1280 720">
      <path d={path} stroke={color} strokeWidth="1.2" fill="none"
        opacity="0.45"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)} />
      {progress > 0.02 && progress < 0.98 && (
        <circle cx={dotX} cy={dotY} r="3.5" fill={color}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      )}
    </svg>
  );
}

// Particle stream — dots traveling fromX,fromY -> toX,toY in a line.
function FMStream({ fromX, fromY, toX, toY, progress, color = FM.ACCENT, count = 8, active = true }) {
  const dx = toX - fromX, dy = toY - fromY;
  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
         width="1280" height="720" viewBox="0 0 1280 720">
      {Array.from({ length: count }).map((_, i) => {
        const phase = (progress * 1.4 + i / count) % 1;
        const opacity = active ? 0.9 * Math.sin(phase * Math.PI) : 0;
        return (
          <circle key={i}
            cx={fromX + dx * phase} cy={fromY + dy * phase}
            r="2.2" fill={color}
            opacity={opacity}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        );
      })}
    </svg>
  );
}

// Bottom-left scene caption: "01 / 06 — Label"
function SceneCaption({ n, total, t, label }) {
  const inP = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: 80, bottom: 70,
      display: 'flex', alignItems: 'center', gap: 14,
      opacity: inP,
    }}>
      <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.22em' }}>
        {String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
      <div style={{ width: 28, height: 1, background: FM.BORDER_HI }} />
      <div style={{ fontFamily: FM.SANS, fontSize: 15, fontWeight: 500, color: FM.TEXT }}>
        {label}
      </div>
    </div>
  );
}

Object.assign(window, { FM, FMPanel, FMGlow, FMChip, FMArc, FMStream, SceneCaption });
