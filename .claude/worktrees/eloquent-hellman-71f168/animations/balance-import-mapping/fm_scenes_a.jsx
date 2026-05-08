// fm_scenes_a.jsx — Scenes 1, 2, 3

// ─────────────────────────────────────────────────────────────
// SCENE 1 — Wire Received

function FMScene1() {
  const { localTime: t, duration } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;

  // Panel slides in
  const panelIn = Easing.easeOutCubic(clamp((t - 0.2) / 0.7, 0, 1));

  // Wire value counts up 0.7 -> 1.8s
  const countP = Easing.easeOutCubic(clamp((t - 0.7) / 1.1, 0, 1));

  // Confirmation chip at 1.9s
  const confIn = Easing.easeOutCubic(clamp((t - 1.9) / 0.4, 0, 1));

  // Pulse ring at 2.0
  const pulse1 = Easing.easeOutCubic(clamp((t - 2.0) / 0.8, 0, 1));

  // Status row appears at 2.4
  const rowsIn = Easing.easeOutCubic(clamp((t - 2.4) / 0.5, 0, 1));

  const val = Math.round(WIRE_TOTAL * countP);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={300} y={100} size={600} opacity={0.12} />

      <div style={{
        position: 'absolute', left: 280, top: 140,
        width: 720, height: 440,
        opacity: panelIn,
        transform: `translateY(${(1 - panelIn) * 10}px)`,
      }}>
        <FMPanel x={0} y={0} w={720} h={440} elevated glowColor={FM.ACCENT_S}>
          {/* Pulse ring */}
          {pulse1 > 0 && (
            <div style={{
              position: 'absolute', inset: -2,
              border: `1px solid ${FM.ACCENT}`,
              borderRadius: 12,
              opacity: (1 - pulse1) * 0.7,
              transform: `scale(${1 + pulse1 * 0.025})`,
              pointerEvents: 'none',
            }} />
          )}

          {/* Header */}
          <div style={{
            padding: '18px 26px',
            borderBottom: `1px solid ${FM.BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 7, height: 7, borderRadius: 4,
                background: FM.ACCENT, boxShadow: `0 0 10px ${FM.ACCENT}`,
              }} />
              <div style={{
                fontFamily: FM.MONO, fontSize: 11, letterSpacing: '0.14em',
                color: FM.DIM, textTransform: 'uppercase',
              }}>Incoming Wire</div>
            </div>
            <div style={{ opacity: confIn }}>
              <FMChip label="Wire Received" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
            </div>
          </div>

          {/* Value */}
          <div style={{ padding: '36px 40px 28px' }}>
            <div style={{
              fontFamily: FM.MONO, fontSize: 10,
              color: FM.DIMMER, letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>Total Funds Received</div>
            <div style={{
              fontFamily: FM.SANS, fontSize: 72, fontWeight: 500,
              color: FM.TEXT, letterSpacing: '-0.03em',
              fontVariantNumeric: 'tabular-nums', lineHeight: 1,
            }}>
              ${val.toLocaleString('en-US')}
            </div>
            <div style={{
              marginTop: 10,
              fontFamily: FM.MONO, fontSize: 12,
              color: FM.DIMMER, letterSpacing: '0.04em',
            }}>USD · Not yet allocated</div>

            {/* Full bar */}
            <div style={{
              marginTop: 28, height: 5, borderRadius: 3,
              background: `linear-gradient(90deg, ${FM.ACCENT}, oklch(65% 0.16 255))`,
              width: `${countP * 100}%`,
              boxShadow: `0 0 16px ${FM.ACCENT_S}`,
            }} />
          </div>

          {/* Metadata rows */}
          <div style={{ padding: '0 40px', opacity: rowsIn }}>
            <FMRow label="Source" value="WIRE-2026-04-17-00471" />
            <FMRow label="Value Date" value="2026-04-17" />
            <FMRow label="Status" value="PENDING ALLOCATION" dim />
          </div>
        </FMPanel>
      </div>

      <SceneCaption n={1} t={t} label="Wire received — funds confirmed" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENE 2 — Fund Breakdown

function FMScene2() {
  const { localTime: t, duration } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;

  // Source block — left
  const srcIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  // Fund cards stagger in at 0.4, 0.6, 0.8
  const cardIn = (i) => Easing.easeOutCubic(clamp((t - (0.4 + i * 0.2)) / 0.6, 0, 1));

  // Streams from source to cards start at 1.2, 1.4, 1.6
  const streamStart = (i) => 1.2 + i * 0.25;
  const streamDur = 1.2;
  const streamP = (i) => Easing.easeInOutCubic(clamp((t - streamStart(i)) / streamDur, 0, 1));

  // Value count-up in cards follows stream
  const countP = (i) => Easing.easeOutCubic(clamp((t - streamStart(i) - 0.4) / 0.9, 0, 1));

  const srcX = 80, srcY = 220, srcW = 320, srcH = 190;
  const cardX = 540, cardH = 148, cardGap = 12;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={0} y={200} size={400} opacity={0.1} />
      <FMGlow x={900} y={300} size={500} opacity={0.1} />

      {/* Source block */}
      <div style={{
        position: 'absolute', left: srcX, top: srcY,
        width: srcW, height: srcH,
        opacity: srcIn, transform: `translateY(${(1-srcIn)*8}px)`,
      }}>
        <FMPanel x={0} y={0} w={srcW} h={srcH} elevated>
          <div style={{
            padding: '14px 18px',
            borderBottom: `1px solid ${FM.BORDER}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: FM.SUCCESS, boxShadow: `0 0 8px ${FM.SUCCESS}` }} />
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Incoming Wire</div>
          </div>
          <div style={{ padding: '20px 22px' }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 8 }}>TOTAL</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 36, fontWeight: 500, color: FM.TEXT, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
              ${WIRE_TOTAL.toLocaleString('en-US')}
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 4 }}>
              {FUNDS.map((_, fi) => (
                <div key={fi} style={{
                  flex: FUNDS[fi].pct, height: 4, borderRadius: 2,
                  background: streamP(fi) > 0.05
                    ? FM.FUND_COLORS[fi].accent
                    : FM.BORDER_HI,
                  opacity: Math.max(0, 1 - streamP(fi) * 0.6),
                  transition: 'opacity 200ms',
                }} />
              ))}
            </div>
          </div>
        </FMPanel>
      </div>

      {/* Streams */}
      {FUNDS.map((f, fi) => {
        const cardTop = (srcY + srcH/2) - ((FUNDS.length - 1) * (cardH + cardGap) / 2) + fi * (cardH + cardGap);
        const sp = streamP(fi);
        if (sp <= 0) return null;
        return (
          <FMStream key={fi}
            fromX={srcX + srcW} fromY={srcY + srcH/2}
            toX={cardX} toY={cardTop + cardH/2}
            progress={sp}
            active={sp > 0 && sp < 1}
            color={FM.FUND_COLORS[fi].accent}
            count={8}
          />
        );
      })}

      {/* Fund cards */}
      {FUNDS.map((f, fi) => {
        const cardTop = (srcY + srcH/2) - ((FUNDS.length - 1) * (cardH + cardGap) / 2) + fi * (cardH + cardGap);
        const inP = cardIn(fi);
        const cp = countP(fi);
        const fColor = FM.FUND_COLORS[fi];
        const val = Math.round(fundValue(fi) * cp);
        const arrived = streamP(fi) >= 0.98;

        return (
          <div key={f.id} style={{
            position: 'absolute', left: cardX, top: cardTop,
            width: 660, height: cardH,
            opacity: inP, transform: `translateX(${(1-inP)*12}px)`,
          }}>
            <FMPanel x={0} y={0} w={660} h={cardH} elevated={arrived}>
              {arrived && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${fColor.accent}, transparent)`,
                  opacity: 0.7,
                }} />
              )}
              <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: fColor.soft,
                    border: `1px solid ${fColor.accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FM.MONO, fontSize: 11, fontWeight: 500,
                    color: fColor.accent, letterSpacing: '0.06em',
                  }}>{f.ticker}</div>
                  <div>
                    <div style={{ fontFamily: FM.SANS, fontSize: 14, fontWeight: 500, color: FM.TEXT }}>{f.label}</div>
                    <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, marginTop: 3, letterSpacing: '0.1em' }}>{f.id}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: FM.SANS, fontSize: 28, fontWeight: 500, color: FM.TEXT, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                    ${val.toLocaleString('en-US')}
                  </div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 11, color: fColor.accent, marginTop: 3, letterSpacing: '0.08em' }}>{f.pct}%</div>
                </div>
              </div>

              {/* fill bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 3, background: FM.BORDER,
              }}>
                <div style={{
                  height: '100%', width: `${streamP(fi) * 100}%`,
                  background: fColor.accent,
                  transition: 'width 50ms',
                }} />
              </div>
            </FMPanel>
          </div>
        );
      })}

      <SceneCaption n={2} t={t} label="Fund mapping breakdown applied" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENE 3 — Initial Load / Holding Record

function FMScene3() {
  const { localTime: t, duration } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;

  // Fund blocks slide in from top left
  const fundsIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  // Holding record container materializes at 0.5
  const holdIn = Easing.easeOutCubic(clamp((t - 0.5) / 0.7, 0, 1));

  // Flows from fund blocks into holding at 1.0, 1.25, 1.5
  const flowP = (fi) => Easing.easeInOutCubic(clamp((t - (1.0 + fi * 0.25)) / 1.0, 0, 1));
  const flowActive = (fi) => flowP(fi) > 0 && flowP(fi) < 1;

  // Holding record rows count up as flows arrive
  const countP = (fi) => Easing.easeOutCubic(clamp((t - (1.0 + fi * 0.25) - 0.3) / 0.7, 0, 1));

  // Total in holding
  const holdTotal = FUNDS.reduce((s, _, fi) => s + fundValue(fi) * countP(fi), 0);

  // Stabilize label at 3.0
  const stableIn = Easing.easeOutCubic(clamp((t - 3.0) / 0.5, 0, 1));

  // Source fund Y positions
  const fundY = (fi) => 120 + fi * 150;
  const fundX = 80, fundW = 380, fundH = 120;
  const holdX = 620, holdY = 160, holdW = 560, holdH = 380;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={500} y={200} size={600} color={FM.WARN} opacity={0.08} />

      {/* Fund source blocks */}
      {FUNDS.map((f, fi) => {
        const fColor = FM.FUND_COLORS[fi];
        const fp = flowP(fi);
        return (
          <div key={f.id} style={{
            position: 'absolute', left: fundX, top: fundY(fi),
            width: fundW, height: fundH,
            opacity: fundsIn * (1 - Easing.easeInCubic(clamp((fp - 0.85) / 0.15, 0, 1))),
            transform: `translateX(${(1 - fundsIn) * -10}px)`,
          }}>
            <FMPanel x={0} y={0} w={fundW} h={fundH}>
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 7,
                    background: fColor.soft, border: `1px solid ${fColor.accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FM.MONO, fontSize: 10, color: fColor.accent,
                  }}>{f.ticker}</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.TEXT }}>{f.label}</div>
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  ${Math.round(fundValue(fi)).toLocaleString('en-US')}
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* Flow arcs */}
      {FUNDS.map((_, fi) => {
        const fp = flowP(fi);
        if (fp <= 0) return null;
        return (
          <FMArc key={fi}
            fromX={fundX + fundW} fromY={fundY(fi) + fundH/2}
            toX={holdX} toY={holdY + 80 + fi * 90}
            progress={fp}
            color={FM.FUND_COLORS[fi].accent}
            curveDir={fi === 1 ? 1 : (fi === 0 ? -1 : 1)}
          />
        );
      })}

      {/* Holding Record container */}
      <div style={{
        position: 'absolute', left: holdX, top: holdY,
        width: holdW, height: holdH,
        opacity: holdIn, transform: `translateY(${(1-holdIn)*10}px)`,
      }}>
        <FMPanel x={0} y={0} w={holdW} h={holdH} elevated>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${FM.WARN}, transparent)`,
            opacity: 0.6,
          }} />

          <div style={{
            padding: '16px 22px',
            borderBottom: `1px solid ${FM.BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: FM.WARN, boxShadow: `0 0 10px ${FM.WARN}` }} />
              <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Initial Load · Holding Record
              </div>
            </div>
            <FMChip label="Staging" color={FM.WARN} soft={FM.WARN_S} />
          </div>

          <div style={{ padding: '12px 22px' }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 8 }}>STAGED TOTAL</div>
            <div style={{
              fontFamily: FM.SANS, fontSize: 40, fontWeight: 500,
              color: FM.TEXT, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums', marginBottom: 16,
            }}>${Math.round(holdTotal).toLocaleString('en-US')}</div>

            {/* Per-fund rows in holding */}
            {FUNDS.map((f, fi) => {
              const val = Math.round(fundValue(fi) * countP(fi));
              const cp = countP(fi);
              return (
                <div key={f.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 0',
                  borderBottom: fi < FUNDS.length - 1 ? `1px solid ${FM.BORDER}` : 'none',
                  opacity: cp > 0 ? 1 : 0.2,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: 3, background: FM.FUND_COLORS[fi].accent }} />
                    <span style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM }}>{f.label}</span>
                  </div>
                  <span style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                    ${val.toLocaleString('en-US')}
                  </span>
                </div>
              );
            })}

            {/* Stable indicator */}
            <div style={{
              marginTop: 16,
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: stableIn,
            }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2,
                background: `linear-gradient(90deg, ${FM.WARN}, oklch(75% 0.10 55))`,
                boxShadow: `0 0 12px ${FM.WARN_S}`,
              }} />
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.WARN, letterSpacing: '0.12em' }}>STAGED · AWAITING FINAL FILES</div>
            </div>
          </div>
        </FMPanel>
      </div>

      <SceneCaption n={3} t={t} label="Initial load — holding record staged" />
    </div>
  );
}

Object.assign(window, { FMScene1, FMScene2, FMScene3 });
