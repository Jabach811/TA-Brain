// ta-brain-loading_scenes.jsx

const NODES = [
  { id: 'DC',  label: 'Data Consultants', color: 'oklch(72% 0.15 248)', soft: 'oklch(72% 0.15 248 / 0.20)', tx: 320, ty: 260, sx: 50,   sy: 140 },
  { id: 'COM', label: 'COMs',             color: 'oklch(78% 0.16 55)',  soft: 'oklch(78% 0.16 55 / 0.20)',  tx: 640, ty: 175, sx: 640,  sy: -30 },
  { id: 'TC',  label: 'TCs',              color: 'oklch(74% 0.16 168)', soft: 'oklch(74% 0.16 168 / 0.20)', tx: 960, ty: 260, sx: 1230, sy: 140 },
  { id: 'QA',  label: 'QA',               color: 'oklch(73% 0.15 295)', soft: 'oklch(73% 0.15 295 / 0.20)', tx: 960, ty: 460, sx: 1230, sy: 580 },
  { id: 'PS',  label: 'Prod Support',     color: 'oklch(75% 0.18 28)',  soft: 'oklch(75% 0.18 28 / 0.20)',  tx: 640, ty: 545, sx: 640,  sy: 750 },
  { id: 'MGT', label: 'Management',       color: 'oklch(80% 0.14 130)', soft: 'oklch(80% 0.14 130 / 0.20)', tx: 320, ty: 460, sx: 50,   sy: 580 },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 3], [1, 4], [2, 5],
];

const PHASES = [0, 1.2, 2.4, 3.6, 4.8, 6.0];

function getNodePos(node, i, globalT) {
  const arriveP = Easing.easeOutCubic(clamp(globalT / 2.2, 0, 1));
  const oscAmp = 10 * (1 - clamp((globalT - 2) / 2, 0, 1));
  return {
    x: node.sx + (node.tx - node.sx) * arriveP + Math.sin(globalT * 1.1 + PHASES[i]) * oscAmp,
    y: node.sy + (node.ty - node.sy) * arriveP + Math.cos(globalT * 0.9 + PHASES[i] * 0.7) * oscAmp,
  };
}

function NodeLayer({ globalT, glowScale = 1 }) {
  return (
    <React.Fragment>
      {NODES.map((node, i) => {
        const { x, y } = getNodePos(node, i, globalT);
        const nodeIn = Easing.easeOutCubic(clamp((globalT - i * 0.15) / 0.6, 0, 1));
        const gs = typeof glowScale === 'number' ? glowScale : 1;
        return (
          <div key={node.id} style={{ position: 'absolute', left: 0, top: 0, opacity: nodeIn }}>
            <div style={{
              position: 'absolute',
              left: x - 35 * gs, top: y - 35 * gs,
              width: 70 * gs, height: 70 * gs,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${node.color} 0%, transparent 70%)`,
              opacity: 0.38,
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              left: x - 7, top: y - 7,
              width: 14, height: 14,
              borderRadius: 7,
              background: node.color,
              boxShadow: `0 0 8px ${node.color}, 0 0 18px ${node.soft}`,
            }} />
            <div style={{
              position: 'absolute',
              left: x, top: y + 16,
              transform: 'translateX(-50%)',
              fontFamily: FM.SANS,
              fontSize: 13,
              fontWeight: 500,
              color: node.color,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              opacity: 0.95,
              pointerEvents: 'none',
              textShadow: `0 0 12px ${node.soft}`,
            }}>{node.label}</div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

function ConnectionLayer({ globalT, sceneLocalT, showAll, pulseT }) {
  const positions = NODES.map((n, i) => getNodePos(n, i, globalT));
  const pulse = (pulseT > 0)
    ? 0.40 + 0.30 * Math.abs(Math.sin(pulseT * Math.PI * 1.5))
    : 0.40;

  return (
    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
         width="1280" height="720" viewBox="0 0 1280 720">
      {CONNECTIONS.map(([ai, bi], ci) => {
        let segP;
        if (showAll) {
          segP = 1;
        } else {
          const drawStart = ci * 0.18;
          segP = Easing.easeOutCubic(clamp(((sceneLocalT || 0) - drawStart) / 0.6, 0, 1));
        }
        if (segP <= 0.01) return null;

        const a = positions[ai], b = positions[bi];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        const color = NODES[ai].color;

        const dotX = a.x + (b.x - a.x) * segP;
        const dotY = a.y + (b.y - a.y) * segP;
        const showDot = !showAll && segP > 0.02 && segP < 0.99;

        return (
          <g key={ci}>
            <line
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={color}
              strokeWidth="1.2"
              opacity={pulse}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - segP)}
            />
            {showDot && (
              <circle cx={dotX} cy={dotY} r="3" fill={color}
                style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Scene 1 — Isolation (0.0 - 2.5s) ──────────────────────────────────────
function Scene1() {
  const { localTime: t, duration } = useSprite();
  const globalT = useTime();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={500} color="oklch(76% 0.14 52)" opacity={0.06} />
      <NodeLayer globalT={globalT} />
      <SceneCaption n={1} total={5} t={t} label="Six minds. Each their own." />
    </div>
  );
}

// ── Scene 2 — Convergence (2.0 - 4.5s) ────────────────────────────────────
function Scene2() {
  const { localTime: t, duration } = useSprite();
  const globalT = useTime();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const glowP = Easing.easeInOutCubic(clamp(t / 2.0, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={400 + 200 * glowP} color="oklch(76% 0.14 52)" opacity={0.06 + 0.07 * glowP} />
      <NodeLayer globalT={globalT} glowScale={1 + 0.4 * glowP} />
      <SceneCaption n={2} total={5} t={t} label="Something draws them closer." />
    </div>
  );
}

// ── Scene 3 — Connections Form (4.0 - 6.5s) ───────────────────────────────
function Scene3() {
  const { localTime: t, duration } = useSprite();
  const globalT = useTime();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={620} color="oklch(76% 0.14 52)" opacity={0.10} />
      <ConnectionLayer globalT={globalT} sceneLocalT={t} showAll={false} pulseT={0} />
      <NodeLayer globalT={globalT} />
      <SceneCaption n={3} total={5} t={t} label="Knowledge finds its path." />
    </div>
  );
}

// ── Scene 4 — The Pulse (6.0 - 7.5s) ─────────────────────────────────────
function Scene4() {
  const { localTime: t, duration } = useSprite();
  const globalT = useTime();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));
  const glowPulse = 1 + 0.22 * Math.abs(Math.sin(t * Math.PI * 1.5));
  const flareP = Easing.easeInOutCubic(clamp((t - 0.8) / 0.5, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={700} color="oklch(76% 0.14 52)" opacity={0.12} />
      <FMGlow x={640} y={360} size={300 + 200 * flareP} color="oklch(88% 0.18 68)" opacity={flareP * 0.28} />
      <ConnectionLayer globalT={globalT} sceneLocalT={0} showAll={true} pulseT={t} />
      <NodeLayer globalT={globalT} glowScale={glowPulse} />
      <SceneCaption n={4} total={5} t={t} label="One mind. Unbreakable." />
    </div>
  );
}

// ── Scene 5 — TA Brain Reveal (7.0 - 9.5s) ───────────────────────────────
function Scene5() {
  const { localTime: t, duration } = useSprite();
  const globalT = useTime();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const titleIn = Easing.easeOutCubic(clamp((t - 0.3) / 0.8, 0, 1));
  const taglineIn = Easing.easeOutCubic(clamp((t - 0.9) / 0.7, 0, 1));

  const flareSettle = 1 - Easing.easeOutCubic(clamp(t / 0.8, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={800} color="oklch(76% 0.14 52)" opacity={0.14} />
      <FMGlow x={640} y={360} size={500} color="oklch(88% 0.18 68)" opacity={flareSettle * 0.26} />
      <ConnectionLayer globalT={globalT} sceneLocalT={0} showAll={true} pulseT={t * 0.6} />
      <NodeLayer globalT={globalT} />

      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: `translate(-50%, -50%) translateY(${(1 - titleIn) * 14}px)`,
        opacity: titleIn,
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: FM.SANS,
          fontSize: 52,
          fontWeight: 600,
          color: FM.TEXT,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>TA Brain</div>
        <div style={{
          fontFamily: FM.MONO,
          fontSize: 10,
          color: 'oklch(76% 0.16 52)',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginTop: 14,
          opacity: taglineIn,
          transform: `translateY(${(1 - taglineIn) * 8}px)`,
        }}>Stronger Together</div>
      </div>

      <SceneCaption n={5} total={5} t={t} label="TA Brain — Stronger Together." />
    </div>
  );
}

Object.assign(window, { Scene1, Scene2, Scene3, Scene4, Scene5 });
