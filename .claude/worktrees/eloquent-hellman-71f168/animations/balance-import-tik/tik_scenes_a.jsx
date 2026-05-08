// tik_scenes_a.jsx — TIK data + Scenes 1, 2, 3

// ── TIK Data ──────────────────────────────────────────────────
const TIK_FUNDS = [
  { id: 'EQ-GRWTH', label: 'Equity Growth', ticker: 'EQG', shares: 1250, price: 42.80,
    color: 'oklch(68% 0.16 255)', soft: 'oklch(68% 0.16 255 / 0.14)' },
  { id: 'BD-INCM',  label: 'Bond Income',   ticker: 'BND', shares: 800,  price: 28.15,
    color: 'oklch(72% 0.14 200)', soft: 'oklch(72% 0.14 200 / 0.14)' },
  { id: 'MM-FUND',  label: 'Money Market',  ticker: 'MMF', shares: 2100, price: 10.00,
    color: 'oklch(74% 0.12 270)', soft: 'oklch(74% 0.12 270 / 0.14)' },
];

const TIK_PARTICIPANTS = [
  { id: 'ACCT-5501', label: 'Account A', pct: 45 },
  { id: 'ACCT-5502', label: 'Account B', pct: 35 },
  { id: 'ACCT-5503', label: 'Account C', pct: 20 },
];

const tikFundValue = (fi) => TIK_FUNDS[fi].shares * TIK_FUNDS[fi].price;
const tikParticipantShares = (pi, fi) => TIK_FUNDS[fi].shares * TIK_PARTICIPANTS[pi].pct / 100;
const tikParticipantValue = (pi) => TIK_FUNDS.reduce((s, _, fi) => s + tikParticipantShares(pi, fi) * TIK_FUNDS[fi].price, 0);

const fmtShares = (n) => Math.round(n).toLocaleString('en-US') + ' sh';

// ── Scene 1 — Pre-Setup ───────────────────────────────────────

function TIKScene1() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;

  // Cards stagger in
  const cardIn = (fi) => Easing.easeOutCubic(clamp((t - fi * 0.3) / 0.7, 0, 1));
  // "Accounts Ready" confirmation at 2.5s
  const confIn = Easing.easeOutCubic(clamp((t - 2.5) / 0.5, 0, 1));
  // Ready indicator per card at 1.0, 1.3, 1.6
  const readyIn = (fi) => Easing.easeOutCubic(clamp((t - (1.0 + fi * 0.3)) / 0.4, 0, 1));

  const cardW = 320, cardH = 200, gap = 30;
  const totalW = 3 * cardW + 2 * gap;
  const startX = (1280 - totalW) / 2;
  const startY = 200;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneOut }}>
      <FMGlow x={300} y={100} size={600} opacity={0.1} />
      <FMGlow x={800} y={400} size={500} opacity={0.08} />

      {/* Top label */}
      <div style={{
        position: 'absolute', left: startX, top: 130,
        opacity: Easing.easeOutCubic(clamp(t / 0.5, 0, 1)),
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.2em' }}>PRE-LIQUIDATION SETUP</div>
        <div style={{ flex: 1, height: 1, background: FM.BORDER_HI, maxWidth: 200 }} />
      </div>

      {TIK_FUNDS.map((f, fi) => {
        const inP = cardIn(fi);
        const rdyP = readyIn(fi);
        return (
          <div key={f.id} style={{
            position: 'absolute',
            left: startX + fi * (cardW + gap), top: startY,
            width: cardW, height: cardH,
            opacity: inP, transform: `translateY(${(1 - inP) * 12}px)`,
          }}>
            <FMPanel x={0} y={0} w={cardW} h={cardH} elevated>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`,
                opacity: rdyP * 0.8,
              }} />

              <div style={{
                padding: '16px 20px',
                borderBottom: `1px solid ${FM.BORDER}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: f.soft, border: `1px solid ${f.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FM.MONO, fontSize: 10, color: f.color,
                  }}>{f.ticker}</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.TEXT }}>{f.label}</div>
                </div>
                <div style={{ opacity: rdyP }}>
                  <FMChip label="Ready" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
                </div>
              </div>

              <div style={{ padding: '18px 20px' }}>
                <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 8 }}>EXPECTED</div>
                <div style={{ fontFamily: FM.SANS, fontSize: 28, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
                  {f.shares.toLocaleString('en-US')} sh
                </div>
                <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, marginTop: 4 }}>
                  @ ${f.price.toFixed(2)} / share
                </div>
                <div style={{ marginTop: 14, height: 3, borderRadius: 2, background: FM.BORDER_HI }}>
                  <div style={{ height: '100%', width: `${rdyP * 100}%`, background: f.color, borderRadius: 2 }} />
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* Accounts Ready confirmation */}
      <div style={{
        position: 'absolute',
        left: '50%', top: startY + cardH + 40,
        transform: 'translateX(-50%)',
        opacity: confIn,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
          borderRadius: 100, padding: '10px 18px 10px 14px',
          boxShadow: `0 0 30px ${FM.SUCCESS_S}`,
        }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: FM.SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5.2l2 2L8 3.2" stroke="#08090C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.SUCCESS }}>Accounts Ready</div>
        </div>
      </div>

      <SceneCaption n={1} total={7} t={t} label="Pre-setup — fund containers prepared" />
    </div>
  );
}

// ── Scene 2 — Waiting State ────────────────────────────────────

function TIKScene2() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Gentle breathing pulse for waiting indicators
  const breathe = Math.sin(t * 1.4) * 0.5 + 0.5;
  const slowBreath = Math.sin(t * 0.8) * 0.5 + 0.5;

  // "Awaiting Shares" appears at 0.5
  const awaitIn = Easing.easeOutCubic(clamp((t - 0.5) / 0.6, 0, 1));
  // Timestamp ticks
  const seconds = Math.floor(t);

  const cardW = 320, cardH = 180, gap = 30;
  const totalW = 3 * cardW + 2 * gap;
  const startX = (1280 - totalW) / 2;
  const startY = 210;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={500} y={200} size={700} color={FM.WARN} opacity={0.05 + slowBreath * 0.04} />

      {/* Central waiting indicator */}
      <div style={{
        position: 'absolute', left: '50%', top: 130,
        transform: 'translateX(-50%)',
        opacity: awaitIn,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: FM.MONO, fontSize: 11,
          color: FM.WARN, letterSpacing: '0.2em',
          opacity: 0.6 + breathe * 0.4,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: FM.WARN, opacity: 0.6 + breathe * 0.4 }} />
          AWAITING SHARES
          <div style={{ width: 6, height: 6, borderRadius: 3, background: FM.WARN, opacity: 0.6 + (1-breathe) * 0.4 }} />
        </div>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em' }}>
          POST-LIQUIDATION · PENDING TRANSFER
        </div>
      </div>

      {TIK_FUNDS.map((f, fi) => (
        <div key={f.id} style={{
          position: 'absolute',
          left: startX + fi * (cardW + gap), top: startY,
          width: cardW, height: cardH,
        }}>
          <FMPanel x={0} y={0} w={cardW} h={cardH}>
            {/* Subtle breathing border */}
            <div style={{
              position: 'absolute', inset: -1, borderRadius: 12,
              border: `1px solid ${FM.WARN}`,
              opacity: (0.1 + breathe * 0.15),
              pointerEvents: 'none',
            }} />
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${FM.BORDER}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: f.soft, border: `1px solid ${f.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FM.MONO, fontSize: 10, color: f.color,
                opacity: 0.7,
              }}>{f.ticker}</div>
              <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.DIM }}>{f.label}</div>
            </div>
            <div style={{ padding: '14px 20px' }}>
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 8 }}>RECEIVED</div>
              <div style={{ fontFamily: FM.SANS, fontSize: 26, fontWeight: 500, color: FM.DIMMER, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                — sh
              </div>
              <div style={{ marginTop: 12, height: 3, borderRadius: 2, background: FM.BORDER, overflow: 'hidden' }}>
                {/* Empty pulsing bar */}
                <div style={{
                  height: '100%', width: '100%',
                  background: `linear-gradient(90deg, transparent, ${FM.WARN}, transparent)`,
                  backgroundSize: '200% 100%',
                  opacity: 0.3 + breathe * 0.2,
                }} />
              </div>
            </div>
          </FMPanel>
        </div>
      ))}

      {/* Clock/timer */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 120,
        transform: 'translateX(-50%)',
        opacity: awaitIn * (0.4 + slowBreath * 0.3),
        fontFamily: FM.MONO, fontSize: 11, color: FM.DIMMER,
        letterSpacing: '0.14em',
      }}>
        T+{String(seconds).padStart(2,'0')}s · HOLDING
      </div>

      <SceneCaption n={2} total={7} t={t} label="Waiting — pending share transfer" />
    </div>
  );
}

// ── Scene 3 — Shares Arrive ────────────────────────────────────

function TIKScene3() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  // Share stream per fund: starts 0.3, 0.7, 1.1
  const streamStart = (fi) => 0.3 + fi * 0.5;
  const streamDur = 1.4;
  const streamP = (fi) => Easing.easeInOutCubic(clamp((t - streamStart(fi)) / streamDur, 0, 1));
  const countP = (fi) => Easing.easeOutCubic(clamp((t - streamStart(fi) - 0.2) / 1.0, 0, 1));

  // Reconciliation panel slides in at 2.8
  const reconcileIn = Easing.easeOutCubic(clamp((t - 2.8) / 0.6, 0, 1));
  // Rows appear in reconcile panel
  const rowIn = (fi) => Easing.easeOutCubic(clamp((t - (3.2 + fi * 0.2)) / 0.4, 0, 1));
  const checkIn = (fi) => Easing.easeOutCubic(clamp((t - (3.5 + fi * 0.2)) / 0.35, 0, 1));

  const cardW = 260, cardH = 170, gap = 18;
  const totalW = 3 * cardW + 2 * gap;
  const startX = 80;
  const startY = 140;
  const reconcileX = 900;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={200} size={600} opacity={0.12} />

      {/* Fund receiving containers */}
      {TIK_FUNDS.map((f, fi) => {
        const sp = streamP(fi);
        const cp = countP(fi);
        const arrived = sp >= 0.98;
        const shares = Math.round(f.shares * cp);

        return (
          <React.Fragment key={f.id}>
            {/* Incoming stream from left */}
            {sp > 0 && sp < 1 && (
              <FMStream
                fromX={0} fromY={startY + cardH/2 + fi * (cardH + gap)}
                toX={startX} toY={startY + cardH/2 + fi * (cardH + gap)}                progress={sp} active color={f.color} count={10}
              />
            )}

            <div style={{
              position: 'absolute',
              left: startX, top: startY + fi * (cardH + gap),
              width: cardW, height: cardH,
            }}>
              <FMPanel x={0} y={0} w={cardW} h={cardH} elevated={arrived}>
                {arrived && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`,
                    opacity: 0.7,
                  }} />
                )}
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${FM.BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: sp > 0 ? f.color : FM.DIMMER, boxShadow: sp > 0 ? `0 0 8px ${f.color}` : 'none' }} />
                    <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.12em' }}>{f.ticker}</div>
                  </div>
                  {arrived && <FMChip label="Received" color={f.color} soft={f.soft} />}
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 6 }}>SHARES RECEIVED</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 26, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
                    {shares.toLocaleString('en-US')} sh
                  </div>
                  <div style={{ marginTop: 10, height: 3, borderRadius: 2, background: FM.BORDER_HI, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${sp * 100}%`, background: f.color }} />
                  </div>
                </div>
              </FMPanel>
            </div>
          </React.Fragment>
        );
      })}

      {/* Reconciliation panel */}
      <div style={{
        position: 'absolute',
        left: reconcileX, top: 140,
        width: 340,
        opacity: reconcileIn, transform: `translateX(${(1-reconcileIn)*14}px)`,
      }}>
        <FMPanel x={0} y={0} w={340} h={310} elevated>
          <div style={{ padding: '14px 18px', borderBottom: `1px solid ${FM.BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Reconciliation</div>
          </div>
          <div style={{ padding: '12px 18px' }}>
            {/* Column headers */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 80px 80px 28px',
              padding: '6px 0', borderBottom: `1px solid ${FM.BORDER}`,
              fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.12em',
            }}>
              <span>FUND</span><span style={{ textAlign: 'right' }}>EXPECTED</span><span style={{ textAlign: 'right' }}>RECEIVED</span><span />
            </div>

            {TIK_FUNDS.map((f, fi) => {
              const rp = rowIn(fi);
              const cp2 = checkIn(fi);
              return (
                <div key={f.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr 80px 80px 28px',
                  padding: '10px 0',
                  borderBottom: fi < TIK_FUNDS.length - 1 ? `1px solid ${FM.BORDER}` : 'none',
                  opacity: rp,
                  fontFamily: FM.MONO, fontSize: 11,
                  alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: 2, background: f.color }} />
                    <span style={{ color: FM.DIM }}>{f.ticker}</span>
                  </div>
                  <span style={{ textAlign: 'right', color: FM.DIMMER, fontVariantNumeric: 'tabular-nums' }}>{f.shares.toLocaleString()}</span>
                  <span style={{ textAlign: 'right', color: streamP(fi) >= 0.98 ? FM.TEXT : FM.DIMMER, fontVariantNumeric: 'tabular-nums' }}>
                    {Math.round(f.shares * countP(fi)).toLocaleString()}
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 9,
                      background: cp2 > 0 ? FM.SUCCESS_S : 'transparent',
                      border: `1px solid ${cp2 > 0 ? FM.SUCCESS : FM.BORDER}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2.2 5.2l2 2L7.8 3.2" stroke={FM.SUCCESS} strokeWidth="1.8"
                          strokeLinecap="round" strokeLinejoin="round"
                          strokeDasharray="12" strokeDashoffset={12 - 12 * cp2} />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FMPanel>
      </div>

      <SceneCaption n={3} total={7} t={t} label="Share units received — values reconciled" />
    </div>
  );
}

Object.assign(window, {
  TIK_FUNDS, TIK_PARTICIPANTS,
  tikFundValue, tikParticipantShares, tikParticipantValue,
  fmtShares,
  TIKScene1, TIKScene2, TIKScene3,
});
