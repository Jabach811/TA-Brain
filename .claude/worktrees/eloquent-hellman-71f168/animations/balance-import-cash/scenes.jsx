// scenes.jsx — Cash conversion workflow scenes

const BG = '#0A0B0E';
const PANEL = '#12141A';
const PANEL_HI = '#171A21';
const BORDER = 'rgba(255,255,255,0.08)';
const BORDER_HI = 'rgba(255,255,255,0.14)';
const TEXT = '#E7E9EE';
const TEXT_DIM = 'rgba(231,233,238,0.55)';
const TEXT_DIMMER = 'rgba(231,233,238,0.35)';
const ACCENT = 'oklch(72% 0.13 245)'; // cool blue
const ACCENT_SOFT = 'oklch(72% 0.13 245 / 0.14)';
const SUCCESS = 'oklch(74% 0.14 155)';
const SUCCESS_SOFT = 'oklch(74% 0.14 155 / 0.14)';
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";
const SANS = "'Inter', system-ui, sans-serif";

// Shared formatter
const fmtMoney = (n) => '$' + Math.round(n).toLocaleString('en-US');

// ─────────────────────────────────────────────────────────────
// Soft corner glow accent behind panels
function Glow({ x, y, size = 400, color = ACCENT, opacity = 0.18 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      background: `radial-gradient(circle at center, ${color}, transparent 65%)`,
      opacity,
      filter: 'blur(40px)',
      pointerEvents: 'none',
    }} />
  );
}

// A clean card/panel
function Panel({ x, y, width, height, children, style = {}, elevated = false, glow = false }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width, height,
      background: elevated ? PANEL_HI : PANEL,
      border: `1px solid ${elevated ? BORDER_HI : BORDER}`,
      borderRadius: 14,
      boxShadow: elevated
        ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.8)'
        : '0 1px 0 rgba(255,255,255,0.03) inset',
      overflow: 'hidden',
      ...style,
    }}>
      {glow && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${ACCENT_SOFT}, transparent 60%)`,
          pointerEvents: 'none',
        }} />
      )}
      {children}
    </div>
  );
}

// System/product label chip
function SystemLabel({ label, dim = false }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: MONO, fontSize: 11,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: dim ? TEXT_DIMMER : TEXT_DIM,
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: 3,
        background: dim ? TEXT_DIMMER : ACCENT,
        boxShadow: dim ? 'none' : `0 0 8px ${ACCENT}`,
      }} />
      {label}
    </div>
  );
}

// Animated counting number
function CountUp({ from = 0, to, progress, prefix = '$', suffix = '' }) {
  const v = from + (to - from) * progress;
  return prefix + Math.round(v).toLocaleString('en-US') + suffix;
}

// ─────────────────────────────────────────────────────────────
// Scene 1 — Prior Record Keeper

function Scene1() {
  const { localTime, duration } = useSprite();
  const t = localTime;

  // Fade in whole scene
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  // Panel reveal
  const panelIn = Easing.easeOutCubic(clamp((t - 0.3) / 0.7, 0, 1));

  // Value count-up: 0.8 -> 1.8s
  const countProgress = Easing.easeOutCubic(clamp((t - 0.8) / 1.0, 0, 1));

  // Liquidation begins at t=2.4: value streams down/out
  const liquidStart = 2.4;
  const liquidProgress = clamp((t - liquidStart) / 1.6, 0, 1);
  const liquidEase = Easing.easeInOutCubic(liquidProgress);

  // Value panel shrinks/fades as it "exits"
  const valueExitProgress = clamp((t - liquidStart) / 1.2, 0, 1);
  const valueOpacity = 1 - Easing.easeInCubic(valueExitProgress);
  const valueScale = 1 - 0.08 * Easing.easeInCubic(valueExitProgress);

  // Scene exit (last 0.5s)
  const exitStart = duration - 0.5;
  const sceneOut = t > exitStart ? 1 - Easing.easeInCubic(clamp((t - exitStart) / 0.5, 0, 1)) : 1;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <Glow x={100} y={100} size={500} opacity={0.12} />

      {/* Source system panel — left side */}
      <div style={{
        position: 'absolute',
        left: 120, top: 140,
        width: 520, height: 440,
        opacity: panelIn,
        transform: `translateY(${(1 - panelIn) * 12}px)`,
      }}>
        <Panel x={0} y={0} width={520} height={440}>
          {/* Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <SystemLabel label="Prior Record Keeper" />
            <div style={{
              fontFamily: MONO, fontSize: 10,
              color: TEXT_DIMMER, letterSpacing: '0.1em',
            }}>SOURCE</div>
          </div>

          {/* Rows — background metadata to give it weight */}
          <div style={{ padding: '20px 24px' }}>
            {[
              { k: 'Account', v: 'PARTICIPANT_POOL_0471' },
              { k: 'Status', v: 'CLOSED', dim: true },
              { k: 'As of', v: '2026-04-17' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0',
                fontFamily: MONO, fontSize: 12,
                borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none',
              }}>
                <span style={{ color: TEXT_DIMMER }}>{r.k}</span>
                <span style={{ color: r.dim ? TEXT_DIMMER : TEXT_DIM, letterSpacing: '0.04em' }}>{r.v}</span>
              </div>
            ))}

            {/* The consolidated value block */}
            <div style={{
              marginTop: 24,
              padding: '28px 24px',
              background: `linear-gradient(180deg, ${ACCENT_SOFT}, rgba(255,255,255,0.02))`,
              border: `1px solid ${BORDER_HI}`,
              borderRadius: 10,
              opacity: valueOpacity,
              transform: `scale(${valueScale})`,
              transformOrigin: 'center',
              position: 'relative',
            }}>
              <div style={{
                fontFamily: MONO, fontSize: 10,
                color: TEXT_DIM, letterSpacing: '0.14em',
                textTransform: 'uppercase', marginBottom: 10,
              }}>
                Consolidated Balance
              </div>
              <div style={{
                fontFamily: SANS, fontSize: 44, fontWeight: 500,
                color: TEXT, letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}>
                <CountUp from={0} to={2847500} progress={countProgress} />
              </div>
              <div style={{
                marginTop: 6,
                fontFamily: MONO, fontSize: 11,
                color: TEXT_DIMMER,
              }}>USD · Consolidated</div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Liquidation stream — particles flowing right */}
      {liquidProgress > 0 && (
        <StreamFlow
          fromX={640} fromY={360}
          toX={1280} toY={360}
          progress={liquidEase}
          intensity={liquidProgress < 1 ? 1 : 0}
          count={14}
        />
      )}

      {/* Stage title bottom */}
      <div style={{
        position: 'absolute', left: 120, bottom: 80,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp((t - 0.5) / 0.6, 0, 1)),
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 11,
          color: TEXT_DIMMER, letterSpacing: '0.2em',
        }}>01 / 05</div>
        <div style={{ width: 32, height: 1, background: BORDER_HI }} />
        <div style={{
          fontFamily: SANS, fontSize: 16, fontWeight: 500,
          color: TEXT, letterSpacing: '-0.005em',
        }}>Liquidation at source</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Stream of flowing data particles

function StreamFlow({ fromX, fromY, toX, toY, progress, intensity = 1, count = 10, color = ACCENT }) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  return (
    <>
      {/* Trail line */}
      <div style={{
        position: 'absolute',
        left: fromX, top: fromY,
        width: length * progress,
        height: 2,
        transformOrigin: '0 50%',
        transform: `translateY(-1px) rotate(${angle}deg)`,
        background: `linear-gradient(90deg, transparent, ${color} 20%, ${color} 80%, transparent)`,
        opacity: 0.35 * intensity,
        pointerEvents: 'none',
      }} />
      {/* Particles */}
      {Array.from({ length: count }).map((_, i) => {
        const stagger = i / count;
        const p = (progress * 1.3 - stagger) % 1;
        if (p < 0 || p > 1) return null;
        const x = fromX + dx * p;
        const y = fromY + dy * p + Math.sin(p * Math.PI * 2 + i) * 4;
        const size = 4 + (i % 3);
        const op = Math.sin(p * Math.PI) * intensity;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: x - size / 2, top: y - size / 2,
            width: size, height: size,
            borderRadius: size / 2,
            background: color,
            opacity: op * 0.9,
            boxShadow: `0 0 ${size * 2}px ${color}`,
            pointerEvents: 'none',
          }} />
        );
      })}
    </>
  );
}

Object.assign(window, { Scene1, StreamFlow, Panel, SystemLabel, Glow, CountUp, fmtMoney,
  BG, PANEL, PANEL_HI, BORDER, BORDER_HI, TEXT, TEXT_DIM, TEXT_DIMMER,
  ACCENT, ACCENT_SOFT, SUCCESS, SUCCESS_SOFT, MONO, SANS,
});
