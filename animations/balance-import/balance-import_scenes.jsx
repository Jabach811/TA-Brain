// balance-import_scenes.jsx — Balance Import Animation
// 6 scenes × 5s = 30s total

const METHODS = [
  { id: 'cash',    label: 'Cash Conversion',    abbr: 'CASH', icon: '💵', color: 'oklch(74% 0.15 145)', soft: 'oklch(74% 0.15 145 / 16%)' },
  { id: 'mapping', label: 'Mapping',             abbr: 'MAP',  icon: '🗺',  color: 'oklch(74% 0.16 230)', soft: 'oklch(74% 0.16 230 / 16%)' },
  { id: 'tik',     label: 'Transfer In-Kind',    abbr: 'TIK',  icon: '📦', color: 'oklch(74% 0.15 310)', soft: 'oklch(74% 0.15 310 / 16%)' },
];

const TOTAL = 6;

// ── Scene 1 — Three Methods, One Goal ─────────────────────────────────────────
function Scene1() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const cardIn = (i) => Easing.easeOutCubic(clamp((t - 0.3 - i * 0.25) / 0.7, 0, 1));
  const lineIn  = Easing.easeOutCubic(clamp((t - 1.4) / 0.8, 0, 1));
  const goalIn  = Easing.easeOutCubic(clamp((t - 2.0) / 0.7, 0, 1));

  const DESCS = [
    'Converts existing fund holdings to cash, then loads participant balances',
    'Uses a fund map to reallocate balances across share classes or fund families',
    'Moves actual fund shares from prior recordkeeper — no liquidation required',
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={220} size={700} opacity={0.10} />

      {/* Title */}
      <div style={{
        position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center',
        fontFamily: FM.SANS, fontSize: 13, fontWeight: 600,
        letterSpacing: '0.12em', color: FM.DIM, textTransform: 'uppercase',
      }}>Balance Import Methods</div>

      {/* Method cards */}
      {METHODS.map((m, i) => {
        const ci = cardIn(i);
        return (
          <div key={m.id} style={{
            position: 'absolute',
            left: 80 + i * 200,
            top: 110 + (1 - ci) * 20,
            width: 170,
            opacity: ci,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${m.soft}`,
            borderRadius: 10,
            padding: '18px 16px',
          }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{m.icon}</div>
            <div style={{
              fontFamily: FM.SANS, fontSize: 12, fontWeight: 700,
              color: m.color, letterSpacing: '0.06em', marginBottom: 6,
            }}>{m.label}</div>
            <div style={{
              fontFamily: FM.MONO, fontSize: 9, color: FM.DIM,
              lineHeight: 1.5, letterSpacing: '0.04em',
            }}>{DESCS[i]}</div>
          </div>
        );
      })}

      {/* Converging lines to goal */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {METHODS.map((m, i) => {
          const startX = 165 + i * 200;
          const startY = 260;
          const endX = 400;
          const endY = 330;
          const len = Math.hypot(endX - startX, endY - startY);
          return (
            <line key={m.id}
              x1={startX} y1={startY} x2={endX} y2={endY}
              stroke={m.color} strokeWidth={1.5} strokeOpacity={0.5 * lineIn}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - lineIn)}
            />
          );
        })}
      </svg>

      {/* Goal pill */}
      <div style={{
        position: 'absolute', left: '50%', top: 326,
        transform: `translateX(-50%) translateY(${(1 - goalIn) * 12}px)`,
        opacity: goalIn,
        background: 'rgba(34,197,94,0.12)',
        border: '1px solid rgba(34,197,94,0.35)',
        borderRadius: 20, padding: '8px 22px',
        fontFamily: FM.SANS, fontSize: 11, fontWeight: 600,
        color: FM.SUCCESS, letterSpacing: '0.08em', whiteSpace: 'nowrap',
      }}>✓ Participant balances loaded</div>

      <SceneCaption n={1} total={TOTAL} t={t} label="Three Methods, One Goal" />

    </div>
  );
}

// ── Scene 2 — Day of Wire: Pre-Receipt ────────────────────────────────────────
function Scene2() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const STEPS = [
    { label: 'Day Before', detail: 'Email vendor → request balance breakdown', t0: 0.2 },
    { label: 'Morning of Wire', detail: 'Follow up if no reply overnight', t0: 0.7 },
    { label: 'Wire Confirmed', detail: 'Cashiering books it in system', t0: 1.2 },
  ];

  const stepIn = (i) => Easing.easeOutCubic(clamp((t - STEPS[i].t0) / 0.6, 0, 1));
  const forkIn  = Easing.easeOutCubic(clamp((t - 1.9) / 0.7, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={200} size={650} opacity={0.09} />

      <div style={{
        position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center',
        fontFamily: FM.SANS, fontSize: 13, fontWeight: 600,
        letterSpacing: '0.12em', color: FM.DIM, textTransform: 'uppercase',
      }}>Day of Wire — Pre-Receipt</div>

      {/* Timeline */}
      {STEPS.map((s, i) => {
        const si = stepIn(i);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: 100 + i * 210,
            top: 120 + (1 - si) * 14,
            width: 175,
            opacity: si,
          }}>
            {/* Node */}
            <div style={{
              width: 10, height: 10,
              borderRadius: '50%',
              background: FM.ACCENT,
              marginBottom: 10,
              boxShadow: `0 0 8px ${FM.ACCENT}`,
            }} />
            {/* Connector */}
            {i < 2 && (
              <div style={{
                position: 'absolute', left: 10, top: 5,
                width: 200, height: 1,
                background: `linear-gradient(to right, ${FM.ACCENT}80, ${FM.ACCENT}20)`,
                opacity: stepIn(i + 1),
              }} />
            )}
            <div style={{
              fontFamily: FM.SANS, fontSize: 11, fontWeight: 700,
              color: FM.TEXT, marginBottom: 5, letterSpacing: '0.04em',
            }}>{s.label}</div>
            <div style={{
              fontFamily: FM.MONO, fontSize: 9, color: FM.DIM,
              lineHeight: 1.5, letterSpacing: '0.04em',
            }}>{s.detail}</div>
          </div>
        );
      })}

      {/* Method fork indicators */}
      <div style={{
        position: 'absolute', top: 260, left: 80, right: 80,
        display: 'flex', gap: 16, opacity: forkIn,
        transform: `translateY(${(1 - forkIn) * 10}px)`,
      }}>
        {METHODS.map((m) => {
          const dim = m.id === 'tik';
          return (
            <div key={m.id} style={{
              flex: 1, padding: '10px 14px',
              background: dim ? 'rgba(255,255,255,0.02)' : m.soft,
              border: `1px solid ${dim ? 'rgba(255,255,255,0.08)' : m.color + '60'}`,
              borderRadius: 8, opacity: dim ? 0.45 : 1,
            }}>
              <div style={{
                fontFamily: FM.SANS, fontSize: 10, fontWeight: 700,
                color: dim ? FM.DIM : m.color, letterSpacing: '0.06em', marginBottom: 4,
              }}>{m.icon} {m.abbr}</div>
              <div style={{
                fontFamily: FM.MONO, fontSize: 9, color: FM.DIM, letterSpacing: '0.04em',
              }}>{dim ? 'Waits for shares to arrive' : 'Proceeds on wire confirmation'}</div>
            </div>
          );
        })}
      </div>

      <SceneCaption n={2} total={TOTAL} t={t} label="Day of Wire — Pre-Receipt" />

    </div>
  );
}

// ── Scene 3 — File Prep by Method ─────────────────────────────────────────────
function Scene3() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const colIn = (i) => Easing.easeOutCubic(clamp((t - 0.2 - i * 0.3) / 0.7, 0, 1));

  const COLS = [
    {
      method: METHODS[0],
      rows: [
        { label: 'Balance file', value: 'Empty .txt', note: 'intentional — no positions to map', ok: true },
        { label: 'Source mapping', value: 'Required ✓', ok: true },
        { label: 'Cash Conversion flag', value: 'YES', note: '⚠ All participants need elections', warn: true },
        { label: 'P2 Ref #', value: '—', dim: true },
      ],
    },
    {
      method: METHODS[1],
      rows: [
        { label: 'Balance file', value: 'Populated', note: 'Macro available ⚡', ok: true },
        { label: 'Source mapping', value: 'Required ✓', ok: true },
        { label: 'Cash Conversion flag', value: 'NO', ok: true },
        { label: 'P2 Ref #', value: 'Required ✓', ok: true },
      ],
    },
    {
      method: METHODS[2],
      rows: [
        { label: 'Balance file', value: 'Populated', note: 'Same format as Mapping', ok: true },
        { label: 'Source mapping', value: 'Required ✓', ok: true },
        { label: 'Cash Conversion flag', value: 'NO', ok: true },
        { label: 'P2 Ref #', value: 'Required ✓', ok: true },
      ],
    },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={200} size={650} opacity={0.09} />

      <div style={{
        position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center',
        fontFamily: FM.SANS, fontSize: 13, fontWeight: 600,
        letterSpacing: '0.12em', color: FM.DIM, textTransform: 'uppercase',
      }}>File Prep by Method</div>

      {COLS.map((col, i) => {
        const ci = colIn(i);
        const m = col.method;
        return (
          <div key={m.id} style={{
            position: 'absolute',
            left: 70 + i * 210,
            top: 100 + (1 - ci) * 16,
            width: 190,
            opacity: ci,
          }}>
            <div style={{
              fontFamily: FM.SANS, fontSize: 11, fontWeight: 700,
              color: m.color, letterSpacing: '0.06em', marginBottom: 10,
            }}>{m.icon} {m.label}</div>
            {col.rows.map((row, j) => (
              <div key={j} style={{
                marginBottom: 7,
                padding: '6px 8px',
                background: row.warn ? 'rgba(234,179,8,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${row.warn ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 6,
                opacity: row.dim ? 0.35 : 1,
              }}>
                <div style={{
                  fontFamily: FM.MONO, fontSize: 8, color: FM.DIM,
                  letterSpacing: '0.1em', marginBottom: 2,
                }}>{row.label.toUpperCase()}</div>
                <div style={{
                  fontFamily: FM.SANS, fontSize: 10, fontWeight: 600,
                  color: row.warn ? FM.WARN : row.ok ? FM.TEXT : FM.DIM,
                }}>{row.value}</div>
                {row.note && (
                  <div style={{
                    fontFamily: FM.MONO, fontSize: 8, color: row.warn ? FM.WARN : FM.DIM,
                    marginTop: 2, letterSpacing: '0.04em',
                  }}>{row.note}</div>
                )}
              </div>
            ))}
          </div>
        );
      })}

      <SceneCaption n={3} total={TOTAL} t={t} label="File Prep by Method" />

    </div>
  );
}

// ── Scene 4 — CONV File: The Critical Fork ────────────────────────────────────
function Scene4() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const leftIn  = Easing.easeOutCubic(clamp((t - 0.2) / 0.7, 0, 1));
  const rightIn = Easing.easeOutCubic(clamp((t - 0.5) / 0.7, 0, 1));
  const warnIn  = Easing.easeOutCubic(clamp((t - 1.5) / 0.8, 0, 1));
  const dummyIn = Easing.easeOutCubic(clamp((t - 2.4) / 0.7, 0, 1));

  const PANEL = (method, reReg, rows, anim, side) => (
    <div style={{
      position: 'absolute',
      [side]: 60,
      top: 90 + (1 - anim) * 16,
      width: 240,
      opacity: anim,
      background: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(8px)',
      border: `1px solid ${method.soft}`,
      borderRadius: 10,
      padding: '14px 16px',
    }}>
      <div style={{
        fontFamily: FM.SANS, fontSize: 11, fontWeight: 700,
        color: method.color, letterSpacing: '0.06em', marginBottom: 10,
      }}>{method.icon} {method.label}</div>
      {rows.map((r, i) => (
        <div key={i} style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIM, letterSpacing: '0.08em' }}>{r[0]}</span>
          <span style={{
            fontFamily: FM.SANS, fontSize: 10, fontWeight: 700,
            color: r[1] === 'Y' ? FM.SUCCESS : r[1] === 'N' ? FM.DIM : FM.TEXT,
            background: 'rgba(255,255,255,0.06)', padding: '2px 7px', borderRadius: 4,
          }}>{r[1]}</span>
        </div>
      ))}
      <div style={{
        marginTop: 10, padding: '6px 10px',
        background: reReg === 'Y' ? 'rgba(34,197,94,0.10)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${reReg === 'Y' ? 'rgba(34,197,94,0.30)' : 'rgba(255,255,255,0.10)'}`,
        borderRadius: 6,
        fontFamily: FM.MONO, fontSize: 9,
        color: reReg === 'Y' ? FM.SUCCESS : FM.DIM,
        letterSpacing: '0.06em',
        textAlign: 'center',
      }}>RE-REG = {reReg}</div>
    </div>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={200} size={650} opacity={0.09} />

      <div style={{
        position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center',
        fontFamily: FM.SANS, fontSize: 13, fontWeight: 600,
        letterSpacing: '0.12em', color: FM.DIM, textTransform: 'uppercase',
      }}>CONV File — The Critical Fork</div>

      {PANEL(METHODS[1], 'N', [['Transaction type','Re-Reg'],['Re-Reg flag','N'],['Source file','Populated'],['Dummy check','Required']], leftIn, 'left')}
      {PANEL(METHODS[2], 'Y', [['Transaction type','Re-Reg'],['Re-Reg flag','Y'],['Source file','Populated'],['Dummy check','Required']], rightIn, 'right')}

      {/* Warning card */}
      <div style={{
        position: 'absolute', left: '50%', top: 240,
        transform: `translateX(-50%) translateY(${(1 - warnIn) * 12}px)`,
        opacity: warnIn,
        width: 240,
        background: 'rgba(239,68,68,0.10)',
        border: '1px solid rgba(239,68,68,0.35)',
        borderRadius: 10, padding: '12px 16px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 16, marginBottom: 6 }}>⚠</div>
        <div style={{
          fontFamily: FM.SANS, fontSize: 10, fontWeight: 700,
          color: '#f87171', letterSpacing: '0.04em', lineHeight: 1.5,
        }}>Re-Reg controls transaction type.<br />Never confuse Mapping & TIK.</div>
      </div>

      {/* Dummy participant note */}
      <div style={{
        position: 'absolute', bottom: 60, left: '50%',
        transform: `translateX(-50%) translateY(${(1 - dummyIn) * 8}px)`,
        opacity: dummyIn,
        fontFamily: FM.MONO, fontSize: 9, color: FM.DIM,
        letterSpacing: '0.1em', textAlign: 'center',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6, padding: '6px 16px', whiteSpace: 'nowrap',
      }}>Both methods require dummy participant check before load</div>

      <SceneCaption n={4} total={TOTAL} t={t} label="CONV File — The Critical Fork" />

    </div>
  );
}

// ── Scene 5 — Informatica Load ────────────────────────────────────────────────
function Scene5() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const cashIn    = Easing.easeOutCubic(clamp((t - 0.2) / 0.7, 0, 1));
  const mapTikIn  = Easing.easeOutCubic(clamp((t - 0.5) / 0.7, 0, 1));
  const mergeIn   = Easing.easeOutCubic(clamp((t - 1.8) / 0.8, 0, 1));
  const validateIn = Easing.easeOutCubic(clamp((t - 2.6) / 0.7, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={200} size={650} opacity={0.09} />

      <div style={{
        position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center',
        fontFamily: FM.SANS, fontSize: 13, fontWeight: 600,
        letterSpacing: '0.12em', color: FM.DIM, textTransform: 'uppercase',
      }}>Informatica Load</div>

      {/* Cash card */}
      <div style={{
        position: 'absolute', left: 70, top: 100 + (1 - cashIn) * 14,
        width: 210, opacity: cashIn,
        background: METHODS[0].soft,
        border: `1px solid ${METHODS[0].color}60`,
        borderRadius: 10, padding: '14px 16px',
      }}>
        <div style={{ fontFamily: FM.SANS, fontSize: 11, fontWeight: 700, color: METHODS[0].color, marginBottom: 8 }}>💵 Cash Conversion</div>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.TEXT, marginBottom: 4 }}>CITS Balances workflow</div>
        <div style={{
          display: 'inline-block', padding: '3px 8px',
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.30)',
          borderRadius: 4, fontFamily: FM.MONO, fontSize: 9, color: FM.SUCCESS,
        }}>✓ Test mode available</div>
      </div>

      {/* Mapping + TIK card */}
      <div style={{
        position: 'absolute', right: 70, top: 100 + (1 - mapTikIn) * 14,
        width: 210, opacity: mapTikIn,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 10, padding: '14px 16px',
      }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <span style={{ fontFamily: FM.SANS, fontSize: 11, fontWeight: 700, color: METHODS[1].color }}>🗺 Mapping</span>
          <span style={{ fontFamily: FM.SANS, fontSize: 11, color: FM.DIM }}>+</span>
          <span style={{ fontFamily: FM.SANS, fontSize: 11, fontWeight: 700, color: METHODS[2].color }}>📦 TIK</span>
        </div>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.TEXT, marginBottom: 6 }}>Day of Wire workflow</div>
        <div style={{
          display: 'inline-block', padding: '3px 8px',
          background: 'rgba(234,179,8,0.10)', border: '1px solid rgba(234,179,8,0.30)',
          borderRadius: 4, fontFamily: FM.MONO, fontSize: 9, color: FM.WARN,
        }}>⚠ Production only — no test</div>
      </div>

      {/* Merge arrow */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: mergeIn }}>
        <line x1={280} y1={175} x2={400} y2={255} stroke={FM.ACCENT} strokeWidth={1.2} strokeOpacity={0.5} />
        <line x1={520} y1={175} x2={400} y2={255} stroke={FM.ACCENT} strokeWidth={1.2} strokeOpacity={0.5} />
      </svg>

      {/* Shared step */}
      <div style={{
        position: 'absolute', left: '50%', top: 250,
        transform: `translateX(-50%) translateY(${(1 - mergeIn) * 12}px)`,
        opacity: mergeIn,
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid rgba(${FM.ACCENT}, 0.25)`,
        borderRadius: 10, padding: '10px 22px',
        fontFamily: FM.SANS, fontSize: 11, fontWeight: 600, color: FM.TEXT,
        textAlign: 'center', whiteSpace: 'nowrap',
      }}>Run balance import queries — validate load</div>

      {/* Validate note */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 65,
        transform: `translateX(-50%) translateY(${(1 - validateIn) * 8}px)`,
        opacity: validateIn,
        fontFamily: FM.MONO, fontSize: 9, color: FM.DIM,
        letterSpacing: '0.08em', whiteSpace: 'nowrap',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6, padding: '6px 16px',
      }}>Confirm record counts match prior recordkeeper</div>

      <SceneCaption n={5} total={TOTAL} t={t} label="Informatica Load" />

    </div>
  );
}

// ── Scene 6 — P3 Settings & Completion ────────────────────────────────────────
function Scene6() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn  = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const rowIn = (i) => Easing.easeOutCubic(clamp((t - 0.3 - i * 0.35) / 0.7, 0, 1));
  const footIn = Easing.easeOutCubic(clamp((t - 1.8) / 0.8, 0, 1));
  const checkIn = (i) => Easing.easeOutCubic(clamp((t - 2.2 - i * 0.25) / 0.6, 0, 1));

  const ROWS = [
    { method: METHODS[0], settings: ['No Hold', 'Batch', 'Process Immediate'], warn: false },
    { method: METHODS[1], settings: ['No Hold', 'Batch', 'Process Immediate'], warn: false },
    { method: METHODS[2], settings: ['No Hold', 'Online', '⚠ Do NOT Process Immediate'], warn: true },
  ];

  const CHECKS = ['Apply to accounts', 'Run backup queries', 'Balance import complete'];
  const checkLen = 80;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={220} size={700} opacity={0.11} />

      <div style={{
        position: 'absolute', top: 52, left: 0, right: 0, textAlign: 'center',
        fontFamily: FM.SANS, fontSize: 13, fontWeight: 600,
        letterSpacing: '0.12em', color: FM.DIM, textTransform: 'uppercase',
      }}>P3 Settings & Completion</div>

      {/* Method setting rows */}
      {ROWS.map((row, i) => {
        const ri = rowIn(i);
        const m = row.method;
        return (
          <div key={m.id} style={{
            position: 'absolute',
            left: 70, right: 70,
            top: 100 + i * 58 + (1 - ri) * 12,
            opacity: ri,
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${row.warn ? 'rgba(234,179,8,0.20)' : m.soft}`,
            borderRadius: 8, padding: '10px 14px',
          }}>
            <div style={{
              fontFamily: FM.SANS, fontSize: 10, fontWeight: 700,
              color: m.color, width: 100, flexShrink: 0, letterSpacing: '0.04em',
            }}>{m.icon} {m.abbr}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {row.settings.map((s, j) => (
                <div key={j} style={{
                  padding: '3px 9px',
                  background: s.startsWith('⚠') ? 'rgba(234,179,8,0.10)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${s.startsWith('⚠') ? 'rgba(234,179,8,0.30)' : 'rgba(255,255,255,0.10)'}`,
                  borderRadius: 4,
                  fontFamily: FM.MONO, fontSize: 9,
                  color: s.startsWith('⚠') ? FM.WARN : FM.TEXT,
                  letterSpacing: '0.06em',
                }}>{s}</div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Final steps with animated checkmarks */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 55,
        transform: `translateX(-50%) translateY(${(1 - footIn) * 10}px)`,
        opacity: footIn,
        display: 'flex', gap: 20, alignItems: 'center',
      }}>
        {CHECKS.map((c, i) => {
          const ci = checkIn(i);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width={16} height={16} viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                <circle cx={8} cy={8} r={7} fill="none" stroke={FM.SUCCESS} strokeWidth={1.2} strokeOpacity={0.4} />
                <path d="M4.5 8.2 L7 10.5 L11.5 5.5" fill="none" stroke={FM.SUCCESS} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray={checkLen} strokeDashoffset={checkLen * (1 - ci)} />
              </svg>
              <span style={{
                fontFamily: FM.SANS, fontSize: 10, fontWeight: 600,
                color: ci > 0.5 ? FM.SUCCESS : FM.DIM,
                letterSpacing: '0.04em', whiteSpace: 'nowrap',
              }}>{c}</span>
            </div>
          );
        })}
      </div>

      <SceneCaption n={6} total={TOTAL} t={t} label="P3 Settings & Completion" />

    </div>
  );
}

Object.assign(window, { Scene1, Scene2, Scene3, Scene4, Scene5, Scene6 });
