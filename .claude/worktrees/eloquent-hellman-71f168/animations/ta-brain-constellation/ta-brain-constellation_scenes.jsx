// ta-brain-constellation_scenes.jsx
// 5 scenes, 24 seconds total
// Story: isolated minds → first connections → full web → blazing constellation → TA Brain

// ── Node data ──────────────────────────────────────────────────────────────────
const NODES = [
  { id: 'DC',           label: 'Data Consultant',  x: 320,  y: 230, color: 'oklch(74% 0.16 248)', soft: 'oklch(74% 0.16 248 / 0.18)' },
  { id: 'COM',          label: 'Conversion Ops',   x: 820,  y: 190, color: 'oklch(74% 0.16 295)', soft: 'oklch(74% 0.16 295 / 0.18)' },
  { id: 'PAYROLL',      label: 'Payroll Support',  x: 185,  y: 455, color: 'oklch(74% 0.16 150)', soft: 'oklch(74% 0.16 150 / 0.18)' },
  { id: 'FTP',          label: 'FTP Team',          x: 1055, y: 370, color: 'oklch(74% 0.16 200)', soft: 'oklch(74% 0.16 200 / 0.18)' },
  { id: 'CASHIERING',   label: 'Cashiering',        x: 690,  y: 535, color: 'oklch(78% 0.15 75)',  soft: 'oklch(78% 0.15 75 / 0.18)'  },
  { id: 'AQT',          label: 'AQT',               x: 520,  y: 135, color: 'oklch(74% 0.16 320)', soft: 'oklch(74% 0.16 320 / 0.18)' },
  { id: 'PROD',         label: 'Prod Support',      x: 128,  y: 305, color: 'oklch(74% 0.16 30)',  soft: 'oklch(74% 0.16 30 / 0.18)'  },
  { id: 'NBI',          label: 'NBI',               x: 955,  y: 530, color: 'oklch(74% 0.16 180)', soft: 'oklch(74% 0.16 180 / 0.18)' },
  { id: 'EDS',          label: 'EDS',               x: 450,  y: 415, color: 'oklch(72% 0.14 260)', soft: 'oklch(72% 0.14 260 / 0.18)' },
  { id: 'INFORMATICA',  label: 'Informatica',       x: 660,  y: 305, color: 'oklch(72% 0.14 340)', soft: 'oklch(72% 0.14 340 / 0.18)' },
];

// Index lookup by id
const NODE = Object.fromEntries(NODES.map(n => [n.id, n]));

// ── Edge data — [fromId, toId, label] ─────────────────────────────────────────
const EDGES = [
  ['DC',       'COM',        'conversion handoff'],
  ['DC',       'EDS',        'data load'],
  ['DC',       'INFORMATICA','processing'],
  ['DC',       'FTP',        'file upload'],
  ['COM',      'CASHIERING', 'wire instructions'],
  ['COM',      'NBI',        'new business'],
  ['EDS',      'INFORMATICA','data flow'],
  ['DC',       'PAYROLL',    'payroll template'],
  ['FTP',      'EDS',        'file receipt'],
  ['PROD',     'DC',         'support'],
  ['AQT',      'DC',         'quality check'],
  ['PAYROLL',  'COM',        'go-live handoff'],
  ['NBI',      'CASHIERING', 'settlement'],
  ['AQT',      'COM',        'review'],
];

// ── Shared node renderer ───────────────────────────────────────────────────────
function Node({ node, opacity = 1, glowScale = 1, labelOpacity = 1, pulseT = 0 }) {
  const pulse = 1 + 0.06 * Math.sin(pulseT * Math.PI * 2);
  const r = 7 * pulse;
  const glowR = 28 * glowScale * pulse;
  return (
    <g>
      {/* outer glow ring */}
      <circle cx={node.x} cy={node.y} r={glowR} fill={node.soft} opacity={opacity * 0.7} />
      {/* core dot */}
      <circle cx={node.x} cy={node.y} r={r} fill={node.color}
        opacity={opacity}
        style={{ filter: `drop-shadow(0 0 ${8 * glowScale}px ${node.color})` }} />
      {/* label */}
      <text
        x={node.x} y={node.y + 26}
        textAnchor="middle"
        fontFamily="JetBrains Mono, ui-monospace, monospace"
        fontSize="9.5"
        letterSpacing="0.12em"
        fill={node.color}
        opacity={opacity * labelOpacity}
      >{node.id}</text>
    </g>
  );
}

// ── Edge line renderer (SVG) ───────────────────────────────────────────────────
function EdgeLine({ fromNode, toNode, progress, color, streamT = 0, streaming = false, streamCount = 6 }) {
  const x1 = fromNode.x, y1 = fromNode.y, x2 = toNode.x, y2 = toNode.y;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  // mid-point quadratic control — slight curve
  const mx = (x1 + x2) / 2 - dy * 0.06;
  const my = (y1 + y2) / 2 + dx * 0.06;
  const path = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;

  const particles = streaming ? Array.from({ length: streamCount }).map((_, i) => {
    const phase = ((streamT * 0.4 + i / streamCount) % 1);
    const tt = phase;
    const px = (1 - tt) * (1 - tt) * x1 + 2 * (1 - tt) * tt * mx + tt * tt * x2;
    const py = (1 - tt) * (1 - tt) * y1 + 2 * (1 - tt) * tt * my + tt * tt * y2;
    const op = 0.85 * Math.sin(tt * Math.PI);
    return { px, py, op };
  }) : [];

  return (
    <g>
      <path d={path} stroke={color} strokeWidth="1.0" fill="none"
        opacity={0.35 * progress}
        strokeDasharray={len * 2}
        strokeDashoffset={len * 2 * (1 - progress)} />
      {streaming && particles.map((p, i) => (
        <circle key={i} cx={p.px} cy={p.py} r="2.0" fill={color}
          opacity={p.op * progress}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      ))}
    </g>
  );
}

// ── Scene 1 — Isolation (0–5s) ────────────────────────────────────────────────
// Nodes appear one by one, dim, unconnected. Each mind on its own.
function Scene1() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.6;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.6, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const nodeIn = (i) => Easing.easeOutCubic(clamp((t - 0.3 - i * 0.3) / 0.6, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={700} color={FM.ACCENT} opacity={0.04} />
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="1280" height="720" viewBox="0 0 1280 720">
        {NODES.map((node, i) => {
          const op = nodeIn(i) * 0.55;
          const pulse = 0.6 + 0.4 * Math.sin((t - i * 0.3) * 1.2);
          return (
            <Node key={node.id} node={node} opacity={op} glowScale={0.6 * pulse} labelOpacity={0.7} pulseT={(t * 0.25 + i * 0.1) % 1} />
          );
        })}
      </svg>
      <SceneCaption n={1} total={5} t={t} label="Each mind, working alone" />
    </div>
  );
}

// ── Scene 2 — First Contact (5–10s) ──────────────────────────────────────────
// The first connections draw. DC↔COM, DC↔EDS, DC↔INFORMATICA, COM↔NBI.
// Connected nodes blaze brighter.
const FIRST_EDGES = [0, 1, 2, 7]; // indices into EDGES array

function Scene2() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.6;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.6, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const edgeProgress = (i) => Easing.easeOutCubic(clamp((t - 0.3 - i * 0.9) / 1.2, 0, 1));

  // Which nodes are lit by first-contact edges?
  const litIds = new Set();
  FIRST_EDGES.forEach((ei, i) => {
    if (edgeProgress(i) > 0.02) {
      litIds.add(EDGES[ei][0]);
      litIds.add(EDGES[ei][1]);
    }
  });

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={500} y={300} size={600} color={FM.ACCENT} opacity={0.06} />
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="1280" height="720" viewBox="0 0 1280 720">
        {/* Draw first-contact edges */}
        {FIRST_EDGES.map((ei, i) => {
          const edge = EDGES[ei];
          const from = NODE[edge[0]], to = NODE[edge[1]];
          const prog = edgeProgress(i);
          const col = from.color;
          return (
            <EdgeLine key={ei} fromNode={from} toNode={to} progress={prog} color={col} streamT={t} streaming={prog > 0.98} streamCount={5} />
          );
        })}
        {/* All nodes, lit or dim */}
        {NODES.map((node, i) => {
          const isLit = litIds.has(node.id);
          const op = isLit ? 1 : 0.32;
          const gs = isLit ? 1.4 : 0.5;
          return <Node key={node.id} node={node} opacity={op} glowScale={gs} labelOpacity={isLit ? 1 : 0.5} pulseT={(t * 0.3 + i * 0.1) % 1} />;
        })}
      </svg>

      {/* Connection label that appears with first arc */}
      {edgeProgress(0) > 0.5 && (
        <div style={{
          position: 'absolute',
          left: 565, top: 195,
          fontFamily: FM.MONO, fontSize: 9, color: FM.DIM,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          opacity: Easing.easeOutCubic(clamp((t - 1.4) / 0.5, 0, 1)),
        }}>conversion handoff</div>
      )}

      <SceneCaption n={2} total={5} t={t} label="Knowledge finds its first connection" />
    </div>
  );
}

// ── Scene 3 — The Web Forms (10–15s) ─────────────────────────────────────────
// Remaining edges draw in rapid staggered succession. All nodes brighten.
const SECOND_EDGES = [3, 4, 5, 6, 8, 9, 10, 11, 12, 13]; // remaining indices

function Scene3() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.6;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.6, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const firstEdgeProg = () => 1; // all first edges already drawn
  const secondEdgeProg = (i) => Easing.easeOutCubic(clamp((t - 0.2 - i * 0.35) / 0.9, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={340} size={800} color={FM.ACCENT} opacity={0.07} />
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="1280" height="720" viewBox="0 0 1280 720">
        {/* All first-contact edges fully drawn */}
        {FIRST_EDGES.map((ei) => {
          const edge = EDGES[ei];
          const from = NODE[edge[0]], to = NODE[edge[1]];
          return <EdgeLine key={ei} fromNode={from} toNode={to} progress={1} color={from.color} streamT={t} streaming={true} streamCount={5} />;
        })}
        {/* Second-wave edges drawing in */}
        {SECOND_EDGES.map((ei, i) => {
          const edge = EDGES[ei];
          const from = NODE[edge[0]], to = NODE[edge[1]];
          const prog = secondEdgeProg(i);
          return <EdgeLine key={ei} fromNode={from} toNode={to} progress={prog} color={from.color} streamT={t} streaming={prog > 0.95} streamCount={4} />;
        })}
        {/* All nodes fully lit */}
        {NODES.map((node, i) => (
          <Node key={node.id} node={node} opacity={1} glowScale={1.2} labelOpacity={1} pulseT={(t * 0.35 + i * 0.1) % 1} />
        ))}
      </svg>
      <SceneCaption n={3} total={5} t={t} label="The network takes shape" />
    </div>
  );
}

// ── Scene 4 — One Constellation (15–20s) ──────────────────────────────────────
// Full network blazing. Particles flow on all edges. Pulses as one organism.
function Scene4() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.6;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.6, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Collective pulse — all nodes breathe in sync
  const collectivePulse = 1 + 0.08 * Math.sin(t * 1.8 * Math.PI * 2);
  const glowBreathe = 0.08 + 0.05 * Math.sin(t * 0.9 * Math.PI * 2);

  // Text appears at t=1.5
  const textIn = Easing.easeOutCubic(clamp((t - 1.5) / 0.8, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={350} size={900} color={FM.ACCENT} opacity={glowBreathe} />
      <FMGlow x={320} y={230} size={350} color='oklch(74% 0.16 248)' opacity={glowBreathe * 0.6} />
      <FMGlow x={820} y={190} size={300} color='oklch(74% 0.16 295)' opacity={glowBreathe * 0.6} />

      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="1280" height="720" viewBox="0 0 1280 720">
        {/* All edges streaming */}
        {EDGES.map((edge, ei) => {
          const from = NODE[edge[0]], to = NODE[edge[1]];
          return <EdgeLine key={ei} fromNode={from} toNode={to} progress={1} color={from.color} streamT={t} streaming={true} streamCount={7} />;
        })}
        {/* All nodes with collective pulse */}
        {NODES.map((node, i) => (
          <Node key={node.id} node={node} opacity={1}
            glowScale={collectivePulse * 1.5}
            labelOpacity={1}
            pulseT={(t * 0.4 + i * 0.1) % 1} />
        ))}
      </svg>

      {/* Central quote */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        opacity: textIn,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>together</div>
        <div style={{
          fontFamily: FM.SANS, fontSize: 22, fontWeight: 500,
          color: FM.TEXT, letterSpacing: '-0.02em',
          background: 'rgba(8,9,12,0.72)',
          padding: '12px 28px', borderRadius: 8,
          border: `1px solid ${FM.BORDER_HI}`,
          backdropFilter: 'blur(12px)',
        }}>Unbreakable</div>
      </div>

      <SceneCaption n={4} total={5} t={t} label="Stronger together" />
    </div>
  );
}

// ── Scene 5 — TA Brain (20–24s) ───────────────────────────────────────────────
// The constellation holds. TA Brain wordmark materializes at center.
// Green "Knowledge Connected" chip appears. Payoff frame.
function Scene5() {
  const { localTime: t, duration } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  const logoIn   = Easing.easeOutCubic(clamp((t - 0.4) / 1.0, 0, 1));
  const taglineIn = Easing.easeOutCubic(clamp((t - 1.2) / 0.8, 0, 1));
  const chipIn   = Easing.easeOutCubic(clamp((t - 2.0) / 0.6, 0, 1));
  const glowBreathe = 0.10 + 0.04 * Math.sin(t * 0.8 * Math.PI * 2);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn }}>
      <FMGlow x={640} y={340} size={950} color={FM.ACCENT} opacity={glowBreathe} />
      <FMGlow x={640} y={340} size={400} color={FM.SUCCESS} opacity={chipIn * 0.06} />

      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="1280" height="720" viewBox="0 0 1280 720">
        {/* All edges, slightly dimmed to let logo breathe */}
        {EDGES.map((edge, ei) => {
          const from = NODE[edge[0]], to = NODE[edge[1]];
          return <EdgeLine key={ei} fromNode={from} toNode={to} progress={1} color={from.color} streamT={t} streaming={true} streamCount={6} />;
        })}
        {NODES.map((node, i) => (
          <Node key={node.id} node={node} opacity={0.7}
            glowScale={1.0 + 0.2 * Math.sin((t * 0.5 + i * 0.15) * Math.PI * 2)}
            labelOpacity={0.7}
            pulseT={(t * 0.3 + i * 0.1) % 1} />
        ))}
      </svg>

      {/* TA Brain logo block */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -50%) translateY(${(1 - logoIn) * 14}px)`,
        opacity: logoIn,
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        {/* Glass backing */}
        <div style={{
          background: 'rgba(8,9,12,0.80)',
          border: `1px solid ${FM.BORDER_HI}`,
          borderRadius: 14,
          backdropFilter: 'blur(16px)',
          padding: '28px 48px 24px',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 24px 60px -16px rgba(0,0,0,0.8)',
        }}>
          {/* Wordmark */}
          <div style={{
            fontFamily: FM.SANS, fontSize: 38, fontWeight: 600,
            color: FM.TEXT, letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            <span style={{ color: FM.ACCENT }}>TA</span>
            {' '}Brain
          </div>

          {/* Tagline */}
          <div style={{
            fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            opacity: taglineIn,
            marginTop: 2,
          }}>Collective Intelligence</div>

          {/* Success chip */}
          <div style={{
            opacity: chipIn,
            marginTop: 6,
            transform: `scale(${0.85 + 0.15 * chipIn})`,
          }}>
            <FMChip label="✓  Knowledge Connected" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
          </div>
        </div>
      </div>

      <SceneCaption n={5} total={5} t={t} label="TA Brain — Collective Intelligence" />
    </div>
  );
}

Object.assign(window, { Scene1, Scene2, Scene3, Scene4, Scene5 });
